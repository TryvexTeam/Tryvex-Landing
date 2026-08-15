import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Toaster } from "sileo";
import SparkDefs from "../components/SparkDefs";
import ClarityScript from "../components/legal/ClarityScript";
import CookieBanner from "../components/legal/CookieBanner";
import CookiePreferences from "../components/legal/CookiePreferences";
import "./globals.css";
import "../features/landing/landing.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Geist Mono se precargaba en las 8 rutas (23,1 KB por visita) y no la pedía
   ni una regla: todo el CSS monoespaciado apunta a `--mono`, la pila del
   sistema. Nadie usa tampoco la utilidad `font-mono` de Tailwind. */

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      /* `ProfessionalService` en vez de `Organization` a secas: es un subtipo
         de `LocalBusiness`, así que declara a la vez qué hace la empresa y que
         atiende desde un lugar. `Organization` describe a cualquiera. */
      "@type": "ProfessionalService",
      "@id": "https://www.tryvex.tech/#organization",
      name: "Tryvex",
      /* El nombre choca con marcas mucho más grandes —Trivex, el polímero de
         lentes; Trovex; Trivox, otra agencia chilena—. `alternateName` y
         `sameAs` son lo que le permite a un buscador separar la entidad: sin
         perfiles enlazados, el nombre solo compite por parecido fonético. */
      alternateName: "Tryvex Studio",
      url: "https://www.tryvex.tech",
      description:
        "Estudio de IA y agencia de software en Santiago de Chile. Automatizaciones, landing pages, productos SaaS e IA aplicada para empresas que quieren escalar.",
      slogan: "Hacemos el software. Tú vendes lo importante.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressRegion: "Región Metropolitana",
        addressCountry: "CL",
      },
      email: "contacto@tryvex.tech",
      telephone: "+56950358818",
      areaServed: { "@type": "Country", name: "Chile" },
      knowsAbout: [
        "Inteligencia artificial aplicada",
        "Agentes de IA",
        "Automatización de procesos",
        "Desarrollo de software a medida",
        "Facturación electrónica SII",
        "Integración de sistemas",
      ],
      /* ⚠️ `sameAs` va vacío A PROPÓSITO, y es lo que más falta acá.
         Es el campo que le dice a un buscador "estos perfiles y esta web son
         la misma entidad", y sin él el nombre compite a ciegas contra marcas
         más grandes: Trivex (polímero de lentes), Trivox (otra agencia
         chilena), Trovex.ai — y sobre todo **otra empresa llamada Tryvex** en
         Brisbane, `tryvex.au`, que ya ocupa `linkedin.com/company/tryvex`.

         Por eso cada URL que se agregue tiene que comprobarse una por una:
         apuntar al perfil equivocado no deja la entidad sin unir, la une con
         la empresa incorrecta. Al crear los perfiles propios —LinkedIn con la
         URL disponible, Instagram, Google Business Profile— se listan acá. */
      foundingDate: "2024",
      dateModified: "2026-08-15",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.tryvex.tech/#website",
      url: "https://www.tryvex.tech",
      name: "Tryvex — Estudio de IA y Agencia de Software",
      publisher: { "@id": "https://www.tryvex.tech/#organization" },
      dateModified: "2026-05-12",
    },
  ],
};

/**
 * El sitio es de tema claro y punto.
 *
 * No lo declaraba en ninguna parte, y cuando una página se calla, los
 * navegadores con oscurecido automático se toman la libertad de invertirla.
 * En un iPhone con el sistema en oscuro la landing se veía negra con el texto
 * en claro: el crema #f4f1ea convertido en casi negro, los rojos sobreviviendo
 * porque el algoritmo respeta los matices. Nada de eso es diseño nuestro.
 *
 * `colorScheme: "light"` es la señal de "esta página ya resolvió sus colores,
 * no la toques". `themeColor` va con el mismo crema del papel para que la barra
 * del navegador acompañe en vez de cortar con una franja blanca o negra.
 */
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4f1ea",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tryvex.tech"),
  /* "en Chile" es deliberado: la búsqueda que trae clientes nuevos es
     "agencia de IA en Chile", y el título no traía el país por ninguna parte
     —solo "Santiago", y solo en la descripción—. */
  title: "Tryvex — Estudio de IA y Agencia de Software en Chile",
  description:
    "Estudio de IA y agencia de software en Santiago de Chile. Automatizaciones, agentes de IA, landing pages y productos SaaS a medida, con precio y plazo cerrados.",
  verification: {
    google: "ac6f38d815a767b0",
  },
  alternates: {
    canonical: "https://www.tryvex.tech",
  },
  /* Sin bloque `icons`. Apuntaba a `/logo-email-dark.png`, que es el logotipo
     completo con la palabra: a 16px en la pestaña queda como una mancha, y el
     navegador podía elegirlo por encima del ícono bueno. Ahora los tres los
     resuelven las convenciones de archivo —`favicon.ico`, `icon.tsx` y
     `apple-icon.tsx`—, todos con la estrella y en su tamaño correcto. */
  openGraph: {
    title: "Tryvex — Estudio de IA y Agencia de Software",
    description: "Estudio de IA y agencia de software en Santiago. Human-first, AI-powered.",
    locale: "es_CL",
    type: "website",
    url: "https://www.tryvex.tech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Primer elemento enfocable del documento. Sin él, llegar al contenido
            con teclado costaba pasar por la marca, los seis ítems del menú y el
            CTA, en cada una de las ocho rutas. Solo se ve al recibir foco. */}
        <a href="#contenido" className="salto-al-contenido">
          Saltar al contenido
        </a>
        {/* Antes de los hijos: los `<use href="#spark">` del NavBar y de los
            footers necesitan el símbolo ya definido en el documento. */}
        <SparkDefs />
        {children}
        <Toaster position="bottom-right" theme="dark" />
        {/* Clarity ya no se inyecta acá. Graba sesión y mapas de calor, así que
            es perfilamiento y no una cookie técnica: la Ley 21.719 exige
            consentimiento previo y expreso antes de cargarlo. `ClarityScript`
            solo lo monta cuando la categoría de análisis quedó aceptada. */}
        <CookieBanner />
        <CookiePreferences />
        <ClarityScript />
      </body>
    </html>
  );
}
