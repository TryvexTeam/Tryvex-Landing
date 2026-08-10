import { members as MIEMBROS_FALLBACK } from "./members";
import type { Member } from "./members";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

type FilaEquipoPublico = {
  id: string;
  nombre: string;
  role: string | null;
  bio_corta: string | null;
  bio: string | null;
  photo: string | null;
  linkedin: string | null;
  portfolio: string | null;
  category: "core" | "engineering";
};

/**
 * El CRM ya valida protocolo antes de guardar, pero esta landing es un repo
 * aparte: no asumimos que todo dato que le llegue pasó por ese schema. Descarta
 * cualquier valor que no sea http(s) antes de que termine en un <a href>.
 */
function soloHttp(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  try {
    return ["http:", "https:"].includes(new URL(url).protocol) ? url : undefined;
  } catch {
    return undefined;
  }
}

function aMember(fila: FilaEquipoPublico): Member {
  return {
    id: fila.id,
    name: fila.nombre,
    role: fila.role ?? "",
    bioShort: fila.bio_corta ?? "",
    bio: fila.bio ?? "",
    photo: fila.photo ?? "",
    linkedin: soloHttp(fila.linkedin),
    portfolio: soloHttp(fila.portfolio),
    category: fila.category,
  };
}

/**
 * Trae el equipo desde `v_equipo_publico` (TryvexPlataform, ver migración
 * 040_equipo_publico_landing.sql): cada integrante activo edita su ficha desde
 * /settings del CRM y aparece acá solo, sin tocar código.
 *
 * Si faltan las env vars o Supabase no responde, cae al array estático — mismo
 * patrón que /api/stats, para que la página nunca se caiga por esto.
 *
 * `tags: ["equipo"]` deja esta consulta cacheada hasta 15 min o hasta que
 * TryvexPlataform llame a /api/revalidate al guardar un perfil, lo que pase
 * primero — ver ese route handler para el flujo de invalidación on-demand.
 */
export async function fetchTeam(): Promise<Member[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return MIEMBROS_FALLBACK;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/v_equipo_publico?select=*&order=nombre`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 900, tags: ["equipo"] },
      }
    );
    if (!res.ok) return MIEMBROS_FALLBACK;

    const filas = (await res.json()) as FilaEquipoPublico[];
    if (!filas.length) return MIEMBROS_FALLBACK;

    return filas.map(aMember);
  } catch {
    return MIEMBROS_FALLBACK;
  }
}
