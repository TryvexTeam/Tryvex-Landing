"use client";

import { useMemo, useState } from "react";
import DemoCard from "./DemoCard";
import MasonryItem from "./MasonryItem";
import { TIPOS_PROYECTO, type Demo, type TipoProyecto } from "../data";

/**
 * Vitrina del catálogo: masonry real (CSS Grid + alto medido, ver
 * MasonryItem) — cada tarjeta pesa lo mismo de ancho, solo el alto varía
 * según su propia imagen. Al hacer click, esa tarjeta pasa a "feature"
 * (ancho doble, imagen + ficha) pero sigue participando en LA MISMA grilla
 * que el resto — así el resto de verdad la rodea, incluso por debajo una
 * vez que la alcanza en altura, en vez de vivir en una columna aparte que
 * casi siempre queda más corta y deja un hueco.
 *
 * El link real a la demo nunca se pierde: vive siempre como CTA explícito
 * dentro de la tarjeta (grande o chica), el click en la portada solo cambia
 * cuál está expandida.
 */
export default function CatalogoGrid({ demos }: { demos: Demo[] }) {
  const [activo, setActivo] = useState<TipoProyecto | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visibles = useMemo(
    () => (activo ? demos.filter((d) => d.tipo.includes(activo)) : demos),
    [demos, activo]
  );

  const expandido = useMemo(
    () => visibles.find((d) => d.id === expandedId) ?? null,
    [visibles, expandedId]
  );

  if (expandido) {
    const resto = visibles.filter((d) => d.id !== expandido.id);
    return (
      <div className="cat-masonry-grid">
        <MasonryItem feature>
          <DemoCard
            demo={expandido}
            nivel={2}
            variant="expanded"
            onBack={() => setExpandedId(null)}
          />
        </MasonryItem>
        {resto.map((demo) => (
          <MasonryItem key={demo.id}>
            <DemoCard demo={demo} onExpand={() => setExpandedId(demo.id)} />
          </MasonryItem>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="cat-filtros" role="group" aria-label="Filtrar catálogo por tipo de proyecto">
        <button
          type="button"
          className={`cat-chip${activo === null ? " is-active" : ""}`}
          onClick={() => setActivo(null)}
        >
          Todos
        </button>
        {TIPOS_PROYECTO.map((tipo) => (
          <button
            key={tipo}
            type="button"
            className={`cat-chip${activo === tipo ? " is-active" : ""}`}
            aria-pressed={activo === tipo}
            onClick={() => setActivo(activo === tipo ? null : tipo)}
          >
            {tipo}
          </button>
        ))}
      </div>

      {visibles.length > 0 ? (
        <div className="cat-masonry-grid">
          {visibles.map((demo) => (
            <MasonryItem key={demo.id}>
              <DemoCard demo={demo} nivel={2} onExpand={() => setExpandedId(demo.id)} />
            </MasonryItem>
          ))}
        </div>
      ) : (
        <p className="cat-sin-resultados">
          Ningún proyecto calza con ese filtro por ahora.
        </p>
      )}
    </>
  );
}
