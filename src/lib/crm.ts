/**
 * El puente con el CRM (TryvexPlataform).
 *
 * Hasta ahora la landing agendaba sola: ofrecía una lista fija de horarios
 * (`lib/horarios.ts`) contrastada contra el `freebusy` de UN calendario de
 * Google, y la cita nacía fuera del CRM — el equipo se enteraba por correo y un
 * fire-and-forget a un dashboard externo. La disponibilidad real del equipo,
 * que cada persona mantiene en su grilla del CRM, no participaba.
 *
 * Ahora el CRM es la fuente: sabe quién ofrece qué horas y qué tiene ocupado, y
 * la reserva se crea ahí dentro en una sola transacción (lead + evento +
 * asistente). Esta landing pasa a hacer solo lo suyo: validar el formulario y
 * mandar los correos con lo que el CRM devuelve.
 *
 * ## El token
 *
 * `LANDING_API_TOKEN` es un secreto compartido con el CRM, y **solo vive en el
 * servidor**: nunca se expone al navegador ni se prefija con `NEXT_PUBLIC_`.
 * Los endpoints del CRM corren con la llave de servicio de la base, así que sin
 * él cualquiera podría leer la agenda del equipo y crear citas y leads a
 * voluntad. Y como la llamada es de servidor a servidor, ni CORS ni el `Origin`
 * sirven de defensa: ambos son controles de navegador.
 *
 * No es la única defensa, a propósito: aunque el token se filtrara, el CRM
 * sigue devolviendo horas anónimas, con tope de 14 días y un freno por IP.
 */

const CRM_URL = process.env.CRM_URL;
const LANDING_API_TOKEN = process.env.LANDING_API_TOKEN;

/** Un hueco reservable. Sin identidad: el CRM nunca dice quién atiende. */
export interface SlotDisponible {
  /** `YYYY-MM-DD` en zona America/Santiago. */
  fecha: string;
  /** `HH:MM` local de Santiago. */
  hora: string;
}

export interface ReservaConfirmada {
  evento_id: string;
  lead_id: string;
  /** Quién atiende. Se sabe recién al reservar, y va en el correo. */
  integrante_nombre: string;
  meet_link: string | null;
}

/** Por qué el CRM rechazó una reserva. Cada uno merece un mensaje distinto. */
export type MotivoRechazo = "slot_no_disponible" | "hora_no_ofrecida" | "demasiado_pronto";

export class CrmNoConfigurado extends Error {
  constructor() {
    super("CRM_URL o LANDING_API_TOKEN no están configurados");
    this.name = "CrmNoConfigurado";
  }
}

export class CrmRechazo extends Error {
  constructor(readonly motivo: MotivoRechazo) {
    super(motivo);
    this.name = "CrmRechazo";
  }
}

function cabeceras() {
  if (!CRM_URL || !LANDING_API_TOKEN) throw new CrmNoConfigurado();
  return {
    "x-landing-token": LANDING_API_TOKEN,
    "Content-Type": "application/json",
  };
}

/**
 * Las horas reservables de un día concreto.
 *
 * Se le piden al CRM por rango y se filtran acá, porque su endpoint responde
 * por ventana y no por día suelto — así una vista de calendario completo puede
 * pedir catorce días de una vez sin catorce peticiones.
 *
 * `revalidate: 300` acompaña el cache de cinco minutos que ya aplica el CRM: no
 * tiene sentido preguntar más seguido de lo que la respuesta cambia, y un
 * muestreo fino de este endpoint es justamente lo que revelaría la agenda del
 * equipo por diferencia.
 *
 * Lanza si el CRM no responde. **No devuelve una lista de respaldo**: ofrecer
 * horarios inventados cuando no sabemos cuáles hay libres es cómo un visitante
 * termina con una cita confirmada a una hora que ya estaba tomada.
 */
export async function horasDisponibles(fechaISO: string): Promise<SlotDisponible[]> {
  const res = await fetch(
    `${CRM_URL}/api/publico/disponibilidad?desde=${fechaISO}&dias=1`,
    { headers: cabeceras(), next: { revalidate: 300, tags: ["disponibilidad"] } }
  );
  if (!res.ok) throw new Error(`El CRM respondió ${res.status} al pedir disponibilidad`);

  const cuerpo = (await res.json()) as { success: boolean; data?: SlotDisponible[] };
  if (!cuerpo.success || !cuerpo.data) throw new Error("El CRM devolvió una respuesta inesperada");

  return cuerpo.data.filter((s) => s.fecha === fechaISO);
}

/**
 * Reserva la cita en el CRM: lead, evento, asistente y registro, o nada.
 *
 * El CRM decide a quién le toca y devuelve su nombre para el correo. Ese es el
 * único momento en que el visitante sabe con quién habla — el endpoint de
 * disponibilidad no lo dice, porque publicar identidad junto a los huecos
 * entrega la agenda del equipo a cualquiera que la muestree.
 */
export async function reservarCita(datos: {
  nombre: string;
  email: string;
  telefono: string;
  mensaje?: string;
  /** Instante de inicio en ISO 8601 con zona. */
  inicio: string;
  consentimientoVersion: string;
}): Promise<ReservaConfirmada> {
  const res = await fetch(`${CRM_URL}/api/publico/citas`, {
    method: "POST",
    headers: cabeceras(),
    body: JSON.stringify({
      nombre: datos.nombre,
      email: datos.email,
      telefono: datos.telefono,
      mensaje: datos.mensaje,
      inicio: datos.inicio,
      consentimiento_version: datos.consentimientoVersion,
    }),
  });

  const cuerpo = (await res.json().catch(() => null)) as
    | { success: boolean; data?: ReservaConfirmada; error?: string }
    | null;

  if (!res.ok) {
    // 409 y 422 traen el motivo: la hora se ocupó mientras completaba el
    // formulario, no es una hora ofrecida, o es demasiado sobre la hora. Son
    // tres cosas distintas para quien reserva y merecen tres mensajes.
    const motivos: MotivoRechazo[] = ["slot_no_disponible", "hora_no_ofrecida", "demasiado_pronto"];
    const motivo = motivos.find((m) => m === cuerpo?.error);
    if (motivo) throw new CrmRechazo(motivo);
    throw new Error(`El CRM respondió ${res.status} al reservar`);
  }

  if (!cuerpo?.success || !cuerpo.data) throw new Error("El CRM no devolvió la cita creada");
  return cuerpo.data;
}
