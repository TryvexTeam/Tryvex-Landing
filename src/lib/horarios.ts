/**
 * Fuente única de los horarios que se pueden reservar.
 *
 * Estaban definidos en tres archivos y uno no coincidía: `/api/availability`
 * respondía 10:00, 11:00, 14:00, 15:00, 16:00 y 17:00 cuando Google Calendar no
 * estaba configurado o lanzaba error, mientras el calendario real y el
 * formulario ofrecían de 17:00 a 20:00. Con ese camino de fallo, un visitante
 * podía reservar las 10:00 —una hora en la que no se atiende— y recibir su
 * correo de confirmación igual.
 *
 * Este módulo no importa `googleapis`: lo consume también `FinalCTA`, que es un
 * componente de cliente, y arrastrar el SDK al bundle del navegador por leer una
 * lista de strings sería caro.
 */
export const HORARIOS = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
] as const;

/** Duración de la llamada de descubrimiento, en minutos. */
export const DURACION_SLOT_MIN = 20;
