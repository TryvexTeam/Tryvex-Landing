"use client";

import { useEffect } from "react";

/**
 * Revelado al entrar en pantalla para las páginas internas.
 *
 * El home lo resuelve dentro de `LandingClient`, que además monta las escenas
 * de GSAP y Anime.js del recorrido. Las páginas internas no necesitan ese peso
 * —no tienen escenas— pero sí quedaban completamente estáticas: el CSS de
 * `landing.css` deja los `[data-anim]` en opacity 0 esperando la clase `.in`
 * que nadie les ponía fuera de la portada.
 *
 * Esto es solo el observador: añade `.in` y se desconecta de cada elemento.
 * Respeta `prefers-reduced-motion` revelando todo de una.
 */
export default function RevelarAlScroll() {
  useEffect(() => {
    const objetivos = [
      ...document.querySelectorAll<HTMLElement>("[data-anim], [data-stagger]"),
    ];
    if (!objetivos.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      objetivos.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    objetivos.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
