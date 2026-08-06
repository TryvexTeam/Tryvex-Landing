"use client";

import { useEffect } from "react";
import { scrollToSection } from "../../../lib/scroll-to-section";

export default function LandingClient() {
  useEffect(() => {
    /**
     * Preferencia real del sistema. Estaba fijada en `false` con el comentario
     * "landing animations always run", pero toda la maquinaria para respetarla
     * ya estaba escrita: esta bandera gobierna el bloque completo de GSAP y
     * Anime (más abajo) y la lista de elementos que el IntersectionObserver
     * deja pasar. Con la preferencia activa no se construye ninguna escena de
     * scroll, y el observer se encarga de revelar todo el contenido de una vez
     * — nada queda invisible.
     */
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ── 1. Word-split big headings ──────────────────────────────── */
    document.querySelectorAll('[data-split="words"]').forEach((el) => {
      const walk = (node: Node): Node[] => {
        const out: Node[] = [];
        node.childNodes.forEach((child) => {
          if (child.nodeType === 3) {
            const words = (child.textContent || "").split(/(\s+)/);
            words.forEach((w) => {
              if (!w) return;
              if (/^\s+$/.test(w)) {
                out.push(document.createTextNode(w));
                return;
              }
              const wrap = document.createElement("span");
              wrap.className = "split-word";
              const inner = document.createElement("span");
              inner.textContent = w;
              wrap.appendChild(inner);
              out.push(wrap);
            });
          } else if (child.nodeType === 1) {
            const clone = (child as Element).cloneNode(false);
            const inner = walk(child);
            if (inner.length) inner.forEach((n) => clone.appendChild(n));
            out.push(clone);
          }
        });
        return out;
      };
      const replaced = walk(el);
      el.innerHTML = "";
      replaced.forEach((n) => el.appendChild(n));
    });

    /* ── 2. Intersection observer reveals ───────────────────────── */
    const gsapStaggerClasses = ["services", "process", "offer"];
    const gsapAnimClasses = ["quote-card"];
    // Anime.js controla estos — se saltan el observer
    const animeSelectors = [".metrics-block", ".final", ".final-spark"];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            entry.target
              .querySelectorAll(".split-word")
              .forEach((s) => s.classList.add("in"));
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    document
      .querySelectorAll('[data-anim], [data-stagger], [data-split="words"]')
      .forEach((el) => {
        if (!reduce) {
          if (
            el.hasAttribute("data-stagger") &&
            gsapStaggerClasses.some((c) => el.classList.contains(c))
          )
            return;
          if (
            el.hasAttribute("data-anim") &&
            gsapAnimClasses.some((c) => el.classList.contains(c))
          )
            return;
          if (animeSelectors.some((sel) => el.matches(sel))) return;
        }
        io.observe(el);
      });

    document.querySelectorAll('[data-split="words"]').forEach((h) => {
      if (h.classList.contains("in"))
        h.querySelectorAll(".split-word").forEach((s) =>
          s.classList.add("in")
        );
    });

    /* ── 3. Hero flow steps cycling ─────────────────────────────── */
    const steps = document.querySelectorAll(".hv-step");
    let stepInterval: ReturnType<typeof setInterval> | null = null;
    if (steps.length) {
      let i = 2;
      stepInterval = setInterval(() => {
        steps.forEach((s) => s.classList.remove("active"));
        i = (i + 1) % steps.length;
        steps[i].classList.add("active");
      }, 2200);
    }

    /* ── 4. Magnetic CTA hover ───────────────────────────────────── */
    const btns = document.querySelectorAll(".btn-primary");
    const handlers = new Map<
      Element,
      { move: EventListener; leave: EventListener }
    >();
    btns.forEach((btn) => {
      const move = ((e: MouseEvent) => {
        const r = (btn as HTMLElement).getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        (btn as HTMLElement).style.transform = `translate(${x * 0.18}px, ${
          y * 0.25
        }px)`;
      }) as EventListener;
      const leave = (() => {
        (btn as HTMLElement).style.transform = "";
      }) as EventListener;
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      handlers.set(btn, { move, leave });
    });

    /* ── 5. Scroll progress bar ──────────────────────────────────── */
    const progress = document.querySelector(
      ".scroll-progress"
    ) as HTMLElement | null;
    let pTicking = false;
    const updateProgress = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      // Razón 0–1 sin unidad: el CSS la consume como `scaleX(var(--sp))`.
      // Antes salía en porcentaje porque la barra animaba su `width`.
      progress?.style.setProperty(
        "--sp",
        Math.min(1, window.scrollY / (max || 1)).toFixed(4)
      );
      pTicking = false;
    };
    const onScrollP = () => {
      if (!pTicking) {
        requestAnimationFrame(updateProgress);
        pTicking = true;
      }
    };
    window.addEventListener("scroll", onScrollP, { passive: true });
    updateProgress();

    /* ── 6. GSAP ScrollTrigger + Anime.js scroll scenes ─────────── */
    let gsapCtx: { revert: () => void } | null = null;
    let animeCleanup: (() => void) | null = null;
    let checkCounterProgress: (() => void) | null = null;

    if (!reduce) {

      // GSAP — hero parallax, blobs, services, process, quote-card, plans
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([{ gsap }, { ScrollTrigger }]) => {
          gsap.registerPlugin(ScrollTrigger);

          document.querySelectorAll(".svc, .step, .plan").forEach((el) => {
            (el as HTMLElement).style.transition = "none";
          });

          gsapCtx = gsap.context(() => {
            const heroST = {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            };

            gsap.to(".hero-visual", {
              y: -140,
              rotation: -4,
              scale: 0.94,
              ease: "none",
              scrollTrigger: heroST,
            });
            gsap.to(".fc-1", {
              y: -230,
              x: 60,
              rotation: -20,
              scale: 0.8,
              ease: "none",
              scrollTrigger: { ...heroST, scrub: 1.4 },
            });
            gsap.to(".fc-2", {
              y: 190,
              x: -50,
              rotation: 16,
              scale: 0.82,
              ease: "none",
              scrollTrigger: { ...heroST, scrub: 1.4 },
            });
            gsap.to(".hero-col h1", {
              y: -55,
              ease: "none",
              scrollTrigger: { ...heroST, scrub: 0.7 },
            });
            gsap.to(".hero-col .eyebrow", {
              y: -35,
              ease: "none",
              scrollTrigger: { ...heroST, scrub: 0.5 },
            });
            gsap.to(".hero-col .lede, .hero-col .hero-cta", {
              y: -22,
              ease: "none",
              scrollTrigger: { ...heroST, scrub: 0.4 },
            });

            // Scene A — spark pieces scatter as hero scrolls out
            const scatterData = [
              { sel: ".sa-p1", x: -110, y: -200, r: -52, s: 0.2 },
              { sel: ".sa-p2", x:  140, y: -170, r:  38, s: 0.15 },
              { sel: ".sa-p3", x:  100, y:  210, r: -65, s: 0.18 },
              { sel: ".sa-p4", x:  180, y:  140, r:  55, s: 0.12 },
              { sel: ".sa-p5", x:  -80, y: -110, r:  90, s: 0.25 },
              { sel: ".sa-p6", x: -130, y:   70, r: -35, s: 0.30 },
            ];
            scatterData.forEach(({ sel, x, y, r, s }, i) => {
              gsap.to(sel, {
                x, y, rotation: r, scale: s, opacity: 0, ease: "none",
                scrollTrigger: { ...heroST, scrub: 1.6 + i * 0.18 },
              });
            });

            const blobST = {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: 4,
            };
            gsap.to(".ambient .b1", {
              y: -480, x: 90, ease: "none", scrollTrigger: blobST,
            });
            gsap.to(".ambient .b2", {
              y: 360, x: -60, ease: "none", scrollTrigger: blobST,
            });
            gsap.to(".ambient .b3", {
              y: -520, x: 80, ease: "none", scrollTrigger: blobST,
            });

            gsap.utils.toArray<Element>(".svc").forEach((el, i) => {
              gsap.fromTo(
                el,
                { rotationX: -24, y: 70, transformPerspective: 1100, opacity: 0 },
                {
                  rotationX: 0, y: 0, opacity: 1, ease: "none",
                  scrollTrigger: {
                    trigger: el, start: "top 92%", end: "top 32%",
                    scrub: 0.65 + i * 0.1,
                  },
                }
              );
            });

            gsap.utils.toArray<Element>(".step").forEach((el, i) => {
              const dir = i % 2 === 0 ? -18 : 18;
              gsap.fromTo(
                el,
                { rotationY: dir, x: dir * -4, transformPerspective: 1000, opacity: 0 },
                {
                  rotationY: 0, x: 0, opacity: 1, ease: "none",
                  scrollTrigger: {
                    trigger: el, start: "top 90%", end: "top 30%",
                    scrub: 0.8 + i * 0.07,
                  },
                }
              );
            });

            gsap.fromTo(
              ".quote-card",
              { rotationX: -12, y: 80, transformPerspective: 900, opacity: 0 },
              {
                rotationX: 0, y: 0, opacity: 1, ease: "none",
                scrollTrigger: {
                  trigger: ".quote-card", start: "top 88%", end: "top 28%",
                  scrub: 0.9,
                },
              }
            );

            gsap.utils.toArray<Element>(".plan").forEach((el, i) => {
              gsap.fromTo(
                el,
                { rotationX: -14, y: 80, transformPerspective: 1000, opacity: 0 },
                {
                  rotationX: 0, y: 0, opacity: 1, ease: "none",
                  scrollTrigger: {
                    trigger: el, start: "top 92%", end: "top 40%",
                    scrub: 0.6 + i * 0.16,
                  },
                }
              );
            });
          });
        }
      );

      // Anime.js — Scene B (metrics pinned) + Scene C (final CTA pinned)
      import("animejs").then((animejs) => {
        const { createTimeline, onScroll, stagger } = animejs;

        /* ── Scene B — Metrics pinned scrollytelling ─────────────── */
        const metricsTl = createTimeline({
          autoplay: onScroll({
            target: ".scene-metrics-wrap",
            enter: "top top",
            leave: "bottom bottom",
            sync: true,
          }),
          duration: 900,
        });

        metricsTl.add(".metrics-block", {
          opacity: [0, 1],
          scale: [0.92, 1],
          filter: ["blur(18px)", "blur(0px)"],
          duration: 500,
        });

        metricsTl.add(".metric", {
          opacity: [0, 1],
          translateY: [40, 0],
          duration: 650,
          delay: stagger(60),
        }, 280);

        // Counters fire when scroll reaches 70% of the metrics scene
        // (after metrics are fully revealed) — prevents show→hide→show bug
        let countersRan = false;
        const metricsWrap = document.querySelector(".scene-metrics-wrap") as HTMLElement | null;
        const runCounters = () => {
          document.querySelectorAll(".metric .v").forEach((el) => {
            const match = (el.textContent || "").match(/^([\d.]+)(.*)$/);
            if (!match) return;
            const target = parseFloat(match[1]);
            const suffix = match[2].replace(/<\/?em>/g, "");
            const isFloat = match[1].includes(".");
            const start = performance.now();
            const dur = 900;
            const ease = (t: number) => 1 - Math.pow(1 - t, 3);
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / dur);
              const v = target * ease(t);
              el.innerHTML =
                (isFloat ? v.toFixed(1) : Math.round(v).toString()) +
                "<em>" + suffix + "</em>";
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        };
        checkCounterProgress = () => {
          if (countersRan || !metricsWrap) return;
          const rect = metricsWrap.getBoundingClientRect();
          const range = metricsWrap.offsetHeight - window.innerHeight;
          const progress = range > 0 ? Math.max(0, -rect.top / range) : 0;
          if (progress >= 0.7) {
            countersRan = true;
            window.removeEventListener("scroll", checkCounterProgress!);
            runCounters();
          }
        };
        window.addEventListener("scroll", checkCounterProgress, { passive: true });

        /* ── Scene C — Final CTA dramatic close ─────────────────── */
        const finalTl = createTimeline({
          autoplay: onScroll({
            target: ".scene-final-wrap",
            enter: "top top",
            leave: "bottom bottom",
            sync: true,
          }),
          duration: 1800,
        });

        /* Los tweens empiezan en distintos puntos del timeline. Hasta que les
           toca, los elementos se mostraban en su estado final y de golpe
           saltaban hacia atrás para volver a entrar. Se fija su estado de
           partida acá — dentro del bloque que solo corre si anime.js cargó, así
           que si falla la carga siguen visibles en vez de quedar invisibles. */
        document.querySelectorAll<HTMLElement>(".final-spark").forEach((el) => {
          el.style.opacity = "0";
          el.style.transform = "scale(0.2) rotate(-90deg)";
        });
        document.querySelectorAll<HTMLElement>(".final .btn-primary").forEach((el) => {
          el.style.opacity = "0.7";
          el.style.transform = "scale(0.95)";
        });

        finalTl.add(".final", {
          opacity: [0, 1],
          scale: [0.88, 1],
          rotateX: [-8, 0],
          duration: 1200,
        });

        /* La estrella gira al entrar y al salir: es una animación de scroll y
           así debe quedarse.

           Lo que sí cambió es *cuándo*. Arrancaba en 300 y duraba 1400, o sea
           terminaba en 1700 de un timeline de 1800: a mitad de la escena la
           tarjeta ya estaba en 0.98 de opacidad y la estrella recién en 0.78, y
           al 10% la tarjeta se veía en 0.39 con la estrella todavía en cero. Ese
           desfase es lo que se leía como "la estrella no está": no faltaba,
           venía muy por detrás. Ahora comparte el arranque y la duración de la
           tarjeta, así que giran y aparecen juntas. */
        finalTl.add(".final-spark", {
          opacity: [0, 1],
          scale: [0.2, 1],
          rotate: [-90, 0],
          duration: 1200,
          delay: stagger(110),
        }, 0);

        finalTl.add(".final .btn-primary", {
          scale: [0.95, 1],
          opacity: [0.7, 1],
          duration: 800,
        }, 1800);

        /**
         * Pone el timeline donde corresponde según dónde está el scroll ahora.
         *
         * El scrub solo avanza cuando llega un evento de scroll. Si la página
         * carga con la escena ya alcanzada —el botón atrás, una recarga a media
         * página, un enlace con ancla— no llega ninguno: el timeline se queda
         * en el fotograma 0 y la estrella sigue con el `opacity: 0` que se le
         * acaba de fijar arriba, aunque la tarjeta esté a la vista. El usuario
         * ve el bloque sin estrella hasta que mueve la rueda. Esa era la mitad
         * intermitente del problema, la que dependía de cómo hubieras llegado.
         */
        const alinearConElScroll = () => {
          const escena = document.querySelector<HTMLElement>(".scene-final-wrap");
          if (!escena) return;
          const recorrido = escena.offsetHeight - window.innerHeight;
          const avance = Math.min(
            1,
            Math.max(0, -escena.getBoundingClientRect().top / (recorrido || 1))
          );
          finalTl.seek(finalTl.duration * avance);
        };
        requestAnimationFrame(alinearConElScroll);
        // El bfcache restaura la posición sin disparar scroll.
        window.addEventListener("pageshow", alinearConElScroll);

        animeCleanup = () => {
          window.removeEventListener("pageshow", alinearConElScroll);
          metricsTl.pause();
          finalTl.pause();
        };
      });
    }

    /* ── Anclas internas de la página ────────────────────────────
       Los botones que apuntan a una sección (#final, #process…) se manejan
       acá en vez de dejar el salto nativo: si la sección vive dentro de una
       escena animada por scroll, hay que aterrizar en su estado final y no
       en el fotograma 0. Ver `lib/scroll-to-section`. */
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      /* El salto al contenido queda fuera: necesita el comportamiento nativo,
         que además de desplazar mueve el foco al destino. Interceptado acá,
         hacía scroll pero dejaba el foco en el enlace, y el Tab siguiente
         devolvía al menú — es decir, el skip-link no saltaba nada. */
      if (a.classList.contains("salto-al-contenido")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const id = (a.getAttribute("href") || "").slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToSection(id);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      io.disconnect();
      if (stepInterval) clearInterval(stepInterval);
      handlers.forEach(({ move, leave }, btn) => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      });
      window.removeEventListener("scroll", onScrollP);
      if (checkCounterProgress) window.removeEventListener("scroll", checkCounterProgress);
      gsapCtx?.revert();
      animeCleanup?.();
    };
  }, []);

  return null;
}
