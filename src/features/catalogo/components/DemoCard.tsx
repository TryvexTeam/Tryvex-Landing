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
export default function DemoCard({ demo }: { demo: Demo }) {
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
          <Image
            src={demo.imagen}
            alt={`Portada de la demo para ${demo.nicho}`}
            width={1360}
            height={578}
            className="cat-shot"
            sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 560px"
          />
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
          <h3>{demo.nicho}</h3>
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
