import { NextResponse } from "next/server";
import { google } from "googleapis";
import { Resend } from "resend";

const TZ = "America/Santiago";
const WINDOW_MIN = 45;
const WINDOW_MAX = 75;

function getAuth() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return auth;
}

export async function GET() {
  if (!process.env.GOOGLE_REFRESH_TOKEN || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";
  const resend = new Resend(process.env.RESEND_API_KEY);

  const now = new Date();
  const timeMin = new Date(now.getTime() + WINDOW_MIN * 60_000);
  const timeMax = new Date(now.getTime() + WINDOW_MAX * 60_000);

  const { data } = await calendar.events.list({
    calendarId,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = data.items ?? [];
  const reminded: string[] = [];

  for (const event of events) {
    if (!event.id) continue;
    if (event.extendedProperties?.private?.reminderSent === "1") continue;

    const attendee = event.attendees?.find((a) => !a.organizer && a.email);
    if (!attendee?.email) continue;

    const startStr = event.start?.dateTime;
    if (!startStr) continue;

    const startDate = new Date(startStr);
    const timeStr = startDate.toLocaleString("es-CL", {
      timeZone: TZ,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const dateStr = startDate.toLocaleString("es-CL", {
      timeZone: TZ,
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    const meetLink =
      event.hangoutLink ??
      process.env.GOOGLE_MEET_LINK ??
      "https://meet.google.com";
    const clientName = attendee.displayName ?? attendee.email.split("@")[0];

    await resend.emails.send({
      from: "Tryvex <hola@tryvex.tech>",
      to: attendee.email,
      subject: "Recordatorio: tu llamada con Tryvex en 1 hora",
      html: buildReminderEmail({ name: clientName, date: dateStr, time: timeStr, meetLink }),
    });

    await calendar.events.patch({
      calendarId,
      eventId: event.id,
      requestBody: {
        extendedProperties: { private: { reminderSent: "1" } },
      },
    });

    reminded.push(event.id);
  }

  return NextResponse.json({ reminded, total: reminded.length });
}

function buildReminderEmail({
  name,
  date,
  time,
  meetLink,
}: {
  name: string;
  date: string;
  time: string;
  meetLink: string;
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Recordatorio de llamada · Tryvex</title>
</head>
<body style="margin:0;padding:0;background:#0e0e0e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0e0e0e;padding:48px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <tr><td style="padding:0 0 32px;text-align:center;">
          <p style="margin:0;color:#e53935;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;">✦ Tryvex Studio</p>
        </td></tr>

        <tr><td style="background:#161616;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:linear-gradient(135deg,#e53935 0%,#b71c1c 100%);height:4px;"></td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 40px;">
            <tr><td>

              <p style="margin:0 0 6px;color:#e53935;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">Recordatorio</p>
              <h1 style="margin:0 0 8px;color:#f4f1ea;font-size:28px;font-weight:700;line-height:1.2;letter-spacing:-0.02em;">Tu llamada es en 1 hora, ${name}.</h1>
              <p style="margin:0 0 32px;color:#7a736b;font-size:13px;letter-spacing:0.04em;">Dale el brillo que le falta a tu negocio</p>

              <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;width:100%;">
                <tr>
                  <td style="background:rgba(229,57,53,0.12);border:1px solid rgba(229,57,53,0.3);border-radius:12px;padding:20px 24px;">
                    <p style="margin:0 0 4px;color:#e53935;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">Fecha y hora</p>
                    <p style="margin:0;color:#f4f1ea;font-size:20px;font-weight:700;letter-spacing:-0.01em;">${date} · ${time} hrs</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                <tr><td style="border-top:1px solid rgba(255,255,255,0.07);height:1px;"></td></tr>
              </table>

              <p style="margin:0 0 6px;color:#7a736b;font-size:13px;">Únete a la llamada aquí:</p>
              <p style="margin:0 0 28px;">
                <a href="${meetLink}" style="display:inline-block;background:#e53935;color:#fff;text-decoration:none;padding:14px 32px;border-radius:999px;font-weight:600;font-size:14px;letter-spacing:0.01em;">
                  Abrir Google Meet →
                </a>
              </p>

              <p style="margin:0;color:#4a4540;font-size:13px;line-height:1.55;">
                ¿Necesitas reagendar? Escríbenos a
                <a href="mailto:tryvexentreprise@gmail.com" style="color:#e53935;text-decoration:none;">tryvexentreprise@gmail.com</a>
              </p>

            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:rgba(255,255,255,0.03);border-top:1px solid rgba(255,255,255,0.06);padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#4a4540;font-size:12px;">© MMXXVI · Tryvex Studio · Santiago, CL</p>
            </td></tr>
          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}