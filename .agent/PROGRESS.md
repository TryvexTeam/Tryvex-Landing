# Tryvex Landing — Progreso del Proyecto

---

## 🚀 v1.0 — Producción
**Fecha:** 2026-04-29  
**Commit:** `b07ea4d0bb1a2d73b388fd65bc48a2fc1eb72d3a` (`b07ea4d`)  
**Branch:** `main`  
**Deploy:** [https://tryvex-landing.vercel.app/](https://tryvex-landing.vercel.app/)  
**Repo:** [https://github.com/Ignvvcio254/Tryvex-Landing](https://github.com/Ignvvcio254/Tryvex-Landing)

### Fases completadas
| Fase | Descripción | Estado |
|------|-------------|--------|
| F1 | Scaffold Next.js 16 + TypeScript + Tailwind v4 + tokens + fuentes | ✅ |
| F2 | Componentes UI migrados desde index.html (glass, buttons, animations) | ✅ |
| F3 | 11 secciones en React — fidelidad visual completa, deploy en Vercel | ✅ |
| F4 | Anime.js v4 + Lenis + GSAP — scroll-driven scrollytelling completo (Scene A + B + C) | ✅ |

### Arquitectura actual
- **`src/app/page.tsx`** — Server component con todo el HTML migrado de `index.html` a JSX
- **`src/app/LandingClient.tsx`** — Client component (`"use client"`) con todas las animaciones: word-split, IntersectionObserver reveals, parallax, counters, hero cycling, magnetic buttons
- **`src/app/landing.css`** — CSS completo extraído de `index.html` (552 líneas)
- **`src/app/globals.css`** — Tailwind v4 + tokens del sistema de diseño
- **`src/app/layout.tsx`** — RootLayout con fuentes Geist, Geist Mono, Instrument Serif
- **`src/styles/tokens.css`** — Variables CSS del sistema visual (colores, glass, tipografía, espaciado)

### Historial de commits (v1.0)
```
b07ea4d fix: remove prefers-reduced-motion CSS override blocking animations
41559d3 docs: mark F2 and F3 as completed
7d1b7fe fix: move LandingClient to end of JSX for proper DOM hydration
6e9d92e fix: import landing.css directly in layout to avoid Tailwind pipeline
0c52b54 feat: migrate landing page to Next.js — Phases 2 & 3 complete
f75daf1 Initial commit
```

### Decisiones técnicas clave
1. **Migración directa HTML→JSX**: En lugar de crear componentes granulares, se migró todo el HTML del `index.html` a un único `page.tsx` usando un script de conversión (`convert-to-jsx.js`). Esto prioriza velocidad de delivery sobre modularidad.
2. **CSS separado de Tailwind**: El `landing.css` se importa directamente en `layout.tsx` para evitar que el pipeline de Tailwind v4 procese/modifique los estilos originales.
3. **Animaciones vanilla JS**: Las animaciones se mantienen como JavaScript vanilla en un `useEffect` (no GSAP/Framer Motion aún). Esto es la Fase 4 pendiente.
4. **prefers-reduced-motion eliminado**: Se removió la media query que bloqueaba animaciones para usuarios con esta configuración de OS activa.

### Fase 4 — Estado al 2026-05-04

**Stack implementado:** Anime.js v4 + Lenis 1.3.23 + GSAP 3.15 (coexistiendo)

| Responsabilidad | Librería |
|---|---|
| Hero parallax + blobs + services + process + quote-card + plans | GSAP ScrollTrigger (existente) |
| Scene B: metrics pinned scrollytelling | **Anime.js v4** `onScroll({ sync: true })` |
| Scene C: final CTA dramatic close | **Anime.js v4** `onScroll({ sync: true })` |
| Scene A: hero exploded brand SVG | ❌ Pendiente próxima sesión |
| Smooth scroll | **Lenis** (lerp: 0.1) |

**Archivos modificados en F4:**
- `src/app/LandingClient.tsx` — reescrito completo: Lenis RAf loop, GSAP sin .metrics-block/.final/.final-spark, Anime.js Scene B + C, counter animation preservada vía rAF propio
- `src/app/landing.css` — agregados `.scene-metrics-wrap`, `.scene-final-wrap`, `.scene-piece` al final
- `src/app/page.tsx` — métricas wrapeadas en `<div class="scene-metrics-wrap">`, final CTA en `<div class="scene-final-wrap">`
- `package.json` / `package-lock.json` — animejs@4.4.1 y lenis@1.3.23 instalados

**Completado 2026-05-12:**
- Scene A implementada: 6 piezas SVG spark (`.sa-p1`–`.sa-p6`) en `.hero` con GSAP ScrollTrigger scrub — scatter explosion al salir del hero
- Bug `.hero-col` corregido: clase añadida al div de texto del hero-grid, activando los parallax de h1/eyebrow/lede
- `animate` import no-usada eliminada de animejs destructuring
- Build ✅ `Compiled successfully in 5.0s`, TypeScript clean
- Playwright screenshots verificados: hero, métricas dark glass, CTA final

### Notas técnicas F4
- `onScroll({ sync: true })` con `createTimeline` mapea progress de scroll 0→1 al timeline — reversa automática al subir
- `stagger(120)` / `stagger(180)` — Anime.js v4 utility importada del módulo
- GSAP y Anime.js no colisionan: GSAP toca `.svc/.step/.plan/.quote-card/hero`, Anime.js toca `.metrics-block/.final/.final-spark` (excluidos de IntersectionObserver vía `animeSelectors`)
- Lenis actualiza `window.scrollY` normalmente — scroll-progress bar sigue funcionando

---
**[2026-04-29] — Antigravity completó:**
- Archivos modificados: `page.tsx`, `LandingClient.tsx`, `landing.css`, `globals.css`, `layout.tsx`, `.gitignore`, `README.md`
- Resumen: Migración completa de landing HTML estática a Next.js 16 con deploy funcional en Vercel
- Pendiente para Jarvis: Fase 4 (animaciones premium con GSAP/Framer Motion), refactorización en componentes modulares
---
    