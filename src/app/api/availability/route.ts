import { NextRequest, NextResponse } from "next/server";
import { CrmNoConfigurado, horasDisponibles } from "@/lib/crm";

/**
 * Las horas que el formulario ofrece para un día.
 *
 * ## Qué cambió
 *
 * Antes esto contrastaba una lista fija de horarios contra el `freebusy` de UN
 * calendario de Google. Ahora las horas salen del CRM, donde cada integrante
 * marca cuáles ofrece y el sistema descuenta lo que ya tiene ocupado. La lista
 * fija de `lib/horarios.ts` deja de ser la fuente: la fuente es quién está
 * disponible de verdad.
 *
 * ## Por qué ya no hay lista de respaldo
 *
 * Este archivo devolvía TODOS los horarios cuando faltaba el token de Google o
 * su API fallaba. Era el peor momento posible para inventar: justo cuando no se
 * sabe qué está ocupado, se ofrecía todo. Un visitante podía reservar una hora
 * ya tomada y recibir su correo de confirmación igual.
 *
 * Un fallo ahora responde 503 y el formulario lo dice. Es peor experiencia y
 * mejor información: no ofrecer nada es recuperable, confirmar una cita que no
 * existe no lo es.
 *
 * El contrato con el cliente no cambia — `{ slots: string[] }` — para no tocar
 * el formulario.
 */
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date required (YYYY-MM-DD)" }, { status: 400 });
  }

  try {
    const slots = await horasDisponibles(date);
    // Una lista vacía es una respuesta legítima: significa que ese día no queda
    // ninguna hora libre. El cliente tiene que distinguirla de un error.
    return NextResponse.json({ slots: slots.map((s) => s.hora) });
  } catch (err) {
    if (err instanceof CrmNoConfigurado) {
      console.error("[/api/availability] falta CRM_URL o LANDING_API_TOKEN");
    } else {
      console.error("[/api/availability]", err);
    }
    return NextResponse.json(
      { error: "availability unavailable", slots: [] },
      { status: 503 }
    );
  }
}
