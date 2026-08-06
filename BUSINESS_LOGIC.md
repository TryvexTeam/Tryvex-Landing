# Tryvex Landing — Business Logic

> Fuente de verdad de negocio. Última sincronización con el código: 2026-08-05.
> Reglas técnicas y convenciones → `CLAUDE.md`. Catálogo de nodos → `cerebro/index.md`.

## Qué es Tryvex

Software studio en Santiago, Chile. Construye automatizaciones, landing pages y SaaS a medida para negocios que quieren escalar sin contratar más personas.

## Propuesta de Valor

> "Automatizamos lo aburrido. Tú vendes lo importante."

Manifiesto en la landing: *"Dale el brillo que le falta a tu negocio. Con nosotros."*

## Usuario Target

Negocios chilenos de 2–30 personas que usan planillas para procesos que podrían automatizarse. Pain principal: tiempo perdido en tareas manuales repetitivas. Verticales atendidas: e-commerce, restaurantes, automotoras, farmacias, servicios locales, consultoras.

## Servicios

| # | Servicio | Descripción | Plazo |
|---|----------|-------------|-------|
| 01 | Automatización | Flujos n8n / Zapier / código propio. Integraciones SII, WhatsApp, Calendar. Logs, alertas y panel de control | 2–4 semanas |
| 02 | Landing pages | Diseño + copy + ingeniería. Tracking de conversiones y A/B testing | 5–10 días |
| 03 | SaaS a medida | MVP completo: frontend, backend, auth y despliegue. Next.js + Postgres | 4–8 semanas |

Cada servicio se entrega como sistema vivo: deploy continuo, monitoreo y **90 días de mantención incluida**.

## Precios (reales — los que cobramos)

### Por línea de servicio
> Fuente: `src/app/contacto/page.tsx`

| Servicio | Precio base |
|----------|-------------|
| Automatización | desde $150.000 CLP |
| Landing page | desde $200.000 CLP |
| SaaS a medida | desde $800.000 CLP |

El precio exacto se cierra en la llamada de descubrimiento.

### Modelos de contratación
> Fuente: sección `#offer` en `src/app/page.tsx`

| Plan | Precio | Incluye |
|------|--------|---------|
| **Proyecto único** (Sprint) | desde $150K+ CLP | Reunión de descubrimiento · Diseño y desarrollo · Despliegue en producción · 30 días de soporte |
| **Tryvex partner** | Precio a medida | Equipo dedicado (diseño + dev) · Sprints quincenales · Catálogo completo de servicios · Reportes mensuales con métricas |

> ⚠️ Al tocar precios, actualizar los **tres** lugares: esta tabla, `src/app/page.tsx` (`#offer`) y `src/app/contacto/page.tsx`.

## Catálogo de demos

Vitrina pública en `/catalogo`: demos navegables por rubro, construidas y publicadas (Lovable u otro hosting). Funciona como prueba de producto antes de la llamada.

| Demo | Rubro | Qué muestra | Ref del bot |
|------|-------|-------------|-------------|
| `restaurante` | Gastronomía | Reservas de mesa y pedidos por WhatsApp, menú siempre al día | `DEMO-RESTO` |

**Cómo funciona el embudo:** la tarjeta completa enlaza a la demo; el botón secundario abre WhatsApp con una referencia por nicho, de modo que el bot sabe desde qué demo llegó cada lead.

- WhatsApp comercial: **+56 9 5035 8818**
- Fuente única de datos: `src/features/catalogo/data.ts`
- **Regla dura:** en la página solo aparecen demos con `publicada: true` y URL real. Nada de "próximamente"
- Publicar una demo = agregar su entrada. Nadie toca componentes (`src/features/catalogo/COMO-AGREGAR-UNA-DEMO.md`)

## Horarios de la llamada de descubrimiento

Bloques de 20 minutos, hora de Santiago: **17:00 · 17:30 · 18:00 · 18:30 · 19:00 · 19:30 · 20:00**. Solo días hábiles; después de las 17:00 el formulario ya ofrece desde el día siguiente.

> Fuente única: `src/lib/horarios.ts`. Antes estaban duplicados en tres archivos y `/api/availability` respondía 10:00–17:00 cuando Google Calendar fallaba, permitiendo reservar horas que no se atienden.

## Proceso comercial (4 pasos)

| Paso | Etapa | Cuándo | Qué pasa |
|------|-------|--------|----------|
| 01 | Llamada inicial | Día 0 | 20 min. Salimos con hipótesis y alcance estimado |
| 02 | Mapeo del flujo | Día 1–3 | Diagrama del proceso actual vs. ideal. Integraciones, datos y métricas |
| 03 | Build & ship | Semana 1–4 | Sprints cortos. Cada viernes hay avance funcional, no mockup |
| 04 | En vivo | Semana 4+ | Producción con alertas y soporte. 90 días de mantención sin costo |

## Garantías y compromisos

- Garantía de 30 días: si no entregamos lo prometido, se devuelve el último mes
- El código es del cliente: repositorio, accesos y documentación completos
- Sin contratos atados
- Atención remota fuera de Chile (LatAm y EE.UU.)

## Métricas mostradas en la landing

| Métrica | Valor | Origen |
|---------|-------|--------|
| Empresas mapeadas en Chile | dinámico (fallback 847) | `/api/stats` → Supabase |
| Clientes activos | dinámico (fallback 14) | `/api/stats` → Supabase |
| Conversión promedio en landings nuevas | 4.7× | estático |
| SLA de uptime en flujos críticos | 98% | estático |

Caso de estudio destacado (e-commerce): −87% tiempo de operación manual, +42% pedidos despachados a tiempo.

## Equipo

5 personas, todas categoría `core` (`src/features/team/data/members.ts`):

| Nombre | Rol |
|--------|-----|
| Ignacio Navarrete | CEO / Fundador |
| Vicente García | Co-Founder |
| Cristian De La Fuente | Co-Founder |
| Joseph Mailens | Co-Founder |
| Fabián Melivilú | Co-Founder |

El tipo `Member` soporta una segunda categoría `engineering`, aún sin miembros asignados.

## Identidad Visual

- **Colores**: crema `#f4f1ea` como fondo base, negro editorial `#0e0e0e`, acento rojo `#e53935`
- **Tipografía**: Geist Sans (UI) · Geist Mono (etiquetas y código) · Instrument Serif (énfasis editorial en `<em>`)
- **Estilo**: glass morphism estilo macOS Tahoe + textura de grano + fondo ambient con blobs de luz
- **Logo**: símbolo "spark" en SVG inline (`#spark` / `#spark-light`)

## Contacto y presencia

| Dato | Valor |
|------|-------|
| Dominio | `https://www.tryvex.tech` |
| Email | `tryvexentreprise@gmail.com` |
| WhatsApp | `+56 9 5035 8818` (bot con router por nicho) |
| Ciudad | Santiago, Región Metropolitana, CL |
| Fundación | 2024 |
| Analytics | Microsoft Clarity (`wst2su25gg`) |
| Search Console | verificado (`ac6f38d815a767b0`) |

> Nota histórica: la documentación anterior mencionaba `tryvex.cl` y `hola@tryvex.cl`. Ninguno de los dos está en uso en el código ni en producción.
