/**
 * Catálogo de demostraciones de Tryvex.
 *
 * Cada demo es un proyecto navegable construido y publicado (Lovable u otro
 * hosting). La tarjeta completa enlaza a la demo; el botón secundario abre una
 * conversación con el bot de Tryvex en WhatsApp, con una referencia por nicho
 * para saber desde qué demo llegó cada lead.
 *
 * Regla del catálogo: en la página SOLO aparecen demos con `publicada: true` y
 * URL real. Nada de "próximamente". Publicar una demo nueva = agregar su entrada
 * (o cambiarle el flag) — nadie toca componentes.
 */

/** Número de WhatsApp de Tryvex (código de país, sin +). TODO: número real. */
export const WHATSAPP_NUMBER = "56900000000";

/** Link click-to-chat con referencia de origen para el router del bot. */
export function whatsappLink(ref: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ref)}`;
}

export interface Demo {
  /** Slug estable — se usa en la referencia del bot y en analítica. */
  id: string;
  /** Nombre del rubro tal como lo lee el dueño del negocio. */
  nicho: string;
  /** Etiqueta corta de categoría que se muestra sobre la imagen. */
  categoria: string;
  /** Una línea sobre qué automatiza esta demo. Lenguaje del dueño, sin jerga. */
  descripcion: string;
  /** Qué incluye la entrega — micro-etiquetas de la tarjeta. */
  incluye: string[];
  /** URL pública de la demo (app de Lovable u otro hosting). */
  demoUrl: string;
  /** Palabra clave que abre el flujo demo de este nicho en el bot. */
  whatsappRef: string;
  /** Captura 16:10 en /public/catalogo/. Sin ella se dibuja una portada de marca. */
  imagen?: string;
  /** Solo las publicadas se muestran. */
  publicada: boolean;
}

export const demos: Demo[] = [
  {
    id: "restaurante",
    nicho: "Restaurante de autor",
    categoria: "Gastronomía",
    descripcion:
      "Reservas de mesa y pedidos por WhatsApp, con el menú siempre al día.",
    incluye: ["Web inmersiva", "Asistente WhatsApp", "Reservas"],
    // Construida en Lovable ("Vex experiências"). Pendiente de publicar:
    // al hacer deploy, pegar aquí la URL pública y cambiar publicada a true.
    demoUrl: "",
    whatsappRef: "DEMO-RESTO",
    publicada: false,
  },
];

export const demosPublicadas: Demo[] = demos.filter(
  (d) => d.publicada && d.demoUrl
);
