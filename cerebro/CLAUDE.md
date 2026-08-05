# Tryvex Landing — Reglas del proyecto

> Sincronizado con el código: 2026-08-05.

## Stack real

- Next.js 16.2.4 App Router + React 19.2 + TypeScript
- CSS custom (`src/features/landing/landing.css`) como capa principal de estilos
- Tailwind CSS v4 para utilidades sueltas en JSX (`bg-paper`, `text-ink`, `min-h-full`)
- GSAP + ScrollTrigger para scroll animations
- Anime.js v4 para animaciones de escena
- Lenis está en `package.json` pero **no se importa en ningún archivo**: el smooth scroll es `scroll-behavior: smooth` nativo
- Framer Motion instalado (uso puntual en componentes React)
- `sileo` para toasts

## Convenciones de código

- Arquitectura **feature-first**: cada dominio vive completo en `src/features/<feature>/` con sus `components/`, `data/` y su CSS propio
- Componentes de navegación compartidos → `src/components/` (`NavBar`, `GooeyNav`, `ExpandNav`)
- Los estilos de la landing van en `src/features/landing/landing.css`, nunca en `globals.css`
- El equipo tiene su propio CSS: `src/features/team/equipo.css`
- Nunca hardcodear colores en JSX — usar las CSS Variables de `landing.css`
- Los datos estructurados (JSON-LD) se inyectan con `dangerouslySetInnerHTML` en `layout.tsx` (Organization + WebSite) y en `page.tsx` (FAQPage)

## Colores del sistema

Declarados en el `:root` de `landing.css` — esa es la fuente de verdad operativa:

| Token | Valor | Uso |
|-------|-------|-----|
| `--paper` | `#f4f1ea` | Crema cálido, fondo principal |
| `--paper-2` | `#efece4` | Variante de fondo |
| `--ink` | `#0e0e0e` | Negro editorial, texto principal |
| `--ink-2` | `#1a1a1a` | Negro secundario |
| `--muted` | `#6b6863` | Texto secundario |
| `--muted-2` | `#98948c` | Texto terciario |
| `--red` | `#e53935` | Color de marca, acentos y CTAs |
| `--red-soft` | `rgba(229,57,53,0.10)` | Fondos de acento |
| `--cream` | `#ece8dc` | Bloques cálidos |
| `--line` / `--line-soft` | `rgba(14,14,14,.10)` / `.06` | Bordes y separadores |

Glass (estilo macOS Tahoe): `--glass-bg`, `--glass-bg-strong`, `--glass-bg-dark`, `--glass-border`, `--glass-border-dark`, `--glass-shadow`, `--glass-shadow-dark`.

> `src/styles/tokens.css` existe pero **no está conectado** a `landing.css`. No editarlo esperando ver cambios en la landing.

## Fuentes

Cargadas con `next/font/google` en `layout.tsx`:

- Geist Sans → `--font-geist-sans` — texto UI general
- Geist Mono → `--font-geist-mono` — código, etiquetas, metadatos
- Instrument Serif → `--font-instrument-serif` — énfasis editorial (`<em>` en headings)

## Sistema de animación

El markup es declarativo: los elementos se marcan con atributos y `LandingClient.tsx` los conecta.

| Atributo | Efecto |
|----------|--------|
| `data-anim="fade-up \| fade-down \| fade-left \| fade-right \| scale-in \| rise-blur \| rotate-in"` | Reveal al entrar en viewport (IntersectionObserver añade `.in`) |
| `data-split="words"` | Divide el heading en palabras y las revela escalonadas |
| `data-stagger` | Revela los hijos en cascada |
| `data-parallax` + `--p-amt` | Parallax en scroll |
| `data-scene="metrics \| final"` | Escena controlada por GSAP ScrollTrigger |

Algunas clases (`services`, `process`, `offer`, `quote-card`) se excluyen del IntersectionObserver porque las maneja GSAP directamente.

## GSAP en Next.js — reglas críticas

- Solo en Client Components (`"use client"`)
- Importar GSAP y Anime.js **dinámicamente** (`await import()`) — evita romper SSR
- Registrar plugins dentro de `useEffect`: `gsap.registerPlugin(ScrollTrigger)`
- Siempre limpiar con `ctx.revert()` en el return del effect
- Respetar `prefers-reduced-motion` (el código ya lo consulta con la variable `reduce`)

## Secciones del home (orden real en `page.tsx`)

NavBar → Hero → Manifesto → Servicios (`#services`) → Proceso (`#process`) → Métricas → Testimonial → Planes (`#offer`) → FAQ (`#faq`) → CTA Final (`#final`) → Footer

## Datos del proyecto

- Dominio: `https://www.tryvex.tech`
- Email: `tryvexentreprise@gmail.com`
- Fundador CEO: Ignacio Navarrete
- Ciudad: Santiago, CL

## Reglas de trabajo

- **El sitio está en producción.** Nunca push directo a `main` — rama + PR, y solo con aprobación explícita
- Verificar todo cambio en `localhost:3000` antes de proponerlo
- Al tocar precios, sincronizar `page.tsx`, `contacto/page.tsx` y `BUSINESS_LOGIC.md`
- PRPs de features complejas → documentar en `.claude/PRPs/`
