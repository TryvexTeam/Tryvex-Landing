import { BUSINESS_SLOTS } from "./slots";

// Optional per-date overrides.
//
// When this map is EMPTY (current state), the web offers full availability:
// every day, all business-hour slots (10:00–20:00). You block time simply by
// creating an event in your Google Calendar — busy times are filtered out of
// the picker automatically.
//
// To offer a client only specific windows again, add entries, e.g.:
//   "2026-07-06": ["14:00", "17:00"],
//   "2026-07-07": ["10:00", "10:30", "11:00", "19:30", "20:00"],
export const OFFERED_DATES: Record<string, string[]> = {};

export function hasOfferedDates(): boolean {
  return Object.keys(OFFERED_DATES).length > 0;
}

// Sorted ISO dates from the override map that are today or later.
export function offeredDateList(): string[] {
  const today = new Date();
  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return Object.keys(OFFERED_DATES)
    .filter((d) => d >= todayISO)
    .sort();
}

// Base slots offered for a given date (before calendar busy-filtering).
export function slotsForDate(dateISO: string): string[] {
  return OFFERED_DATES[dateISO] ?? BUSINESS_SLOTS;
}
