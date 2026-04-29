# Tryvex Landing — Mapa de Skills FE

> Skills disponibles en `~/.claude/skills/` relevantes para este proyecto.
> Activar vía `Skill` tool antes de cualquier tarea en el área correspondiente.

---

## Tier 1 — Siempre activos

| Skill | Cuándo activar |
|-------|----------------|
| `claude-engineer` | Toda sesión — comportamiento base de autonomía |
| `web-accessibility` | Siempre que se genere HTML, JSX o cualquier UI |

---

## React + Next.js

| Skill | Cuándo activar |
|-------|----------------|
| `nextjs-app-router-patterns` | Toda tarea en `src/app/` — layouts, pages, Server Components |
| `nextjs-best-practices` | Antes de crear rutas, metadata, loading states |
| `react-best-practices` | Antes de escribir cualquier componente React |
| `react-components` | Al crear componentes en `sections/` o `ui/` |
| `react-patterns` | Compound components, render props, composition |
| `react-state-management` | Si se agrega estado global (Zustand, Context) |
| `react-ui-patterns` | Patrones de UI en React: slots, portals, refs |
| `react-nextjs-development` | Integración Next.js ↔ React — Server vs Client |
| `senior-frontend` | Decisiones de arquitectura FE de alto nivel |

---

## Animaciones

| Skill | Cuándo activar |
|-------|----------------|
| `emil-design-eng` | **Siempre** al implementar animaciones — GSAP, Framer, CSS |
| `scroll-experience` | Secciones con pin, scrub, parallax multi-capa |
| `magic-animator` | Efectos de entrada complejos, SplitText, mask reveals |
| `animejs-animation` | Si se decide agregar Anime.js para microinteracciones |
| `threejs-animation` | Si se agrega Three.js / WebGL a alguna sección |
| `spline-3d-integration` | Si se integran escenas 3D de Spline en el landing |
| `remotion` | Si se generan videos o animaciones programáticas |

---

## Diseño + UI

| Skill | Cuándo activar |
|-------|----------------|
| `stitch-ui-design` | Antes de llamar a Stitch — optimizar el prompt visual |
| `stitch-design` | Al generar mockups con el MCP Stitch |
| `stitch-loop` | Al iterar múltiples pantallas con Stitch (baton system) |
| `frontend-design` | Composición visual, layout, jerarquía tipográfica |
| `ui-component` | Al crear GlassCard, Button, AnimatedText, Counter |
| `ui-tokens` | Sistema de tokens CSS — cuando se editen `tokens.css` o `globals.css` |
| `ui-review` | Revisión de calidad visual antes de marcar una sección como completa |
| `ui-ux-pro-max` | Decisiones de UX críticas — CTA, flujo de conversión, onboarding |
| `tailwind-design-system` | Extensiones del sistema de diseño en Tailwind v4 |
| `tailwind-patterns` | Patrones utilitarios en Tailwind — responsive, variants |
| `radix-ui-design-system` | Si se integran primitivos Radix UI (diálogos, tooltips, etc.) |
| `shadcn` | Si se agregan componentes de shadcn/ui al proyecto |

---

## Accesibilidad

| Skill | Cuándo activar |
|-------|----------------|
| `web-accessibility` | Toda UI (siempre activo — ver Tier 1) |
| `fixing-accessibility` | Al corregir issues de a11y detectados en auditoría |
| `ui-a11y` | Componentes interactivos — focus, ARIA, keyboard nav |
| `wcag-audit-patterns` | Antes de cada deploy — auditoría WCAG 2.2 |

---

## Rendimiento

| Skill | Cuándo activar |
|-------|----------------|
| `web-performance-optimization` | Antes de optimizar imágenes, bundles, CWV |
| `react-component-performance` | Al detectar re-renders innecesarios o lag en animaciones |
| `performance-optimizer` | Análisis de bundle size, lazy loading, code splitting |

---

## TypeScript

| Skill | Cuándo activar |
|-------|----------------|
| `typescript-expert` | Tipos complejos, generics, discriminated unions |
| `typescript-pro` | Estándares de tipado en componentes y hooks |

---

## Testing

| Skill | Cuándo activar |
|-------|----------------|
| `e2e-testing` | Al crear tests E2E para flujos del landing |
| `playwright-skill` | Tests visuales con Playwright — screenshots, a11y |

---

## SEO + Metadata

| Skill | Cuándo activar |
|-------|----------------|
| `seo` | Estrategia de contenido, palabras clave para Tryvex |
| `seo-technical` | `<head>`, Open Graph, structured data, sitemap |
| `fixing-metadata` | Corrección de metadata en `layout.tsx` o `page.tsx` |

---

## Deployment + Vercel

| Skill | Cuándo activar |
|-------|----------------|
| `deploy-to-vercel` | Primer deploy a Vercel + dominio tryvex.cl |
| `vercel-react-best-practices` | Optimizaciones Vercel-specific: ISR, Edge, OG images |
| `vercel-composition-patterns` | Layouts y composición para Vercel deployments |

---

## Guías de desarrollo

| Skill | Cuándo activar |
|-------|----------------|
| `frontend-dev-guidelines` | Estándares generales de desarrollo FE |
| `ui-skills` | Set general de habilidades UI — consulta rápida |

---

## Notas de uso

- Activar skills **antes** de empezar a codear la tarea correspondiente, no durante.
- Si dos skills dan instrucciones opuestas: **seguridad > accesibilidad > correctitud > estética > performance**.
- El skill más específico siempre gana sobre el general (ej: `nextjs-app-router-patterns` > `react-best-practices`).
- `emil-design-eng` es obligatorio para cualquier tarea de animación — nunca implementar GSAP o Framer sin activarlo.
