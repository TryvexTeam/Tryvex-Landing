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