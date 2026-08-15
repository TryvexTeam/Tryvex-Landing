// Single source of truth for bookable call start times (America/Santiago).
// The team day closes at 20:00 and calls last 30 min, so the last bookable
// slot starts at 19:30 (ends 20:00). Keeps the picker, the availability API,
// and the calendar filter in sync.

export function generateSlots(
  start = "10:00",
  lastStart = "19:30",
  stepMin = 30
): string[] {
  const toMin = (t: string): number => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const slots: string[] = [];
  for (let mins = toMin(start); mins <= toMin(lastStart); mins += stepMin) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
  return slots;
}

// 10:00 → 19:30 every 30 min (20 slots). Last call ends at 20:00.
export const BUSINESS_SLOTS = generateSlots();
