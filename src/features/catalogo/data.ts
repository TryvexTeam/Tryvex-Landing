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

/** Tipos de proyecto para el filtro del catálogo. Un proyecto puede tener más de uno. */
export type TipoProyecto = "Automatización" | "SaaS" | "IA" | "Fintech";

export const TIPOS_PROYECTO: TipoProyecto[] = [
  "Automatización",
  "SaaS",
  "IA",
  "Fintech",
];

export interface Demo {
  /** Slug estable — se usa en la referencia del bot y en analítica. */
  id: string;
  /** Nombre del rubro tal como lo lee el dueño del negocio. */
  nicho: string;
  /** Etiqueta corta de categoría que se muestra sobre la imagen. */
  categoria: string;
  /** Tipos de proyecto para el filtro (Automatización, SaaS, IA, Fintech...). */
  tipo: TipoProyecto[];
  /** Una línea sobre qué automatiza esta demo. Lenguaje del dueño, sin jerga. */
  descripcion: string;
  /** Qué incluye la entrega — micro-etiquetas de la tarjeta. */
  incluye: string[];
  /** URL pública de la demo (app de Lovable u otro hosting). */
  demoUrl: string;
  /** Palabra clave que abre el flujo demo de este nicho en el bot.
   *  Solo aplica a demos con asistente WhatsApp — si no hay, la tarjeta usa
   *  `ctaUrl`/`ctaLabel` como acción principal en su lugar. */
  whatsappRef?: string;
  /** Texto del CTA cuando no hay `whatsappRef` (ej. "Ver proyecto"). */
  ctaLabel?: string;
  /** URL del CTA cuando no hay `whatsappRef`. Si falta, usa `demoUrl`. */
  ctaUrl?: string;
  /** Captura de la portada del sitio, a ancho completo, en /public/catalogo/.
   *  Sin ella se dibuja una portada de marca con la categoría. */
  imagen?: string;
  /** Proporción real de `imagen` (CSS aspect-ratio). Cada tarjeta respeta la
   *  suya — mezclar capturas panorámicas de sitio con mockups 16:9 en un
   *  único ratio forzado recorta mal a uno de los dos grupos. */
  ratio?: string;
  /** Solo las publicadas se muestran. */
  publicada: boolean;
}

export const demos: Demo[] = [
  {
    id: "restaurante",
    nicho: "Restaurante de autor",
    categoria: "Gastronomía",
    tipo: ["Automatización"],
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
    tipo: ["Automatización"],
    descripcion:
      "El inventario a la vista las 24 horas, con la ficha de cada auto y las consultas llegando por WhatsApp.",
    incluye: ["Web inmersiva", "Vitrina 24/7", "Asistente WhatsApp"],
    demoUrl: "https://concesionaria-parallax.vercel.app",
    whatsappRef: "DEMO-AUTOS",
    imagen: "/catalogo/concesionaria.jpg",
    ratio: "1800 / 650",
    publicada: true,
  },
  {
    id: "rutago",
    nicho: "RutaGo",
    categoria: "Viajes y mapas",
    tipo: ["SaaS", "IA"],
    descripcion:
      "Descubrimiento de negocios locales con mapa 3D, chatbot con IA y planificación de rutas completa.",
    incluye: ["Next.js", "Django", "Mapbox", "Gemini"],
    demoUrl: "https://rutago-nine.vercel.app",
    ctaLabel: "Ver proyecto",
    imagen: "/catalogo/rutago.png",
    ratio: "16 / 9",
    publicada: true,
  },
  {
    id: "vistcontrol",
    nicho: "VistControl",
    categoria: "Gestión corporativa",
    tipo: ["SaaS", "Automatización"],
    descripcion:
      "Registro de visitas corporativo con dashboard en tiempo real, validación de RUT chileno y reportes automáticos.",
    incluye: ["Django", "Astro", "React", "JWT"],
    demoUrl: "https://vistcontrol.up.railway.app",
    ctaLabel: "Ver proyecto",
    imagen: "/catalogo/vistcontrol.png",
    ratio: "16 / 9",
    publicada: true,
  },

  // ── Casos propios: software construido por el equipo antes de Tryvex ──
  {
    id: "digital-closet",
    nicho: "Digital Closet AI",
    categoria: "Moda + IA",
    tipo: ["IA", "SaaS"],
    descripcion:
      "Analiza fotos de ropa y genera outfits personalizados según clima y ocasión, con modelo de visión propio.",
    incluye: ["GPT-4 Vision", "Angular", "Node.js", "MongoDB"],
    demoUrl: "https://digital-closet-kappa.vercel.app",
    ctaLabel: "Ver proyecto",
    imagen: "/catalogo/digital-closet.png",
    ratio: "16 / 9",
    publicada: true,
  },
  {
    id: "perrustingo",
    nicho: "Perrustingo",
    categoria: "Peluquería canina",
    tipo: ["SaaS", "Automatización"],
    descripcion:
      "Peluquería canina en Renca con agenda propia, panel de equipo, cupones y recordatorios automáticos por correo.",
    incluye: ["Next.js", "Supabase", "Panel de equipo", "Cupones"],
    demoUrl: "https://perrustingo.com",
    ctaLabel: "Ver proyecto",
    imagen: "/catalogo/perrustingo.jpg",
    ratio: "1919 / 1831",
    publicada: true,
  },
  {
    id: "estetica",
    nicho: "Centro de estética y spa",
    categoria: "Belleza y bienestar",
    tipo: ["Automatización"],
    descripcion:
      "Servicios y horas disponibles siempre a la vista, con las reservas cerrándose por WhatsApp.",
    incluye: ["Web inmersiva", "Galería de servicios", "Asistente WhatsApp"],
    demoUrl: "https://demo-centro-estetica-tryvex.vercel.app",
    whatsappRef: "DEMO-ESTETICA",
    imagen: "/catalogo/estetica.jpg",
    ratio: "867 / 962",
    publicada: true,
  },
  {
    id: "inmobiliaria",
    nicho: "Inmobiliaria de lujo",
    categoria: "Bienes raíces",
    tipo: ["Automatización"],
    descripcion:
      "Cada propiedad con su ficha, fotos y superficie al detalle, agendando visitas solas por WhatsApp.",
    incluye: ["Web inmersiva", "Fichas de propiedad", "Asistente WhatsApp"],
    demoUrl: "https://inmobiliaria-landing-demo.vercel.app",
    whatsappRef: "DEMO-INMO",
    imagen: "/catalogo/inmobiliaria.jpg",
    ratio: "865 / 864",
    publicada: true,
  },
  {
    id: "nuam",
    nicho: "Contenedor Tributario NUAM",
    categoria: "Fintech",
    tipo: ["Fintech", "SaaS"],
    descripcion:
      "Sistema de gestión tributaria multinacional con dashboard en tiempo real para 15 países y control por roles.",
    incluye: ["Next.js", "PostgreSQL", "Prisma", "RBAC"],
    demoUrl: "https://reponedor-nuam.vercel.app/dashboard",
    ctaLabel: "Ver proyecto",
    imagen: "/catalogo/nuam.png",
    ratio: "16 / 9",
    publicada: true,
  },
  {
    id: "veterinaria",
    nicho: "Clínica veterinaria",
    categoria: "Salud y mascotas",
    tipo: ["Automatización"],
    descripcion:
      "Consultas, vacunas y emergencias 24h con la agenda cerrándose sola por WhatsApp.",
    incluye: ["Web inmersiva", "Ficha de servicios", "Asistente WhatsApp"],
    demoUrl: "https://tryvex-vetcare.vercel.app",
    whatsappRef: "DEMO-VET",
    imagen: "/catalogo/veterinaria.jpg",
    publicada: true,
  },
  {
    id: "agencia-ia",
    nicho: "Agencia o startup de IA",
    categoria: "Tecnología e IA",
    tipo: ["IA"],
    descripcion:
      "Landing de una sola pantalla con video de fondo, métricas en vivo y confianza empresarial, pensada para agencias y startups de IA.",
    incluye: ["Video hero full-bleed", "Tipografía dot-matrix", "Métricas animadas"],
    demoUrl: "https://tryvex-video-landing.vercel.app",
    ctaLabel: "Ver proyecto",
    imagen: "/catalogo/agencia-ia.webp",
    ratio: "1366 / 577",
    publicada: true,
  },
  {
    id: "agencia-ia-cinematica",
    nicho: "Agencia o startup de IA",
    categoria: "Tecnología e IA",
    tipo: ["IA"],
    descripcion:
      "Recorrido cinematográfico con scroll y paralaje al estilo travel story, con slider de servicios y datos de la agencia — una portada memorable para agencias y startups de IA.",
    incluye: ["Scroll cinematográfico", "Parallax con el mouse", "Slider de servicios"],
    demoUrl: "https://tryvex-cinematic-scroll.vercel.app",
    ctaLabel: "Ver proyecto",
    imagen: "/catalogo/agencia-ia-cinematica.webp",
    ratio: "1600 / 676",
    publicada: true,
  },
  {
    id: "belleza",
    nicho: "Salón de belleza",
    categoria: "Belleza y bienestar",
    tipo: ["Automatización"],
    descripcion:
      "Un recorrido con scroll por cada espacio del salón — corte, color, spa capilar, nails y pedicura — con precios reales y reserva directa por WhatsApp.",
    incluye: ["Web inmersiva", "Recorrido con scroll", "Asistente WhatsApp"],
    demoUrl: "https://tryvex-demo-belleza.vercel.app",
    whatsappRef: "DEMO-BELLEZA",
    imagen: "/catalogo/belleza.jpg",
    publicada: true,
  },
  {
    id: "cafeteria",
    nicho: "Cafetería y pastelería artesanal",
    categoria: "Gastronomía",
    tipo: ["Automatización"],
    descripcion:
      "Vitrina de tortas y pastelería para bodas y eventos, con cotizaciones cerrándose por WhatsApp.",
    incluye: ["Web inmersiva", "Formulario de cotización", "Asistente WhatsApp"],
    demoUrl: "https://tryvex-demo-cafeteria.vercel.app",
    whatsappRef: "DEMO-CAFE",
    imagen: "/catalogo/cafeteria.jpg",
    ratio: "1280 / 800",
    publicada: true,
  },
];

export const demosPublicadas: Demo[] = demos.filter(
  (d) => d.publicada && d.demoUrl
);
