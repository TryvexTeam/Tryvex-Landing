/**
 * Horas locales de Santiago a instantes UTC.
 *
 * Chile cambia de huso dos veces al año: UTC-3 en verano, UTC-4 en invierno.
 * Un offset escrito a mano no falla el día que se escribe — falla el día del
 * cambio, corriendo una hora todas las citas que ya estaban agendadas.
 *
 * Eso ya estaba pasando: `/api/contact` construía la fecha que mandaba al
 * dashboard como `${dateISO}T${time}:00-04:00`, con el `-04:00` fijo.
 */

export const TZ_NEGOCIO = "America/Santiago";

/**
 * `"17:30"` del día `fecha` en Santiago → el instante UTC que le corresponde.
 *
 * El desfase se deduce de la zona en esa fecha concreta, en vez de asumirse.
 */
export function santiagoToUTC(fecha: string, hora: string): Date {
  const comoUTC = new Date(`${fecha}T${hora}:00Z`);
  const localSantiago = comoUTC.toLocaleString("sv-SE", { timeZone: TZ_NEGOCIO });
  const desfase = comoUTC.getTime() - new Date(localSantiago.replace(" ", "T") + "Z").getTime();
  return new Date(comoUTC.getTime() + desfase);
}
