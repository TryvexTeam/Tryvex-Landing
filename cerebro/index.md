# Tryvex Landing — Cerebro Index
> Catálogo de nodos. Leer primero al iniciar sesión en este proyecto.

## Nodos activos

- [stack.md](stack.md) — Decisiones de stack técnico y sus razones
- [CLAUDE.md](CLAUDE.md) — Reglas operativas y convenciones del proyecto
- [skills.md](skills.md) — Mapa completo de skills FE disponibles (React, animaciones, diseño, a11y, SEO, Vercel)

## Estado del proyecto

- **Fase actual:** F1 completada (scaffold) → siguiente: F2 (UI components compartidos)
- **Spec aprobado:** `docs/superpowers/specs/2026-04-28-tryvex-landing-nextjs-migration-design.md`
- **Deploy:** pendiente — disponible después de F3

## Decisiones clave

| Decisión | Elegido | Descartado |
|----------|---------|------------|
| Framework | Next.js 15 App Router | Vite+React, Astro 5 |
| Estilos | CSS Variables + Tailwind v4 | Solo Tailwind, CSS Modules |
| Animaciones scroll | GSAP + ScrollTrigger | CSS scroll-driven |
| Animaciones UI | Framer Motion | Solo GSAP |
| Arquitectura | sections/ + ui/ | Flat, Atomic Design |
| Deploy | Vercel | Netlify, self-hosted |

## Comandos

```bash
npm run dev    # localhost:3000
npm run build  # producción
npm run lint   # ESLint
```
