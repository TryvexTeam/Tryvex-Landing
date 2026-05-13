---
name: karpathy-principles
description: "Principios de ingeniería de alta calidad: Andrej Karpathy (deliberate reasoning, simplicity, surgical edits) + Elon Musk (first principles, requirement deletion, questioning assumptions) + principios locales del proyecto Tryvex (bucle agéntico, auto-blindaje, PRP contracts). Activar cuando estés tomando decisiones arquitectónicas, diseñando un sistema, o antes de comenzar cualquier feature compleja. Trigger: 'cómo abordar esto', 'decide la arquitectura', 'cuál es el mejor enfoque'."
allowed-tools: Read, Grep, Glob, Bash
---

# Karpathy × Musk × Tryvex — Principios de Ingeniería

> Síntesis de: Andrej Karpathy (ML/engineering philosophy) + Elon Musk (first principles) + principios operativos del proyecto Tryvex/Jarvis

---

## Índice

| Principio | Origen | Cuándo aplica |
|-----------|--------|--------------|
| [Deliberate Reasoning](#1-deliberate-reasoning) | Karpathy | Antes de codear cualquier cosa |
| [Simplicity First](#2-simplicity-first) | Karpathy + Musk | Diseño de sistemas |
| [Surgical Edits](#3-surgical-edits) | Karpathy | Al modificar código existente |
| [Goal-Driven con Success Criteria](#4-goal-driven-con-success-criteria) | Karpathy | Definir tareas |
| [First Principles de Musk](#5-first-principles-de-musk) | Musk | Cuestionar supuestos |
| [Algorithm de 5 Pasos de Musk](#6-algorithm-de-5-pasos-de-musk) | Musk | Diseñar procesos o sistemas |
| [Bucle Agéntico Just-in-Time](#7-bucle-agéntico-just-in-time) | Tryvex/Jarvis | Implementar features complejas |
| [Auto-Blindaje](#8-auto-blindaje) | Tryvex/Jarvis | Después de cada error |
| [PRP Contract](#9-prp-contract) | Tryvex/Jarvis | Antes de implementar |

---

## 1. Deliberate Reasoning

**Karpathy**: *"No empieces a codear. Primero piensa."*

Antes de escribir una sola línea:
1. ¿Cuál es el problema **real** (no el síntoma)?
2. ¿Qué supuestos estoy haciendo que podrían ser falsos?
3. ¿Cuál es la solución más simple que resolvería esto completamente?
4. ¿Qué podría salir mal?

**Aplicado a Jarvis**: Antes de tocar código, usar `sequential-thinking` si hay >3 pasos encadenados. No improvisar en lo desconocido.

---

## 2. Simplicity First

**Karpathy**: *"La complejidad es el enemigo. Cada línea de código es deuda."*
**Musk**: *"La mejor parte es ninguna parte. El mejor proceso es ningún proceso."*

Reglas:
- La solución más simple que funciona es la correcta
- No agregar abstracciones hasta que el dolor de no tenerlas sea real (3+ repeticiones)
- Preferir código de 50 líneas que cualquiera entiende sobre 200 líneas "elegantes"
- Si necesitas un comentario para explicar QUÉ hace el código → renombrar, no comentar

**Anti-patrón**: Diseñar para casos hipotéticos futuros. YAGNI es ley.

---

## 3. Surgical Edits

**Karpathy**: *"Cambia lo mínimo necesario. Cada cambio introduce riesgo."*

Al modificar código existente:
- Leer el archivo completo antes de editar
- Cambiar SOLO lo que la tarea requiere
- No refactorizar de paso (a menos que el PR sea explícitamente un refactor)
- Verificar: ¿este cambio rompe algo más?
- Diff mínimo = PR fácil de revisar = menos bugs

**Aplicado a Tryvex**: Usar `Edit` en lugar de `Write` para archivos existentes. Grep antes de leer. Nunca sobreescribir sin haber leído.

---

## 4. Goal-Driven con Success Criteria

**Karpathy**: *"Define el éxito antes de empezar. Sin criterio de éxito, nunca terminas."*

Para cada tarea, definir ANTES de empezar:
```
OBJETIVO: [qué debe lograr]
CRITERIO DE ÉXITO: [cómo sé que está terminado — medible]
FUERA DE SCOPE: [qué NO voy a hacer]
```

**Ejemplos de criterios malos vs buenos**:
- ❌ "La animación se ve bien"
- ✅ "LCP < 2.5s, CLS < 0.1, animación visible en scroll a 300px con 60fps"

---

## 5. First Principles de Musk

**Musk**: *"Razona desde física, no desde analogías. Pregunta '¿por qué?' hasta llegar a la verdad fundamental."*

Proceso de first principles:
1. **Identificar el supuesto**: ¿Qué estoy dando por hecho?
2. **Cuestionar**: ¿Es esto verdad? ¿Puedo probarlo?
3. **Descomponer**: Reducir al nivel donde ya no puedo cuestionar más
4. **Reconstruir**: Construir la solución desde esa base

**Aplicado a decisiones técnicas**:
- ¿Por qué usamos GSAP? → Porque ScrollTrigger es el mejor API para scroll-scrub (verificable)
- ¿Por qué CSS custom en lugar de Tailwind? → Porque las animaciones requieren variables dinámicas JS→CSS (verificable)
- Nunca "porque siempre lo hemos hecho así"

---

## 6. Algorithm de 5 Pasos de Musk

Para diseñar cualquier proceso, sistema o feature:

```
Paso 1: CUESTIONAR LOS REQUISITOS
  → ¿Este requisito es necesario? ¿Quién lo pidió y por qué?
  → Los requisitos tontos son más costosos que código malo.

Paso 2: ELIMINAR PARTES O PROCESOS
  → ¿Qué puedo quitar sin perder el objetivo?
  → Si no terminas agregando de vuelta el 10% de lo que eliminaste,
    no eliminaste suficiente.

Paso 3: SIMPLIFICAR Y OPTIMIZAR
  → SOLO después de eliminar. Optimizar lo que no debería existir
    es el mayor desperdicio.

Paso 4: ACELERAR EL CICLO
  → Reducir fricción en el loop de feedback.
    Tests rápidos. Build rápido. Preview rápido.

Paso 5: AUTOMATIZAR
  → ÚLTIMO paso, nunca el primero. Automatizar un proceso malo
    lo hace peor, más rápido.
```

---

## 7. Bucle Agéntico Just-in-Time

**Principio local Tryvex/Jarvis**: *"No planifiques lo que no entiendes. Mapea contexto, luego planifica."*

```
FASE 1: Delimitar fases (no subtareas)
  → Entender el resultado final completo
  → Romper en FASES cronológicas solamente

FASE 2: Mapear contexto real (ANTES de cada fase)
  → ¿Qué archivos existen? ¿Qué construí antes?
  → Abrir solo los archivos relevantes a esta fase
  → DESPUÉS generar subtareas específicas

FASE 3: Ejecutar con auto-blindaje
  → Error → documentar → fix → continuar
  → OK → siguiente subtarea

FASE 4: Validar criterios de éxito
  → npm run build sin errores
  → Screenshot si hay cambio visual
```

**Por qué just-in-time**: El contexto real del código supera cualquier plan previo. Planificar en detalle en Fase 1 genera planes incorrectos que hay que tirar.

---

## 8. Auto-Blindaje

**Principio local Tryvex/Jarvis**: *"Cada error es un activo si se documenta. El mismo error dos veces es inaceptable."*

Después de cualquier error durante una tarea:

```markdown
### [YYYY-MM-DD]: [Título del error]
- **Error**: [Qué falló exactamente]
- **Causa raíz**: [Por qué falló]
- **Fix**: [Cómo se arregló]
- **Aplicar en**: [Dónde más aplica este aprendizaje]
```

Registrar en el PRP activo (sección `Aprendizajes`) o en `cerebro/log.md` si es significativo.

**Anti-patrón**: Arreglar el error sin documentarlo. La próxima sesión repite el mismo error.

---

## 9. PRP Contract

**Principio local Tryvex/Jarvis**: *"Sin PRP aprobado, no hay implementación. El PRP es el contrato entre visión y código."*

Antes de implementar cualquier feature compleja:

```
1. Crear PRP en .claude/PRPs/PRP-XXX-nombre.md
2. Estados: PENDIENTE → APROBADO → EN PROGRESO → COMPLETADO
3. El PRP define:
   - Objetivo + por qué
   - Criterios de éxito medibles
   - Blueprint (solo FASES, no subtareas)
   - Gotchas y anti-patrones conocidos
4. Solo implementar después de APROBADO
5. Auto-blindaje documenta aprendizajes en el PRP
```

---

## Síntesis — Filtro de Decisión Rápida

Cuando enfrentes una decisión técnica, aplica este filtro en orden:

```
1. ¿Tengo criterio de éxito claro? (Karpathy #4)
   NO → definirlo antes de continuar

2. ¿Estoy siguiendo analogías en lugar de razonar desde base? (Musk #5)
   ANALOGÍA → aplicar first principles

3. ¿Puedo eliminar algo de este diseño? (Musk #6)
   SÍ → eliminar primero, luego optimizar

4. ¿Estoy cambiando más de lo necesario? (Karpathy #3)
   SÍ → reducir scope del cambio

5. ¿Mapeé el contexto real antes de planificar? (Tryvex #7)
   NO → leer archivos relevantes primero

6. ¿El error que encontré está documentado? (Tryvex #8)
   NO → auto-blindaje antes de continuar
```
