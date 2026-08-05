"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { scrollToSection } from "../lib/scroll-to-section";
import "./GooeyNav.css";

export type GooeyNavItem = {
  label: string;
  href: string;
  /**
   * Id de la sección que representa este ítem dentro de la página actual.
   *
   * Sirve para los ítems que llevan a otra página pero además tienen un preview
   * en el home: el clic sigue yendo a `href`, y el scrollspy los marca cuando su
   * sección cruza la pantalla. Sin esto el subrayado se saltaba de una sección a
   * la siguiente como si el preview no existiera.
   */
  section?: string;
};

/* ── Tiempos ──────────────────────────────────────────────────────────────
   Cada partícula vive un tiempo distinto (más vivo, menos "canned"), pero
   siempre dentro de un techo conocido: así ninguna se corta al navegar. */
const PARTICLE_LIFE_MIN = 560;
const PARTICLE_LIFE_MAX = 760;

/** El CSS arranca las partículas con delay negativo, saltándose este tramo. */
const PARTICLE_HEAD_START = 60;

/** Retraso hasta que las partículas se montan en el DOM. */
const PARTICLE_SPAWN = 30;

/**
 * Espera antes de cambiar de página: al navegar, el nav se desmonta y se lleva
 * el estallido con él, así que le damos tiempo a terminar. Se deriva de la
 * partícula más lenta — si cambias su duración, esto se ajusta solo.
 *
 * Solo aplica a cambios de ruta reales. Los ítems que hacen scroll dentro de la
 * misma página se ejecutan de inmediato: ahí no hay nada que se desmonte y
 * esperar solo se sentiría como lag.
 */
const NAV_DELAY = PARTICLE_LIFE_MAX - PARTICLE_HEAD_START + PARTICLE_SPAWN + 20;

/** Ventana en la que el scrollspy se calla, mientras corre el scroll suave. */
const SPY_MUTE = 1100;

/** Línea de lectura: una sección cuenta como activa al cruzar este alto. */
const SPY_OFFSET = 160;

/** Estallidos que pueden convivir. Los clics rápidos no deben acumularse. */
const MAX_BURSTS = 3;

/* Defaults a nivel de módulo: como literales en la firma se recrearían en cada
   render y romperían la memoización de los useCallback. */
/** [radio de salida, radio de llegada]. Salen del título y se abren hacia afuera. */
const DEFAULT_DISTANCES: [number, number] = [7, 28];
/** Mayoría en rojo de marca, algunos en ink: destello, no confeti. */
const DEFAULT_COLORS = [2, 2, 2, 1, 2, 4, 2, 1];

interface GooeyNavProps {
  items: GooeyNavItem[];
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  colors?: number[];
  onNavigate?: (item: GooeyNavItem, index: number) => void;
}

/* ── Helpers puros ──────────────────────────────────────────────────────── */

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Achata el estallido en elipse: se abre a los lados y apenas en vertical, así
    acompaña al subrayado en vez de desbordar la píldora del nav. */
const Y_SQUASH = 0.45;

/**
 * Punto de salida de cada partícula. El ángulo se reparte por sectores (para
 * que cubran toda la vuelta) pero con un jitter que ocupa el sector completo:
 * así ninguna repite el recorrido de la anterior ni de un clic al siguiente.
 */
const getXY = (distance: number, index: number, total: number) => {
  const sector = 360 / total;
  const angle = (sector * index + rand(-sector * 0.85, sector * 0.85)) * (Math.PI / 180);
  const d = distance * rand(0.55, 1.35);
  return [d * Math.cos(angle), d * Math.sin(angle) * Y_SQUASH];
};

const createParticle = (
  i: number,
  d: [number, number],
  r: number,
  total: number,
  colors: number[]
) => ({
  start: getXY(d[0], i, total),
  end: getXY(d[1] + rand(-10, 16), i, total),
  life: rand(PARTICLE_LIFE_MIN, PARTICLE_LIFE_MAX),
  scale: rand(0.5, 1.15),
  color: colors[Math.floor(Math.random() * colors.length)],
  rotate: rand(-r / 5, r / 5) * 10,
});

/** Separa "/ruta#hash" en sus dos partes. */
const splitHref = (href: string) => {
  const i = href.indexOf("#");
  if (i === -1) return { path: href, hash: "" };
  return { path: href.slice(0, i) || "/", hash: href.slice(i + 1) };
};

export default function GooeyNav({
  items,
  particleCount = 15,
  particleDistances = DEFAULT_DISTANCES,
  particleR = 100,
  colors = DEFAULT_COLORS,
  onNavigate,
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  /** Navegación pendiente. Solo puede haber una: si llega otro clic, se cancela
      la anterior. Sin esto, dos clics seguidos dejaban dos viajes en cola y
      ganaba el primero — hacías clic en un ítem y aterrizabas en otro. */
  const navTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const muteSpy = useRef(false);
  const firstPaint = useRef(true);

  const router = useRouter();
  const pathname = usePathname();

  /** Ítem que corresponde a la ruta actual (los de hash se resuelven por scroll). */
  const routeIndex = items.findIndex((it) => {
    const { path, hash } = splitHref(it.href);
    return !hash && path === pathname;
  });

  const [activeIndex, setActiveIndex] = useState(routeIndex);
  const [syncedRoute, setSyncedRoute] = useState(routeIndex);

  // Ajuste durante el render (no en un efecto): al cambiar de ruta el subrayado
  // sigue a la página actual sin provocar un render en cascada.
  if (syncedRoute !== routeIndex) {
    setSyncedRoute(routeIndex);
    setActiveIndex(routeIndex);
  }

  const hrefKey = items.map((i) => `${i.href}>${i.section ?? ""}`).join("|");

  /* ── Prefetch de rutas ── */
  useEffect(() => {
    hrefKey.split("|").forEach((par) => {
      const { path, hash } = splitHref(par.split(">")[0]);
      if (!hash && path !== pathname) router.prefetch(path);
    });
  }, [hrefKey, pathname, router]);

  /* ── Limpieza de timers si se desmonta a mitad de animación ── */
  useEffect(() => {
    const pending = timers.current;
    const navRefLocal = navTimer;
    return () => {
      pending.forEach(clearTimeout);
      pending.length = 0;
      if (navRefLocal.current) clearTimeout(navRefLocal.current);
    };
  }, []);

  const track = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  /* ── Posición del subrayado: ancho del texto, no de la celda ── */
  const moveUnderline = useCallback((li: HTMLLIElement | null) => {
    const bar = underlineRef.current;
    const box = containerRef.current;
    if (!bar || !box) return;

    if (!li) {
      bar.style.opacity = "0";
      return;
    }

    const a = li.querySelector("a");
    const cs = a ? getComputedStyle(a) : null;
    const padL = cs ? parseFloat(cs.paddingLeft) : 0;
    const padR = cs ? parseFloat(cs.paddingRight) : 0;

    const boxRect = box.getBoundingClientRect();
    const rect = li.getBoundingClientRect();

    bar.style.width = `${Math.max(0, rect.width - padL - padR)}px`;
    bar.style.left = `${rect.x - boxRect.x + padL}px`;
    bar.style.top = `${rect.y - boxRect.y + rect.height - 6}px`;
    bar.style.opacity = "1";

    // En el primer pintado no queremos que se deslice desde la izquierda.
    if (firstPaint.current) {
      firstPaint.current = false;
      requestAnimationFrame(() => bar.classList.add("is-ready"));
    }
  }, []);

  /**
   * Lanza un estallido en el centro del título.
   *
   * Cada clic crea su propio contenedor anclado a ese punto, en vez de reusar
   * una capa única que se reposiciona: así los estallidos conviven sin borrarse
   * entre sí (antes cada clic barría el anterior y con clics rápidos el nav se
   * veía vacío) y ninguna partícula salta de sitio al cambiar de ítem.
   */
  const burst = useCallback(
    (li: HTMLLIElement) => {
      const box = containerRef.current;
      const layer = filterRef.current;
      if (!box || !layer) return;

      const a = li.querySelector("a") ?? li;
      const boxRect = box.getBoundingClientRect();
      const rect = a.getBoundingClientRect();

      /* Tope de estallidos vivos: si alguien martilla el menú, los más viejos
         se retiran en vez de acumularse. */
      const vivos = layer.querySelectorAll(".burst");
      for (let i = 0; i <= vivos.length - MAX_BURSTS; i++) vivos[i].remove();

      const origin = document.createElement("span");
      origin.className = "burst";
      origin.style.left = `${rect.x - boxRect.x + rect.width / 2}px`;
      origin.style.top = `${rect.y - boxRect.y + rect.height / 2}px`;
      layer.appendChild(origin);

      let longest = 0;
      for (let i = 0; i < particleCount; i++) {
        const p = createParticle(i, particleDistances, particleR, particleCount, colors);
        longest = Math.max(longest, p.life);

        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.life}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--gooey-color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("point");
        particle.appendChild(point);
        origin.appendChild(particle);
      }

      track(() => origin.remove(), longest + 60);
    },
    [particleCount, particleDistances, particleR, colors]
  );

  /* ── Destino: scroll suave dentro de la página, o navegación SPA ── */
  const go = useCallback(
    (href: string) => {
      const { path, hash } = splitHref(href);

      if (hash && (path === pathname || href.startsWith("#"))) {
        scrollToSection(hash);
        return;
      }
      router.push(href);
    },
    [pathname, router]
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    // Respeta ctrl/cmd/shift/click-medio: abrir en pestaña nueva sigue funcionando.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();

    const li = e.currentTarget.parentElement as HTMLLIElement;
    const item = items[index];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    onNavigate?.(item, index);
    setActiveIndex(index);
    moveUnderline(li);

    // El scrollspy calla mientras corre el scroll programático, si no pelearía
    // con el ítem recién elegido y el subrayado parpadearía entre dos.
    muteSpy.current = true;
    track(() => {
      muteSpy.current = false;
    }, SPY_MUTE);

    // Solo puede haber un viaje en cola: el último clic manda.
    if (navTimer.current) clearTimeout(navTimer.current);

    if (reduce) {
      navTimer.current = null;
      go(item.href);
      return;
    }

    burst(li);

    // Scroll dentro de la misma página: nada se desmonta, va de inmediato.
    const destino = splitHref(item.href);
    const esScrollLocal =
      !!destino.hash && (destino.path === pathname || item.href.startsWith("#"));

    if (esScrollLocal) {
      navTimer.current = null;
      go(item.href);
      return;
    }

    // Cambio de página: esperamos a que la animación alcance a completarse.
    navTimer.current = setTimeout(() => {
      navTimer.current = null;
      go(item.href);
    }, NAV_DELAY);
  };

  /* ── Scrollspy: marca la sección en la que estás ── */
  useEffect(() => {
    /* Un ítem entra al scrollspy si su ancla vive en esta página, o si declara
       una `section` que existe en el DOM (caso del catálogo: el clic va a
       /catalogo pero en el home hay un preview que también debe marcarse). */
    const targets = hrefKey
      .split("|")
      .map((par, i) => {
        const [href, section] = par.split(">");
        const { path, hash } = splitHref(href);
        if (section && document.getElementById(section)) return { i, id: section };
        if (hash && path === pathname) return { i, id: hash };
        return null;
      })
      .filter((t): t is { i: number; id: string } => t !== null);

    if (!targets.length) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      if (muteSpy.current) return;

      let current = -1;
      for (const t of targets) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= SPY_OFFSET) current = t.i;
      }

      // Al fondo de la página damos por activa la última sección.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) current = targets[targets.length - 1].i;

      setActiveIndex(current === -1 ? routeIndex : current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();

    /* El scroll solo cuenta lo que pasa *después* de montar. El navegador
       restaura la posición (botón atrás, recarga a media página) fuera de ese
       flujo, y el subrayado quedaba marcando una sección que ya no tocaba.
       El observer sí dispara al empezar a observar y en cada cruce, venga de
       donde venga el cambio. */
    const io = new IntersectionObserver(read, {
      rootMargin: `-${SPY_OFFSET}px 0px 0px 0px`,
      threshold: [0, 1],
    });
    targets.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) io.observe(el);
    });

    /* El observer cubre los cruces, pero la restauración de scroll puede caer
       justo entre su lectura inicial y el primer evento. Un par de relecturas
       diferidas cierran esa ventana. */
    const recheck = [120, 400, 900].map((ms) => setTimeout(read, ms));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      recheck.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [hrefKey, pathname, routeIndex]);

  /* ── Reposicionar el subrayado cuando cambia el activo o el tamaño ── */
  useEffect(() => {
    const box = containerRef.current;
    if (!box) return;

    const place = () => {
      const li = navRef.current?.querySelectorAll("li")[activeIndex] as
        | HTMLLIElement
        | undefined;
      moveUnderline(li ?? null);
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(box);
    return () => observer.disconnect();
  }, [activeIndex, moveUnderline]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li key={item.href} className={activeIndex === index ? "active" : ""}>
              <a
                href={item.href}
                data-text={item.label}
                aria-current={activeIndex === index ? "page" : undefined}
                onClick={(e) => handleClick(e, index)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="gooey-underline" ref={underlineRef} aria-hidden="true" />
      <span className="effect filter" ref={filterRef} aria-hidden="true" />
    </div>
  );
}
