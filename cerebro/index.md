# Tryvex Landing — Cerebro Index
> Catálogo de nodos. Leer primero al iniciar sesión en este proyecto.
> Última sincronización con el código: 2026-08-05.

## Nodos activos

- [stack.md](stack.md) — Decisiones de stack técnico y sus razones
- [CLAUDE.md](CLAUDE.md) — Reglas operativas y convenciones del proyecto
- [skills.md](skills.md) — Mapa de skills FE disponibles (React, animaciones, diseño, a11y, SEO, Vercel)
- [../BUSINESS_LOGIC.md](../BUSINESS_LOGIC.md) — Contexto de negocio, servicios, precios reales y equipo

## Estado del proyecto

- **Fase:** en producción. La landing está desplegada y sirviendo tráfico real
- **Deploy:** Vercel → `https://www.tryvex.tech`
- **Rama principal:** `main`. Último merge: PR #2 — sección Catálogo (2026-08)
- **Analytics activo:** Microsoft Clarity + Google Search Console verificado

> ⚠️ **Producción viva.** Nunca hacer push directo a `main`. Todo cambio va en rama y se valida en `localhost:3000` antes de proponer merge.

## Mapa de rutas

| Ruta | Archivo | Tipo |
|------|---------|------|
| `/` | `src/app/page.tsx` | Server Component + `LandingClient` |
| `/catalogo` | `src/app/catalogo/page.tsx` | Vitrina de demos navegables por rubro (`features/catalogo`) |
| `/servicios` | `src/app/servicios/page.tsx` | Detalle de las 3 líneas de servicio |
| `/proceso` | `src/app/proceso/page.tsx` | Los 4 pasos del proceso |
| `/contacto` | `src/app/contacto/page.tsx` | Formulario + precios base + FAQ |
| `/team` | `src/app/team/page.tsx` | Equipo (`features/team`) |

## API Routes

| Endpoint | Función | Depende de |
|----------|---------|------------|
| `/api/contact` | Recibe el formulario, envía email | Resend |
| `/api/availability` | Slots disponibles para agendar | Google Calendar |
| `/api/reminders` | Recordatorios de citas + ingesta al dashboard | Google Calendar, `CITAS_INGEST_TOKEN` |
| `/api/stats` | Métricas del hero y sección de resultados (ISR 1h) | Supabase REST |

## Variables de entorno requeridas

```
RESEND_API_KEY            # emails transaccionales
GOOGLE_CLIENT_ID          # OAuth Calendar
GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN
GOOGLE_CALENDAR_ID
GOOGLE_MEET_LINK
SUPABASE_URL              # métricas /api/stats
SUPABASE_SERVICE_KEY
CITAS_INGEST_TOKEN        # auth de ingesta de citas
NEXT_PUBLIC_SITE_URL      # base para fetch interno de /api/stats
```

> No hay `.env.local` en el repo. Sin estas variables el sitio **igual levanta en local**: `/api/stats` cae a valores de fallback (14 negocios, 847 leads) y las rutas de contacto/agenda fallan al invocarse.

## Decisiones clave

| Decisión | Elegido | Descartado |
|----------|---------|------------|
| Framework | Next.js 16 App Router | Vite+React, Astro 5 |
| Estilos | CSS custom (`landing.css`) + Tailwind v4 para utilidades | Solo Tailwind, CSS Modules |
| Animaciones scroll | GSAP + ScrollTrigger | CSS scroll-driven |
| Animaciones de escena | Anime.js v4 | Solo GSAP |
| Smooth scroll | `scroll-behavior: smooth` nativo | Lenis (instalado pero sin usar) |
| Arquitectura | Feature-first (`features/`) | `sections/` + `ui/`, Atomic Design |
| Deploy | Vercel | Netlify, self-hosted |
| Emails | Resend | SendGrid, SMTP propio |
| Agenda | Google Calendar API | Cal.com, Calendly |

## Deuda técnica conocida

| Ítem | Detalle |
|------|---------|
| `src/styles/tokens.css` huérfano | Define tokens que `landing.css` no consume — este último declara sus propias variables en `:root` |
| `page.tsx` monolítico | ~507 líneas de markup inline; las secciones no están extraídas a componentes |
| `landing.css` monolítico | ~1.260 líneas en un solo archivo |
| Reglas de animación muertas | `[data-anim="rise-blur"]` y `[data-anim="rotate-in"]` existen en `landing.css` pero ningún elemento las usa |
| **Fotos del equipo rotas** | Las 5 imágenes de `members.ts` apuntan a `/team/*.png\|webp` y `public/team/` no existe — nunca estuvo en git. Da 400 en local y **404 en producción** (`tryvex.tech` y el preview de Vercel). La página `/team` se ve sin fotos |
| `lenis` instalado sin uso | Figura en `package.json` y en las docs como smooth scroll, pero no se importa en ningún archivo: el scroll suave lo da `scroll-behavior: smooth` nativo en `landing.css:28` |
| Lint con 7 errores previos | `react-hooks/preserve-manual-memoization` en `ExpandNav.tsx` y entidades sin escapar en páginas — anteriores a esta sesión |
| Duplicación de precios | Los precios viven en `page.tsx` y `contacto/page.tsx` sin fuente única |
| BOM invisible en `page.tsx` | Un carácter BOM antes de `<div className="scroll-progress">` crea una línea vacía en el `<body>` que empuja el nav 24px hacia abajo. Es parte del look actual: al quitarlo o al mover el nav antes de él, la portada se descuadra |
| Catálogo con una sola demo | `features/catalogo/data.ts` tiene solo `restaurante` publicada. Aparece tanto en `/catalogo` como en el preview del home; con más rubros ambas grillas se llenan solas |
| FAQ duplicado | El copy del FAQ se repite en el markup y en el JSON-LD de `page.tsx` |

## Comandos

```bash
npm run dev       # localhost:3000
npm run build     # build de producción
npm run lint      # ESLint
npx tsc --noEmit  # type check
```
