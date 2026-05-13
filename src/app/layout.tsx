import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Toaster } from "sileo";
import "./globals.css";
import "../features/landing/landing.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
