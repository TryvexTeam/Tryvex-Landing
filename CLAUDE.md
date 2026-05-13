# Tryvex Landing — Instrucciones de Proyecto

> Leer `BUSINESS_LOGIC.md` para contexto completo de negocio.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js + TypeScript (App Router) |
| Estilos | CSS custom (`landing.css`) + Tailwind para utilidades |
| Animaciones | GSAP ScrollTrigger + Anime.js v4 + Lenis |

## Arquitectura Feature-First

```
src/
├── app/
│   ├── page.tsx        # Entry point — importa desde features/
│   ├── layout.tsx      # Root layout + importa landing.css
│   └── globals.css
├── features/
│   └── landing/
│       ├── components/
│       │   └── LandingClient.tsx  # Client component con animaciones
│       └── landing.css            # Estilos de la landing
├── components/
│   ├── sections/
│   └── ui/
├── hooks/
└── styles/
    └── tokens.css
```a
## Índice de este archivo

| Sección | Cuándo acudir |
|---------|--------------|
| [Stack](#stack) | Elegir tecnología, verificar versiones |
| [Arquitectura Feature-First](#arquitectura-feature-first) | Dónde poner archivos nuevos |
| [Skills](#skills-claude-skills) | Qué skill invocar para cada tarea |
| [Reglas de desarrollo](#reglas-de-desarrollo) | Antes de tocar animaciones o CSS |
| [Comandos](#comandos) | Correr dev, build, typecheck |
| [Estado](#estado) | Ver qué features están completas |

---

## Skills (`.claude/skills/`)

### Contexto y Planificación

| Skill | Trigger | Para qué |
|-------|---------|----------|
| `/primer` | "dame contexto", "donde estamos", inicio sesión | Carga contexto completo del proyecto |
| `/prp [feature]` | "planea esto", "dame un plan" | Genera blueprint antes de codear |
| `/bucle-agentico` | PRP aprobado listo para ejecutar | Implementa por fases con contexto just-in-time |
| `/autoresearch [skill]` | "optimiza este skill", "mejora X" | Auto-mejora de skills con loop Karpathy |

### Funcionalidades de Producto

| Skill | Para qué |
|-------|----------|
| `/add-login` | Inyectar autenticación completa (Supabase Auth) |
| `/add-emails` | Sistema de emails transaccionales |
| `/add-mobile` | Adaptación mobile / PWA |
| `/add-payments` | Integración de pagos (Stripe / MercadoPago) |
| `/supabase` | Migraciones, RLS, queries complejas |
| `/new-app` | Crear nueva aplicación desde cero |

### Frontend y Diseño

| Skill | Para qué |
|-------|----------|
| `/scroll-experience` | Animaciones scroll, parallax, GSAP, Lenis |
| `/website-3d` | Experiencias 3D con Three.js / WebGL |
| `/ai` | Integrar IA generativa (OpenAI, Claude API) |
| `/image-generation` | Generación de imágenes con IA |
| `/video-visuals` | Video backgrounds, efectos visuales |

### Gestión y Operaciones

| Skill | Para qué |
|-------|----------|
| `/skill-creator` | Crear skills nuevas para este proyecto |
| `/memory-manager` | Gestionar memoria y contexto persistente |
| `/playwright-cli` | Automatización de tests y screenshots |
| `/caveman` | Comprimir respuestas cuando el contexto es pesado |
| `/eject-sf` | Eliminar configuración SaaS Factory del proyecto |
| `/update-sf` | Actualizar a última versión de SaaS Factory |

### Ingeniería y Seguridad

| Skill | Para qué |
|-------|----------|
| `/cybersecurity` | Auditoría de seguridad, OWASP, supply chain, Semgrep SAST |
| `/agent-browser` | Automatización de browser con Vercel Agent Browser (Rust, accessibility trees) |
| `/karpathy-principles` | Principios de ingeniería: Karpathy + Musk + Tryvex — decisiones arquitectónicas |

## Reglas de desarrollo

- **Animaciones**: importar GSAP y Anime.js dinámicamente (`import()`) — SSR
- **CSS**: estilos de landing van en `src/features/landing/landing.css`, no en globals
- **PRPs**: documentar en `.claude/PRPs/` antes de implementar features complejas

## Comandos

```bash
npm run dev       # Desarrollo local
npm run build     # Build de producción
npx tsc --noEmit  # Type check
```

## Estado

Ver `.agent/PROGRESS.md` para el estado actual de features de animación.