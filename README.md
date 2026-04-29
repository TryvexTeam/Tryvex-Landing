# Tryvex Landing

Landing page oficial de Tryvex — agencia de software en Santiago especializada en automatizaciones, landing pages y productos SaaS.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 + CSS Variables |
| Animaciones scroll | GSAP + ScrollTrigger |
| Animaciones UI | Framer Motion |
| Deploy | Vercel |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          ← metadata SEO + fuentes (Geist, Instrument Serif)
│   ├── page.tsx            ← composición de las 11 secciones
│   └── globals.css         ← Tailwind @theme + tokens globales
├── components/
│   ├── sections/           ← Navbar, Hero, LogoStrip, Services, Process,
│   │                          Metrics, Testimonial, Pricing, FAQ, CTAFinal, Footer
│   └── ui/                 ← GlassCard, AnimatedText, Counter, SectionWrapper, Button
├── hooks/                  ← useScrollProgress, useReducedMotion
└── styles/
    └── tokens.css          ← CSS Variables del sistema visual Tryvex

cerebro/
├── index.md                ← catálogo de nodos (leer primero en cada sesión)
├── CLAUDE.md               ← reglas y convenciones del proyecto
└── stack.md                ← decisiones técnicas y sus razones

docs/
└── superpowers/specs/
    └── 2026-04-28-tryvex-landing-nextjs-migration-design.md
```

---

## Sistema de colores

```css
--color-ink:    #0e0e0e              /* negro editorial  → bg-ink,    text-ink    */
--color-paper:  #f4f1ea              /* crema cálido     → bg-paper,  text-paper  */
--color-vex:    oklch(65% .18 28)    /* rojo-naranja     → bg-vex,    text-vex    */
--color-signal: oklch(65% .12 250)   /* azul acero       → bg-signal, text-signal */
```

Clases Tailwind disponibles: `bg-ink`, `text-paper`, `text-vex`, `text-signal`, `glass-light`, `glass-dark`

---

## Plan de fases

| Fase | Contenido | Estado |
|------|-----------|--------|
| F1 | Scaffold Next.js 15 + TypeScript + Tailwind v4 + tokens + fuentes | ✅ Completada |
| F2 | UI components: GlassCard, AnimatedText, Counter, SectionWrapper, Button | ✅ Completada |
| F3 | 11 secciones en React — fidelidad visual completa, deployable en Vercel | ✅ Completada |
| F4 | GSAP ScrollTrigger + Framer Motion — animaciones de nivel agencia | ⏳ Pendiente |

---

## Desarrollo local

```bash
npm run dev    # servidor en http://localhost:3000
npm run build  # build de producción
npm run lint   # ESLint
```

---

## Cerebro del proyecto

Este proyecto usa el sistema `claude-brain` para contexto acumulado entre sesiones:

- **`cerebro/index.md`** → leer primero al iniciar sesión
- **`cerebro/CLAUDE.md`** → convenciones, tokens, reglas GSAP
- **`cerebro/stack.md`** → decisiones técnicas y razones

---

## Contacto

- hola@tryvex.cl
- ignacio@tryvex.cl (Ignacio Navarrete, Co-founder · CEO)
