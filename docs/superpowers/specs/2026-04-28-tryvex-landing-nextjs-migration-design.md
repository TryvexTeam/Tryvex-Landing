# Tryvex Landing — Next.js Migration Design Spec
**Fecha:** 2026-04-28  
**Estado:** Aprobado  
**Autor:** Jarvis (brainstorming con señor Ignacio)

---

## 1. Objetivo

Migrar el landing page de Tryvex de HTML/CSS/JS vanilla a un stack React moderno con Next.js 15, preservando el sistema visual glassmorphism existente y agregando animaciones de nivel agencia premium (GSAP ScrollTrigger + Framer Motion).

---

## 2. Stack técnico

| Capa | Tecnología | Razón |
|------|-----------|-------|
| Framework | Next.js 15 (App Router) | SSR/SSG nativo, API Routes para futuro backend, Vercel zero-config |
| Lenguaje | TypeScript | Seguridad de tipos en toda la codebase |
| Estilos | Tailwind CSS v4 + CSS Variables | Tokens existentes preservados, utility classes en JSX |
| Animaciones scroll | GSAP + ScrollTrigger | Efectos "scroll como video" (pin, scrub, SplitText) |
| Animaciones UI | Framer Motion | hover states, page transitions, micro-interacciones en React |
| UI base | shadcn/ui (Radix UI) | Headless, accesible, sobre los tokens propios de Tryvex |
| Validación | Zod | Forms y APIs futuras |
| Deploy | Vercel | CI/CD automático, dominio tryvex.cl |
| Tipografía | Geist + JetBrains Mono + Instrument Serif | Preservadas vía next/font |

---

## 3. Arquitectura de componentes

```
src/
├── app/
│   ├── layout.tsx          ← metadata SEO, fuentes, tokens CSS global
│   └── page.tsx            ← composición de las 11 secciones
├── components/
│   ├── sections/           ← una sección por archivo
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── LogoStrip.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Metrics.tsx
│   │   ├── Testimonial.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTAFinal.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── GlassCard.tsx
│       ├── AnimatedText.tsx
│       ├── Counter.tsx
│       ├── SectionWrapper.tsx
│       └── Button.tsx
├── hooks/
│   ├── useScrollProgress.ts
│   └── useReducedMotion.ts
└── styles/
    └── tokens.css
```

---

## 4. Sistema de estilos

CSS Variables como fuente de verdad. Tailwind los consume vía `tailwind.config.ts`.

```css
:root {
  --color-ink:    #0e0e0e;
  --color-paper:  #f4f1ea;
  --color-vex:    oklch(65% 0.18 28);
  --color-signal: oklch(65% 0.12 250);
  --glass-bg:     rgba(255, 255, 255, 0.42);
  --glass-blur:   blur(28px) saturate(180%);
}
```

Tailwind extendido: `bg-ink`, `text-vex`, `border-signal`. Plugin propio: `glass-light`, `glass-dark`.

---

## 5. Estrategia de animaciones

### GSAP + ScrollTrigger
| Efecto | Técnica | Sección |
|--------|---------|---------|
| Hero pinned reveal | `pin: true` + `scrub: 1` | Hero |
| SplitText headings | stagger por palabra | Todas |
| Process horizontal | scroll synced horizontal | Process |
| Métricas scrub | scrub directo en counters | Metrics |
| Parallax 3 capas | velocidades independientes | Hero |

### Framer Motion
| Efecto | API | Componente |
|--------|-----|-----------|
| Scroll reveal universal | `whileInView` | SectionWrapper |
| Word-split | `staggerChildren` | AnimatedText |
| Hover 3D tilt | `useMotionValue + spring` | Pricing cards |
| Navbar hide/show | `useScroll + useMotionValueEvent` | Navbar |
| Page transitions | `AnimatePresence` | Layout |

Regla: GSAP para secuencias de scroll. Framer para interacciones de componente. Coexisten sin conflicto.

---

## 6. Plan de migración — 4 fases

| Fase | Contenido | Días |
|------|-----------|------|
| F1 | Scaffold Next.js 15 + TypeScript + Tailwind v4 + tokens + fuentes | 1 |
| F2 | UI components compartidos (GlassCard, AnimatedText, Counter, SectionWrapper, Button) | 1 |
| F3 | 11 secciones en React → **deployable en Vercel desde aquí** | 2-3 |
| F4 | GSAP ScrollTrigger + Framer Motion | 2 |

Orden F3: Navbar → Footer → Hero → Services → Process → Metrics → Testimonial → Pricing → FAQ → LogoStrip → CTAFinal

---

## 7. Fuera de scope (Sprint 0)

- Autenticación / portal de clientes
- Blog / casos de estudio
- Stripe / MercadoPago (API Routes preparadas, no implementadas)
- Dark mode toggle
- i18n
