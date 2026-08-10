import { timingSafeEqual } from "crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

// Tags válidos que este endpoint puede invalidar. Allowlist explícita: el
// payload nunca decide una ruta o tag arbitrario, solo elige entre estos.
const TAGS_VALIDOS = ["equipo"] as const;

const bodySchema = z.object({
  tag: z.enum(TAGS_VALIDOS),
});

const VENTANA_TIMESTAMP_MS = 5 * 60 * 1000;

/** Compara en tiempo constante; longitudes distintas también deben tardar igual. */
function secretoValido(recibido: string): boolean {
  if (!REVALIDATE_SECRET) return false;
  const esperado = Buffer.from(REVALIDATE_SECRET);
  const dado = Buffer.from(recibido);
  if (esperado.length !== dado.length) {
    // Igual costo que una comparación real, para no filtrar la longitud por timing.
    timingSafeEqual(esperado, esperado);
    return false;
  }
  return timingSafeEqual(esperado, dado);
}

/**
 * Invalidación on-demand para /team: TryvexPlataform llama esta ruta cuando
 * alguien guarda su perfil en /settings, en vez de esperar el `revalidate:
 * 900` de fetch-team.ts. Ver ese archivo para el otro lado del flujo.
 *
 * Seguridad (ver checklist de la skill backend-security-coder):
 * - Secreto en header, nunca en query param (query queda en logs de CDN).
 * - Comparación en tiempo constante.
 * - Timestamp firmado con ventana de 5 min contra replay de un request capturado.
 * - Allowlist de tags — el body no puede pedir un tag arbitrario.
 * - 401 genérico sin distinguir "secreto malo" de "timestamp vencido".
 */
export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret") ?? "";
  const timestampHeader = req.headers.get("x-revalidate-timestamp") ?? "";
  const timestamp = Number(timestampHeader);

  const timestampValido =
    Number.isFinite(timestamp) &&
    Math.abs(Date.now() - timestamp) <= VENTANA_TIMESTAMP_MS;

  if (!secretoValido(secret) || !timestampValido) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  try {
    // "max": sigue sirviendo la versión vieja mientras regenera en background,
    // en vez de bloquear el request que dispara la invalidación.
    revalidateTag(parsed.data.tag, "max");
    console.log(`[revalidate] tag="${parsed.data.tag}" ok`);
    return NextResponse.json({ revalidated: true, tag: parsed.data.tag });
  } catch (err) {
    console.error(`[revalidate] tag="${parsed.data.tag}" fallo`, err);
    return NextResponse.json({ error: "revalidation failed" }, { status: 500 });
  }
}
