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

/** Número de WhatsApp de Tryvex (código de país, sin +). */
export const WHATSAPP_NUMBER = "56950358818";

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
  /** Captura de la portada del sitio, a ancho completo, en /public/catalogo/.
   *  Sin ella se dibuja una portada de marca con la categoría. */
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
    demoUrl: "https://tryvex-restaurante.lovable.app",
    whatsappRef: "DEMO-RESTO",
    imagen: "/catalogo/restaurante.jpg",
    publicada: true,
  },
  {
    id: "concesionaria",
    nicho: "Concesionaria de autos",
    categoria: "Automotriz",
    descripcion:
      "El inventario a la vista las 24 horas, con la ficha de cada auto y las consultas llegando por WhatsApp.",
    incluye: ["Web inmersiva", "Vitrina 24/7", "Asistente WhatsApp"],
    demoUrl: "https://concesionaria-parallax.vercel.app",
    whatsappRef: "DEMO-AUTOS",
    imagen: "/catalogo/concesionaria.jpg",
    publicada: true,
  },
  {
    id: "inmobiliaria",
    nicho: "Inmobiliaria de lujo",
    categoria: "Bienes raíces",
    descripcion:
      "Cada propiedad con su ficha, fotos y superficie al detalle, agendando visitas solas por WhatsApp.",
    incluye: ["Web inmersiva", "Fichas de propiedad", "Asistente WhatsApp"],
    demoUrl: "https://inmobiliaria-landing-demo.vercel.app",
    whatsappRef: "DEMO-INMO",
    imagen: "/catalogo/inmobiliaria.jpg",
    publicada: true,
  },
  {
    id: "estetica",
    nicho: "Centro de estética y spa",
    categoria: "Belleza y bienestar",
    descripcion:
      "Servicios y horas disponibles siempre a la vista, con las reservas cerrándose por WhatsApp.",
    incluye: ["Web inmersiva", "Galería de servicios", "Asistente WhatsApp"],
    demoUrl: "https://demo-centro-estetica-tryvex.vercel.app",
    whatsappRef: "DEMO-ESTETICA",
    imagen: "/catalogo/estetica.jpg",
    publicada: true,
  },
  {
    id: "veterinaria",
    nicho: "Clínica veterinaria",
    categoria: "Salud y mascotas",
    descripcion:
      "Consultas, vacunas y emergencias 24h con la agenda cerrándose sola por WhatsApp.",
    incluye: ["Web inmersiva", "Ficha de servicios", "Asistente WhatsApp"],
    demoUrl: "https://tryvex-vetcare.vercel.app",
    whatsappRef: "DEMO-VET",
    imagen: "/catalogo/veterinaria.jpg",
    publicada: true,
  },
];

export const demosPublicadas: Demo[] = demos.filter(
  (d) => d.publicada && d.demoUrl
);
