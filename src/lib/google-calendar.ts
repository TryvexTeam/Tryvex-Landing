import { google } from "googleapis";

const ALL_SLOTS = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
const SLOT_DURATION_MIN = 20;
const TZ = "America/Santiago";

function getAuth() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return auth;
}

// Converts a Santiago local time (e.g. "10:00" on dateISO) to the correct UTC Date.
// Works correctly through DST changes (Chile is UTC-3 in summer, UTC-4 in winter).
function santiagoToUTC(dateISO: string, time: string): Date {
  const asUTC = new Date(`${dateISO}T${time}:00Z`);
  const santiagoLocal = asUTC.toLocaleString("sv-SE", { timeZone: TZ });
  const offset = asUTC.getTime() - new Date(santiagoLocal.replace(" ", "T") + "Z").getTime();
  return new Date(asUTC.getTime() + offset);
}

export async function getAvailableSlots(dateISO: string): Promise<string[]> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  // Full UTC day window — Santiago business hours (10:00–17:00 Santiago = 13:00–21:00 UTC max)
  // always fall within this range regardless of DST.
  const timeMin = new Date(dateISO + "T00:00:00Z");
  const timeMax = new Date(dateISO + "T23:59:59Z");

  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";

  const { data } = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      timeZone: TZ,
      items: [{ id: calendarId }],
    },
  });

  const busy = data.calendars?.[calendarId]?.busy ?? [];

  return ALL_SLOTS.filter((slot) => {
    const start = santiagoToUTC(dateISO, slot);
    const end = new Date(start.getTime() + SLOT_DURATION_MIN * 60000);

    return !busy.some((b) => {
      const bs = new Date(b.start!);
      const be = new Date(b.end!);
      return start < be && end > bs;
    });
  });
}

export async function createCalendarEvent(params: {
  name: string;
  phone: string;
  email: string;
  dateISO: string;
  time: string;
  message?: string;
}): Promise<string> {
  const { name, phone, email, dateISO, time, message } = params;
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  const [h, m] = time.split(":").map(Number);
  const endMin = h * 60 + m + SLOT_DURATION_MIN;
  const endTime = `${String(Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`;

  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";

  const { data } = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: `Llamada Tryvex · ${name}`,
      description: `Teléfono: ${phone}\nCorreo: ${email}${message ? `\n\nMensaje: ${message}` : ""}`,
      // Pass local Santiago datetime strings — Google Calendar interprets with timeZone.
      // Do NOT convert to ISO/UTC here; that would shift the hour.
      start: { dateTime: `${dateISO}T${time}:00`, timeZone: TZ },
      end: { dateTime: `${dateISO}T${endTime}:00`, timeZone: TZ },
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId: `tryvex-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
  });

  return data.hangoutLink ?? process.env.GOOGLE_MEET_LINK ?? "https://meet.google.com";
}