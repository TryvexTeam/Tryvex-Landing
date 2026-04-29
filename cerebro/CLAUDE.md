# Tryvex Landing — Reglas del proyecto

## Stack
- Next.js 15 App Router + TypeScript
- Tailwind CSS v4 (tokens vía CSS Variables en `src/styles/tokens.css`)
- GSAP + ScrollTrigger para scroll animations
- Framer Motion para interacciones de componentes React

## Convenciones de código

- Componentes de sección → `src/components/sections/` — uno por sección
- UI reutilizable → `src/components/ui/` — GlassCard, AnimatedText, Counter, SectionWrapper, Button
- Hooks → `src/hooks/` — lógica de animación desacoplada del markup
- CSS Variables son la fuente de verdad — nunca hardcodear colores en JSX
- Clases Tailwind disponibles: `bg-ink`, `text-paper`, `text-vex`, `text-signal`, `glass-light`, `glass-dark`

## Colores del sistema

| Token | Valor | Uso |
|-------|-------|-----|
| `ink` | #0e0e0e | Negro editorial, texto principal |
| `paper` | #f4f1ea | Crema cálido, fondo principal |
| `vex` | oklch(65% .18 28) | Rojo-naranja, color de marca |
| `signal` | oklch(65% .12 250) | Azul acero, acento secundario |

## Fuentes

- Geist Sans → `font-sans` — texto UI general
- Geist Mono → `font-mono` — código, etiquetas, tags
- Instrument Serif → `font-serif` — headings editoriales

## GSAP en Next.js — reglas críticas

- Solo en Client Components (`"use client"`)
- Registrar plugins en `useEffect`: `gsap.registerPlugin(ScrollTrigger)`
- Siempre limpiar con `ctx.revert()` en el return del effect
- Nunca llamar GSAP fuera de `useEffect` — causa errores de SSR

## Secciones del landing (orden en page.tsx)

Navbar → Hero → LogoStrip → Services → Process → Metrics → Testimonial → Pricing → FAQ → CTAFinal → Footer

## Datos del proyecto

- Email: hola@tryvex.cl | ignacio@tryvex.cl
- Dominio: tryvex.cl
- Fundador CEO: Ignacio Navarrete
