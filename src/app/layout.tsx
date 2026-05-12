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

export const metadata: Metadata = {
  title: "Tryvex — Automatización e Innovación Digital",
  description:
    "Agencia de software en Santiago. Automatizaciones, landing pages y productos SaaS para empresas que quieren escalar.",
  openGraph: {
    title: "Tryvex — Automatización e Innovación Digital",
    description: "Agencia de software en Santiago.",
    locale: "es_CL",
    type: "website",
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
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
