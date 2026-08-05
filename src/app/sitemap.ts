import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.tryvex.tech",
      lastModified: new Date("2026-05-12"),
      changeFrequency: "monthly",
      priority: 1,
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
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}