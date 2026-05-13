---
name: agent-browser
description: "Automatización de navegador para agentes IA usando Vercel Agent Browser (Rust CLI nativo). Activar cuando necesites navegar URLs, hacer clic, llenar formularios, tomar screenshots con referencias a elementos, interceptar red, inspeccionar React, medir Web Vitals, o controlar múltiples tabs. Trigger: 'navega a', 'haz click en', 'screenshot del sitio', 'llena el formulario', 'inspecciona el componente'."
allowed-tools: Read, Bash, Glob, Grep
---

# Agent Browser — Vercel Labs

> Fuente: github.com/vercel-labs/agent-browser
> CLI Rust nativo para automatización de browser en flujos agénticos — más rápido y confiable que Playwright para casos IA

---

## Índice

| Capacidad | Cuándo usar |
|-----------|-------------|
| [Setup y Daemon](#1-setup-y-daemon) | Primera vez, iniciar Chrome |
| [Navegación](#2-navegación) | Ir a URLs, volver, recargar |
| [Descubrimiento de Elementos](#3-descubrimiento-de-elementos) | Ver qué hay en la página |
| [Interacciones](#4-interacciones) | Click, type, fill, select |
| [Screenshots](#5-screenshots) | Capturar con referencias visuales |
| [Red e Interceptación](#6-red-e-interceptación) | Monitorear requests |
| [Multi-Tab](#7-multi-tab) | Varios contextos paralelos |
| [React Inspector](#8-react-inspector) | Props, estado, fiber tree |
| [Web Vitals](#9-web-vitals) | LCP, CLS, INP, FCP |
| [Modo JSON Agéntico](#10-modo-json-agéntico) | Output parseable para agentes |

---

## 1. Setup y Daemon

```bash
# Instalar (Rust CLI)
cargo install agent-browser

# Iniciar daemon Chrome (mantener vivo entre comandos)
agent-browser daemon start

# Verificar estado
agent-browser daemon status

# Detener
agent-browser daemon stop
```

**Por qué daemon**: Evita el costo de arrancar Chrome en cada comando. Crítico para flujos agénticos con múltiples acciones.

---

## 2. Navegación

```bash
# Navegar a URL
agent-browser navigate https://tryvex.cl

# Con timeout explícito
agent-browser navigate https://tryvex.cl --timeout 10000

# Volver atrás
agent-browser back

# Recargar
agent-browser reload

# Obtener URL actual
agent-browser url
```

---

## 3. Descubrimiento de Elementos

Agent Browser usa **Accessibility Trees** — sin selectores CSS frágiles.

```bash
# Ver snapshot completo de la página (árbol de accesibilidad)
agent-browser snapshot

# Output: lista de elementos con referencias @e1, @e2, @e3...
# Ejemplo:
# @e1 [button] "Comenzar ahora" (clickable)
# @e2 [link] "Ver servicios" href="/servicios"
# @e3 [input] "Email" (editable)
```

**Usar refs `@eN` en comandos posteriores** — más estables que selectores CSS:

```bash
agent-browser click @e1        # Click en "Comenzar ahora"
agent-browser type @e3 "hola@tryvex.cl"
```

---

## 4. Interacciones

```bash
# Click
agent-browser click @e1
agent-browser click "texto del botón"   # Por texto visible también

# Escribir
agent-browser type @e3 "texto a escribir"

# Llenar campo (clear + type)
agent-browser fill @e3 "hola@tryvex.cl"

# Select dropdown
agent-browser select @e5 "Opción 2"

# Hover
agent-browser hover @e2

# Presionar tecla
agent-browser press Enter
agent-browser press Tab
agent-browser press Escape

# Scroll
agent-browser scroll down 500    # 500px hacia abajo
agent-browser scroll to @e10     # Scroll hasta elemento
```

---

## 5. Screenshots

```bash
# Screenshot completo con etiquetas de elementos
agent-browser screenshot --label

# Screenshot sin etiquetas
agent-browser screenshot

# Screenshot de elemento específico
agent-browser screenshot @e1

# Guardar a archivo
agent-browser screenshot --output .playwright-mcp/screenshots/landing-$(date +%Y%m%d).png --label
```

**La opción `--label` dibuja los refs `@eN` sobre la imagen** — permite al agente referenciar elementos visualmente.

---

## 6. Red e Interceptación

```bash
# Ver todas las requests de la página
agent-browser network

# Filtrar por tipo
agent-browser network --type fetch
agent-browser network --type xhr

# Interceptar y bloquear
agent-browser intercept block "*.googleanalytics.com"

# Mock de respuesta API
agent-browser intercept mock "/api/contacto" --status 200 --body '{"ok":true}'

# Ver headers de una request específica
agent-browser network --url "/api/contacto" --headers
```

---

## 7. Multi-Tab

```bash
# Abrir nueva tab
agent-browser tab new https://tryvex.cl/servicios

# Listar tabs abiertas
agent-browser tab list
# Output: [0] https://tryvex.cl (active), [1] https://tryvex.cl/servicios

# Cambiar tab activa
agent-browser tab switch 1

# Cerrar tab
agent-browser tab close 1
```

---

## 8. React Inspector

```bash
# Ver árbol de componentes React en la página actual
agent-browser react tree

# Inspeccionar props de un componente
agent-browser react inspect "LandingClient"

# Ver estado de un componente
agent-browser react state "HeroSection"

# Buscar componente por nombre
agent-browser react find "ScrollTrigger"
```

**Útil para**: Verificar que animaciones GSAP se montan correctamente, inspeccionar props de componentes de la landing.

---

## 9. Web Vitals

```bash
# Medir Core Web Vitals de la página actual
agent-browser vitals

# Output ejemplo:
# LCP: 1.2s ✅ (target <2.5s)
# CLS: 0.05 ✅ (target <0.1)
# INP: 180ms ✅ (target <200ms)
# FCP: 0.8s ✅ (target <1.5s)

# Con navegación incluida
agent-browser navigate https://tryvex.cl && agent-browser vitals
```

---

## 10. Modo JSON Agéntico

Para flujos donde el agente necesita parsear el output:

```bash
# Snapshot como JSON
agent-browser snapshot --json

# Encadenar con jq
agent-browser snapshot --json | jq '.elements[] | select(.role=="button")'
```

**Output JSON estándar**:
```json
{
  "elements": [
    {"ref": "@e1", "role": "button", "text": "Comenzar ahora", "clickable": true},
    {"ref": "@e2", "role": "link", "text": "Servicios", "href": "/servicios"}
  ],
  "url": "https://tryvex.cl",
  "title": "Tryvex — Automatizamos lo aburrido"
}
```

---

## Flujo Típico para Validación de Landing

```bash
# 1. Iniciar daemon
agent-browser daemon start

# 2. Navegar
agent-browser navigate http://localhost:3000

# 3. Ver elementos disponibles
agent-browser snapshot

# 4. Screenshot con labels
agent-browser screenshot --label --output .playwright-mcp/screenshots/test-$(date +%s).png

# 5. Medir vitals
agent-browser vitals

# 6. Probar CTA principal
agent-browser click "Comenzar ahora"
```

---

## Diferencias vs Playwright MCP

| Aspecto | Agent Browser | Playwright MCP |
|---------|--------------|----------------|
| Selectores | Accessibility tree (@eN) | CSS / XPath |
| Velocidad | Más rápido (daemon Rust) | Más lento (spawn por comando) |
| React inspection | Nativo | Requiere extensión |
| Web Vitals | Integrado | Requiere Lighthouse |
| Uso agéntico | Optimizado (JSON) | General purpose |

**Regla**: Preferir agent-browser para flujos agénticos de validación. Usar Playwright MCP para tests con assertions complejas.
