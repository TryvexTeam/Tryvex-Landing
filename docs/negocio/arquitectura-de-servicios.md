# Arquitectura de servicios — Tryvex

**Documento interno.** No se publica. Define qué se vende, a qué precio, en qué
plazo y —sobre todo— **en qué formato**, que es la pieza que protege al equipo.

Versión 1.0 · 10 de agosto de 2026

---

## 1. El principio que ordena todo

Tryvex es capaz de construir prácticamente cualquier cosa, pero todavía está
construyendo profundidad en varias de ellas. Eso no se comunica al cliente ni
hace falta: **se administra con el formato del servicio.**

> Un proyecto de alcance cerrado promete un resultado.
> Un sprint de descubrimiento promete una respuesta.
>
> Cuando el equipo domina el terreno, se vende lo primero.
> Cuando lo está aprendiendo, se vende lo segundo — y se cobra igual.

Nunca se promete un resultado que dependa de una habilidad que todavía no está
consolidada. No por honestidad abstracta: porque un proyecto incumplido cuesta
mucho más que el que no se tomó.

**Tres reglas internas que no se negocian:**

1. **Plazo publicado = peor escenario, no el mejor.** Se publica el plazo que se
   cumple en la semana mala. Entregar antes construye reputación; entregar tarde
   la destruye. Esto es el motor de la certeza del cliente.
2. **Factor de aprendizaje ×1.6.** Al estimar, se calcula el tiempo que tomaría
   con todo resuelto y se multiplica por 1,6. Ese es el número real. Si el
   proyecto resulta más rápido, el margen queda en la casa.
3. **Nada nuevo entra como proyecto cerrado.** La primera vez que se toma una
   tecnología o un tipo de problema, entra como Fase 1 pagada. La segunda vez ya
   puede venderse cerrado.

---

## 2. Los tres niveles

### NIVEL 1 — Núcleo probado

Lo que el equipo ya entregó y puede repetir con confianza. Se vende con **alcance
fijo, plazo fijo y precio cerrado**.

| Servicio | Plazo publicado | Precio desde |
|---|---|---|
| Landing esencial — una página, formulario, métricas | 7 días hábiles | $150.000 |
| Landing avanzada — multipágina, animación, contenido editable | 3 semanas | $650.000 |
| Automatización de un proceso — un flujo, hasta 3 integraciones | 2 semanas | $450.000 |
| Automatización operativa — varios flujos, panel de control | 4 semanas | $1.200.000 |
| Producto a medida (MVP) — auth, roles, panel, despliegue | 8 semanas | $2.800.000 |

> **Nota sobre la landing esencial:** se mantiene en $150.000 como puerta de
> entrada, pero es un precio de captación, no de negocio. Su función es abrir la
> relación, no financiar al equipo. Idealmente no debería superar el 20% de los
> proyectos del mes.

### NIVEL 2 — Extensión natural

Mismo stack, más alcance. El equipo tiene las piezas; falta repetición. Se vende
cerrado, pero con **una fase de validación al inicio** que permite ajustar el
alcance antes de comprometer todo.

| Servicio | Plazo publicado | Precio desde |
|---|---|---|
| Integración con sistemas chilenos — SII, Bsale, Shopify, Mercado Libre | 3 semanas | $850.000 |
| Panel interno / dashboard operativo | 4 semanas | $1.400.000 |
| Atención automatizada por WhatsApp | 3 semanas | $900.000 |
| Agente de IA aplicada — clasifica, redacta, consulta sistemas | 4 semanas | $1.600.000 |
| Portal de clientes — acceso, estado, documentos | 5 semanas | $2.200.000 |

**Este es el nivel que cambia la conversación comercial.** Deja de venderse
"páginas web" y pasa a venderse operación. Presupuesto distinto, interlocutor
distinto.

### NIVEL 3 — Exploración acompañada

Territorio nuevo. **No se vende como proyecto.** Se vende como sprint de
descubrimiento con entregable propio: un informe de viabilidad, una prueba de
concepto funcionando y una estimación firme para la fase siguiente.

| Formato | Plazo | Precio |
|---|---|---|
| Sprint de diagnóstico — qué se puede automatizar y cuánto rinde | 1 semana | $450.000 |
| Prueba de concepto — el problema difícil, resuelto en pequeño | 2 semanas | $900.000 |

El cliente recibe algo de valor real aunque decida no continuar. Y si continúa,
el monto se descuenta del proyecto. El equipo aprende **pagado y sin comprometer
un resultado que todavía no puede garantizar.**

Aquí entran: procesamiento de datos a escala, modelos predictivos, visión por
computadora, optimización, o cualquier integración con un sistema que el equipo
no haya tocado antes.

---

## 2.1 Componentes adicionales — landing

Los precios de la tabla son **base**: alcance estándar del servicio. Lo que el
cliente pide encima se cotiza aparte y se suma antes de cerrar el precio final.

| Componente | Delta |
|---|---|
| Página adicional | +$40.000 |
| Formulario avanzado / multi-paso | +$30.000 |
| Integración CRM o WhatsApp | +$60.000 |
| Multi-idioma | +$50.000 |
| Animación o interacción a medida | +$70.000 |
| Blog / CMS editable | +$90.000 |
| E-commerce básico (catálogo + checkout simple) | +$250.000 |

Regla: el delta se cotiza en la llamada de descubrimiento, **antes** de cerrar
precio — nunca aparece como sorpresa a mitad de proyecto. Si el pedido no calza
en ningún ítem de esta lista, se trata como Nivel 3 (sprint de diagnóstico).

---

## 3. Cómo se ve desde afuera

El cliente no ve niveles. Ve un catálogo coherente con cuatro familias:

1. **Presencia digital** — sitios y landings que convierten
2. **Automatización de procesos** — el trabajo repetitivo, resuelto
3. **Productos a medida** — software propio, del cliente
4. **Inteligencia aplicada** — agentes y asistentes conectados a sus sistemas

La cuarta familia es la que hoy **no existe en el sitio** y es la que más pesa en
la comparación con las consultoras grandes. Es donde el mercado está mirando.

---

## 4. Reglas de cotización

**Cuándo decir que sí de inmediato:** el pedido cae en Nivel 1, o en Nivel 2 con
integraciones que ya se hicieron antes.

**Cuándo ofrecer Nivel 3 en vez de cotizar el proyecto completo:** cuando aparece
al menos una de estas señales —

- Nadie del equipo ha trabajado antes con esa tecnología
- El resultado depende de un sistema del cliente que no se ha visto
- El cliente no puede describir con precisión qué significa "que funcione"
- La estimación honesta tiene un rango mayor a ±40%

**Cuándo decir que no:** cuando el proyecto exige una garantía de resultado que
depende de algo fuera del control del equipo, y el cliente no acepta una fase de
validación previa. Un no a tiempo cuesta una reunión. Un sí apresurado cuesta un
cliente y la reputación.

---

## 5. Escalera de crecimiento

El objetivo no es cobrar más por lo mismo, sino mover trabajo hacia arriba:

```
Landing $150K  →  el cliente ve que cumplimos
      ↓
Automatización $450K  →  el cliente nos da un proceso
      ↓
Panel o integración $1.4M  →  entramos a la operación
      ↓
Producto o agente $2.8M  →  somos parte de cómo funciona el negocio
```

Cada peldaño se gana entregando bien el anterior. Por eso la regla del plazo
pesimista importa tanto: **la puntualidad es lo que abre el peldaño siguiente**,
mucho más que la calidad del código, que el cliente no puede evaluar.

---

## 6. Lo que hay que revisar en 90 días

- ¿Qué porcentaje de los proyectos fue Nivel 1? Si supera el 60%, el negocio está
  estancado en la puerta de entrada.
- ¿Algún servicio de Nivel 3 se repitió dos veces? Si sí, sube a Nivel 2 y se
  vende cerrado.
- ¿Se cumplieron los plazos publicados? Si alguno se pasó, el factor ×1,6 se
  queda corto y hay que subirlo.

---

<sub>Documento interno de Tryvex · No se comparte con clientes · Versión 1.0</sub>
