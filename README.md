# Tryvex Landing

Landing page oficial de Tryvex — software studio en Santiago especializado en automatizaciones, landing pages y productos SaaS a medida.

🌐 **En producción:** [www.tryvex.tech](https://www.tryvex.tech)

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16.2.4 (App Router) |
| Runtime UI | React 19.2 |
| Lenguaje | TypeScript |
| Estilos | CSS custom (`landing.css`) + Tailwind v4 para utilidades |
| Animaciones scroll | GSAP + ScrollTrigger |
| Animaciones de escena | Anime.js v4 |
| Smooth scroll | `scroll-behavior: smooth` nativo (Lenis instalado, sin uso) |
| Animaciones UI | Framer Motion |
| Emails | Resend |
| Agenda | Google Calendar API |
| Datos | Supabase (REST) |
| Deploy | Vercel |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx            ← metadata SEO, JSON-LD, fuentes, Clarity, Toaster
│   ├── page.tsx              ← home: markup de todas las secciones
│   ├── globals.css
│   ├── icon.tsx              ← favicon generado
│   ├── opengraph-image.tsx   ← OG image generada
│   ├── sitemap.ts
│   ├── catalogo/             ← vitrina de demos navegables por rubro
│   ├── servicios/ proceso/ contacto/ team/
│   └── api/
│       ├── contact/          ← formulario → Resend
│       ├── availability/     ← slots de agenda → Google Calendar
│       ├── reminders/        ← recordatorios + ingesta al dashboard
│       └── stats/            ← métricas del hero → Supabase (ISR 1h)
├── features/
│   ├── landing/              ← LandingClient, ContactForm, FinalCTA + landing.css
│   ├── catalogo/             ← data.ts (demos) + catalogo.css + guía del equipo
│   └── team/                 ← TeamClient, TeamCard, TeamDrawer + data + equipo.css
├── components/               ← NavBar, GooeyNav, ExpandNav (navegación compartida)
├── lib/
│   └── google-calendar.ts
└── styles/
    └── tokens.css            ← ⚠️ actualmente desconectado de landing.css

cerebro/
├── index.md                  ← catálogo de nodos (leer primero en cada sesión)
├── CLAUDE.md                 ← reglas y convenciones del proyecto
├── stack.md                  ← decisiones técnicas y sus razones
└── skills.md                 ← mapa de skills FE

CLAUDE.md                     ← instrucciones para agentes
BUSINESS_LOGIC.md             ← negocio, servicios, precios y equipo
```

---

## Sistema de colores

Declarados en el `:root` de `src/features/landing/landing.css`:

```css
--paper:  #f4f1ea   /* crema cálido — fondo principal */
--ink:    #0e0e0e   /* negro editorial — texto principal */
--red:    #e53935   /* color de marca — acentos y CTAs */
--muted:  #6b6863   /* texto secundario */
--cream:  #ece8dc   /* bloques cálidos */
```

Más glass tokens estilo macOS Tahoe: `--glass-bg`, `--glass-bg-strong`, `--glass-bg-dark`, `--glass-border`, `--glass-shadow`.

---

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:3000 (Turbopack)
npm run build     # build de producción
npm run lint      # ESLint
npx tsc --noEmit  # type check
```

### Variables de entorno

Crear `.env.local` con:

```
RESEND_API_KEY
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN
GOOGLE_CALENDAR_ID
GOOGLE_MEET_LINK
SUPABASE_URL
SUPABASE_SERVICE_KEY
CITAS_INGEST_TOKEN
NEXT_PUBLIC_SITE_URL
```

Sin ellas el sitio levanta igual: `/api/stats` cae a valores de fallback y las rutas de contacto y agenda fallan al invocarse.

---

## ⚠️ Este repo está en producción

- Nunca push directo a `main` — siempre rama + PR
- Verificar todo cambio en `localhost:3000` antes de proponerlo
- Al tocar precios, sincronizar `src/app/page.tsx`, `src/app/contacto/page.tsx` y `BUSINESS_LOGIC.md`

### Publicar una demo en el catálogo

Se agrega una entrada en `src/features/catalogo/data.ts` con `publicada: true` y `demoUrl` real. No se tocan componentes. Guía completa: `src/features/catalogo/COMO-AGREGAR-UNA-DEMO.md`.

---

## Cerebro del proyecto

Este proyecto usa el sistema `claude-brain` para contexto acumulado entre sesiones:

- **`cerebro/index.md`** → leer primero al iniciar sesión
- **`cerebro/CLAUDE.md`** → convenciones, tokens, reglas GSAP
- **`cerebro/stack.md`** → decisiones técnicas y razones

---

## Contacto

- tryvexentreprise@gmail.com
- Ignacio Navarrete — Fundador · CEO
- Santiago, Región Metropolitana, Chile
