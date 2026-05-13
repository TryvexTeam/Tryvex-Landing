---
name: bucle-agentico
description: "Ejecutar features complejas por fases con mapeo de contexto real ANTES de cada fase. Activar cuando un PRP fue aprobado y hay que implementarlo, o cuando la tarea toca multiples archivos coordinados."
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# Modo BLUEPRINT del Bucle Agéntico

> "No planifiques lo que no entiendes. Mapea contexto, luego planifica."

## El Flujo: 5 Pasos

### PASO 1: DELIMITAR EN FASES
- Entender el problema FINAL completo
- Romper en FASES cronológicas
- NO generar subtareas todavía

### PASO 2: MAPEAR CONTEXTO (antes de cada fase)
- Qué archivos existen en `src/features/landing/`
- Qué construí en fases anteriores
- Restricciones del proyecto (GSAP, Anime.js, Lenis)

DESPUÉS de mapear → generar subtareas específicas.

### PASO 3: EJECUTAR SUBTAREAS

```
WHILE subtareas pendientes:
  1. Ejecutar subtarea
  2. Validar resultado
     - Error → AUTO-BLINDAJE
     - OK → siguiente subtarea
```

### PASO 3.5: AUTO-BLINDAJE

```markdown
### [YYYY-MM-DD]: [Título]
- **Error**: [Qué falló]
- **Fix**: [Cómo se arregló]
- **Aplicar en**: [Dónde más aplica]
```

### PASO 4: TRANSICIONAR
- Confirmar fase completa
- Volver a PASO 2 con siguiente fase

### PASO 5: VALIDACIÓN FINAL
- `npm run build` sin errores
- Screenshot Playwright si hay cambio visual
- Criterios de éxito del PRP cumplidos
