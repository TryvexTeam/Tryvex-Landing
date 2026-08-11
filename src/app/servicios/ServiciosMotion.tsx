"use client";

import { useEffect } from "react";

/**
 * Trae a /servicios el flip 3D de `.svc` que el home ya tenía — pero como
 * disparo único con duración fija, no como `scrub` (que ata el progreso 1:1
 * a la posición de scroll). El scrub original en el home recorre 60vh de
 * trigger, y eso se siente lento apenas se scrollea a ritmo normal: la
 * tarjeta queda medio girada varios segundos. Un `toggleActions` con
 * duración corta (~500ms, tope de lo que la propia guía de micro-
 * interacciones marca como "todavía se siente inmediato") resuelve apenas
 * la tarjeta entra en pantalla, sin importar qué tan rápido se scrollea.
 *
 * Encima se agrega tilt 3D al pasar el mouse — interacción nueva, no existía
 * en ninguna página. Solo en punteros finos (mouse real): en touch no hay
 * "hover" real y el tilt se sentiría pegado.
 */
export default function ServiciosMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let gsapCtx: { revert: () => void } | null = null;
    const tiltCleanups: (() => void)[] = [];

    if (!reduce) {
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([{ gsap }, { ScrollTrigger }]) => {
          gsap.registerPlugin(ScrollTrigger);

          gsapCtx = gsap.context(() => {
            gsap.utils.toArray<Element>(".svc").forEach((el, i) => {
              gsap.fromTo(
                el,
                { rotationX: -6, y: 10, transformPerspective: 1100, opacity: 0 },
                {
                  rotationX: 0, y: 0, opacity: 1,
                  duration: 0.2, ease: "power2.out", delay: (i % 3) * 0.03,
                  scrollTrigger: {
                    trigger: el, start: "top 98%",
                    toggleActions: "play none none reverse",
                    // Si el usuario scrollea rápido, GSAP salta directo al
                    // final en vez de dejar la animación corriendo a medias
                    // detrás del scroll — eso es lo que se leía como lag.
                    fastScrollEnd: true,
                  },
                }
              );
            });
          });

          // Tilt 3D al mover el mouse — solo puntero fino, no en touch.
          if (finePointer) {
            const cards = document.querySelectorAll<HTMLElement>(".svc");
            cards.forEach((card) => {
              const rotX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power2.out" });
              const rotY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power2.out" });

              const onMove = (e: MouseEvent) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                rotY(px * 8);
                rotX(py * -8);
              };
              const onLeave = () => {
                rotX(0);
                rotY(0);
              };

              gsap.set(card, { transformPerspective: 1200 });
              card.addEventListener("mousemove", onMove);
              card.addEventListener("mouseleave", onLeave);
              tiltCleanups.push(() => {
                card.removeEventListener("mousemove", onMove);
                card.removeEventListener("mouseleave", onLeave);
              });
            });
          }
        }
      );
    }

    return () => {
      gsapCtx?.revert();
      tiltCleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
