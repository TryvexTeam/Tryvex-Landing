# Auditoría de visibilidad — 16 de agosto de 2026

Registro completo de lo que se midió, lo que se encontró y lo que quedó pendiente.
Se escribe acá y no en un chat porque los hallazgos que importan —los precios en
conflicto, los homónimos de la marca, el estándar de accesibilidad de las tablas—
son cosas que hay que volver a mirar dentro de tres meses.

---

## 1. El test que originó todo

**Pregunta:** ¿aparece Tryvex cuando alguien busca lo que Tryvex hace, sin nombrarla?

**Método.** Once consultas contra dos motores. Exa es un motor neural, el tipo de
recuperación que alimenta la respuesta de un asistente; WebSearch resuelve con
locale de Estados Unidos, lo que castiga consultas chilenas. Firecrawl quedó fuera:
devolvió 401 por falta de credencial.

Ninguno de los dos es idéntico a «lo que responde ChatGPT», pero once ausencias
seguidas no se explican por sesgo de motor.

### Resultado: 0 de 11

| # | Consulta | Motor | Quién apareció en su lugar |
|---|---|---|---|
| 1 | agencia de IA en Chile que implementa automatizaciones | Exa | Cercai, FutureFlow, Factor-AI, Automatiza.lo, IAgentes, Redsoft, CADI, ZentrixCo, Effice, AIAIAI |
| 2 | agencia de desarrollo de software a medida en Santiago | Exa | ForEach, Devint, Witrey, Codelan, LX3, PAYCA, Raintech, admain.ai, Garage Labs, MG Technologies |
| 3 | mejores agencias y consultoras de IA en Chile 2026 · ranking | Exa | Sortlist, Muller y Pérez, DA SEO, Adsformance, Whooo, marketing4ecommerce |
| 4 | empresa que crea agentes de IA y chatbots de WhatsApp para pymes | Exa | Datanautic, KYX, CADI, Cercai, tucach.ai, FutureFlow, ConectaAI, eserp.cl, Wombi |
| 5 | integrar IA con facturación electrónica SII Chile | Exa | Facturador Pulsando, IAutomatiza, Wasabil, SimpleFactura, omIA, SimpleAPI, sii.cl |
| 6 | agencia que desarrolla MVP SaaS en 4 a 8 semanas con precio cerrado | Exa | RonbHack, Lunover, Cercai, mvpforstartup, Joseign, Nomu Labs |
| 7 | modelos de peso abierto en servidor propio, Chile, Ollama | Exa | solo blogs técnicos — **ninguna agencia chilena posicionada** |
| 8 | estudio de IA que construye agentes que leen correos, tickets y facturas | Exa | Cercai, Smooth, Helenika, WBA Lab, ConectaAI, g3sc, aGo lab, GHAnalytics |
| 9 | estudio de IA Santiago, planes, precio y plazo cerrado, código del cliente | Exa | Goviaus, Deepyze, Teravexa, Zevra |
| 10 | Tryvex estudio de IA y agencia de software Santiago Chile | WebSearch | TechBehemoths, TTPSec.ai, Sortlist, Automatiza.lo, Vex AI, Indra, JhedAI |
| 11 | tryvex.tech | WebSearch | tryvex.com, tryvex.dev, tryvexcapital.com, Trivex Group, Zyvex |

### El hallazgo de la consulta 9

Esa consulta usó **las palabras exactas del posicionamiento de Tryvex** y devolvió
cuatro empresas, ninguna de ellas Tryvex. Deepyze publica textualmente «Precio fijo,
sin sorpresas» y «el repositorio, la infraestructura y la documentación quedan
completamente a tu nombre».

El diferencial de Tryvex no es diferencial: es el estándar de la categoría, y otros
lo tienen indexado.

### El hueco de la consulta 7

Es la única de las nueve donde **ninguna agencia chilena está posicionada**. Salieron
blogs técnicos genéricos. Tryvex ya ofrece modelos de peso abierto en infraestructura
del cliente, y ese servicio se cruza con la Ley 21.719, cuyo plazo vence en diciembre
de 2026. Es el terreno más vacío que apareció en toda la auditoría.

---

## 2. El mapa competitivo real

Aparecieron **más de treinta agencias chilenas** que no figuraban en ninguna lista
previa. Las tres que conviene vigilar:

| Agencia | Por qué |
|---|---|
| **Cercai** (`cercai.cl`) | Casi un espejo. Mismas integraciones locales, seis semanas de entrega, diagnóstico gratuito de 30 minutos, precios publicados en CLP desde $800.000 y la Ley 21.719 como gancho. Apareció en cuatro de las nueve consultas. |
| **CADI** (`cadi.cl`) | Publica una tabla comparativa del mismo espíritu que la de Tryvex: alcance, plazo y precio por escrito, código y dominio a nombre del cliente, garantía post-entrega, integración con SII y Transbank. |
| **Deepyze** (`deepyze.dev`) | Ocupa la consulta calcada del pitch. Precio fijo con alcance cerrado, propuesta en 24-48 horas, traspaso completo de repositorio. Tiene páginas por ciudad. |

Resto detectado: Factor-AI, Automatiza.lo, IAgentes, Redsoft, ZentrixCo, Effice,
AIAIAI Consulting, Datanautic, KYX, tucach.ai, ConectaAI, eserp.cl, Wombi, Helenika,
WBA Lab, g3sc, aGo lab, GHAnalytics, Smooth, Goviaus, ForEach, Devint, Witrey,
Codelan, LX3, PAYCA, Raintech, admain.ai, Garage Labs, MG Technologies, RonbHack,
Just Dev It, TTPSec.ai, Indra Solutions, Bakslash.

### Lo que ellos tienen y Tryvex no

- **Precios públicos en pesos.** Cercai desde $800.000 más mensualidad desde $120.000.
  Wombi publica planes de $49.990 a $69.990. RonbHack publica rangos de CLP 8M a 25M.
- **Ley 21.719.** Cercai la menciona en varias páginas con su plazo de diciembre 2026.
  Tryvex no la toca en ninguna, salvo en el banner de cookies.
- **Perfil en Sortlist.** FutureFlow, Just Dev It, LADO DIGITAL y Bakslash tienen
  fichas largas que el motor devolvió **citadas enteras**.
- **LinkedIn de empresa.** Smooth apareció en Exa con datos extraídos de LinkedIn:
  rubro, sede en Vitacura, año de fundación, empleados, seguidores y el texto de sus
  publicaciones. Es fuente de entidad de primer orden.
- **Vocabulario local más ancho.** Los que rankean nombran Defontana, BUK, Nubox,
  Softland, Flexline, Transbank, Webpay, Flow, Khipu, Laudus y ClaveÚnica.
- **Páginas por comuna.** Automatiza.lo tiene rutas tipo `/comunas/agencia-ia-santiago`.
- **Listicle propio.** Muller y Pérez publica su «Ranking Agencias Data-Driven Chile
  2026» con metodología ponderada y se ubica primero con 97/100. Ese artículo fue lo
  que el motor devolvió para la consulta de ranking.

---

## 3. El problema de marca

Buscar `tryvex.tech` devuelve, en orden: un sitio de joyería marcado como posible
fraude por Scam Detector, un producto de fiabilidad para agentes de IA en
`tryvex.dev`, una firma de capital, dos cuentas de gaming en YouTube y TikTok,
Trivex Group, TriVex Consultancy en Pakistán y Zyvex. **La empresa chilena no está.**

Uno de los homónimos vive en el mismo espacio semántico —herramientas de IA—, que es
donde más confunde.

### Y el más caro de todos

Existe **otra Tryvex en Brisbane, Australia** (`tryvex.au`) y **ya ocupa
`linkedin.com/company/tryvex`**.

Handles comprobados el 16-08-2026:

| Handle | Estado |
|---|---|
| `tryvex` | **200 — ocupado** por la australiana |
| `tryvex-chile` | 404 — libre, **recomendado** |
| `tryvexchile` | 404 — libre |
| `tryvex-tech` | 404 — libre |
| `tryvex-studio` | 404 — libre |
| `tryvexspa` · `tryvex-spa` · `tryvexcl` · `tryvex-cl` | 404 — libres |

**Regla que sale de esto:** la marca nunca debería viajar sola. Siempre «Tryvex Chile»
o «Tryvex (Santiago)» en títulos, schema y perfiles externos. El país en el handle
hace de desambiguador, igual que `alternateName` en el JSON-LD.

---

## 4. Defectos encontrados en el sitio

### 4.1 `llms.txt` describía otra empresa — CORREGIDO

Es el único documento del sitio escrito para que lo lea un modelo, y estaba
desactualizado en todo lo que importa:

| Decía | El sitio dice |
|---|---|
| Tres servicios, ninguno de IA | Estudio de IA, con página propia |
| Catálogo de 3 demos | 13 publicadas, 4 con IA |
| Llamada de **30 minutos** | **20 minutos**, en 17 lugares distintos |
| Un solo precio | Diez ítems con precio y plazo |
| Mapa sin las rutas nuevas | Existen desde el 15 de agosto |

Cero menciones de agentes, procesamiento de documentos o modelos on-premise.

### 4.2 Dos listas de precios incompatibles — CORREGIDO

El defecto más serio de la auditoría.

| Servicio | `/contacto`, `/preguntas`, home, `BUSINESS_LOGIC.md` | Catálogo de `/servicios` |
|---|---|---|
| Automatización | desde $150.000 | un proceso $450.000 · operativa $1.200.000 |
| Landing | desde $200.000 | esencial $150.000 · avanzada $650.000 |
| SaaS / MVP | desde $800.000 | MVP $2.800.000 |
| Agentes de IA | no existía | $1.600.000 |

No era redondeo: no había ninguna automatización a $150.000, el MVP costaba 3,5 veces
lo prometido, y la landing esencial era más barata que el «desde» que anunciaba
`/contacto`.

Los **plazos** también divergían: «5 a 10 semanas» para un agente contra las 4 del
catálogo.

**Resuelto:** `/servicios` es la fuente de verdad. Los diez ítems quedaron
sincronizados en `BUSINESS_LOGIC.md`, `/contacto`, `/preguntas`, `llms.txt`, el schema
y las seis páginas de captación.

> **Cómo se coló.** Tres fuentes coincidían entre sí y se tomaron por verdad sin
> cruzarlas con la cuarta. Eran tres copias del mismo dato viejo. Verificar que un
> dato está bien escrito no es verificar de dónde salió.

### 4.3 Tablas comparativas inaccesibles — CORREGIDO

Las dos tablas nuevas salieron sin `caption`, sin `scope` en ningún `th`, y con el
`th` de la esquina vacío. Para un lector de pantalla eso es una tabla sin nombre cuyas
celdas no se pueden atribuir a una columna — y una tabla comparativa es toda contexto
cruzado.

El dato revelador: **la tabla que ya existía en `/agencia-de-ia-en-chile` sí tenía
caption y scope**. El estándar estaba puesto en el sitio; el trabajo nuevo no lo
siguió.

Corregido con `caption`, `scope="col"` en el encabezado, `scope="row"` en la primera
celda de cada fila —que pasó de `td` a `th`— y `sr-only` en la celda de la esquina.

### 4.4 `dateModified` desactualizado — CORREGIDO

El schema declaraba 15 de agosto y 12 de mayo en un sitio que cambió el 16.

### 4.5 Precios duplicados en cinco lugares — ABIERTO

`CLAUDE.md` ya anotaba la duplicación entre `page.tsx` y `contacto/page.tsx`. Hoy son
cinco: esos dos más `servicios/page.tsx`, `BUSINESS_LOGIC.md`, `llms.txt` y el JSON-LD
del layout. **No hay fuente única en código.** Mientras siga así, la contradicción del
punto 4.2 puede volver.

Vale la pena extraer los precios a un módulo —algo como `src/lib/precios.ts`— del que
consuman todos. Es la causa raíz, no el síntoma.

---

## 5. Lo que ya estaba bien

- `robots.txt` permite explícitamente GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, Applebot-Extended y cohere-ai. Poca gente lo hace.
- Sitemap con fechas literales, nunca `new Date()`.
- Títulos y canonicals correctos y únicos en las trece páginas. Las URLs rotas que se
  veían en conversaciones con asistentes (`tryvex.techServicios`) eran artefacto del
  render de esos chats, no del sitio.
- `FAQPage` en una sola URL, que es la regla correcta.
- `ProfessionalService` bien elegido sobre `Organization`.
- Un `h1` por página, sin saltos de nivel, en las trece.
- El contenido se parafrasea con fidelidad cuando un modelo llega a él. El copy
  funciona; el problema es que casi nadie llega sin escribir la marca.

---

## 6. Directorios externos

### Sortlist

Marketplace B2B donde las empresas publican proyectos y las agencias inscritas
reciben propuestas. **Fue la única fuente que el motor citó** para «mejores agencias
de IA en Chile», y devolvió las fichas de las agencias **transcritas enteras**.

Declaran 24.000 agencias listadas y 600.000 visitantes mensuales, y afirman rankear
primeros en las palabras clave más competitivas del rubro. Por eso un buscador
encuentra Sortlist antes que a cualquier agencia individual.

**FutureFlow está listada con cero reseñas** y 1-10 empleados: el listado no exige
reputación previa.

⚠️ **Modelo comercial sin confirmar.** La home vende suscripción —«Reservar una demo»,
«cancela cuando quieras», «solo pagas por reuniones confirmadas»— y no hay página de
precios pública: se probaron cuatro URLs, todas 404. **La pregunta a hacer en la demo
no es cuánto cuesta, sino si el perfil gratuito aparece en las páginas de listado por
ciudad y servicio.** De eso depende todo, porque el objetivo no son los leads sino que
la ficha exista donde los motores miran.

### Los demás

| Directorio | Nota |
|---|---|
| Google Business Profile | Gratis. Más peso local que Sortlist. **Empezar por acá.** |
| Crunchbase | Gratis. |
| Clutch | Pondera reseñas verificadas. Un perfil visible y sin ninguna rankea **peor** que no tenerlo: conseguir una o dos antes de publicarlo. |
| TechBehemoths | En su listado de Latinoamérica figuran Brasil, Colombia, Argentina, México, Panamá y otros. **Chile no aparece.** Puede ser oportunidad o señal de que no hay tráfico chileno. Baja prioridad. |

### La alternativa gratuita que nadie mira

En la auditoría aparecieron listicles chilenos que los motores citan igual que a
Sortlist: `daseo.digital`, `mulleryperez.cl`, `whooohq.com`, `marketing4ecommerce.cl`,
`adsformance.com`, `lagencia.cl`, `subeagenciadigital.com`.

Son artículos escritos por personas a las que se les puede escribir. Aparecer en dos o
tres da **la misma señal que Sortlist y cuesta un correo**.

---

## 7. Cómo se mide

La métrica **no** es un puesto en un ranking: ninguno de los rankings de «agencias de
IA de la nueva ola» que circulan por chats de asistentes existe. Cuando se le insiste
a un modelo, inventa un orden y lo reordena si se lo presiona. Eso no es dato.

**La métrica es en cuántas de las nueve consultas de categoría aparece Tryvex**,
repitiéndolas cada dos semanas con el mismo texto y el mismo motor.

- Línea base 16-08-2026: **0 de 9**.
- Nada de este trabajo estaba desplegado al momento de medir.

---

## 8. Pendiente

| # | Qué | De quién depende |
|---|---|---|
| 1 | **Desplegar.** Sin esto, nada de lo hecho cuenta | merge del PR |
| 2 | Google Business Profile, Crunchbase, LinkedIn de empresa en `tryvex-chile` | crear cuentas — textos listos en `docs/perfiles-externos.md` |
| 3 | Demo de Sortlist y la pregunta del punto 6 | agendar |
| 4 | Completar `sameAs` con los perfiles nuevos, comprobando cada URL una por una | código, tras el punto 2 |
| 5 | Página de límites («qué no hacemos») y de soporte/SLA | definición de negocio |
| 6 | Comparativa propia de agencias de IA en Chile, con metodología | contenido |
| 7 | Las 13 demos del catálogo con URL propia indexable | contenido |
| 8 | Páginas por comuna | contenido |
| 9 | Página de Ley 21.719, cruzada con on-premise | contenido + revisión legal |
| 10 | Correos a los cuatro listicles | contenido |
| 11 | Extraer los precios a fuente única en código (punto 4.5) | refactor |
| 12 | Primeras reseñas verificadas, antes de publicar Clutch | clientes |

### Un hueco que sigue abierto

El home promete **98% de SLA de uptime** y no existe ninguna página que lo respalde.
Es exactamente la grieta por la que un asistente, al que se le preguntó qué le falta a
Tryvex, respondió que «no firma SLA corporativos». O se documenta o se baja.

---

*Auditoría corrida el 16 de agosto de 2026. Once consultas, dos motores. Los hallazgos
marcados CORREGIDO se resolvieron en la misma jornada; el resto sigue abierto.*
