import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.tryvex.tech",
      lastModified: new Date("2026-05-12"),
      changeFrequency: "monthly",
      priority: 1,
    },
    /* Páginas de captación: la puerta de entrada de quien busca "agencia de
       IA" o "agencia de software" y todavía no conoce la marca. Fecha literal,
       nunca `new Date()` — un lastmod que cambia en cada build hace que Google
       ignore la señal de todo el archivo. */
    {
      url: "https://www.tryvex.tech/agencia-de-ia-en-chile",
      lastModified: new Date("2026-08-15"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.tryvex.tech/agencia-de-software-en-chile",
      lastModified: new Date("2026-08-15"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    /* Un nivel más abajo que las dos de arriba: aquellas responden por
       categoría —"agencia de IA en Chile"—, estas por el dolor concreto que
       trae a alguien a buscar. La consulta específica tiene menos volumen pero
       mucha más intención, y hoy la contesta la competencia. Prioridad 0.8:
       bajo las de categoría, sobre las institucionales. */
    {
      url: "https://www.tryvex.tech/automatizar-facturacion-sii",
      lastModified: new Date("2026-08-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.tryvex.tech/agente-de-whatsapp-para-empresas",
      lastModified: new Date("2026-08-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.tryvex.tech/procesar-facturas-y-contratos-con-ia",
      lastModified: new Date("2026-08-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.tryvex.tech/ia-en-tu-propio-servidor",
      lastModified: new Date("2026-08-16"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      /* Fuera del menú a propósito: se llega por la URL directa desde la bio de
         las redes. Sigue en el sitemap porque estar oculta del nav no es lo
         mismo que estar oculta de Google. Prioridad baja: no compite con la
         home por la consulta de marca, solo debe existir. */
      url: "https://www.tryvex.tech/links",
      lastModified: new Date("2026-08-19"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://www.tryvex.tech/catalogo",
      lastModified: new Date("2026-08-03"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.tryvex.tech/servicios",
      lastModified: new Date("2026-05-12"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.tryvex.tech/proceso",
      lastModified: new Date("2026-05-12"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.tryvex.tech/planes",
      lastModified: new Date("2026-08-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.tryvex.tech/preguntas",
      lastModified: new Date("2026-08-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.tryvex.tech/contacto",
      lastModified: new Date("2026-05-12"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.tryvex.tech/team",
      // Fecha fija, como el resto: con `new Date()` el valor cambiaba en cada
      // build sin que la página hubiera cambiado, y Google termina ignorando el
      // `lastmod` de todo el archivo cuando detecta que no es de fiar.
      // Al editar /team hay que subir esta fecha a mano.
      lastModified: new Date("2026-08-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Prioridad baja porque no compiten por tráfico, pero indexadas a propósito:
    // que las páginas legales sean rastreables es señal de confianza para Google
    // y es lo primero que revisa un cliente corporativo antes de contratar.
    {
      url: "https://www.tryvex.tech/privacidad",
      lastModified: new Date("2026-08-10"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.tryvex.tech/terminos",
      lastModified: new Date("2026-08-10"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}