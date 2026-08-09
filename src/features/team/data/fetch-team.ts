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

function aMember(fila: FilaEquipoPublico): Member {
  return {
    id: fila.id,
    name: fila.nombre,
    role: fila.role ?? "",
    bioShort: fila.bio_corta ?? "",
    bio: fila.bio ?? "",
    photo: fila.photo ?? "",
    linkedin: fila.linkedin ?? undefined,
    portfolio: fila.portfolio ?? undefined,
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
        next: { revalidate: 3600 },
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
