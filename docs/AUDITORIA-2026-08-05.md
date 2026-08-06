# Auditoría del sitio — 2026-08-05

Cinco auditorías en paralelo (rendimiento, accesibilidad, responsive, SEO y calidad
de código) sobre la rama `feat/nav-animaciones-y-catalogo`, medidas con Playwright
contra el servidor local y con revisión del código.

Los hallazgos marcados con ✔ los verifiqué personalmente; el resto viene del
informe y conviene comprobarlo antes de actuar.

---

## 🔴 Bloqueante — seguridad en producción

### 1. `/api/reminders` no valida nada y envía correos
`src/app/api/reminders/route.ts:19` ✔

```ts
export async function GET() {
  if (!process.env.GOOGLE_REFRESH_TOKEN || !process.env.RESEND_API_KEY) { ... }
  // …y de aquí directo a leer el calendario y enviar correos
```

Lo único que comprueba es que existan las variables de entorno. Sin token ni
cabecera: cualquiera puede llamarlo en bucle y disparar correos a los asistentes
reales del calendario. Agrava que `vercel.json` está vacío — no hay cron, así que
hoy el endpoint no cumple ninguna función y es solo superficie de ataque.

**Corrección:** validar `Authorization: Bearer ${CRON_SECRET}` y declarar el cron
en `vercel.json`. Añadir try/catch alrededor de la llamada a Google (hoy una
excepción devuelve 500 con traza).

### 2. `/api/contact` funciona como relay de correo abierto
`src/app/api/contact/route.ts:34-38`

Solo comprueba que los campos no estén vacíos; el email va directo a
`resend.emails.send({ to: email })` con el dominio verificado como remitente, y
`name`/`message` se interpolan en el HTML sin sanear. Sin límite de peticiones.
Riesgo: daño a la reputación SPF/DKIM del dominio.

**Corrección:** `zod` ya está instalado y sin usar — parsear el body con un
esquema (email real, longitudes máximas) y añadir rate-limit por IP.

---

## 🔴 Bloqueante — accesibilidad

### 3. El formulario de agenda no tiene ni una `<label>`
`src/features/landing/components/FinalCTA.tsx:205-246` ✔ (`grep -c "<label"` → 0)

Los 4 campos se identifican solo por `placeholder`, que desaparece al escribir.
**Existe `ContactForm.tsx` con las labels bien puestas, pero no lo importa nadie.**

**Corrección:** portar los `<label htmlFor>` de `ContactForm` a `FinalCTA` y
borrar el huérfano. WCAG 1.3.1 / 3.3.2 / 4.1.2.

### 4. El drawer de `/team` dice `aria-modal="true"` pero el foco se escapa
`src/features/team/components/TeamDrawer.tsx:116-122`

12 pulsaciones de Tab, 12 veces fuera del diálogo. Al cerrar con Escape el foco
queda en `<body>`.

**Corrección:** encerrar el foco en el panel, marcar el resto con `inert`, y
devolver el foco al elemento que abrió el drawer.

---

## 🔴 Alto — móvil

### 5. El home se renderiza ~13% más chico en teléfonos reales
`src/features/landing/landing.css:37`

Con emulación móvil real: `clientWidth 390` vs `innerWidth 448`. Chrome ensancha
el viewport porque el contenido desborda. Ninguna otra ruta lo hace.

Dos causas encadenadas: 12px de desborde estático, y +46px más cuando GSAP
desplaza los blobs decorativos (`scrollWidth` llega a 536 tras recorrer la
página). La raíz: `body { overflow-x: hidden }` **no recorta** cuando `html`
está en `visible` — el valor se propaga al viewport y el body queda como
`visible`.

**Corrección:** `html { overflow-x: clip }`, y dar `position: absolute` a
`.ambient .b4` (es el único blob sin posición, queda en flujo con 580px).

---

## 🟠 SEO — canibalización

### 6. `/preguntas` es 90% idéntica a la sección `#faq` del home
16 de 18 frases idénticas carácter por carácter. `/planes` está en 85%.
`/servicios` (47%) y `/proceso` (32%) están en zona segura.

El riesgo no es penalización: es que Google elige el home por autoridad y las
páginas dedicadas se quedan sin tráfico propio.

**Salida conservadora** (sin tocar la estructura ni la conversión): reescribir
solo los párrafos de apertura del home para que no compartan frases, recortar el
FAQ del home a 3 preguntas con enlace a `/preguntas`, y engordar `/planes` y
`/preguntas` con contenido que hoy no está en ninguna parte.

> Nota: el commit `ea57e51` (bloque de resultados compartido con `/proceso`)
> sube el solape de esa ruta. Tenerlo en cuenta al ejecutar esta fase.

### 7. Dos `FAQPage` con el mismo contenido en URLs distintas
`src/app/page.tsx` y `src/app/preguntas/page.tsx`

**Corrección:** dejar el JSON-LD solo en `/preguntas`.

### 8. Las 7 páginas internas no emiten `og:image` ✔
Verificado: `/` → 1, `/servicios` `/planes` `/preguntas` → 0. `opengraph-image.tsx`
vive en `src/app/` y Next lo asocia solo al segmento raíz.

### 9. Footer del home con anclas y enlaces vacíos ✔
`src/app/page.tsx:461-462` usa `#offer`/`#faq` en vez de `/planes`/`/preguntas`
—es el único footer del sitio que lo hace— y las líneas 446 y 468 tienen
`href="#"` sin destino.

### 10. `lastmod` del sitemap poco fiable
`/team` usa `new Date()`: cambia en cada build y Google termina ignorando la
señal para todo el archivo.

---

## 🟠 Rendimiento

### 11. Geist Mono se precarga en las 8 rutas y no se usa nunca
23,1 KB por visita. Todo el CSS pide `'JetBrains Mono'`, que no se carga en
ninguna parte, así que el navegador cae a la monospace del sistema.

**Corrección:** quitar `Geist_Mono` de `layout.tsx` y sustituir `'JetBrains Mono'`
por `ui-monospace, SFMono-Regular, monospace`.

### 12. Fotos del equipo servidas a 828px para un hueco de 283px
127 KB donde bastarían ~45. Falta la prop `sizes` en el `<Image>` de `TeamCard`.

### 13. `will-change` permanente en 32 elementos del home
`landing.css:44` lo aplica a todo `[data-anim]` y nunca se retira al revelarse.

**Corrección:** `[data-anim].in { will-change: auto; }`.

### 14. `.scroll-progress::after` anima `width` en cada frame de scroll
Propiedad de layout. **Corrección:** `transform: scaleX()` con
`transform-origin: left`.

---

## 🟡 Código muerto y duplicación

- **`ExpandNav.tsx`** — 302 líneas, no lo importa nadie. Arrastra 2 de los 7
  errores de lint.
- **`ContactForm.tsx`** — huérfano (ver hallazgo 3).
- **`<footer>` repetido 8 veces** (~300 líneas). Extraer `SiteFooter`.
- **`<symbol id="spark">` repetido 8 veces.** Peor que la redundancia: los 12
  `<use href="#spark">` dependen de que cada página recuerde declarar el `<defs>`.
- **Dependencias sin importar:** `framer-motion`, `lenis`, `zod` (usar zod en las
  API routes en vez de quitarlo).
- **CSS muerto:** `.nav-links`, bloque `.strip-*`, `.fv--form`, `.sch-error`,
  `.fv--success`, `[data-anim="rise-blur"]`, `[data-anim="rotate-in"]`, y 12 de
  los 20 tokens de `tokens.css`.
- **Los 7 errores de lint:** 5 son falsos positivos de reglas (`no-unescaped-entities`
  sobre comillas editoriales, `jsx-no-comment-textnodes` sobre `//` decorativo);
  2 están en `ExpandNav`, que es código muerto. Ninguno es un bug real, pero el
  `useEffect` de `ExpandNav:76` no tiene array de dependencias.

## 🟡 Accesibilidad — resto

- `prefers-reduced-motion` está **desactivado a propósito** en `landing.css:146`.
  Con la preferencia activa siguen 4 animaciones infinitas.
- El home **no tiene `<main>`** ✔ (las 7 internas sí). Sin skip-link en ninguna.
- Contraste: `--muted-2` (#98948c) da 2,47–2,68:1 sobre crema — no sirve para
  texto. El rojo de marca como texto pequeño llega a 3,75:1.
- Foco invisible en los campos del formulario (ratio entre estados 1,35:1).
- Áreas táctiles bajo 44px: hamburguesa (38), enlaces del menú móvil (41),
  filtros de equipo (26), `.cat-cta` (38).
- Escape no cierra el menú móvil; su fondo no atenúa la página.

---

## Lo que está bien (no tocar)

- **CLS prácticamente cero** en las 8 rutas, y 0 en las siete navegaciones entre
  rutas tras eliminar el BOM.
- Todos los listeners con `{passive:true}` y cleanup correcto; sin fugas.
- Animaciones solo en `transform`/`opacity`; `font-display: swap` en todas las
  familias.
- Cero secretos en el código: las 20 lecturas de credenciales van por `process.env`.
- Los 4 `dangerouslySetInnerHTML` son JSON estático o el snippet de Clarity, sin
  interpolación de datos externos.
- Sin enlaces rotos, sin `noindex`, canonicals correctas, un `h1` por página.
- `equipo.css`, `catalogo.css` y `GooeyNav.css` sin una sola clase muerta.
