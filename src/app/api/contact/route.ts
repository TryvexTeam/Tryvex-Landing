import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createCalendarEvent } from "@/lib/google-calendar";

const NOTIFY_EMAIL = "tryvexentreprise@gmail.com";
const FROM_SENDER = "Tryvex <hola@tryvex.tech>";
const FROM_INTERNAL = "Tryvex Forms <noreply@tryvex.tech>";
const FALLBACK_MEET = process.env.GOOGLE_MEET_LINK ?? "https://meet.google.com/tryvex-agenda";

interface SchedulePayload {
  name: string;
  phone: string;
  email: string;
  date?: string;
  dateISO?: string;
  time?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "email service not configured" }, { status: 503 });
  }

  let body: SchedulePayload;
  try {
    body = (await req.json()) as SchedulePayload;
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const { name, phone, email, date, dateISO, time, message } = body;

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: "name, phone and email required" },
      { status: 422 }
    );
  }

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
    await Promise.all([
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
        html: buildInternalEmail({ name, phone, email, date, time, message, meetLink }),
      }),
    ]);

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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] resend error", err);
    return NextResponse.json({ error: "email failed" }, { status: 500 });
  }
}

/* ─── Meet block reutilizable ─────────────────────────────────────────────── */
function meetBlock(meetLink: string, label: string) {
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
  name,
  date,
  time,
  meetLink,
}: {
  name: string;
  date?: string;
  time?: string;
  meetLink: string;
}) {
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
                <a href="mailto:tryvexentreprise@gmail.com" style="color:#e53935;text-decoration:none;">tryvexentreprise@gmail.com</a>
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
  name,
  phone,
  email,
  date,
  time,
  message,
  meetLink,
}: {
  name: string;
  phone: string;
  email: string;
  date?: string;
  time?: string;
  message?: string;
  meetLink: string;
}) {
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
                  <td style="padding:11px 0;border-bottom:${message ? "1px solid rgba(255,255,255,0.06)" : "none"};color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Hora</td>
                  <td style="padding:11px 0;border-bottom:${message ? "1px solid rgba(255,255,255,0.06)" : "none"};color:#ffffff;font-size:14px;font-weight:600;">${time} hrs</td>
                </tr>` : ""}
                ${message ? `<tr>
                  <td style="padding:11px 0;color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top;">Mensaje</td>
                  <td style="padding:11px 0;color:rgba(255,255,255,0.6);font-size:14px;line-height:1.6;">${message}</td>
                </tr>` : ""}
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
