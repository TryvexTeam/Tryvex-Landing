# Stack técnico — Decisiones y razones

## Framework: Next.js 15 App Router

**Elegido sobre:** Vite+React (sin backend nativo), Astro 5 (islas, no apps con pagos)

**Razones:**
- API Routes y Server Actions en el mismo repo — Stripe, MercadoPago, n8n sin servidor separado
- SSR/SSG nativo para SEO perfecto
- Deploy zero-config en Vercel
- El landing de hoy escala a portal, blog o SaaS sin cambiar tecnología

## Estilos: Tailwind CSS v4 + CSS Variables

**Elegido sobre:** Solo Tailwind (valores oklch imposibles de mantener en JSX), CSS Modules (15+ archivos duplicados)

**Razones:**
- CSS Variables como fuente de verdad — glassmorphism en un solo lugar
- Tailwind v4 con `@theme inline` consume los tokens directamente
- Clases `bg-ink`, `text-vex`, `glass-light` disponibles en todo el proyecto sin repetición

## Animaciones: GSAP + ScrollTrigger + Framer Motion

| Herramienta | Carril | Efectos |
|-------------|--------|---------|
| GSAP + ScrollTrigger | Scroll épico | Pin, scrub, SplitText, parallax multi-capa |
| Framer Motion | Componentes React | whileHover, AnimatePresence, spring, stagger |

**Elegido sobre:** Solo Framer (sin scrub nativo), CSS scroll-driven (Safari parcial, contadores requieren JS)

## Arquitectura de componentes: sections/ + ui/

**Elegido sobre:** Flat (20+ archivos sin estructura), Atomic Design (overkill sin Design System formal)

## Deploy: Vercel

CI/CD automático, Edge Network, dominio tryvex.cl, zero-config con Next.js.

## Dependencias instaladas

```json
{
  "next": "16.2.4",
  "react": "19.2.4",
  "framer-motion": "^12.x",
  "gsap": "^3.x",
  "zod": "^4.x",
  "tailwindcss": "^4"
}
```

> **Nota GSAP:** SplitText y DrawSVG requieren GSAP Club o licencia Business para uso comercial.
