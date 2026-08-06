import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/google-calendar";
import { HORARIOS } from "@/lib/horarios";

/* Tenía su propia lista con horarios de mañana que el negocio no atiende.
   Este es el camino de fallo —sin token de Google, o con Google caído—, así que
   era justo el momento en que peor se notaba ofrecer una hora inexistente. */
const ALL_SLOTS = HORARIOS;

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