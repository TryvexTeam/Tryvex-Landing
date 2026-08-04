# Cómo publicar una demo en el catálogo

Guía para agregar demos a `/catalogo`. **No hace falta tocar componentes ni CSS**:
publicar una demo es agregar una entrada en `data.ts`.

---

## Regla de oro

> En el catálogo **solo aparecen demos construidas, publicadas y funcionando**.
> Nada de "próximamente". Una tarjeta que lleva a una página caída cuesta más que
> una tarjeta que no existe.

Por eso la página solo muestra las demos con `publicada: true` **y** `demoUrl`
con contenido. Si falta cualquiera de las dos, la demo no se renderiza.

---

## Paso 1 — Construir y publicar la demo

1. Construir la demo en Lovable (o el hosting que corresponda).
2. **Publicarla** y copiar la URL pública. En Lovable: botón *Publish* → queda algo
   como `https://tryvex-<nicho>.lovable.app`.
3. **Comprobar que la URL abre en una ventana de incógnito.** Las URL de vista
   previa (`id-preview--…`) NO sirven: redirigen al login de Lovable y el visitante
   ve una pantalla de inicio de sesión en vez de la demo.

## Paso 2 — Agregar la entrada en `data.ts`

Abrir `src/features/catalogo/data.ts` y agregar un objeto al arreglo `demos`:

```ts
{
  id: "veterinaria",                    // slug único, sin espacios ni tildes
  nicho: "Clínica veterinaria",         // como lo lee el dueño del negocio
  categoria: "Salud y mascotas",        // etiqueta que va sobre la imagen
  descripcion:
    "Agenda consultas y vacunas, y recuerda la desparasitación de cada mascota.",
  incluye: ["Web", "Asistente WhatsApp", "Panel"],
  demoUrl: "https://tryvex-veterinaria.lovable.app",
  whatsappRef: "DEMO-VET",              // ver Paso 3
  publicada: true,
},
```

### Cómo escribir cada campo

| Campo | Regla |
|---|---|
| `id` | Minúsculas, sin tildes ni espacios. Se usa en analítica — que no cambie después |
| `nicho` | El rubro tal como lo diría el cliente. "Clínica veterinaria", no "Vet SaaS" |
| `categoria` | Agrupa visualmente. Reutilizar las que ya existen antes de inventar una |
| `descripcion` | **Una línea, lenguaje del dueño, cero jerga.** Qué le resuelve, no qué tecnología usa |
| `incluye` | 2 a 4 etiquetas cortas de lo que trae la entrega |
| `demoUrl` | URL pública verificada en incógnito |
| `whatsappRef` | La palabra clave del flujo del bot — ver abajo |
| `imagen` | Opcional. Si falta, se dibuja una portada de marca con el nombre del rubro |

## Paso 3 — La referencia de WhatsApp (`whatsappRef`)

El botón **"Probar el bot"** abre WhatsApp con un mensaje ya escrito:

```
https://wa.me/NUMERO?text=DEMO-VET
```

Esa palabra clave cumple dos funciones:

1. **El router del bot** la lee y carga el flujo de ese rubro — el asistente
   responde como si fuera de una veterinaria, una barbería, etc.
2. **Trazabilidad:** sabemos desde qué demo llegó cada conversación, y por lo
   tanto qué demo trae clientes que pagan.

Formato: `DEMO-` + rubro en mayúsculas y corto (`DEMO-VET`, `DEMO-BARBER`,
`DEMO-RESTO`). **Cada demo lleva la suya, nunca repetida.**

> El número de WhatsApp de Tryvex vive en la constante `WHATSAPP_NUMBER` de
> `data.ts` (**+56 9 5035 8818**). Está en un solo lugar: no hay que tocarlo en
> cada demo.

## Paso 4 — Captura de la demo (opcional pero recomendado)

Sin imagen la tarjeta se ve bien igual, pero con captura convierte más.

1. Abrir la demo, pantalla completa, y capturar la parte de arriba.
2. Recortar en proporción **16:10** (ej. 1280×800).
3. Guardar como `public/catalogo/<id>.webp` — el mismo `id` de la entrada.
4. Agregar el campo: `imagen: "/catalogo/veterinaria.webp"`.

## Paso 5 — Probar antes de subir

```bash
npm run build     # tiene que terminar sin errores
npm run start     # abrir http://localhost:3000/catalogo
```

Comprobar en la tarjeta nueva:

- [ ] La imagen (o la portada de marca) se ve bien.
- [ ] Al tocar la tarjeta abre la demo **en pestaña nueva** y carga.
- [ ] "Probar el bot" abre WhatsApp con la palabra clave correcta.
- [ ] En móvil no hay desborde horizontal.

## Paso 6 — Subir el cambio

```bash
git checkout feature/catalogo
git pull                                  # traer lo que hayan subido otros
git add src/features/catalogo/data.ts     # + la imagen si agregó una
git commit -m "feat(catalogo): agrega demo de <nicho>"
git push
```

**Trabajar siempre sobre `feature/catalogo`, nunca directo en `main`.** El merge a
`main` (que publica en tryvex.tech) lo hace quien corresponda, por Pull Request.

---

## Errores frecuentes

| Síntoma | Causa |
|---|---|
| La demo no aparece en la página | Falta `publicada: true` o `demoUrl` está vacío |
| El visitante ve un login de Lovable | Se usó la URL de vista previa en vez de la publicada |
| El bot responde con el flujo equivocado | `whatsappRef` repetido o mal escrito |
| `npm run build` falla | Falta una coma entre objetos, o un campo obligatorio |
