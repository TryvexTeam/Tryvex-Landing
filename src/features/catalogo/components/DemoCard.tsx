import Image from "next/image";
import { whatsappLink, type Demo } from "../data";

/**
 * Tarjeta de una demo del catálogo.
 *
 * Vive en un solo lugar porque se usa en dos: la vitrina completa (/catalogo) y
 * el preview del home. Antes el markup estaba duplicado en ambas páginas y
 * cualquier ajuste había que hacerlo dos veces.
 *
 * La captura manda: ocupa la tarjeta entera y es el enlace a la demo. Debajo va
 * lo mínimo para identificarla —nombre y una línea de qué hace— y una sola
 * acción. La versión anterior apilaba descripción, lista de etiquetas y dos
 * botones, y la pieza competía consigo misma.
 */
export default function DemoCard({
  demo,
  nivel = 3,
  velo = false,
}: {
  demo: Demo;
  /**
   * Nivel del encabezado de la tarjeta. En el home va 3 —cuelga del h2 de la
   * sección "Véalo funcionando"—; en /catalogo va 2, porque ahí las tarjetas
   * cuelgan directo del h1 y con h3 el índice de encabezados se saltaba un
   * nivel. El estilo lo da `.cat-ident :is(h2,h3)`, no la etiqueta.
   */
  nivel?: 2 | 3;
  /**
   * Difumina la portada de la mitad hacia abajo. Solo en el anticipo del home:
   * la demo se intuye pero no se termina de ver, y para verla entera hay que
   * entrar al catálogo. En `/catalogo` va siempre en `false` — ahí el visitante
   * ya llegó, no tiene sentido esconderle nada.
   *
   * Se resuelve con una segunda copia de la misma imagen, desenfocada y
   * enmascarada, en vez de con `backdrop-filter`: en Chromium una máscara y un
   * `backdrop-filter` sobre el mismo elemento se anulan entre sí —comprobado—,
   * y un `filter` sobre la imagen única desenfocaría la portada entera.
   *
   * La copia usa el mismo `src` y el mismo `sizes`, así que Next genera la
   * misma URL optimizada y el navegador la sirve de su caché: no hay una
   * segunda descarga.
   */
  velo?: boolean;
}) {
  const Titulo = `h${nivel}` as "h2" | "h3";
  return (
    <article className="cat-card">
      <a
        className="cat-thumb"
        href={demo.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir la demo de ${demo.nicho} en una pestaña nueva`}
      >
        {demo.imagen ? (
          <>
            <Image
              src={demo.imagen}
              alt={`Portada de la demo para ${demo.nicho}`}
              width={1360}
              height={578}
              className="cat-shot"
              sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 560px"
            />
            {velo && (
              /* Misma imagen encima, desenfocada y desvanecida hacia arriba.
                 `aria-hidden` y sin `alt`: para un lector de pantalla no aporta
                 nada que la de abajo no diga ya. */
              <Image
                src={demo.imagen}
                alt=""
                aria-hidden="true"
                width={1360}
                height={578}
                className="cat-shot cat-velo"
                sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 560px"
              />
            )}
          </>
        ) : (
          <span className="cat-thumb-fallback">{demo.categoria}</span>
        )}
        <span className="cat-ver" aria-hidden="true">
          Ver demo
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </span>
      </a>

      <div className="cat-foot">
        <div className="cat-ident">
          {/* La categoría iba superpuesta sobre la captura y chocaba con el
              logo del propio sitio de la demo: ninguna de las dos se leía. */}
          <span className="cat-cat">{demo.categoria}</span>
          <Titulo>{demo.nicho}</Titulo>
          <p>{demo.descripcion}</p>
        </div>
        <a
          className="cat-cta"
          href={whatsappLink(demo.whatsappRef)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Probar el bot
        </a>
      </div>
    </article>
  );
}
