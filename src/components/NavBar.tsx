"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import GooeyNav from "./GooeyNav";

export interface NavLink {
  href: string;
  label: string;
}

interface NavBarProps {
  links: NavLink[];
  ctaHref: string;
  desktopCta?: ReactNode;
}

const INNER_LINKS: NavLink[] = [
  { href: "/servicios", label: "Servicios" },
  { href: "/proceso",   label: "Proceso"   },
  { href: "/#offer",    label: "Planes"    },
  { href: "/#faq",      label: "Preguntas" },
  { href: "/team",      label: "Equipo"    },
];

export { INNER_LINKS };

export default function NavBar({ links, ctaHref, desktopCta }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
      if (ctaHref.startsWith("#")) {
        e.preventDefault();
        const id = ctaHref.slice(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      }
      close();
    },
    [ctaHref, close]
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

  return (
    <>
      <div className={`nav-shell${scrolled ? " nav-scrolled" : ""}`}>
        <nav className="nav-pill">
          <Link href="/" className="logo" onClick={handleLogoClick}>
            <svg className="logo-mark"><use href="#spark" /></svg>
            <span className="logo-word">tryvex<span className="dot">.</span></span>
          </Link>

          <div className="nav-gooey-wrap">
            <GooeyNav
              items={links.map(l => ({ label: l.label, href: l.href }))}
              animationTime={600}
              particleCount={12}
              initialActiveIndex={-1}
            />
          </div>

          <div className="nav-cta">
            {desktopCta}
            <Link href={ctaHref} className="btn-primary" onClick={handleCTA}>
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
            <Link href="/" className="logo" onClick={handleLogoClick}>
              <svg className="logo-mark"><use href="#spark" /></svg>
              <span className="logo-word">tryvex<span className="dot">.</span></span>
            </Link>
            <button className="nav-mobile__close" onClick={close} aria-label="Cerrar menú">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M6 18L18 6"/>
              </svg>
            </button>
          </div>

          <nav className="nav-mobile__links" aria-label="Navegación principal">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={close}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-mobile__cta">
            <Link href={ctaHref} className="btn-primary" onClick={handleCTA}>
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
