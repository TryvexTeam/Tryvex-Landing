import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/google-calendar";

const ALL_SLOTS = ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date required (YYYY-MM-DD)" }, { status: 400 });
  }

  if (!process.env.GOOGLE_REFRESH_TOKEN) {
    return NextResponse.json({ slots: ALL_SLOTS });
  }

  try {
    const slots = await getAvailableSlots(date);
    return NextResponse.json({ slots });
  } catch (err) {
    console.error("[/api/availability]", err);
    return NextResponse.json({ slots: ALL_SLOTS });
  }
}