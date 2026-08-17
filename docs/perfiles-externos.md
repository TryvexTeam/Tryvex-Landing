# Perfiles externos — textos listos para publicar

> Fase 1 del plan de visibilidad: hacer que Tryvex exista como entidad fuera de su
> propio dominio. Hoy `sameAs` en el JSON-LD del layout va vacío porque no hay
> perfiles que enlazar. Este documento resuelve el contenido; falta crear las
> cuentas y volver a llenar ese campo.
>
> **Todo dato acá sale del sitio y coincide con él.** Si un precio o un plazo cambia
> en el sitio, cambia acá y en los perfiles ya publicados.

---

## Antes de crear nada: el handle

`linkedin.com/company/tryvex` **está ocupado** por Tryvex de Brisbane, Australia
(`tryvex.au`). Comprobado el 16-08-2026: devuelve 200, mientras que las variantes
de abajo devuelven 404.

| Handle | Estado |
|---|---|
| `tryvex` | Ocupado — la empresa australiana |
| `tryvex-chile` | **Libre — recomendado** |
| `tryvexchile` | Libre |
| `tryvex-tech` | Libre |
| `tryvex-studio` | Libre |

Va **`tryvex-chile`**: el país en el handle es exactamente la desambiguación que el
schema ya intenta hacer con `alternateName` y `addressCountry`. Usar el mismo
criterio en todas las plataformas.

---

## LinkedIn

### Tagline (máx. 120 caracteres)

```
Estudio de IA y agencia de software en Santiago. Precio y plazo cerrados desde el primer día.
```

*(93 caracteres)*

### Acerca de (máx. 2.000 caracteres)

```
Tryvex es un estudio de IA y agencia de software con base en Santiago de Chile.

Ponemos modelos a hacer trabajo real dentro de la operación de una empresa: leer tickets y correos, clasificar facturas y contratos, responder con criterio, agendar. No una demo — un agente conectado a los sistemas que la empresa ya usa, con registro auditable de cada acción.

Qué construimos:

• IA aplicada. Agentes que consultan tu base de datos y tus herramientas, procesamiento automático de documentos y, cuando el dato no puede salir de la empresa, modelos de peso abierto corriendo en tu propia infraestructura. De 5 a 10 semanas.

• Automatización de procesos. Integrada con el stack chileno real: SII, Bsale, Mercado Libre, Shopify, WhatsApp y Google Calendar. De 2 a 4 semanas, desde $150.000 CLP.

• Landing pages de alta conversión. Diseño, copy e ingeniería con tracking desde el lanzamiento. De 5 a 10 días, desde $200.000 CLP.

• SaaS a medida. Next.js, TypeScript y PostgreSQL, con autenticación, roles y CI/CD. De 4 a 8 semanas, desde $800.000 CLP.

Cómo trabajamos:

Precio y plazo cerrados antes de empezar. El código queda a tu nombre —repositorio, accesos y documentación— y se entrega desplegado y corriendo en producción, no como un ZIP. 90 días de mantención sin costo. Sin contratos que amarren.

Empieza con una llamada de 20 minutos, sin costo y sin pitch. Sales con una hipótesis, un alcance estimado y un precio. Si la IA no es la respuesta a tu problema, te lo decimos en esa misma llamada.

Con base en Santiago y trabajo remoto, atendemos también Sudamérica, Centroamérica, Europa y Estados Unidos.

contacto@tryvex.tech · www.tryvex.tech
```

*(1.586 caracteres)*

### Campos del formulario

| Campo | Valor |
|---|---|
| Nombre | Tryvex |
| URL | `linkedin.com/company/tryvex-chile` |
| Sitio web | `https://www.tryvex.tech` |
| Sector | Desarrollo de software |
| Tamaño | 2-10 empleados |
| Tipo | Empresa privada |
| Año de fundación | 2024 |
| Sede | Santiago, Región Metropolitana, Chile |
| Especialidades | Inteligencia artificial aplicada · Agentes de IA · Automatización de procesos · Desarrollo de software a medida · SaaS · Integración SII · Next.js · TypeScript |

> El año 2024 es el que ya declara el `foundingDate` del schema. Mantener el mismo
> en todas partes: una fecha distinta por plataforma debilita la entidad.

---

## Sortlist

Es la fuente que respondió la consulta de ranking en la auditoría, y devuelve las
fichas **citadas entero**. Conviene la descripción larga, no la de una línea.

Publicar en **dos categorías**: Inteligencia artificial · Santiago, y Desarrollo de
software · Santiago.

```
Tryvex es un estudio de IA y agencia de software con base en Santiago de Chile. Construimos agentes de IA conectados a los sistemas que una empresa ya usa —no chatbots genéricos— junto con automatizaciones, productos SaaS a medida y landing pages de alta conversión.

Nuestro trabajo con IA cubre tres frentes. Agentes que leen tickets, correos y mensajes, responden con criterio, consultan la base de datos del negocio, agendan y dejan registro auditable de cada acción. Procesamiento de documentos: facturas, contratos y correos clasificados al llegar, borradores de respuesta con el tono de la empresa y extracción de datos directo a la planilla o al sistema existente. Y, para las empresas cuyos datos no pueden salir de su red, modelos de peso abierto corriendo en su propia infraestructura, con ruteo entre proveedores sin reescribir código y control de costo por tarea.

Elegimos el modelo según la tarea: uno de frontera donde hace falta criterio, uno económico donde solo hace falta volumen, uno de peso abierto en infraestructura propia cuando el dato es sensible. No casamos el proyecto con un proveedor.

Integramos con el stack operativo real de las empresas chilenas: facturación electrónica del SII, Bsale, Mercado Libre, Shopify, WhatsApp y Google Calendar, además del CRM o la planilla que ya usen, sin migración forzada. La ingeniería propia va primero; n8n o Zapier se usan cuando el caso lo justifica, no por defecto.

Hemos trabajado con restaurantes, automotoras, farmacias e inmobiliarias, y mantenemos un catálogo de demos navegables con URL real y públicamente accesibles.

Cómo trabajamos: precio y plazo cerrados antes de empezar, no cobro por hora. Una automatización parte desde $150.000 CLP y toma de 2 a 4 semanas; una landing page desde $200.000 CLP en 5 a 10 días; un SaaS a medida desde $800.000 CLP en 4 a 8 semanas; un agente de IA afinado sobre los datos del negocio toma de 5 a 10 semanas. Todo se entrega desplegado y corriendo en producción, con monitoreo y 90 días de mantención sin costo. El código, el repositorio, los accesos y la documentación quedan a nombre del cliente. Sin contratos de permanencia.

Todo proyecto parte con una llamada de 20 minutos, sin costo y sin pitch, de la que se sale con una hipótesis de solución, un alcance estimado y un precio. Si la IA no es la respuesta correcta al problema, lo decimos en esa misma llamada.
```

| Campo | Valor |
|---|---|
| Ubicación | Santiago, Chile |
| Presupuesto mínimo | Equivalente en euros de $150.000 CLP |
| Tamaño del equipo | 1-10 |
| Idiomas | Español, Inglés |

---

## Clutch / GoodFirms / TechBehemoths

Misma descripción de Sortlist, recortada al primer y último párrafo si hay límite
de caracteres. Los campos duros importan más que la prosa en estas plataformas:

| Campo | Valor |
|---|---|
| Servicio principal | Artificial Intelligence (50%) |
| Servicios secundarios | Custom Software Development (30%) · Web Development (20%) |
| Tamaño de proyecto mínimo | USD 1.000+ |
| Tarifa por hora | Se factura por proyecto, no por hora |
| Empleados | 2-9 |
| Fundación | 2024 |
| Ubicación | Santiago, Chile |

> **Ojo con las reseñas.** Clutch pondera mucho las reseñas verificadas y no tenemos
> ninguna. Vale la pena pedirle a uno o dos clientes actuales que dejen una antes de
> que el perfil quede vacío y visible: un perfil sin reseñas rankea peor que ninguno.

---

## Crunchbase

### Descripción corta (máx. 450 caracteres)

```
Tryvex es un estudio de IA y agencia de software en Santiago de Chile. Construye agentes de IA conectados a los sistemas que las empresas ya usan, automatizaciones integradas al stack chileno (SII, Bsale, Mercado Libre, WhatsApp) y productos SaaS a medida. Trabaja con precio y plazo cerrados, entrega el código a nombre del cliente y no exige contratos de permanencia.
```

*(367 caracteres)*

| Campo | Valor |
|---|---|
| Sede | Santiago, Región Metropolitana, Chile |
| Fundación | 2024 |
| Tipo | For Profit |
| Categorías | Artificial Intelligence · Software · Information Technology · Automation |
| Empleados | 1-10 |

---

## Google Business Profile

Este es distinto de los demás: es una herramienta de búsqueda **local** y tiene tope
de zonas. El área de servicio va **Chile y nada más** — no replicar acá el
`areaServed` internacional del schema, que describe otra cosa.

| Campo | Valor |
|---|---|
| Nombre | Tryvex |
| Categoría principal | Servicio de desarrollo de software |
| Categorías adicionales | Consultor en informática · Agencia de marketing en internet |
| Área de servicio | Chile |
| Teléfono | +56 9 5035 8818 |
| Sitio web | `https://www.tryvex.tech` |

### Descripción (máx. 750 caracteres)

```
Estudio de IA y agencia de software en Santiago de Chile. Construimos agentes de IA conectados a los sistemas que tu empresa ya usa, automatizamos procesos con integración al SII, Bsale, Mercado Libre, WhatsApp y Shopify, y desarrollamos productos SaaS y landing pages a medida. Precio y plazo cerrados desde el primer día, el código queda a tu nombre y son 90 días de mantención sin costo. Primera llamada de 20 minutos, sin costo ni compromiso.
```

*(444 caracteres)*

---

## Después de publicar: cerrar el círculo

Con los perfiles creados y sus URLs definitivas en mano, agregar `sameAs` al bloque
`ProfessionalService` de `src/app/layout.tsx`, donde hoy hay un comentario explicando
por qué va vacío:

```ts
sameAs: [
  "https://www.linkedin.com/company/tryvex-chile",
  // …resto de perfiles, cada URL comprobada una por una
],
```

**Comprobar cada URL antes de listarla.** El riesgo acá no es dejar la entidad sin
unir: es unirla con la empresa equivocada. Con una Tryvex en Brisbane y varias marcas
de nombre parecido en circulación, un `sameAs` mal puesto es peor que no tenerlo.

---

*Redactado el 2026-08-16. Datos verificados contra el sitio en producción y contra
`public/llms.txt` de esa misma fecha.*
