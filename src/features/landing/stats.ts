export type Stats = {
  businesses: number;
  leads_identificados: number;
  ultima_ejecucion: string | null;
};

/** Valores de respaldo cuando Supabase no responde o falta configuración. */
const RESPALDO: Stats = { businesses: 14, leads_identificados: 847, ultima_ejecucion: null };

/**
 * Métricas del negocio. Vive acá y no dentro de una página porque las consumen
 * el home y `/proceso`: con dos copias, una quedaría desactualizada.
 */
export async function fetchStats(): Promise<Stats> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/stats`, { next: { revalidate: 3600 } });
    if (!res.ok) return RESPALDO;
    return (await res.json()) as Stats;
  } catch {
    return RESPALDO;
  }
}
