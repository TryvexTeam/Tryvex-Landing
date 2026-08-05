# Tryvex Landing — Instrucciones de Proyecto

> Contexto de negocio → `BUSINESS_LOGIC.md`. Catálogo de nodos → `cerebro/index.md`.
> Sincronizado con el código: 2026-08-05.

## ⚠️ Este proyecto está en producción

La landing sirve tráfico real en `https://www.tryvex.tech`. Reglas no negociables:

- Nunca push directo a `main` — siempre rama + PR
- Nunca hacer commit ni push sin aprobación explícita
- Todo cambio se verifica en `localhost:3000` antes de proponerse

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16.2.4 + React 19.2 + TypeScript (App Router) |
| Estilos | CSS custom (`landing.css`) + Tailwind v4 para utilidades |
| Animaciones | GSAP ScrollTrigger + Anime.js v4 + Framer Motion (Lenis instalado, sin uso) |
| Emails | Resend |
| Agenda | Google Calendar API |
| Datos | Supabase (REST) |
| Deploy | Vercel |

## Índice de este archivo

| Sección | Cuándo acudir |
|---------|--------------|
| [Stack](#stack) | Elegir tecnología, verificar versiones |
| [Arquitectura real](#arquitectura-real) | Dónde poner archivos nuevos |
| [Sistema de animación](#sistema-de-animación) | Antes de tocar reveals o scroll |
| [Skills](#skills-claudeskills) | Qué skill invocar para cada tarea |
| [Reglas de desarrollo](#reglas-de-desarrollo) | Antes de tocar animaciones, CSS o precios |
| [Comandos](#comandos) | Correr dev, build, typecheck |
| [Deuda técnica](#deuda-técnica-conocida) | Antes de refactorizar |

---

## Arquitectura real

```
src/
├── app/
│   ├── page.tsx              # Home — Server Component, markup inline (~507 líneas)
│   ├── layout.tsx            # Root layout: fuentes, JSON-LD, Clarity, Toaster
│   ├── globals.css
│   ├── icon.tsx              # Favicon generado
│   ├── opengraph-image.tsx   # OG image generada
│   ├── sitemap.ts
│   ├── catalogo/page.tsx     # Vitrina de demos por rubro
│   ├── planes/page.tsx       # Modelos de contratación
│   ├── preguntas/page.tsx    # FAQ + JSON-LD FAQPage
│   ├── servicios/page.tsx
│   ├── proceso/page.tsx
│   ├── contacto/page.tsx
│   ├── team/page.tsx
│   └── api/
│       ├── contact/route.ts       # Resend
│       ├── availability/route.ts  # Google Calendar
│       ├── reminders/route.ts     # Recordatorios + ingesta al dashboard
│       └── stats/route.ts         # Métricas Supabase (ISR 1h)
├── features/
│   ├── landing/
│   │   ├── components/       # LandingClient, ContactForm, FinalCTA
│   │   └── landing.css       # Estilos de toda la landing (~1.260 líneas)
│   ├── catalogo/
│   │   ├── data.ts           # Fuente única de las demos + link WhatsApp
│   │   ├── catalogo.css
│   │   └── COMO-AGREGAR-UNA-DEMO.md
│   └── team/
│       ├── components/       # TeamClient, TeamCard, TeamDrawer
│       ├── data/members.ts
│       └── equipo.css
├── components/               # Navegación compartida entre rutas
│   ├── NavBar.tsx
│   ├── GooeyNav.tsx + GooeyNav.css
│   └── ExpandNav.tsx
├── lib/
│   ├── google-calendar.ts
│   └── scroll-to-section.ts  # Scroll a secciones, consciente de las escenas animadas
└── styles/
    └── tokens.css            # ⚠️ desconectado — ver deuda técnica
```

**Regla:** cada dominio nuevo va como `src/features/<feature>/` con sus `components/`, su `data/` y su CSS propio. `src/components/` es solo para navegación compartida.

## Sistema de animación

El markup es declarativo; `LandingClient.tsx` lo conecta en el cliente.

| Atributo | Efecto |
|----------|--------|
| `data-anim="fade-up \| fade-down \| fade-left \| fade-right \| scale-in \| rise-blur \| rotate-in"` | Reveal al entrar en viewport — IntersectionObserver añade `.in` |
| `data-split="words"` | Divide el heading en palabras y las revela escalonadas |
| `data-stagger` | Revela los hijos en cascada |
| `data-parallax` + `--p-amt` | Parallax en scroll |
| `data-scene="metrics \| final"` | Escena controlada por GSAP ScrollTrigger |

Las clases `services`, `process`, `offer` y `quote-card` se excluyen del IntersectionObserver porque GSAP las maneja directamente.

### Navegación (`GooeyNav`)

- Los clics se interceptan: se corre la animación y recién a los `NAV_DELAY` ms se navega, igual para todos los ítems. Ese valor **se deriva** de `PARTICLE_LIFE_MAX` — si cambias la duración de las partículas, el retraso se ajusta solo
- Navegación SPA vía `router.push()`, nunca `<a href>` plano (recargaba el documento y cortaba la animación)
- Las rutas se prefetchean al montar, para que el retraso no se sienta
- El ítem activo se marca con un **subrayado rojo deslizante**, no con fondo
- En el home un scrollspy marca la sección visible; se silencia `SPY_MUTE` ms tras un clic para no pelear con el scroll programático
- El scrollspy usa **IntersectionObserver + listener de scroll**. El observer es imprescindible: el navegador restaura la posición de scroll (botón atrás) fuera del ciclo de eventos y solo con el listener el subrayado quedaba marcando una sección vieja
- Solo puede haber **una navegación en cola** (`navTimer`): sin eso, dos clics seguidos dejaban dos viajes agendados y ganaba el primero — hacías clic en un ítem y aterrizabas en otro
- Cada clic crea su propio `.burst` anclado al centro del título. No se reusa una capa que se reposiciona: así los estallidos conviven y ninguna partícula salta de sitio

> ⚠️ **Comillas rectas obligatorias en los selectores de atributo.** `[data-anim="fade-up"]` con comillas curvas (`”`) parsea sin error pero busca el valor literal `”fade-up”`, que ningún elemento tiene: la regla existe y jamás aplica. Es un fallo silencioso — ni el build ni el lint lo detectan.

## Skills (`.claude/skills/`)

### Contexto y Planificación

| Skill | Trigger | Para qué |
|-------|---------|----------|
| `/primer` | "dame contexto", "dónde estamos", inicio de sesión | Carga contexto completo del proyecto |
| `/prp [feature]` | "planea esto", "dame un plan" | Genera blueprint antes de codear |
| `/bucle-agentico` | PRP aprobado listo para ejecutar | Implementa por fases con contexto just-in-time |
| `/autoresearch [skill]` | "optimiza este skill", "mejora X" | Auto-mejora de skills con loop Karpathy |
| `/memory-manager` | Gestionar memoria y contexto persistente | Memoria del proyecto |
| `/caveman` | Contexto pesado | Comprime respuestas |

### Frontend y Diseño

| Skill | Para qué |
|-------|----------|
| `/scroll-experience` | Animaciones scroll, parallax, GSAP, Lenis — **el carril principal de esta landing** |
| `/react-doctor` | Diagnóstico y salud de componentes React |
| `/website-3d` | Experiencias 3D con Three.js / WebGL |
| `/image-generation` | Generación de imágenes con IA |
| `/video-visuals` | Video backgrounds, efectos visuales |
| `/playwright-cli` | Automatización de tests y screenshots |

### Funcionalidades de Producto

| Skill | Para qué |
|-------|----------|
| `/add-login` | Autenticación completa (Supabase Auth) |
| `/add-emails` | Sistema de emails transaccionales |
| `/add-mobile` | Adaptación mobile / PWA |
| `/add-payments` | Integración de pagos (Stripe / MercadoPago) |
| `/supabase` | Migraciones, RLS, queries complejas |
| `/new-app` | Crear nueva aplicación desde cero |
| `/ai` | Integrar IA generativa (OpenAI, Claude API) |

### Ingeniería y Operaciones

| Skill | Para qué |
|-------|----------|
| `/karpathy-principles` | Decisiones arquitectónicas — Karpathy + Musk + Tryvex |
| `/cybersecurity` | Auditoría de seguridad, OWASP, supply chain, Semgrep SAST |
| `/agent-browser` | Automatización de browser (Vercel Agent Browser) |
| `/skill-creator` | Crear skills nuevas para este proyecto |
| `/eject-sf` · `/update-sf` | Gestión de la configuración SaaS Factory |

## Reglas de desarrollo

- **Animaciones**: importar GSAP y Anime.js dinámicamente (`await import()`) — SSR. Registrar plugins en `useEffect` y limpiar con `ctx.revert()`. Respetar `prefers-reduced-motion`
- **CSS**: los estilos de landing van en `src/features/landing/landing.css`, no en `globals.css`. Nunca hardcodear colores — usar las CSS Variables del `:root` de `landing.css`
- **Precios**: viven duplicados en `src/app/page.tsx` (`#offer`) y `src/app/contacto/page.tsx`. Al cambiarlos, sincronizar ambos **y** `BUSINESS_LOGIC.md`
- **FAQ**: el copy está duplicado en el markup y en el JSON-LD de `page.tsx` — actualizar los dos
- **Scrollspy de ítems que van a otra página**: un `NavLink` puede declarar `section: "<id>"`. El clic sigue yendo a `href`, pero el subrayado lo marca cuando esa sección cruza la pantalla. Es lo que hace que el catálogo no se salte al bajar por el home
- **Tarjeta de demo**: existe una sola, `features/catalogo/components/DemoCard.tsx`, usada por `/catalogo` y por el preview del home. No duplicar el markup: antes estaba escrito en las dos páginas
- **Portadas del catálogo**: captura de la portada del sitio **a ancho completo** en `public/catalogo/`, referenciada desde el campo `imagen` de `data.ts`. Recortar los lados para forzar un formato más alto parte el contenido a media palabra y deja de leerse como una web. La grilla `.cat-grid` usa `auto-fit` con tope por pieza: 1 demo queda grande y centrada, y de ahí en adelante se arma sola
- **Catálogo en el home**: la sección `#catalogo` es un preview que lee `demosPublicadas.slice(0, 3)` de `features/catalogo/data.ts`. Al publicar una demo aparece sola, sin tocar el home
- **Etiqueta de sección**: `<span className="sec-num">NN</span><span className="sec-label">Etiqueta</span>` dentro de `.sec-tag` (home) o `.eyebrow` (páginas internas). El número va en Instrument Serif itálica con `--red-vivo`; la etiqueta en mono. **No volver a la píldora** con fondo, borde y punto: es un chip de interfaz pegado sobre contenido editorial y es lo que hace que la página se lea como plantilla
- **`--red-vivo` vs `--red`**: el rojo del logo (`#e53935`) es un trazo sólido. En tipografía fina se lee lavado, así que para texto chico va `--red-vivo` (`#dd1713`), que le devuelve la misma presencia
- **Numeración de secciones**: el home lleva una secuencia correlativa en los `.sec-tag` (01→07). Al insertar o quitar una sección hay que renumerar las siguientes y alinear el `eyebrow` de la página interna equivalente
- **Títulos con `data-split="words"`**: la puntuación va **dentro** del `<em>`. Si queda suelta al cerrarlo, el splitter la trata como palabra propia y puede saltar sola al inicio de la línea siguiente
- **Catálogo**: para publicar una demo nueva se agrega una entrada en `src/features/catalogo/data.ts` con `publicada: true` y `demoUrl` real. **Nunca se tocan componentes.** Guía completa en `src/features/catalogo/COMO-AGREGAR-UNA-DEMO.md`. Regla dura: en la página solo aparecen demos publicadas con URL real — nada de "próximamente"
- **Rutas nuevas**: agregarlas a `INNER_LINKS` en `NavBar.tsx`, a `src/app/sitemap.ts` y a los footers
- **El NavBar se renderiza en cada página**, no en el layout
- **Menú único**: `NAV_LINKS` en `NavBar.tsx`. Cada ítem lleva siempre a su página, desde cualquier parte. El campo `section` mantiene el subrayado siguiendo el recorrido del home mientras scrolleas
- **La separación superior del nav la da `.nav-shell { margin-top: 40px }`**, no un carácter invisible. `page.tsx` tenía un BOM que generaba una línea vacía y empujaba el nav 24px solo en el home: cada navegación movía el layout entero (CLS 0.089 al volver al inicio). No reintroducir el BOM ni bajar ese margen sin medir
- **Páginas internas**: montan `<RevelarAlScroll />` para el revelado al entrar en pantalla y `<VolverAlInicio />` bajo el nav. `LandingClient` es solo del home (trae además las escenas de GSAP/Anime)
- **Anclas internas**: usar siempre `scrollToSection()` de `src/lib/scroll-to-section.ts`, nunca un `window.scrollTo` a mano. Si la sección destino vive dentro de un `[data-scene]`, su contenido se revela con el scroll: aterrizar en el borde superior deja el fotograma 0 (contenido invisible). El helper detecta ese caso, salta al final de la escena y sin transición. Ya está conectado al CTA del nav, al menú y a los enlaces `href="#..."` de la landing
- **Fotos del equipo**: viven en `public/team/<id>.jpg`, con el archivo llamado igual que el `id` del miembro. Un miembro solo muestra foto si su id está además en `MEMBERS_WITH_PHOTO` (`TeamClient.tsx`). El marco es 3/4 con `object-fit: cover`, así que una foto horizontal se recorta a los lados
- **PRPs**: documentar features complejas en `.claude/PRPs/` antes de implementar

## Comandos

```bash
npm run dev       # localhost:3000 (Turbopack)
npm run build     # build de producción
npm run lint      # ESLint
npx tsc --noEmit  # type check
```

## Variables de entorno

No hay `.env.local` en el repo. Sin él la landing **igual levanta**: `/api/stats` cae a fallback (14 negocios, 847 leads) y las rutas de contacto/agenda fallan al invocarse. Lista completa en `cerebro/index.md`.

## Deuda técnica conocida

| Ítem | Detalle |
|------|---------|
| Reglas de animación muertas | `[data-anim="rise-blur"]` y `[data-anim="rotate-in"]` están definidas en `landing.css` pero ningún elemento las usa |
| `tokens.css` huérfano | Define tokens que `landing.css` no consume; este último declara los suyos en `:root` |
| `page.tsx` monolítico | ~507 líneas de markup inline, secciones sin extraer a componentes |
| `landing.css` monolítico | ~1.260 líneas en un solo archivo |
| Precios y FAQ duplicados | Sin fuente única de verdad |
