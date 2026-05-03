"use client";

import { useEffect } from "react";

export default function LandingClient() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    // GSAP-controlled stagger wrappers are excluded to avoid CSS conflicts
    const gsapStaggerClasses = ["services", "process", "offer"];
    const gsapAnimClasses = ["metrics-block", "quote-card", "final", "final-spark"];

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
          // Skip stagger parents whose children GSAP will animate
          if (
            el.hasAttribute("data-stagger") &&
            gsapStaggerClasses.some((c) => el.classList.contains(c))
          )
            return;
          // Skip individual elements GSAP will animate
          if (
            el.hasAttribute("data-anim") &&
            gsapAnimClasses.some((c) => el.classList.contains(c))
          )
            return;
        }
        io.observe(el);
      });

    document.querySelectorAll('[data-split="words"]').forEach((h) => {
      if (h.classList.contains("in"))
        h.querySelectorAll(".split-word").forEach((s) =>
          s.classList.add("in")
        );
    });

    /* ── 3. Animated counters ────────────────────────────────────── */
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const match = (el.textContent || "").match(/^([\d.]+)(.*)$/);
          if (!match) {
            counterIO.unobserve(el);
            return;
          }
          const target = parseFloat(match[1]);
          const suffix = match[2];
          const isFloat = match[1].includes(".");
          const start = performance.now();
          const dur = 1400;
          const ease = (t: number) => 1 - Math.pow(1 - t, 3);
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const v = target * ease(t);
            el.innerHTML =
              (isFloat ? v.toFixed(1) : Math.round(v).toString()) +
              "<em>" +
              suffix.replace(/<\/?em>/g, "") +
              "</em>";
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          counterIO.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".metric .v").forEach((c) => counterIO.observe(c));

    /* ── 4. Hero flow steps cycling ─────────────────────────────── */
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

    /* ── 5. Magnetic CTA hover ───────────────────────────────────── */
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

    /* ── 6. Scroll progress bar ──────────────────────────────────── */
    const progress = document.querySelector(
      ".scroll-progress"
    ) as HTMLElement | null;
    let pTicking = false;
    const updateProgress = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      progress?.style.setProperty(
        "--sp",
        (Math.min(1, window.scrollY / (max || 1)) * 100).toFixed(2) + "%"
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

    /* ── 7. GSAP ScrollTrigger scrub animations ──────────────────── */
    let gsapCtx: { revert: () => void } | null = null;

    if (!reduce) {
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([{ gsap }, { ScrollTrigger }]) => {
          gsap.registerPlugin(ScrollTrigger);

          // Remove CSS stagger transitions from GSAP-controlled elements
          // so scrub opacity doesn't fight the CSS transition delay rules
          document.querySelectorAll(".svc, .step, .plan").forEach((el) => {
            (el as HTMLElement).style.transition = "none";
          });

          gsapCtx = gsap.context(() => {
            /* ── Hero multi-layer parallax (bidirectional scrub) ─ */
            const heroST = {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
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
              scrollTrigger: { ...heroST, scrub: 2.2 },
            });
            gsap.to(".fc-2", {
              y: 190,
              x: -50,
              rotation: 16,
              scale: 0.82,
              ease: "none",
              scrollTrigger: { ...heroST, scrub: 2.2 },
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

            /* ── Ambient blobs — slow full-page drift ────────────── */
            const blobST = {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: 4,
            };
            gsap.to(".ambient .b1", {
              y: -480,
              x: 90,
              ease: "none",
              scrollTrigger: blobST,
            });
            gsap.to(".ambient .b2", {
              y: 360,
              x: -60,
              ease: "none",
              scrollTrigger: blobST,
            });
            gsap.to(".ambient .b3", {
              y: -520,
              x: 80,
              ease: "none",
              scrollTrigger: blobST,
            });

            /* ── Services cards — 3D rotationX scrub entry ─────── */
            gsap.utils.toArray<Element>(".svc").forEach((el, i) => {
              gsap.fromTo(
                el,
                {
                  rotationX: -24,
                  y: 70,
                  transformPerspective: 1100,
                  opacity: 0,
                },
                {
                  rotationX: 0,
                  y: 0,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    end: "top 32%",
                    scrub: 1 + i * 0.15,
                  },
                }
              );
            });

            /* ── Process steps — alternating rotationY scrub ────── */
            gsap.utils.toArray<Element>(".step").forEach((el, i) => {
              const dir = i % 2 === 0 ? -18 : 18;
              gsap.fromTo(
                el,
                {
                  rotationY: dir,
                  x: dir * -4,
                  transformPerspective: 1000,
                  opacity: 0,
                },
                {
                  rotationY: 0,
                  x: 0,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    end: "top 30%",
                    scrub: 1.2 + i * 0.1,
                  },
                }
              );
            });

            /* ── Metrics block — rise + blur scrub ───────────────── */
            gsap.fromTo(
              ".metrics-block",
              { y: 90, filter: "blur(12px)", opacity: 0 },
              {
                y: 0,
                filter: "blur(0px)",
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: ".metrics-block",
                  start: "top 88%",
                  end: "top 35%",
                  scrub: 1.6,
                },
              }
            );

            /* ── Testimonial card — 3D tilt scrub ───────────────── */
            gsap.fromTo(
              ".quote-card",
              {
                rotationX: -12,
                y: 80,
                transformPerspective: 900,
                opacity: 0,
              },
              {
                rotationX: 0,
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: ".quote-card",
                  start: "top 88%",
                  end: "top 28%",
                  scrub: 1.4,
                },
              }
            );

            /* ── Pricing plans — staggered 3D entry ─────────────── */
            gsap.utils.toArray<Element>(".plan").forEach((el, i) => {
              gsap.fromTo(
                el,
                {
                  rotationX: -14,
                  y: 80,
                  transformPerspective: 1000,
                  opacity: 0,
                },
                {
                  rotationX: 0,
                  y: 0,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    end: "top 40%",
                    scrub: 0.9 + i * 0.25,
                  },
                }
              );
            });

            /* ── Final CTA — dramatic scale + tilt reveal ────────── */
            gsap.fromTo(
              ".final",
              {
                scale: 0.88,
                rotationX: -8,
                transformPerspective: 1200,
                opacity: 0,
              },
              {
                scale: 1,
                rotationX: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: ".final",
                  start: "top 92%",
                  end: "top 22%",
                  scrub: 1.8,
                },
              }
            );

            /* ── Final sparks — spin in with scrub ───────────────── */
            gsap.utils.toArray<Element>(".final-spark").forEach((el, i) => {
              gsap.fromTo(
                el,
                { scale: 0.2, rotation: -90 + i * 35, opacity: 0 },
                {
                  scale: 1,
                  rotation: 0,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: ".final",
                    start: "top 88%",
                    end: "center 45%",
                    scrub: 0.9 + i * 0.3,
                  },
                }
              );
            });
          });
        }
      );
    }

    return () => {
      io.disconnect();
      counterIO.disconnect();
      if (stepInterval) clearInterval(stepInterval);
      handlers.forEach(({ move, leave }, btn) => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      });
      window.removeEventListener("scroll", onScrollP);
      gsapCtx?.revert();
    };
  }, []);

  return null;
}
