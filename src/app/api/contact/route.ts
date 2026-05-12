import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_EMAIL = "hola@tryvex.cl";
const MEET_LINK =
  process.env.GOOGLE_MEET_LINK ?? "https://meet.google.com/tryvex-agenda";

interface SchedulePayload {
  name: string;
  phone: string;
  email: string;
  date?: string;
  time?: string;
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

  const { name, phone, email, date, time } = body;

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: "name, phone and email required" },
      { status: 422 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: "Tryvex <hola@tryvex.cl>",
        to: email,
        subject: "Confirmación de llamada · Tryvex",
        html: buildClientEmail({ name, date, time, meetLink: MEET_LINK }),
      }),
      resend.emails.send({
        from: "Tryvex Form <hola@tryvex.cl>",
        to: NOTIFY_EMAIL,
        subject: `Nueva solicitud de llamada — ${name}`,
        html: buildInternalEmail({ name, phone, email, date, time }),
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
  const slotLine =
    date && time
      ? `<p style="margin:0 0 24px;color:#a09a8f;font-size:15px;line-height:1.6;">
           📅 <strong style="color:#f4f1ea;">${date} a las ${time}</strong>
         </p>`
      : "";

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0e0e0e;border-radius:16px;padding:48px 40px;">
        <tr><td>
          <p style="margin:0 0 8px;color:#e53935;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Tryvex Studio</p>
          <h1 style="margin:0 0 24px;color:#f4f1ea;font-size:28px;line-height:1.2;">Hola, ${name} 👋</h1>
          <p style="margin:0 0 16px;color:#a09a8f;font-size:16px;line-height:1.6;">
            Quedamos para una llamada de 20 minutos. Te llamamos en el horario elegido.
          </p>
          ${slotLine}
          <p style="margin:0 0 32px;color:#a09a8f;font-size:16px;line-height:1.6;">
            Usaremos Google Meet. Aquí está el enlace:
          </p>
          <a href="${meetLink}" style="display:inline-block;background:#e53935;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:15px;">
            Abrir Google Meet →
          </a>
          <p style="margin:40px 0 0;color:#4a4540;font-size:13px;">
            ¿Necesitas reagendar? Escríbenos a
            <a href="mailto:hola@tryvex.cl" style="color:#e53935;">hola@tryvex.cl</a>
          </p>
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
}: {
  name: string;
  phone: string;
  email: string;
  date?: string;
  time?: string;
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:32px;font-family:system-ui,sans-serif;background:#f4f1ea;">
  <h2 style="margin:0 0 16px;color:#0e0e0e;">Nueva solicitud de llamada</h2>
  <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:480px;">
    <tr><td style="color:#666;width:120px;">Nombre</td><td style="color:#0e0e0e;font-weight:600;">${name}</td></tr>
    <tr><td style="color:#666;">Teléfono</td><td style="color:#0e0e0e;">${phone}</td></tr>
    <tr><td style="color:#666;">Correo</td><td><a href="mailto:${email}" style="color:#e53935;">${email}</a></td></tr>
    ${date ? `<tr><td style="color:#666;">Fecha</td><td style="color:#0e0e0e;font-weight:600;">${date}</td></tr>` : ""}
    ${time ? `<tr><td style="color:#666;">Hora</td><td style="color:#0e0e0e;font-weight:600;">${time}</td></tr>` : ""}
  </table>
</body>
</html>`;
}
