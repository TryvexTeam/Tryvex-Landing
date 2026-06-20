"use client";

/**
 * ExpandNav — Apple-style top nav with per-item expansion
 *
 * Based on CardNav (React Bits) pattern, adapted for Tryvex:
 * - Each nav item is a visible text button (not a hamburger trigger)
 * - Clicking one expands the nav bar downward with a GSAP tween
 * - Clicking another item swaps content without re-animating height
 * - Clicking the same item (or outside) collapses
 * - Mobile: hamburger triggers a full overlay (reuses existing .nav-mobile classes)
 *
 * Dependencies already in project: gsap@^3.15.0
 * No react-icons needed — uses inline SVGs.
 */

import {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import { gsap } from "gsap";

/* ─── Types ─────────────────────────────────────────────────── */

export type ExpandNavLink = {
  href: string;
  label: string;
};

export type ExpandNavItem = {
  /** Text shown in the top bar */
  label: string;
  /** Sub-links revealed when this item is active */
  links: ExpandNavLink[];
};

interface ExpandNavProps {
  items: ExpandNavItem[];
  /** Primary CTA destination (default: /contacto) */
  ctaHref?: string;
  /** Primary CTA label (default: Agendar) */
  ctaLabel?: string;
}

/* ─── Constants ─────────────────────────────────────────────── */

const COLLAPSED_H = 60;  // px — top bar height
const PANEL_PAD   = 32;  // px — panel top+bottom padding

/* ─── Component ─────────────────────────────────────────────── */

export default function ExpandNav({
  items,
  ctaHref  = "/contacto",
  ctaLabel = "Agendar",
}: ExpandNavProps) {
  const [activeIdx,  setActiveIdx]  = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef        = useRef<HTMLElement>(null);
  const panelRef      = useRef<HTMLDivElement>(null);
  const panelInnerRef = useRef<HTMLDivElement>(null);
  const isAnimRef     = useRef(false);

  /* Set initial collapsed state */
  useLayoutEffect(() => {
    if (navRef.current)   gsap.set(navRef.current,   { height: COLLAPSED_H });
    if (panelRef.current) gsap.set(panelRef.current, { opacity: 0, y: 12 });
  }, []);

  /* Click-outside → collapse */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        collapsePanel();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });

  /* Resize → close mobile menu */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 980) setMobileOpen(false); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Prevent body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ─── Animation helpers ───────────────────────────────────── */

  const getExpandedH = () => {
    const innerH = panelInnerRef.current?.scrollHeight ?? 180;
    return COLLAPSED_H + PANEL_PAD + innerH;
  };

  const expandPanel = useCallback(() => {
    if (isAnimRef.current) return;
    isAnimRef.current = true;
    const tl = gsap.timeline({ onComplete: () => { isAnimRef.current = false; } });
    tl.to(navRef.current,  { height: getExpandedH(), duration: 0.38, ease: "power3.out" });
    tl.fromTo(panelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0,  duration: 0.28, ease: "power2.out" },
      "-=0.15"
    );
  }, []);

  const collapsePanel = useCallback(() => {
    if (activeIdx === null || isAnimRef.current) return;
    isAnimRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => { setActiveIdx(null); isAnimRef.current = false; },
    });
    tl.to(panelRef.current, { opacity: 0, y: 8,          duration: 0.18, ease: "power2.in" });
    tl.to(navRef.current,   { height: COLLAPSED_H,       duration: 0.3,  ease: "power3.in" }, "-=0.05");
  }, [activeIdx]);

  const swapContent = useCallback((idx: number) => {
    setActiveIdx(idx);
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }
    );
    /* Re-measure height on next frame after new content renders */
    requestAnimationFrame(() => {
      gsap.to(navRef.current, { height: getExpandedH(), duration: 0.22, ease: "power2.out" });
    });
  }, []);

  /* ─── Click handler ───────────────────────────────────────── */

  const handleItemClick = useCallback((idx: number) => {
    if (activeIdx === idx) {
      collapsePanel();
    } else if (activeIdx !== null) {
      swapContent(idx);
    } else {
      setActiveIdx(idx);
      requestAnimationFrame(() => expandPanel());
    }
  }, [activeIdx, expandPanel, collapsePanel, swapContent]);

  const closeAll = useCallback(() => {
    collapsePanel();
    setMobileOpen(false);
  }, [collapsePanel]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const activeItem = activeIdx !== null ? items[activeIdx] : null;

  /* ─── Render ──────────────────────────────────────────────── */

  return (
    <>
      {/* ── Desktop floating pill nav ── */}
      <div className={`expand-shell${activeIdx !== null ? " expand-shell--open" : ""}`}>
        <nav
          ref={navRef}
          className={`expand-nav glass${activeIdx !== null ? " expand-nav--open" : ""}`}
        >
          {/* Top bar */}
          <div className="expand-top">
            {/* Logo */}
            <Link href="/" className="logo" onClick={closeAll}>
              <svg className="logo-mark"><use href="#spark" /></svg>
              <span className="logo-word">tryvex<span className="dot">.</span></span>
            </Link>

            {/* Desktop nav items — each is a clickable text button */}
            <div className="expand-items" role="menubar">
              {items.map((item, idx) => (
                <button
                  key={item.label}
                  role="menuitem"
                  className={`expand-item${activeIdx === idx ? " expand-item--active" : ""}`}
                  onClick={() => handleItemClick(idx)}
                  aria-expanded={activeIdx === idx}
                  aria-haspopup="true"
                  aria-controls="expand-panel"
                >
                  {item.label}
                  {/* Chevron rotates when active */}
                  <svg
                    className="expand-chevron"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>

            {/* Right: CTA + hamburger */}
            <div className="nav-cta">
              <Link href={ctaHref} className="btn-primary" onClick={closeAll}>
                {ctaLabel}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>

              <button
                className={`nav-hamburger${mobileOpen ? " open" : ""}`}
                onClick={() => setMobileOpen(v => !v)}
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileOpen}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* ── Expanded panel (desktop only) ── */}
          <div
            id="expand-panel"
            ref={panelRef}
            className="expand-panel"
            role="region"
            aria-label={activeItem?.label ?? "Navegación expandida"}
            aria-hidden={activeIdx === null}
          >
            <div ref={panelInnerRef} className="expand-panel-inner">
              {activeItem && (
                <>
                  <span className="expand-panel-section">{activeItem.label}</span>
                  <div className="expand-panel-links">
                    {activeItem.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="expand-panel-link"
                        onClick={closeAll}
                      >
                        {/* Diagonal arrow icon */}
                        <svg viewBox="0 0 12 12" fill="none" width="11" height="11" aria-hidden="true">
                          <path d="M2 2h8v8M2 10L10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* ── Mobile overlay (reuses existing .nav-mobile classes) ── */}
      <div
        className={`nav-mobile${mobileOpen ? " nav-mobile--open" : ""}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label="Menú de navegación"
      >
        <div className="nav-mobile__backdrop" onClick={closeMobile} aria-hidden="true" />

        <div className="nav-mobile__panel">
          <nav className="nav-mobile__links" aria-label="Navegación principal">
            {items.flatMap((item) =>
              item.links.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMobile}>
                  {link.label}
                </Link>
              ))
            )}
          </nav>

          <div className="nav-mobile__cta">
            <Link href={ctaHref} className="btn-primary" onClick={closeMobile}>
              {ctaLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
