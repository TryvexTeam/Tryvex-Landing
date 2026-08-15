import { z } from "zod";

/**
 * Reglas del formulario de agenda, en un solo lugar.
 *
 * Las consumen el cliente (`FinalCTA`, para avisar en el momento) y el servidor
 * (`/api/contact`, que es el que manda de verdad). Tenerlas separadas garantiza
 * que se desincronicen: el servidor validaba solo longitudes, así que
 * "Vice34nteb" con teléfono "+42313ds" entraba sin problema y el visitante veía
 * "¡Quedamos para la llamada!" con datos por los que nadie lo puede contactar.
 *
 * El criterio no es rechazar todo lo raro, es rechazar lo que hace imposible
 * devolver la llamada. Un nombre con un número no sirve de nada; un teléfono
 * con letras no se puede marcar.
 */

/* Letras (con tildes y ñ), espacios, apóstrofos, guiones y puntos. Nada de
   dígitos. Cubre "María José", "O'Brien", "Del Río-Pérez" y "J. Ignacio". */
const LETRAS_NOMBRE = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u;

/* Dígitos y los separadores que la gente escribe de verdad: +, espacios,
   guiones, puntos y paréntesis. La cuenta de dígitos se comprueba aparte. */
const CARACTERES_TELEFONO = /^[+()\d\s.-]+$/;

/** Cuántos dígitos tiene, ignorando todo lo demás. */
export function digitosDe(telefono: string): number {
  return (telefono.match(/\d/g) ?? []).length;
}

/**
 * Consentimiento por acción del botón.
 *
 * El formulario ya no lleva casilla: el aviso vive pegado al botón y el botón
 * dice lo que ocurre al pulsarlo. La Ley 21.719 pide consentimiento previo,
 * expreso e inequívoco, y pulsar un botón rotulado "Acepto y agendo cita"
 * junto a un aviso visible es una acción afirmativa inequívoca. Lo que se
 * pierde al sacar la casilla es la *prueba*, y por eso el consentimiento sigue
 * viajando en el envío y el esquema lo exige: sin él la solicitud se rechaza
 * con 422, igual que antes lo bloqueaba la casilla.
 *
 * `VERSION_CONSENTIMIENTO` identifica el texto que la persona tenía delante.
 * **Subirla cada vez que cambie `TEXTO_CONSENTIMIENTO`**: sin eso, dentro de un
 * año el registro dirá que aceptó un texto que en ese momento no existía.
 */
export const VERSION_CONSENTIMIENTO = "2026-08-15";

/** Copia literal de lo que se muestra sobre el botón. Si cambia allá, cambia acá. */
export const TEXTO_CONSENTIMIENTO =
  "Al pulsar «Acepto y agendo cita» autorizas a Tryvex a usar tus datos para " +
  "contactarte por esta solicitud, según su política de privacidad.";

export const esquemaAgenda = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre.")
    .max(80, "Nombre demasiado largo.")
    .regex(LETRAS_NOMBRE, "Sin números ni símbolos."),

  phone: z
    .string()
    .trim()
    .min(6, "Falta el número.")
    .max(30, "Número demasiado largo.")
    .regex(CARACTERES_TELEFONO, "Solo números.")
    /* Chile son 9 dígitos sin país, 11 con el +56. Ocho es el piso razonable
       para no dejar fuera números fijos ni extranjeros más cortos. */
    .refine((t) => digitosDe(t) >= 8, "Faltan dígitos.")
    .refine((t) => digitosDe(t) <= 15, "Sobran dígitos."),

  email: z
    .string()
    .trim()
    .min(5, "Falta el correo.")
    .max(120, "Correo demasiado largo.")
    .email("Revisa el correo."),

  date: z.string().trim().max(60).optional(),
  dateISO: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  time: z.string().trim().regex(/^\d{2}:\d{2}$/).optional(),
  message: z.string().trim().max(2000, "Mensaje demasiado largo.").optional(),

  /* `literal(true)`, no `boolean()`: un `false` tiene que rebotar igual que un
     campo ausente. Con `boolean()` bastaría mandar `aceptado: false` para
     colar una solicitud sin autorización. */
  consentimiento: z.object({
    aceptado: z.literal(true),
    version: z.string().trim().min(1).max(40),
  }),
});

export type DatosAgenda = z.infer<typeof esquemaAgenda>;

/** Campos que el visitante escribe, los únicos que se le pueden marcar. */
export type CampoAgenda = "name" | "phone" | "email" | "message";

/**
 * Valida un campo suelto y devuelve el mensaje de error, o `null` si está bien.
 * Se usa para avisar mientras se escribe, sin esperar al envío.
 */
export function errorDelCampo(campo: CampoAgenda, valor: string): string | null {
  if (campo === "message" && !valor.trim()) return null;
  const resultado = esquemaAgenda.shape[campo].safeParse(valor);
  return resultado.success ? null : resultado.error.issues[0]?.message ?? "Revisa este campo.";
}
