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
        html: buildInternalEmail({ name, phone, email, date, time, message }),
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] resend error", err);
    return NextResponse.json({ error: "email failed" }, { status: 500 });
  }
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
    <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;width:100%;">
      <tr>
        <td style="background:rgba(229,57,53,0.12);border:1px solid rgba(229,57,53,0.3);border-radius:12px;padding:20px 24px;">
          <p style="margin:0 0 4px;color:#e53935;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">Fecha confirmada</p>
          <p style="margin:0;color:#f4f1ea;font-size:20px;font-weight:700;letter-spacing:-0.01em;">${date} · ${time} hrs</p>
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
<body style="margin:0;padding:0;background:#0e0e0e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0e0e0e;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Header / Logo -->
        <tr><td style="padding:0 0 32px;text-align:center;">
          <p style="margin:0;color:#e53935;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">✦ Tryvex Studio</p>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#161616;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">

          <!-- Red top bar -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:linear-gradient(135deg,#e53935 0%,#b71c1c 100%);height:4px;"></td></tr>
          </table>

          <!-- Body -->
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 40px;">
            <tr><td>

              <p style="margin:0 0 6px;color:#e53935;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">Llamada agendada</p>
              <h1 style="margin:0 0 8px;color:#f4f1ea;font-size:32px;font-weight:700;line-height:1.15;letter-spacing:-0.02em;">Hola, ${name}.</h1>
              <p style="margin:0 0 32px;color:#7a736b;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;">Dale el brillo que le falta a tu negocio</p>

              <p style="margin:0 0 28px;color:#a09a8f;font-size:16px;line-height:1.65;">
                Quedamos para una llamada de <strong style="color:#f4f1ea;">20 minutos</strong>. Sin compromiso, sin pitch — solo conversamos si podemos ayudarte.
              </p>

              ${slotBlock}

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr><td style="border-top:1px solid rgba(255,255,255,0.07);height:1px;"></td></tr>
              </table>

              <p style="margin:0 0 6px;color:#7a736b;font-size:13px;">Nos conectamos por Google Meet:</p>
              <p style="margin:0 0 28px;">
                <a href="${meetLink}" style="display:inline-block;background:#e53935;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-weight:600;font-size:14px;letter-spacing:0.01em;">
                  Abrir Google Meet →
                </a>
              </p>

              <p style="margin:0;color:#4a4540;font-size:13px;line-height:1.55;">
                ¿Necesitas reagendar? Escríbenos a
                <a href="mailto:tryvexentreprise@gmail.com" style="color:#e53935;text-decoration:none;">tryvexentreprise@gmail.com</a>
                y te respondemos el mismo día.
              </p>

            </td></tr>
          </table>

          <!-- Footer inside card -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:rgba(255,255,255,0.03);border-top:1px solid rgba(255,255,255,0.06);padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#4a4540;font-size:12px;">© MMXXVI · Tryvex Studio · Santiago, CL</p>
            </td></tr>
          </table>

        </td></tr>
        <!-- /Card -->

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
}: {
  name: string;
  phone: string;
  email: string;
  date?: string;
  time?: string;
  message?: string;
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Nueva solicitud · Tryvex</title>
</head>
<body style="margin:0;padding:0;background:#0e0e0e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0e0e0e;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Header -->
        <tr><td style="padding:0 0 24px;">
          <p style="margin:0;color:#e53935;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">✦ Tryvex · Notificación interna</p>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#161616;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:linear-gradient(135deg,#e53935 0%,#b71c1c 100%);height:4px;"></td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px;">
            <tr><td>

              <p style="margin:0 0 4px;color:#e53935;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">Nueva solicitud de llamada</p>
              <h2 style="margin:0 0 32px;color:#f4f1ea;font-size:24px;font-weight:700;letter-spacing:-0.02em;">${name}</h2>

              <!-- Data rows -->
              <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#7a736b;font-size:13px;width:90px;">Teléfono</td>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#f4f1ea;font-size:14px;font-weight:600;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#7a736b;font-size:13px;">Correo</td>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                    <a href="mailto:${email}" style="color:#e53935;font-size:14px;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                ${date ? `<tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#7a736b;font-size:13px;">Fecha</td>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#f4f1ea;font-size:14px;font-weight:600;">${date}</td>
                </tr>` : ""}
                ${time ? `<tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#7a736b;font-size:13px;">Hora</td>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#f4f1ea;font-size:14px;font-weight:600;">${time} hrs</td>
                </tr>` : ""}
                ${message ? `<tr>
                  <td style="padding:12px 0;color:#7a736b;font-size:13px;vertical-align:top;">Mensaje</td>
                  <td style="padding:12px 0;color:#a09a8f;font-size:14px;line-height:1.55;">${message}</td>
                </tr>` : ""}
              </table>

              <p style="margin:28px 0 0;">
                <a href="mailto:${email}" style="display:inline-block;background:#e53935;color:#fff;text-decoration:none;padding:12px 28px;border-radius:999px;font-weight:600;font-size:13px;">
                  Responder a ${name} →
                </a>
              </p>

            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:rgba(255,255,255,0.03);border-top:1px solid rgba(255,255,255,0.06);padding:16px 40px;text-align:center;">
              <p style="margin:0;color:#4a4540;font-size:12px;">Tryvex Studio · Notificación automática</p>
            </td></tr>
          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}
