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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] resend error", err);
    return NextResponse.json({ error: "email failed" }, { status: 500 });
  }
}

/* ─── Shared banner HTML (identical in both emails) ─────────────────────── */
function banner() {
  return `
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:44px 24px 28px;text-align:center;">
      <!-- Spark mark -->
      <p style="margin:0 0 10px;font-size:18px;color:#e53935;letter-spacing:0.04em;">✦</p>
      <!-- Wordmark -->
      <h1 style="margin:0;color:#f4f1ea;font-size:26px;font-weight:800;letter-spacing:0.26em;text-transform:uppercase;line-height:1;">TRYVEX</h1>
      <p style="margin:5px 0 0;color:#3d3830;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;font-weight:600;">Automatización · IA · Crecimiento</p>
    </td></tr>
    <!-- Gradient separator -->
    <tr><td style="padding:0 24px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="height:1px;background:#1a0808;"></td>
        <td style="height:1px;width:40%;background:#e53935;"></td>
        <td style="height:1px;background:#1a0808;"></td>
      </tr></table>
    </td></tr>
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
    <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;width:100%;">
      <tr><td style="border-radius:10px;overflow:hidden;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#1c1c1c;border:1px solid rgba(229,57,53,0.22);border-left:3px solid #e53935;border-radius:10px;padding:18px 22px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 3px;color:#e53935;font-size:9px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;">Fecha</p>
                    <p style="margin:0;color:#f4f1ea;font-size:16px;font-weight:700;">${date}</p>
                  </td>
                  <td style="text-align:right;">
                    <p style="margin:0 0 3px;color:#5a5450;font-size:9px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;">Hora</p>
                    <p style="margin:0;color:#f4f1ea;font-size:16px;font-weight:700;">${time} hrs</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>` : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Confirmación de llamada · Tryvex</title>
</head>
<body style="margin:0;padding:0;background:#090909;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#090909;padding:0 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        ${banner()}

        <!-- ── Card ── -->
        <tr><td style="padding:0 0 48px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#131313;border:1px solid rgba(255,255,255,0.07);border-radius:18px;overflow:hidden;">

            <!-- Card hero strip -->
            <tr><td style="background:linear-gradient(160deg,#1d0b0b 0%,#170808 60%,#130606 100%);padding:36px 40px 30px;border-bottom:1px solid rgba(229,57,53,0.12);">
              <p style="margin:0 0 5px;color:#e53935;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">Llamada confirmada</p>
              <h2 style="margin:0 0 6px;color:#f4f1ea;font-size:30px;font-weight:700;letter-spacing:-0.02em;line-height:1.15;">Hola, ${name}.</h2>
              <p style="margin:0;color:#4d4540;font-size:12px;letter-spacing:0.05em;">Sin compromiso · Sin pitch</p>
            </td></tr>

            <!-- Card body -->
            <tr><td style="padding:34px 40px 36px;">

              <p style="margin:0 0 28px;color:#857f78;font-size:15px;line-height:1.72;">
                Quedamos para una llamada de <strong style="color:#f4f1ea;font-weight:600;">20 minutos</strong>.
                Conversamos honestamente si podemos ayudarte — y si no, te decimos exactamente qué herramienta o equipo mirar.
              </p>

              ${slotBlock}

              <!-- Google Meet block -->
              <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 30px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#c62020 0%,#a81a1a 100%);border-radius:12px;padding:22px 26px;">
                    <p style="margin:0 0 12px;color:rgba(255,255,255,0.55);font-size:9px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">Tu enlace de Google Meet</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:rgba(255,255,255,0.75);font-size:12px;word-break:break-all;padding-right:12px;">${meetLink}</td>
                        <td style="white-space:nowrap;">
                          <a href="${meetLink}" style="display:inline-block;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.28);color:#fff;text-decoration:none;padding:10px 20px;border-radius:999px;font-weight:600;font-size:12px;letter-spacing:0.03em;">
                            Abrir →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr><td style="height:1px;background:rgba(255,255,255,0.05);"></td></tr>
              </table>

              <p style="margin:0;color:#3e3a36;font-size:13px;line-height:1.65;">
                ¿Necesitas reagendar? Escríbenos a
                <a href="mailto:tryvexentreprise@gmail.com" style="color:#c62020;text-decoration:none;">tryvexentreprise@gmail.com</a>
                y te respondemos el mismo día.
              </p>

            </td></tr>

            <!-- Card footer -->
            <tr><td style="background:#0c0c0c;border-top:1px solid rgba(255,255,255,0.04);padding:18px 40px;text-align:center;">
              <p style="margin:0;color:#2e2b28;font-size:11px;letter-spacing:0.06em;">© MMXXVI · Tryvex Studio · Santiago, Chile</p>
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

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#090909;padding:0 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        ${banner()}

        <!-- ── Card ── -->
        <tr><td style="padding:0 0 48px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#131313;border:1px solid rgba(255,255,255,0.07);border-radius:18px;overflow:hidden;">

            <!-- Card hero strip -->
            <tr><td style="background:linear-gradient(160deg,#1d0b0b 0%,#170808 60%,#130606 100%);padding:30px 40px 26px;border-bottom:1px solid rgba(229,57,53,0.12);">
              <p style="margin:0 0 5px;color:#e53935;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">Nueva solicitud de llamada</p>
              <h2 style="margin:0;color:#f4f1ea;font-size:26px;font-weight:700;letter-spacing:-0.02em;line-height:1.2;">${name}</h2>
            </td></tr>

            <!-- Card body -->
            <tr><td style="padding:32px 40px 36px;">

              <!-- Data rows -->
              <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 28px;">
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#5a5450;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:88px;">Teléfono</td>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#f4f1ea;font-size:14px;font-weight:600;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#5a5450;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Correo</td>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <a href="mailto:${email}" style="color:#c62020;font-size:14px;text-decoration:none;font-weight:600;">${email}</a>
                  </td>
                </tr>
                ${date ? `<tr>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#5a5450;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Fecha</td>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#f4f1ea;font-size:14px;font-weight:600;">${date}</td>
                </tr>` : ""}
                ${time ? `<tr>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#5a5450;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Hora</td>
                  <td style="padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#f4f1ea;font-size:14px;font-weight:600;">${time} hrs</td>
                </tr>` : ""}
                ${message ? `<tr>
                  <td style="padding:11px 0;color:#5a5450;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">Mensaje</td>
                  <td style="padding:11px 0;color:#857f78;font-size:14px;line-height:1.6;">${message}</td>
                </tr>` : ""}
              </table>

              <!-- Google Meet block -->
              <table cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 28px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#c62020 0%,#a81a1a 100%);border-radius:12px;padding:20px 26px;">
                    <p style="margin:0 0 10px;color:rgba(255,255,255,0.55);font-size:9px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">Enlace Google Meet de la llamada</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:rgba(255,255,255,0.75);font-size:12px;word-break:break-all;padding-right:12px;">${meetLink}</td>
                        <td style="white-space:nowrap;">
                          <a href="${meetLink}" style="display:inline-block;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.28);color:#fff;text-decoration:none;padding:10px 20px;border-radius:999px;font-weight:600;font-size:12px;letter-spacing:0.03em;">
                            Abrir →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action buttons -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="mailto:${email}" style="display:inline-block;background:#e53935;color:#fff;text-decoration:none;padding:12px 26px;border-radius:999px;font-weight:600;font-size:13px;letter-spacing:0.02em;">
                      Responder al cliente →
                    </a>
                  </td>
                  <td>
                    <a href="${meetLink}" style="display:inline-block;background:transparent;border:1px solid rgba(255,255,255,0.15);color:#a09a8f;text-decoration:none;padding:12px 26px;border-radius:999px;font-weight:600;font-size:13px;letter-spacing:0.02em;">
                      Abrir Meet →
                    </a>
                  </td>
                </tr>
              </table>

            </td></tr>

            <!-- Card footer -->
            <tr><td style="background:#0c0c0c;border-top:1px solid rgba(255,255,255,0.04);padding:16px 40px;text-align:center;">
              <p style="margin:0;color:#2e2b28;font-size:11px;letter-spacing:0.06em;">Tryvex Studio · Notificación automática · tryvex.tech</p>
            </td></tr>

          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}
