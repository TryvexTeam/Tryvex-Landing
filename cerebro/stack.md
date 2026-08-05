# Stack técnico — Decisiones y razones

> Sincronizado con `package.json`: 2026-08-05.

## Framework: Next.js 16.2.4 App Router

**Elegido sobre:** Vite+React (sin backend nativo), Astro 5 (islas, no apps con lógica de servidor)

**Razones:**
- API Routes en el mismo repo — Resend, Google Calendar y Supabase sin servidor separado
- SSR/ISR nativo para SEO; el home revalida `/api/stats` cada hora
- Deploy zero-config en Vercel
- La landing de hoy escala a portal, blog o SaaS sin cambiar tecnología

**Nota:** el proyecto arrancó en Next 15 y ya migró a 16, con Turbopack en dev.

## Estilos: CSS custom + Tailwind v4 como complemento

**Realidad del proyecto:** `src/features/landing/landing.css` (~1.260 líneas) hace el trabajo pesado con sus propias CSS Variables. Tailwind v4 se usa solo para utilidades sueltas en JSX.

**Razones:**
- El glassmorphism, el grano y las escenas de scroll piden CSS que Tailwind expresa mal
- Las CSS Variables permiten que GSAP y Anime.js interpolen valores directamente
- Tailwind cubre lo trivial (layout del `<body>`, espaciados puntuales) sin ensuciar el markup

**Deuda:** `src/styles/tokens.css` quedó desconectado. Hay dos declaraciones de tokens que nadie reconcilió — si se unifican, `landing.css` debe ser el destino.

## Animaciones: GSAP + ScrollTrigger + Anime.js v4 + Lenis

| Herramienta | Carril | Efectos |
|-------------|--------|---------|
| GSAP + ScrollTrigger | Scroll épico | Scrub, parallax multi-capa, escenas 3D (`rotationX`/`rotationY`), dispersión del hero |
| Anime.js v4 | Escenas puntuales | Secuencias de timing fino |
| ~~Lenis~~ | — | **Instalado pero sin usar.** El smooth scroll lo da `scroll-behavior: smooth` nativo |
| IntersectionObserver | Reveals simples | Añade `.in` a los `[data-anim]` |
| Framer Motion | Componentes React | Interacciones de UI aisladas |

**Elegido sobre:** solo Framer Motion (sin scrub nativo), CSS scroll-driven (soporte parcial en Safari)

**Nota GSAP:** SplitText y DrawSVG requieren GSAP Club / licencia Business para uso comercial. El proyecto implementa el split de palabras a mano (`data-split="words"`) para evitar esa dependencia.

## Arquitectura de componentes: feature-first

```
src/features/<feature>/
├── components/
├── data/
└── <feature>.css
```

**Elegido sobre:** `sections/` + `ui/` (la separación no aguantó cuando la landing y el equipo crecieron con CSS propio), Atomic Design (overkill sin Design System formal)

`src/components/` queda reservado para navegación compartida entre rutas: `NavBar`, `GooeyNav`, `ExpandNav`.

**Deuda:** el markup del home vive inline en `page.tsx` (~507 líneas) en vez de estar extraído a componentes de sección.

## Servicios externos

| Servicio | Para qué | Dónde |
|----------|----------|-------|
| Resend | Emails transaccionales del formulario | `/api/contact` |
| Google Calendar API | Disponibilidad, agenda y recordatorios | `/api/availability`, `/api/reminders`, `src/lib/google-calendar.ts` |
| Supabase (REST) | Métricas de empresas mapeadas y clientes activos | `/api/stats` |
| Microsoft Clarity | Analytics de comportamiento | `layout.tsx` |

## Deploy: Vercel

CI/CD automático, Edge Network, dominio `www.tryvex.tech`, zero-config con Next.js. `vercel.json` está vacío — toda la configuración es la que Vercel infiere.

## Dependencias instaladas

```json
{
  "next": "16.2.4",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "gsap": "^3.15.0",
  "animejs": "^4.4.1",
  "lenis": "^1.3.23",
  "framer-motion": "^12.38.0",
  "resend": "^6.12.3",
  "googleapis": "^171.4.0",
  "zod": "^4.3.6",
  "sileo": "^0.1.5",
  "tailwindcss": "^4"
}
```
