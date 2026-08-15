"use client";

import { useEffect, useRef } from "react";

/** Debe calzar con `grid-auto-rows` de `.cat-masonry-grid` en catalogo.css. */
const ROW_UNIT = 4;

/**
 * Masonry real con CSS Grid: cada tarjeta pide tantas "filas" de 4px como
 * necesite su alto medido, y `grid-auto-flow: dense` deja que el navegador
 * acomode todo sin huecos — incluso debajo de la tarjeta expandida (ancho
 * doble) una vez que el resto la alcanza en altura.
 *
 * Por qué no CSS `columns:` (como se probó antes): esa técnica reparte en
 * columnas de ancho parejo pero NO soporta que una pieza pida ancho doble
 * dentro del mismo flujo — la tarjeta expandida quedaba en una zona aparte,
 * con su propio masonry chico al lado, y ese masonry chico casi siempre
 * terminaba más corto que la expandida: hueco vacío debajo, nada la
 * "rodeaba" de verdad. Grid + alto medido sí lo permite.
 *
 * Por qué no medir con JS de entrada y listo: las imágenes cargan async y
 * cambian de alto. `ResizeObserver` reacciona a eso — y también a un resize
 * de ventana, que cambia el ancho de columna y por lo tanto el alto real de
 * cada imagen con aspect-ratio propio.
 */
export default function MasonryItem({
  children,
  feature = false,
}: {
  children: React.ReactNode;
  /** La tarjeta expandida: pide 2 columnas de ancho en vez de 1. */
  feature?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const gapPx = parseFloat(getComputedStyle(el.parentElement!).rowGap || "0");

    const aplicarAlto = () => {
      const alto = el.getBoundingClientRect().height;
      const span = Math.max(1, Math.ceil((alto + gapPx) / (ROW_UNIT + gapPx)));
      el.style.gridRowEnd = `span ${span}`;
    };

    aplicarAlto();

    const ro = new ResizeObserver(aplicarAlto);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={`cat-masonry-item${feature ? " cat-masonry-item--feature" : ""}`}>
      {children}
    </div>
  );
}
