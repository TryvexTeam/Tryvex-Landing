import { google } from "googleapis";

const ALL_SLOTS = ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
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

export async function getAvailableSlots(dateISO: string): Promise<string[]> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  const day = new Date(dateISO + "T00:00:00");
  const timeMin = new Date(day);
  timeMin.setHours(8, 0, 0, 0);
  const timeMax = new Date(day);
  timeMax.setHours(20, 0, 0, 0);

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
    const [h, m] = slot.split(":").map(Number);
    const start = new Date(day);
    start.setHours(h, m, 0, 0);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + SLOT_DURATION_MIN);

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
}): Promise<string> {
  const { name, phone, email, dateISO, time } = params;
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  const [h, m] = time.split(":").map(Number);
  const start = new Date(dateISO + "T00:00:00");
  start.setHours(h, m, 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + SLOT_DURATION_MIN);

  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";

  const { data } = await calendar.events.insert({
    calendarId,
    conferenceDataVersion: 1,
    sendUpdates: "all",
    requestBody: {
      summary: `Llamada Tryvex · ${name}`,
      description: `Teléfono: ${phone}\nCorreo: ${email}`,
      start: { dateTime: start.toISOString(), timeZone: TZ },
      end: { dateTime: end.toISOString(), timeZone: TZ },
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