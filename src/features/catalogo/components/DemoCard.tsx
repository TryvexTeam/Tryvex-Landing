import Image from "next/image";
import { type Demo } from "../data";

const RATIO_LEGACY = "1360 / 578";

/**
 * Tarjeta de una demo del catálogo. Dos variantes:
 *
 * - `grid` (default): tarjeta normal en el masonry. Si recibe `onExpand`, el
 *   click abre la vista expandida en vez de navegar afuera (comportamiento de
 *   /catalogo). Sin `onExpand` mantiene el link directo original — el
 *   anticipo del home no cambia.
 * - `expanded`: la pieza grande cuando hay una activa — imagen a la
 *   izquierda, panel de identificación a la derecha, dentro del mismo
 *   componente (no es un modal aparte).
 *
 * La captura manda: ocupa la tarjeta entera. Debajo va lo mínimo para
 * identificarla —nombre y una línea de qué hace— y una sola acción real (la
 * que saca al visitante del sitio, nunca se pierde detrás del click que
 * expande).
 */
export default function DemoCard({
  demo,
  nivel = 3,
  velo = false,
  variant = "grid",
  onExpand,
  onBack,
}: {
  demo: Demo;
  /** Nivel del encabezado — h2 en /catalogo, h3 en el home. */
  nivel?: 2 | 3;
  /** Difumina la portada en el anticipo del home. Solo variant="grid". */
  velo?: boolean;
  variant?: "grid" | "expanded";
  /** Si se pasa, el click en la portada expande en vez de navegar afuera. */
  onExpand?: () => void;
  /** Solo variant="expanded": vuelve a la vitrina. Flota sobre la imagen. */
  onBack?: () => void;
}) {
  const Titulo = `h${nivel}` as "h2" | "h3";
  // CTA siempre "Ver proyecto" — el rótulo describe la acción real (entrar
  // al proyecto), no el medio. "Probar el bot" quedaba puesto en demos que
  // en realidad abren el sitio, no una conversación; ese texto solo
  // correspondería a un CTA que de verdad abra el chat del bot.
  const ctaHref = demo.ctaUrl || demo.demoUrl;
  const ctaTexto = demo.ctaLabel || "Ver proyecto";
  const ratio = demo.ratio || RATIO_LEGACY;

  if (variant === "expanded") {
    return (
      <article className="cat-expanded-card">
        {/* `.cat-volver` se posiciona contra este wrapper, no contra el `<a>`
            de la imagen: un botón no puede ir dentro de un link (HTML
            inválido, conflictos de foco/lectores de pantalla), así que
            necesitan un contenedor común con `position: relative` en vez de
            que el botón cuelgue de cualquier ancestro posicionado que
            encuentre más arriba (antes terminaba anclado a `.wrap`, la
            página entera, y en mobile aparecía pegado al fondo del bloque). */}
        <div className="cat-expanded-media">
          <a
            className="cat-thumb cat-expanded-thumb"
            style={{ aspectRatio: ratio }}
            href={demo.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir la demo de ${demo.nicho} en una pestaña nueva`}
          >
            <DemoThumbImage demo={demo} velo={false} />
          </a>

          {onBack && (
            <button
              type="button"
              className="cat-volver"
              onClick={onBack}
              aria-label="Volver a la vitrina"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        <div className="cat-expanded-info">
          <span className="cat-cat">{demo.categoria}</span>
          <Titulo>{demo.nicho}</Titulo>
          <p>{demo.descripcion}</p>

          {demo.incluye.length > 0 && (
            <ul className="cat-tags">
              {demo.incluye.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          <a className="cat-cta" href={ctaHref} target="_blank" rel="noopener noreferrer">
            {ctaTexto}
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className="cat-card">
      {onExpand ? (
        <button
          type="button"
          className="cat-thumb"
          style={{ aspectRatio: ratio }}
          onClick={onExpand}
          aria-label={`Ver ${demo.nicho} en detalle`}
        >
          <DemoThumbImage demo={demo} velo={velo} />
        </button>
      ) : (
        <a
          className="cat-thumb"
          style={{ aspectRatio: ratio }}
          href={demo.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir la demo de ${demo.nicho} en una pestaña nueva`}
        >
          <DemoThumbImage demo={demo} velo={velo} />
          <span className="cat-ver" aria-hidden="true">
            Ver demo
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </a>
      )}

      <div className="cat-foot">
        <div className="cat-ident">
          <span className="cat-cat">{demo.categoria}</span>
          <Titulo>{demo.nicho}</Titulo>
          <p>{demo.descripcion}</p>
        </div>
        <a className="cat-cta" href={ctaHref} target="_blank" rel="noopener noreferrer">
          {ctaTexto}
        </a>
      </div>
    </article>
  );
}

/** `demo.ratio` ("1000 / 1220") a un width/height real para next/image —
 *  si las dos cifras no calzan con el ratio declarado, Next tira warning
 *  en consola por más que el CSS mande el tamaño visual final. */
function dimensionesDesdeRatio(ratio: string | undefined): { width: number; height: number } {
  if (!ratio) return { width: 1360, height: 578 };
  const [w, h] = ratio.split("/").map((n) => parseFloat(n.trim()));
  return w && h ? { width: w, height: h } : { width: 1360, height: 578 };
}

function DemoThumbImage({ demo, velo }: { demo: Demo; velo: boolean }) {
  if (!demo.imagen) {
    return <span className="cat-thumb-fallback">{demo.categoria}</span>;
  }
  const { width, height } = dimensionesDesdeRatio(demo.ratio);
  return (
    <>
      <Image
        src={demo.imagen}
        alt={`Portada de la demo para ${demo.nicho}`}
        width={width}
        height={height}
        className="cat-shot"
        sizes="(max-width: 640px) 92vw, 480px"
      />
      {velo && (
        <Image
          src={demo.imagen}
          alt=""
          aria-hidden="true"
          width={width}
          height={height}
          className="cat-shot cat-velo"
          sizes="(max-width: 640px) 92vw, 480px"
        />
      )}
    </>
  );
}
