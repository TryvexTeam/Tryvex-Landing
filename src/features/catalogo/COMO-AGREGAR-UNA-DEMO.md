# Cómo agregar una demo al catálogo

Guía para el equipo. Agregar una demo **no requiere tocar componentes ni CSS**: se
edita un solo archivo, `src/features/catalogo/data.ts`.

---

## 1. Publicar la demo en Lovable

Una demo solo entra al catálogo cuando tiene **URL pública propia**. La URL de
preview (`id-preview--…lovable.app`) **no sirve**: pide iniciar sesión.

1. Abrir el proyecto en Lovable.
2. Botón **Publish** (arriba a la derecha).
3. Elegir el nombre del subdominio — convención: `tryvex-<nicho>`
   (`tryvex-restaurante`, `tryvex-veterinaria`, `tryvex-barberia`…).
4. Confirmar que la visibilidad quede **pública**.
5. **Verificar de verdad**: abrir la URL en una ventana de incógnito. Si pide login
   o muestra error, NO está lista — no se agrega al catálogo todavía.

---

## 2. Preparar la captura

- Screenshot del inicio de la demo, proporción **16:10** (ej. 1280×800).
- Guardar en `public/catalogo/<id>.webp` (o `.jpg`). Nombre = el `id` de la demo.
- Si aún no hay captura, dejar `imagen` sin definir: la tarjeta dibuja una portada
  de marca con el nombre del rubro. No queda un hueco feo.

---

## 3. Agregar la entrada en `data.ts`

Abrir `src/features/catalogo/data.ts` y sumar un objeto al arreglo `demos`:

```ts
{
  id: "veterinaria",
  nicho: "Clínica veterinaria",
  categoria: "Salud y mascotas",
  descripcion:
    "Agenda consultas y vacunas, y recuerda la desparasitación de cada mascota.",
  incluye: ["Web", "Asistente WhatsApp", "Panel"],
  demoUrl: "https://tryvex-veterinaria.lovable.app",
  whatsappRef: "DEMO-VET",
  imagen: "/catalogo/veterinaria.webp",   // opcional
  publicada: true,
},
```

### Qué significa cada campo

| Campo | Regla |
|---|---|
| `id` | Minúsculas, sin espacios ni tildes. Único. Se usa para la captura y la analítica |
| `nicho` | Como lo diría el dueño del negocio: "Clínica veterinaria", no "vet-saas" |
| `categoria` | Etiqueta corta que aparece sobre la imagen |
| `descripcion` | **Una** línea sobre qué automatiza. Lenguaje del dueño, cero jerga técnica |
| `incluye` | 2 o 3 etiquetas de lo que se entrega |
| `demoUrl` | La URL pública verificada del paso 1 |
| `whatsappRef` | Palabra clave del flujo en el bot: `DEMO-` + nicho en mayúsculas |
| `imagen` | Ruta en `/public/catalogo/`. Opcional |
| `publicada` | `true` solo si la URL funciona **hoy** |

### La regla que no se rompe

**En el catálogo solo aparecen demos construidas y funcionando.** Nada de
"próximamente" ni tarjetas vacías. Si la demo no está lista, se deja
`publicada: false` — el código la filtra sola y no se muestra.

---

## 4. Coordinar la palabra clave del bot

El botón "Probar el bot" abre WhatsApp con la referencia del nicho. Para que el bot
sepa qué rol tomar, esa palabra clave **también debe existir en el flujo de
ManyChat**. Avisar al encargado del bot al agregar un nicho nuevo.

Convención en uso: `DEMO-RESTO`, `DEMO-VET`, `DEMO-BARBER`, `DEMO-ESTETICA`,
`DEMO-GYM`, `DEMO-CLINICA`, `DEMO-INMO`.

---

## 5. Probar antes de subir

```bash
npm run build     # tiene que terminar sin errores
npm run start     # abrir http://localhost:3000/catalogo
```

Revisar que la tarjeta aparezca, que la imagen enlace a la demo y que el botón del
bot abra WhatsApp con la palabra correcta.

---

## 6. Subir el cambio

Trabajar siempre sobre una rama, nunca directo en `main`:

```bash
git checkout main
git pull                                   # traer lo último
git checkout -b catalogo/veterinaria       # una rama por demo
git add src/features/catalogo/data.ts public/catalogo/
git commit -m "feat(catalogo): agrega demo de clinica veterinaria"
git push -u origin catalogo/veterinaria
```

Después, abrir un Pull Request en GitHub hacia `main` para que el equipo lo revise.

**Ventaja de una rama por demo:** varias personas pueden agregar demos en paralelo
sin pisarse. Si dos tocan `data.ts` a la vez, git resuelve el conflicto fácil
porque son entradas distintas del mismo arreglo.
