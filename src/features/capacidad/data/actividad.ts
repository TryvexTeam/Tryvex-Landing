/**
 * Panel de actividad — datos agregados.
 *
 * Regla dura de este archivo: **nunca** una cifra que cruce cliente con tarifa
 * o plazo. Todo va en rango o en índice relativo. Si mañana alguien quiere
 * mostrar "Cliente X: 3 semanas, $Y", va en otro lado y con su permiso escrito.
 *
 * El pulso es un índice relativo sin eje: comunica forma, no volumen.
 */

export type Kpi = {
  valor: string;
  etiqueta: string;
  nota: string;
};

export const KPIS: Kpi[] = [
  { valor: "90–95%", etiqueta: "Entregas dentro del plazo comprometido", nota: "últimos 12 meses" },
  { valor: "3", etiqueta: "Líneas de trabajo activas en paralelo", nota: "automatización · web · IA" },
  { valor: "1–2 sem", etiqueta: "Ciclo de iteración con el cliente", nota: "de feedback a deploy" },
  { valor: "<10%", etiqueta: "Trabajo que vuelve a tocarse tras la entrega", nota: "reingeniería post-entrega" },
];

export type RangoEntrega = {
  tipo: string;
  desde: number;
  hasta: number;
  detalle: string;
};

/** Semanas. El máximo del eje se deriva del rango más largo, no se hardcodea. */
export const RANGOS: RangoEntrega[] = [
  { tipo: "Landing page", desde: 1, hasta: 2, detalle: "diseño, contenido y deploy" },
  { tipo: "Automatización", desde: 2, hasta: 4, detalle: "un proceso completo, monitoreado" },
  { tipo: "SaaS a medida (MVP)", desde: 4, hasta: 8, detalle: "producto usable en producción" },
  { tipo: "IA aplicada / agente propio", desde: 5, hasta: 10, detalle: "afinado sobre datos del negocio" },
];

export const SEMANAS_MAX = Math.max(...RANGOS.map((r) => r.hasta));

/**
 * Pulso de actividad — 24 semanas, índice relativo 0-100.
 * Sin eje numérico a propósito: la forma es el mensaje, el volumen es interno.
 */
export const PULSO: number[] = [
  38, 42, 40, 51, 47, 55, 62, 58, 66, 61, 70, 74,
  69, 78, 72, 81, 77, 86, 82, 90, 85, 93, 89, 96,
];
