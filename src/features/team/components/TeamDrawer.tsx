"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { Member } from "../data/members";

const MEMBERS_WITH_PHOTO = new Set(["ignacio-navarrete", "fabian-melivilu", "vicente-garcia", "joseph-mailens"]);

interface TeamDrawerProps {
  member: Member | null;
  onClose: () => void;
}

export default function TeamDrawer({ member, onClose }: TeamDrawerProps) {
  const isOpen = member !== null;

  const panelRef     = useRef<HTMLDivElement>(null);
  const layer1Ref    = useRef<HTMLDivElement>(null);
  const layer2Ref    = useRef<HTMLDivElement>(null);
  const closeRef     = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tlRef = useRef<any>(null);

  const playOpen = useCallback(async () => {
    const { gsap } = await import("gsap");
    const panel = panelRef.current;
    const l1    = layer1Ref.current;
    const l2    = layer2Ref.current;
    if (!panel || !l1 || !l2) return;

    tlRef.current?.kill();
    gsap.set([l1, l2, panel], { x: 0 });

    const staggerEls = Array.from(panel.querySelectorAll<HTMLElement>("[data-stagger]"));
    if (staggerEls.length) gsap.set(staggerEls, { y: 20, opacity: 0 });

    const tl = gsap.timeline();
    tl.fromTo(l1, { xPercent: 100 }, { xPercent: 0, duration: 0.42, ease: "power4.out" }, 0);
    tl.fromTo(l2, { xPercent: 100 }, { xPercent: 0, duration: 0.42, ease: "power4.out" }, 0.07);
    tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.55, ease: "power4.out" }, 0.14);
    if (staggerEls.length) {
      tl.to(
        staggerEls,
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: { each: 0.08 } },
        0.36
      );
    }

    tlRef.current = tl;
  }, []);

  const playClose = useCallback(async () => {
    const { gsap } = await import("gsap");
    const panel = panelRef.current;
    const l1    = layer1Ref.current;
    const l2    = layer2Ref.current;
    if (!panel || !l1 || !l2) return;

    tlRef.current?.kill();
    gsap.set([l2, l1, panel], { x: 0 });
    tlRef.current = gsap.to([l2, l1, panel], {
      xPercent: 100,
      duration: 0.28,
      ease: "power3.in",
      stagger: 0.04,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
      document.body.style.overflow = "hidden";
      playOpen();
      const t = setTimeout(() => closeRef.current?.focus(), 300);
      return () => clearTimeout(t);
    } else if (hasOpenedRef.current) {
      document.body.style.overflow = "";
      playClose();
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, member, playOpen, playClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const closeIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );

  const hasPhoto = member ? MEMBERS_WITH_PHOTO.has(member.id) : false;

  return (
    <div
      className={`team-drawer${isOpen ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-member-name"
      aria-hidden={!isOpen}
    >
      {/* Backdrop — sin blur */}
      <div className="team-drawer__backdrop" onClick={onClose} aria-hidden="true" />

      {/* Stagger prelayers */}
      <div ref={layer1Ref} className="team-drawer__prelayer team-drawer__prelayer--1" aria-hidden="true" />
      <div ref={layer2Ref} className="team-drawer__prelayer team-drawer__prelayer--2" aria-hidden="true" />

      {/* Mobile floating X */}
      <button
        className="team-drawer__close-btn--mobile"
        onClick={onClose}
        aria-label="Cerrar perfil"
        tabIndex={isOpen ? 0 : -1}
      >
        {closeIcon}
      </button>

      {/* Main panel */}
      <div className="team-drawer__panel" ref={panelRef}>
        {/* Botón cerrar — esquina superior izquierda como la referencia */}
        <div className="team-drawer__close">
          <button
            ref={closeRef}
            className="team-drawer__close-btn"
            onClick={onClose}
            aria-label="Cerrar perfil"
          >
            {closeIcon}
          </button>
        </div>

        {member && (
          <div className="team-drawer__content">
            {/* Header: nombre + thumbnail */}
            <div data-stagger className="team-drawer__header">
              <div className="team-drawer__header-text">
                <p className="team-drawer__role">{member.role}</p>
                <h2 className="team-drawer__name" id="drawer-member-name">
                  {member.name}
                </h2>
              </div>

              {hasPhoto && (
                <div className="team-drawer__thumb-wrap">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="team-drawer__thumb"
                  />
                </div>
              )}
            </div>

            {/* LinkedIn como texto link simple */}
            {member.linkedin && (
              <div data-stagger className="team-drawer__link-row">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-drawer__linkedin"
                >
                  ↗ LinkedIn
                </a>
              </div>
            )}

            <div data-stagger className="team-drawer__divider" />

            {/* Bio */}
            {member.bio && (
              <p data-stagger className="team-drawer__bio">{member.bio}</p>
            )}

            {/* Portafolio (si existe, como enlace secundario) */}
            {member.portfolio && (
              <div data-stagger className="team-drawer__links">
                <a
                  href={member.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ fontSize: "13px", padding: "10px 18px" }}
                >
                  Portafolio
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
