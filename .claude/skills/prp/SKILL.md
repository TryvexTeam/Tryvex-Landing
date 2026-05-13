---
name: prp
description: "Planificar una feature compleja de Tryvex Landing antes de implementarla. Genera un PRP con objetivo, fases, y criterios de exito. Activar cuando el usuario diga: planea esto, dame un plan, quiero agregar X, blueprint esto."
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Skill: Generar PRP para Tryvex Landing

> Generar un PRP para: $ARGUMENTS

## Proceso

### Paso 1: Leer template base
Lee el template en:
```
C:/Users/w10/.claude/PRPs/prp-base.md
```

### Paso 2: Investigar contexto del proyecto
- Leer `src/features/landing/components/LandingClient.tsx`
- Leer `src/features/landing/landing.css`
- Leer `.agent/PROGRESS.md` para ver estado actual

### Paso 3: Generar el PRP
Crear `.claude/PRPs/PRP-XXX-{feature-name}.md` siguiendo el template.

### Paso 4: Presentar al usuario
Mostrar: objetivo, fases, decisiones clave.
**NO implementar nada todavía.**

## Reglas
- SIEMPRE leer `prp-base.md` antes de generar
- NUNCA generar subtareas dentro de las fases
- PRPs se guardan en `.claude/PRPs/` de este proyecto
