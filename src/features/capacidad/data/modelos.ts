/**
 * Snapshot del ranking público de modelos.
 *
 * Fuente: Artificial Analysis — https://artificialanalysis.ai/models
 * Índice: Artificial Analysis Intelligence Index v4.1.1 (9 evaluaciones).
 * Costo: promedio ponderado en USD por tarea del índice (menos es mejor).
 *
 * ⚠️ Es un **snapshot manual**, no un fetch en vivo. Se decidió así a
 * propósito: la página no puede quedar en blanco porque un tercero cambió su
 * API o se cayó. Al actualizar, cambiar también `ACTUALIZADO` — la fecha se
 * muestra en la UI y una fecha vieja es peor que ninguna.
 */

export type Modelo = {
  nombre: string;
  /** Artificial Analysis Intelligence Index (mayor es mejor). */
  indice: number;
  /** USD por tarea del índice (menor es mejor). */
  costo: number;
  tipo: "Frontera" | "Peso abierto";
  /** Parte del stack que Tryvex usa hoy en producción. */
  enUso?: boolean;
  /**
   * Corrimiento de la etiqueta respecto de su punto, en unidades del viewBox.
   * Sin esto el racimo de los cuatro modelos más capaces —tres entre 60 y 62
   * puntos, dos con el mismo costo— se pisaba letra sobre letra. Por defecto
   * la etiqueta va centrada 12 unidades encima del punto.
   */
  dx?: number;
  dy?: number;
};

export const ACTUALIZADO = "15 de agosto de 2026";
export const FUENTE_URL = "https://artificialanalysis.ai/models";
export const INDICE_VERSION = "Intelligence Index v4.1.1";

export const MODELOS: Modelo[] = [
  { nombre: "Claude Opus 5", indice: 63, costo: 2.34, tipo: "Frontera", enUso: true, dy: -14 },
  { nombre: "Claude Fable 5", indice: 62, costo: 3.14, tipo: "Frontera", enUso: true, dy: 20 },
  { nombre: "GPT-5.6 Sol", indice: 61, costo: 1.23, tipo: "Frontera", enUso: true, dx: 34, dy: 22 },
  { nombre: "Grok 4.6", indice: 61, costo: 0.84, tipo: "Frontera", dx: -26, dy: -12 },
  { nombre: "Kimi K3", indice: 60, costo: 0.84, tipo: "Peso abierto", enUso: true, dx: -34, dy: 20 },
  { nombre: "Gemini 3.7 Flash", indice: 56, costo: 0.40, tipo: "Frontera", enUso: true, dx: -58, dy: -14 },
  { nombre: "DeepSeek V4 Pro", indice: 53, costo: 0.25, tipo: "Peso abierto", enUso: true, dx: -30, dy: -16 },
  { nombre: "GLM-5.2", indice: 53, costo: 0.32, tipo: "Peso abierto", dx: 26, dy: 20 },
  { nombre: "GPT-5.6 Luna", indice: 52, costo: 0.05, tipo: "Frontera" },
  { nombre: "Nemotron 3 Ultra", indice: 38, costo: 0.38, tipo: "Peso abierto" },
];

/* ---- Geometría del scatter -------------------------------------------------
   El costo abarca dos órdenes de magnitud ($0,05 → $3,14): en escala lineal
   nueve modelos se apilan contra el eje. Por eso el eje X es logarítmico. */

export const VB = { w: 640, h: 340 } as const;
const PAD = { izq: 54, der: 26, sup: 26, inf: 52 } as const;

const COSTO_MIN = 0.04;
const COSTO_MAX = 4;
const IND_MIN = 30;
const IND_MAX = 70;

const log = (v: number) => Math.log10(v);

export function x(costo: number): number {
  const t = (log(costo) - log(COSTO_MIN)) / (log(COSTO_MAX) - log(COSTO_MIN));
  return PAD.izq + t * (VB.w - PAD.izq - PAD.der);
}

export function y(indice: number): number {
  const t = (indice - IND_MIN) / (IND_MAX - IND_MIN);
  return VB.h - PAD.inf - t * (VB.h - PAD.sup - PAD.inf);
}

/** Marcas del eje de costo, en dólares por tarea. */
export const TICKS_COSTO = [0.05, 0.25, 1, 3];
/** Marcas del eje de índice. */
export const TICKS_INDICE = [40, 50, 60];

export const PLOT = {
  izq: PAD.izq,
  der: VB.w - PAD.der,
  sup: PAD.sup,
  inf: VB.h - PAD.inf,
} as const;
