# Mantención y mensualidades — Tryvex

**Documento interno.** Qué se cobra después de la entrega, con qué respaldo, y
cómo se presenta al cliente sin que suene a peaje.

Versión 1.0 · 10 de agosto de 2026

---

## 1. El respaldo: qué dice la industria

La referencia más usada en la industria del software es que **la mantención anual
cuesta entre 15% y 25% del valor del desarrollo original**. Gartner y Forrester
lo ubican entre 15% y 20%.

Un modelo alternativo frecuente es **8–12% anual de retainer más pago por
evolución nueva**. Los sistemas con deuda técnica alta llegan a 30–40%.

Aplicado al catálogo de Tryvex:

| Proyecto | Valor | 15% anual | Equivalente mensual |
|---|---|---|---|
| Landing avanzada | $650.000 | $97.500 | ~$8.000 |
| Automatización operativa | $1.200.000 | $180.000 | ~$15.000 |
| Panel operativo | $1.400.000 | $210.000 | ~$17.500 |
| Agente de IA | $1.900.000 | $285.000 | ~$24.000 |
| MVP | $3.900.000 | $585.000 | ~$49.000 |

> Estos números validan el piso, no lo definen. Bajo $45.000 mensuales un
> contrato de mantención consume más en administración de lo que deja.

---

## 2. El argumento honesto para cobrar infraestructura

Esto no es un cargo inventado. Son dos hechos verificables:

**Vercel Hobby es de uso no comercial.** El plan gratuito prohíbe expresamente
proyectos que generen ingresos. Un sitio de empresa que capta clientes **no puede
estar ahí**: corresponde el plan Pro, que parte en USD 20 por asiento al mes.

**Supabase Free se suspende por inactividad.** El plan gratuito da 500 MB de base
de datos, 1 GB de almacenamiento y 5 GB de transferencia, pero **pausa el
proyecto tras una semana sin actividad**. Para un sistema en producción eso
significa caerse solo. El plan Pro parte en USD 25 al mes por proyecto.

Cómo se dice al cliente, sin tecnicismos:

> *"Su sitio no puede vivir en un plan gratuito: las condiciones de uso no
> permiten proyectos comerciales, y la base de datos gratuita se suspende sola si
> pasa una semana tranquila. Su mensualidad cubre la infraestructura real para
> que eso no ocurra."*

Es cierto, es verificable, y desarma la objeción de "¿por qué pago si ya está
hecho?" sin sonar a excusa.

**Nota de margen:** una cuenta Pro del equipo aloja varios proyectos de clientes.
El costo marginal del cliente número cinco es cercano a cero, mientras el valor
entregado —que siga en pie— es el mismo. Ahí está el margen del servicio.

---

## 3. Los tres planes

Todo proyecto entregado pasa a uno de estos planes después de los 90 días de
mantención sin costo.

| | **Esencial** | **Activo** | **Socio** |
|---|---|---|---|
| **Mensual** | $49.000 | $139.000 | $320.000 |
| Infraestructura y dominio | ✓ | ✓ | ✓ |
| Certificado y respaldos | ✓ | ✓ | ✓ |
| Monitoreo de caídas | ✓ | ✓ | ✓ |
| Actualizaciones de seguridad | ✓ | ✓ | ✓ |
| Corrección de fallas | ✓ | ✓ | ✓ |
| Horas de evolución al mes | — | 3 h | 8 h |
| Respuesta ante incidente | 72 h | 48 h | 24 h |
| Reporte mensual | — | ✓ | ✓ |
| Reunión de revisión | — | — | mensual |
| Prioridad en la fila | — | — | ✓ |

**Ciclo anual:** el Cliente puede pagar el año por adelantado y paga **10
meses en vez de 12** (2 mensualidades de descuento, ~16,7%).

| | **Esencial** | **Activo** | **Socio** |
|---|---|---|---|
| **Anual (10×)** | $490.000 | $1.390.000 | $3.200.000 |
| **Ahorro vs. 12 meses** | $98.000 | $278.000 | $640.000 |

Aplica también a landing escalonada (3.1) sobre su mensualidad correspondiente.
No aplica al modelo de SaaS por porcentaje (3.2): ahí no hay mensualidad fija
que anualizar. Condición contractual en `docs/legal/acuerdo-terminos-negocio.md`
§3.

**Regla de asignación:** automatizaciones, paneles, integraciones y portales
entran a Esencial (hasta $650.000) o Activo (sobre $1.200.000) según el
proyecto. Agentes de IA se ofrecen en Socio, porque son sistemas que la empresa
usa todos los días. Landing y SaaS a medida usan modelos propios — ver 3.1 y 3.2.

---

## 3.1 Landing — mantención escalonada por complejidad

La landing no tiene panel ni datos que operar: su mantención es más liviana que
la de un sistema. En vez de forzarla al piso de $49.000, escala con el proyecto
mismo.

| Proyecto | Mantención mensual |
|---|---|
| Landing esencial ($150.000) | $20.000 |
| Landing media (2–3 páginas, sin CMS) | $35.000 |
| Landing avanzada ($650.000) | $49.000 |

Mismo alcance que Esencial (infraestructura, certificado, respaldos, monitoreo,
seguridad, corrección de fallas), sin horas de evolución incluidas.

## 3.2 SaaS a medida — instalación + porcentaje de lo que genera

Cuando el sistema es un SaaS que el cliente monetiza (cobra suscripción, comisión
o venta a través de él), la mantención fija no captura el valor real: un sistema
que factura $500.000/mes y uno que factura $8.000.000/mes no cuestan lo mismo de
sostener, y cobrar igual a ambos deja plata sobre la mesa o cobra de más al chico.

- **Fee de instalación:** precio de catálogo del proyecto (MVP desde $2.800.000).
- **Mensualidad:** **5% de lo que el sistema factura**, con **piso de $150.000/mes**
  aunque el cliente aún no facture nada relevante.
- **Condición:** aplica solo mientras Tryvex aloja y opera la infraestructura. Si
  el cliente se lleva el código a su propia infraestructura, el % cae y pasa a
  mantención fija (Socio, $320.000).
- **Verificación:** como Tryvex construye y aloja el sistema, tiene acceso nativo
  a los datos de facturación en su propia base — no depende de que el cliente
  declare cifras.

> Este modelo entrelaza el ingreso de Tryvex con el del cliente. Requiere
> cláusula específica en el contrato (no el acuerdo simple actual) y, dado que
> Tryvex aún no está constituida como SpA, **no se firma ningún acuerdo de
> porcentaje de ingresos hasta tener sociedad y revisión de abogado.**

---

## 4. Meses con más trabajo del habitual

El principio, y esto importa: **el plan nunca sube.** Lo que se agrega es un
bloque puntual, solo ese mes.

| | |
|---|---|
| Bloque de evolución | **$75.000** por 2 horas |
| Bloque urgente (mismo día) | **$120.000** por 2 horas |

Cómo se presenta al cliente:

> *"Su plan incluye 3 horas de mejoras al mes. Este mes lo que necesita son unas
> 5, así que agregamos un bloque adicional de $75.000 — solo por este mes. El
> próximo vuelve a su mensualidad normal."*

Tres razones por las que se dice así:

1. **El plan no cambia.** El cliente no siente que lo subieron de categoría a
   escondidas.
2. **Se avisa antes, nunca después.** Ningún cargo aparece en una factura sin
   haber sido conversado.
3. **Vuelve solo a la normalidad.** No hay que pelear para bajar de nuevo.

Las horas no usadas **se acumulan hasta un mes**. No más, o el cliente junta un
crédito impagable. Se comunica como beneficio: *"Si este mes no ocupó sus horas,
quedan disponibles el próximo."*

---

## 5. Marketing: qué es distinto

Los planes de marketing del documento de servicio **ya incluyen mantención** de
lo construido: landing, seguimiento, automatizaciones y panel. No se cobran las
dos cosas.

| Cliente | Qué paga |
|---|---|
| Solo proyecto entregado | Plan de mantención (Esencial / Activo / Socio) |
| Marketing mensual | Solo el plan de marketing — la mantención va incluida |
| Ambos, sistemas separados | Marketing + Esencial sobre lo que no cubre el marketing |

Nunca se le cobra dos veces al mismo cliente por sostener lo mismo. Es la clase
de detalle que se nota y construye confianza.

---

## 6. Cómo se presenta en el sitio

**Nunca aparece un precio de proyecto sin su mensualidad al lado.** Que el cliente
se entere del costo recurrente después de firmar es la forma más rápida de
perderlo.

La fórmula visual en cada tarjeta de servicio:

```
Automatización operativa
$1.200.000 · 4 semanas
+ desde $49.000 al mes de mantención
   (los primeros 90 días van sin costo)
```

Tres decisiones de presentación:

- **La mantención se muestra siempre**, en tipografía menor pero visible. Se
  presenta como continuidad, no como cargo extra.
- **Los 90 días sin costo van pegados al precio.** Es lo que convierte la
  mensualidad de objeción en beneficio.
- **Nunca la palabra "obligatorio".** Se dice *"para mantenerlo en pie"*, que es
  lo que realmente es.

---

## 7. Qué hacer si el cliente no quiere mantención

Es su derecho y hay que respetarlo sin fricción. Pero queda por escrito qué
implica:

> *"Perfecto. Le entregamos todo el código, los accesos y la documentación, y
> queda a su nombre. Desde ese momento la infraestructura, las actualizaciones de
> seguridad y las caídas quedan de su lado. Si más adelante quiere que lo
> retomemos, hay una revisión previa de $180.000 para ver en qué estado está."*

Esa revisión de reingreso no es un castigo: un sistema sin mantener durante meses
tiene dependencias vencidas y de verdad hay que revisarlo antes de responder por
él.

---

## 8. Revisión a los 90 días

- ¿Qué porcentaje de proyectos entregados quedó con mantención? Bajo el 50%, el
  problema es cómo se presenta, no el precio.
- ¿Cuántos bloques extra se vendieron? Si son muchos y siempre al mismo cliente,
  corresponde ofrecerle subir de plan — le sale más barato y a Tryvex le da
  ingreso estable.
- ¿Alguna mantención consumió más horas de las incluidas de forma sostenida? Ahí
  hay deuda técnica y hay que resolverla, no absorberla.

---

<sub>Documento interno de Tryvex · No se comparte con clientes · Versión 1.0</sub>
