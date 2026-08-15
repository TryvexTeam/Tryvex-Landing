import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createCalendarEvent } from "@/lib/google-calendar";
import { esquemaAgenda } from "@/lib/validacion-agenda";
import { escaparHtml } from "@/lib/html";

const NOTIFY_EMAIL = "tryvexentreprise@gmail.com";
const FROM_SENDER = "Tryvex <hola@tryvex.tech>";
const FROM_INTERNAL = "Tryvex Forms <noreply@tryvex.tech>";
const FALLBACK_MEET = process.env.GOOGLE_MEET_LINK ?? "https://meet.google.com/tryvex-agenda";

/**
 * El correo de confirmación sale con el dominio verificado como remitente y va
 * a la dirección que escribe el visitante: sin esquema, la ruta era un relay
 * abierto — cualquiera podía mandar correo desde `hola@tryvex.tech` a quien
 * quisiera y quemar la reputación SPF/DKIM del dominio.
 *
 * El esquema vive en `lib/validacion-agenda` y lo comparte el formulario. Acá
 * tenía uno propio que solo miraba longitudes, así que "Vice34nteb" con
 * teléfono "+42313ds" pasaba y el visitante veía "¡Quedamos para la llamada!"
 * con datos por los que nadie lo puede contactar. Dos copias de las mismas
 * reglas siempre terminan divergiendo; ahora hay una sola.
 */

/**
 * Freno por IP en memoria. No es un rate-limit distribuido — cada instancia
 * serverless lleva su propio contador — pero corta el caso que importa: el
 * mismo origen disparando el formulario en bucle contra una instancia caliente.
 */
const VENTANA_MS = 60 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const golpesPorIp = new Map<string, number[]>();

function superaElLimite(ip: string) {
  const ahora = Date.now();
  const recientes = (golpesPorIp.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= MAX_POR_VENTANA) {
    golpesPorIp.set(ip, recientes);
    return true;
  }
  recientes.push(ahora);
  golpesPorIp.set(ip, recientes);
  if (golpesPorIp.size > 5000) golpesPorIp.clear(); // techo de memoria
  return false;
}

export async function POST(req: NextRequest) {
  let crudo: unknown;
  try {
    crudo = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const parseo = esquemaAgenda.safeParse(crudo);
  if (!parseo.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "email service not configured" }, { status: 503 });
  }

  // El freno se cobra recién acá, sobre las solicitudes que sí van a mandar
  // correo. Contarlo antes de validar castigaba al visitante que se equivoca
  // escribiendo: cinco erratas y quedaba bloqueado una hora.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "desconocida";
  if (superaElLimite(ip)) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  const { name, phone, email, date, dateISO, time, message, consentimiento } = parseo.data;

  /* Registro del consentimiento, para que quede en el correo interno junto a
     los datos que autoriza. Va aparte del formulario a propósito: la persona
     no ve ni un control más: pulsa el botón y el servidor levanta el acta.

     Hora, IP y agente los pone el servidor y no el navegador: un dato que
     prueba una autorización no puede venir del mismo lado que la declara. La
     versión sí viaja desde el formulario — identifica qué texto tenía delante
     al pulsar, que es lo que hace verificable el "informado".

     El agente se recorta a 180 caracteres: identifica el dispositivo, que es
     para lo que sirve, sin arrastrar la ristra completa de tokens al correo. */
  const agente = (req.headers.get("user-agent") ?? "desconocido").slice(0, 180);
  const selloConsentimiento = [
    "Aceptado al pulsar «Acepto y agendo cita»",
    `texto ${consentimiento.version}`,
    new Date().toISOString(),
    `IP ${ip}`,
    agente,
  ].join(" · ");

  // Create Google Calendar event + Meet link (falls back if Calendar not configured)
  let meetLink = FALLBACK_MEET;
  if (process.env.GOOGLE_REFRESH_TOKEN && dateISO && time) {
    try {
      meetLink = await createCalendarEvent({ name, phone, email, dateISO, time, message });
    } catch (err) {
      console.error("[/api/contact] calendar error", err);
    }
  }

  const resend = new Resend(apiKey);

  try {
    // `allSettled` y no `all`: si una promesa se rompe por red, la otra sigue
    // teniendo un resultado que mirar. Con `all` se perdía.
    const [envioCliente, envioInterno] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_SENDER,
        to: email,
        subject: "Confirmación de llamada · Tryvex",
        html: buildClientEmail({ name, date, time, meetLink }),
      }),
      resend.emails.send({
        from: FROM_INTERNAL,
        to: NOTIFY_EMAIL,
        subject: `Nueva solicitud de llamada — ${name}`,
        html: buildInternalEmail({
          name,
          phone,
          email,
          date,
          time,
          message,
          meetLink,
          consentimiento: selloConsentimiento,
        }),
      }),
    ]);

    const falloCliente = motivoDeFallo(envioCliente);
    const falloInterno = motivoDeFallo(envioInterno);
    if (falloCliente) console.error("[/api/contact] correo al cliente", falloCliente);
    if (falloInterno) console.error("[/api/contact] aviso al equipo", falloInterno);

    // Registrar la cita en el dashboard interno del equipo (trybot/leads-dashboard).
    // Fire-and-forget: si el dashboard no responde, la reserva del cliente NO se ve
    // afectada. Solo corre si está configurado CITAS_INGEST_TOKEN en el entorno.
    if (process.env.CITAS_INGEST_TOKEN && dateISO && time) {
      const fecha_hora = `${dateISO}T${time}:00-04:00`; // Chile (UTC-4)
      fetch("https://leads-dashboard-production-c504.up.railway.app/api/citas/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-ingest-token": process.env.CITAS_INGEST_TOKEN,
        },
        body: JSON.stringify({
          nombre: name,
          email,
          telefono: phone,
          fecha_hora,
          mensaje: message,
          origen: "tryvex.tech",
        }),
      }).catch((err) => console.error("[/api/contact] citas ingest error", err));
    }

    /* El criterio es dónde queda el lead, no cuántos correos salieron.
       - Si falla el aviso al equipo, nadie se entera de la solicitud: se
         responde con error para que el visitante lo reintente o escriba al
         correo que muestra el toast.
       - Si solo falla la copia del cliente, la solicitud ya está en la bandeja
         del equipo y en el calendario: obligar a reintentar duplicaría la cita
         para nada. Queda registrado en el log y el equipo hace el contacto. */
    if (falloInterno) {
      return NextResponse.json({ error: "email failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, confirmacionEnviada: !falloCliente });
  } catch (err) {
    console.error("[/api/contact] resend error", err);
    return NextResponse.json({ error: "email failed" }, { status: 500 });
  }
}

/**
 * El SDK de Resend no lanza excepción cuando el envío se rechaza: devuelve
 * `{ data, error }`. El código solo tenía un try/catch, así que una clave
 * inválida, un dominio sin verificar o una cuota agotada terminaban en un 200
 * con "llamada confirmada" y ningún correo enviado.
 */
function motivoDeFallo(resultado: PromiseSettledResult<{ error: unknown }>) {
  if (resultado.status === "rejected") return resultado.reason;
  return resultado.value?.error ?? null;
}

/* ─── Meet block reutilizable ─────────────────────────────────────────────── */
function meetBlock(link: string, label: string) {
  const meetLink = escaparHtml(link);
  return `
  <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 28px;">
    <tr>
      <td style="background:#1e1e1e;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px 24px;">
        <p style="margin:0 0 10px;color:rgba(255,255,255,0.4);font-size:9px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">${label}</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="color:rgba(255,255,255,0.55);font-size:12px;word-break:break-all;padding-right:12px;">
              <a href="${meetLink}" style="color:rgba(255,255,255,0.55);text-decoration:none;">${meetLink}</a>
            </td>
            <td style="white-space:nowrap;">
              <a href="${meetLink}" style="display:inline-block;background:#e53935;color:#fff;text-decoration:none;padding:10px 20px;border-radius:999px;font-weight:600;font-size:12px;letter-spacing:0.03em;">
                Abrir →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function buildClientEmail({
  name: nombreCrudo,
  date: fechaCruda,
  time: horaCruda,
  meetLink,
}: {
  name: string;
  date?: string;
  time?: string;
  meetLink: string;
}) {
  const name = escaparHtml(nombreCrudo);
  const date = fechaCruda ? escaparHtml(fechaCruda) : undefined;
  const time = horaCruda ? escaparHtml(horaCruda) : undefined;

  const slotBlock = date && time ? `
    <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 28px;">
      <tr>
        <td style="background:#1e1e1e;border-left:3px solid #e53935;border-radius:8px;padding:18px 22px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0 0 4px;color:rgba(255,255,255,0.4);font-size:9px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">Fecha</p>
                <p style="margin:0;color:#ffffff;font-size:15px;font-weight:600;">${date}</p>
              </td>
              <td style="text-align:right;">
                <p style="margin:0 0 4px;color:rgba(255,255,255,0.4);font-size:9px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">Hora</p>
                <p style="margin:0;color:#ffffff;font-size:15px;font-weight:600;">${time} hrs</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>` : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Confirmación de llamada · Tryvex</title>
</head>
<body style="margin:0;padding:0;background:#090909;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#090909;padding:40px 16px 56px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- ── Card único oscuro de inicio a fin ── -->
        <tr><td style="border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
          <table width="100%" cellpadding="0" cellspacing="0">

            <!-- Banner: crema con logo transparente -->
            <tr><td style="background:#edeae2;padding:36px 40px 32px;text-align:center;">
              <img src="https://tryvex.tech/logo-email-dark.png" width="180" alt="tryvex." style="display:block;margin:0 auto;border:0;height:auto;max-width:180px;"/>
            </td></tr>

            <!-- Franja roja separadora -->
            <tr><td style="background:#e53935;height:3px;font-size:0;line-height:0;">&#8203;</td></tr>

            <!-- Hero -->
            <tr><td style="background:#111111;padding:32px 40px 28px;border-bottom:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0 0 6px;color:#e53935;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">Llamada confirmada</p>
              <h2 style="margin:0 0 6px;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.02em;line-height:1.15;">Hola, ${name}.</h2>
              <p style="margin:0;color:rgba(255,255,255,0.35);font-size:12px;letter-spacing:0.04em;">Sin compromiso · Sin pitch</p>
            </td></tr>

            <!-- Cuerpo -->
            <tr><td style="background:#111111;padding:32px 40px 36px;">

              <p style="margin:0 0 28px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.72;">
                Quedamos para una llamada de <strong style="color:#ffffff;font-weight:600;">20 minutos</strong>.
                Conversamos honestamente si podemos ayudarte — y si no, te decimos exactamente qué herramienta o equipo mirar.
              </p>

              ${slotBlock}

              ${meetBlock(meetLink, "Tu enlace de Google Meet")}

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr><td style="height:1px;background:rgba(255,255,255,0.06);"></td></tr>
              </table>

              <p style="margin:0;color:rgba(255,255,255,0.35);font-size:13px;line-height:1.65;">
                ¿Necesitas reagendar? Escríbenos a
                <a href="mailto:tryvexentreprise@gmail.com" style="color:#e53935;text-decoration:none;">contacto@tryvex.tech</a>
                y te respondemos el mismo día.
              </p>

            </td></tr>

            <!-- Footer -->
            <tr><td style="background:#090909;border-top:1px solid rgba(255,255,255,0.05);padding:18px 40px;text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.2);font-size:11px;letter-spacing:0.06em;">© MMXXVI · Tryvex Studio · Santiago, Chile</p>
            </td></tr>

          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}

function buildInternalEmail({
  name: nombreCrudo,
  phone: telefonoCrudo,
  email: emailCrudo,
  date: fechaCruda,
  time: horaCruda,
  message: mensajeCrudo,
  meetLink,
  consentimiento: consentimientoCrudo,
}: {
  name: string;
  phone: string;
  email: string;
  date?: string;
  time?: string;
  message?: string;
  meetLink: string;
  /** Sello de la autorización: texto, versión y hora del servidor. */
  consentimiento: string;
}) {
  const name    = escaparHtml(nombreCrudo);
  const phone   = escaparHtml(telefonoCrudo);
  const email   = escaparHtml(emailCrudo);
  const date    = fechaCruda ? escaparHtml(fechaCruda) : undefined;
  const time    = horaCruda ? escaparHtml(horaCruda) : undefined;
  const message = mensajeCrudo ? escaparHtml(mensajeCrudo) : undefined;
  const consentimiento = escaparHtml(consentimientoCrudo);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Nueva solicitud · Tryvex</title>
</head>
<body style="margin:0;padding:0;background:#090909;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#090909;padding:40px 16px 56px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- ── Card único oscuro de inicio a fin ── -->
        <tr><td style="border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
          <table width="100%" cellpadding="0" cellspacing="0">

            <!-- Banner: crema con logo transparente -->
            <tr><td style="background:#edeae2;padding:36px 40px 32px;text-align:center;">
              <img src="https://tryvex.tech/logo-email-dark.png" width="180" alt="tryvex." style="display:block;margin:0 auto;border:0;height:auto;max-width:180px;"/>
            </td></tr>

            <!-- Franja roja separadora -->
            <tr><td style="background:#e53935;height:3px;font-size:0;line-height:0;">&#8203;</td></tr>

            <!-- Hero -->
            <tr><td style="background:#111111;padding:28px 40px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0 0 5px;color:#e53935;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">Nueva solicitud de llamada</p>
              <h2 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.02em;line-height:1.2;">${name}</h2>
            </td></tr>

            <!-- Cuerpo -->
            <tr><td style="background:#111111;padding:30px 40px 36px;">

              <!-- Datos del cliente -->
              <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 28px;">
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;width:80px;">Tel.</td>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#ffffff;font-size:14px;font-weight:600;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Email</td>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <a href="mailto:${email}" style="color:#e53935;font-size:14px;text-decoration:none;font-weight:600;">${email}</a>
                  </td>
                </tr>
                ${date ? `<tr>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Fecha</td>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#ffffff;font-size:14px;font-weight:600;">${date}</td>
                </tr>` : ""}
                ${time ? `<tr>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Hora</td>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#ffffff;font-size:14px;font-weight:600;">${time} hrs</td>
                </tr>` : ""}
                ${message ? `<tr>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Mensaje</td>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.6);font-size:14px;line-height:1.6;">${message}</td>
                </tr>` : ""}
                <!-- Registro del consentimiento. Va en el mismo correo que los
                     datos que autoriza: si mañana hay que probar que hubo
                     autorización, está en la misma fila que el teléfono. -->
                <tr>
                  <td style="padding:11px 0;color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Consent.</td>
                  <td style="padding:11px 0;color:rgba(255,255,255,0.6);font-size:12px;line-height:1.6;">${consentimiento}</td>
                </tr>
              </table>

              ${meetBlock(meetLink, "Enlace Google Meet")}

              <!-- Botones de acción -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="mailto:${email}" style="display:inline-block;background:#e53935;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:600;font-size:13px;letter-spacing:0.02em;">
                      Responder →
                    </a>
                  </td>
                  <td>
                    <a href="${meetLink}" style="display:inline-block;background:transparent;border:1px solid rgba(255,255,255,0.14);color:rgba(255,255,255,0.5);text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:600;font-size:13px;letter-spacing:0.02em;">
                      Abrir Meet →
                    </a>
                  </td>
                </tr>
              </table>

            </td></tr>

            <!-- Footer -->
            <tr><td style="background:#090909;border-top:1px solid rgba(255,255,255,0.05);padding:16px 40px;text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.2);font-size:11px;letter-spacing:0.06em;">Tryvex Studio · Notificación automática · tryvex.tech</p>
            </td></tr>

          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}
