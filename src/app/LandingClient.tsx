"use client";

import { useEffect } from "react";

export default function LandingClient() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* 1. Word-split big headings */
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
            if (inner.length) {
              inner.forEach((n) => clone.appendChild(n));
            }
            out.push(clone);
          }
        });
        return out;
      };
      const replaced = walk(el);
      el.innerHTML = "";
      replaced.forEach((n) => el.appendChild(n));
    });

    /* 2. Intersection observer for reveals */
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
      .forEach((el) => io.observe(el));

    document.querySelectorAll('[data-split="words"]').forEach((h) => {
      if (h.classList.contains("in")) {
        h.querySelectorAll(".split-word").forEach((s) =>
          s.classList.add("in")
        );
      }
    });

    /* 3. Parallax + ambient drift on scroll */
    let ticking = false;
    const parallaxEls = document.querySelectorAll("[data-parallax]");
    const ambient = document.querySelector(".ambient") as HTMLElement | null;
    const heroVisual = document.querySelector(
      ".hero-visual"
    ) as HTMLElement | null;
    const progress = document.querySelector(
      ".scroll-progress"
    ) as HTMLElement | null;

    const onScroll = () => {
      const sy = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(1, sy / max));

      if (ambient) ambient.style.setProperty("--sy", pct.toString());
      if (progress)
        progress.style.setProperty("--sp", (pct * 100).toFixed(2) + "%");

      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const p = (center - vh / 2) / vh;
        (el as HTMLElement).style.setProperty(
          "--p",
          Math.max(-1.4, Math.min(1.4, -p)).toFixed(3)
        );
      });

      if (heroVisual) {
        const r = heroVisual.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const t = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
        heroVisual.style.transform = `translateY(${(-t * 18).toFixed(
          1
        )}px) rotate(${(t * -1.2).toFixed(2)}deg)`;
      }

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(onScroll);
          ticking = true;
        }
      },
      { passive: true }
    );
    onScroll();

    /* 4. Animated counters */
    const counters = document.querySelectorAll(".metric .v");
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
            const display = isFloat
              ? v.toFixed(1)
              : Math.round(v).toString();
            el.innerHTML =
              display +
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
    counters.forEach((c) => counterIO.observe(c));

    /* 5. Hero flow steps cycling */
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

    /* 6. Magnetic CTA hover */
    const btns = document.querySelectorAll(".btn-primary");
    const handlers = new Map<Element, { move: EventListener; leave: EventListener }>();
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

    return () => {
      io.disconnect();
      counterIO.disconnect();
      if (stepInterval) clearInterval(stepInterval);
      handlers.forEach(({ move, leave }, btn) => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return null;
}
