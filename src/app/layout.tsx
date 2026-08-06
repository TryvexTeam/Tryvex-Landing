import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sileo";
import SparkDefs from "../components/SparkDefs";
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
      "@type": "Organization",
      "@id": "https://www.tryvex.tech/#organization",
      name: "Tryvex",
      url: "https://www.tryvex.tech",
      description:
        "Agencia de software en Santiago. Automatizaciones, landing pages y productos SaaS para empresas que quieren escalar.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressRegion: "Región Metropolitana",
        addressCountry: "CL",
      },
      email: "tryvexentreprise@gmail.com",
      areaServed: "CL",
      foundingDate: "2024",
      dateModified: "2026-05-12",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.tryvex.tech/#website",
      url: "https://www.tryvex.tech",
      name: "Tryvex — Automatización e Innovación Digital",
      publisher: { "@id": "https://www.tryvex.tech/#organization" },
      dateModified: "2026-05-12",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tryvex.tech"),
  title: "Tryvex — Automatización e Innovación Digital",
  description:
    "Agencia de software en Santiago. Automatizaciones, landing pages y productos SaaS para empresas que quieren escalar.",
  verification: {
    google: "ac6f38d815a767b0",
  },
  alternates: {
    canonical: "https://www.tryvex.tech",
  },
  icons: {
    icon: [{ url: "/logo-email-dark.png", type: "image/png" }],
    apple: "/logo-email-dark.png",
  },
  openGraph: {
    title: "Tryvex — Automatización e Innovación Digital",
    description: "Agencia de software en Santiago.",
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
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","wst2su25gg");`,
          }}
        />
      </body>
    </html>
  );
}
