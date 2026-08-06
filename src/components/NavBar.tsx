"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import GooeyNav from "./GooeyNav";
import { scrollToSection } from "../lib/scroll-to-section";

/* Trazados del morph de la marca. Comparten estructura —cuatro segmentos
   cúbicos y los mismos anclajes— para que el navegador pueda interpolarlos
   punto por punto; con estructuras distintas el icono saltaría. */
const ESTRELLA =
  "M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z";
const CHEVRON =
  "M 84 8 C 58.7 22, 33.3 36, 8 50 C 33.3 64, 58.7 78, 84 92 C 74.7 78, 65.3 64, 56 50 C 65.3 36, 74.7 22, 84 8 Z";
const CHISPA =
  "M 82 14 C 83 19, 87 23, 92 24 C 87 25, 83 29, 82 34 C 81 29, 77 25, 72 24 C 77 23, 81 19, 82 14 Z";

export interface NavLink {
  href: string;
  label: string;
  /** Id de la sección equivalente en la página actual, para el scrollspy. */
  section?: string;
}

interface NavBarProps {
  /** Solo para casos puntuales; por defecto usa NAV_LINKS. */
  links?: NavLink[];
  /** Solo para casos puntuales; por defecto se deriva de la ruta actual. */
  ctaHref?: string;
  desktopCta?: ReactNode;
}

/**
 * Menú único para todo el sitio: cada ítem lleva siempre a su página.
 *
 * Antes había dos listas. En el home los ítems de sección eran anclas y solo
 * hacían scroll, así que /servicios y /proceso quedaban inalcanzables: había
 * que entrar primero a Catálogo o Equipo para que el menú cambiara y recién ahí
 * aparecían. Con una sola lista se llega a cualquier página desde cualquier
 * parte.
 *
 * `section` mantiene el subrayado siguiendo el recorrido del home: el clic va a
 * la página, pero mientras bajas por la portada se marca la sección visible.
 */
const NAV_LINKS: NavLink[] = [
  { href: "/servicios", label: "Servicios", section: "services"  },
  { href: "/catalogo",  label: "Catálogo",  section: "catalogo"  },
  { href: "/proceso",   label: "Proceso",   section: "process"   },
  { href: "/planes",    label: "Planes",    section: "offer"     },
  { href: "/preguntas", label: "Preguntas", section: "faq"       },
  { href: "/team",      label: "Equipo"                          },
];

export { NAV_LINKS };

export default function NavBar({ links, ctaHref, desktopCta }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = links ?? NAV_LINKS;
  const enInicio = pathname === "/";
  const [marcaActiva, setMarcaActiva] = useState(false);
  /* En el home el CTA baja a la sección de agenda; fuera de él va a /contacto. */
  const cta = ctaHref ?? (pathname === "/" ? "#final" : "/contacto");

  const close = useCallback(() => {
    document.body.style.overflow = "";
    setOpen(false);
  }, []);

  // Logo: scroll-to-top on home, navigate normally on inner pages
  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      close();
    },
    [pathname, close]
  );

  // CTA: manual smooth-scroll for hash hrefs (bypasses Next.js same-route limitation)
  const handleCTA = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (cta.startsWith("#")) {
        e.preventDefault();
        scrollToSection(cta.slice(1));
      }
      close();
    },
    [cta, close]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 980) setOpen(false); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /**
   * En las páginas internas el logo ES la vuelta al inicio: dice "inicio." en
   * vez de "tryvex." y su estrella se pliega en chevron al pasar por encima.
   * Antes había un enlace aparte flotando junto al nav — un segundo control
   * para algo que este ya hacía, y que además tapaba contenido al scrollear.
   */
  const marca = (
    <Link
      href="/"
      className={`logo${enInicio ? "" : " logo--volver"}${marcaActiva ? " logo--activa" : ""}`}
      onClick={handleLogoClick}
      aria-label={enInicio ? undefined : "Volver al inicio"}
      onMouseEnter={() => setMarcaActiva(true)}
      onMouseLeave={() => setMarcaActiva(false)}
      onFocus={() => setMarcaActiva(true)}
      onBlur={() => setMarcaActiva(false)}
    >
      {enInicio ? (
        <svg className="logo-mark"><use href="#spark" /></svg>
      ) : (
        <svg className="logo-mark" viewBox="0 0 100 100" aria-hidden="true">
          <path className="logo-figura" d={marcaActiva ? CHEVRON : ESTRELLA} />
          <path className="logo-chispa" d={CHISPA} />
        </svg>
      )}
      <span className="logo-word">
        {enInicio ? "tryvex" : "inicio"}
        <span className="dot">.</span>
      </span>
    </Link>
  );

  return (
    <>
      <div className={`nav-shell${scrolled ? " nav-scrolled" : ""}`}>
        <nav className="nav-pill">
          {marca}

          <div className="nav-gooey-wrap">
            <GooeyNav
              items={navLinks.map(l => ({ label: l.label, href: l.href, section: l.section }))}
              particleCount={12}
            />
          </div>

          <div className="nav-cta">
            {desktopCta}
            <Link href={cta} className="btn-primary" onClick={handleCTA}>
              Agendar
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <button
              className={`nav-hamburger${open ? " open" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="nav-mobile-menu"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      <div
        id="nav-mobile-menu"
        className={`nav-mobile${open ? " nav-mobile--open" : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Menú de navegación"
      >
        <div className="nav-mobile__backdrop" onClick={close} aria-hidden="true" />

        <div className="nav-mobile__panel">
          <div className="nav-mobile__header">
            {marca}
            <button className="nav-mobile__close" onClick={close} aria-label="Cerrar menú">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M6 18L18 6"/>
              </svg>
            </button>
          </div>

          <nav className="nav-mobile__links" aria-label="Navegación principal">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={close}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-mobile__cta">
            <Link href={cta} className="btn-primary" onClick={handleCTA}>
              Agendar llamada
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
