import { FAMILIAS } from "../data/capacidades";

/**
 * Mapa de capacidades.
 *
 * Va dentro de la sección 01 y sin número propio: no es una sección más del
 * recorrido, es el pie de los tres servicios — la respuesta a "¿y si lo mío no
 * es ninguna de las tres?". Por eso tampoco repite precios: eso vive en
 * `/servicios` y en `#offer`, y duplicarlo garantiza que un día diverjan.
 */
export default function MapaCapacidades() {
  return (
    <div className="mapa" data-anim="fade-up">
      <div className="mapa-intro">
        <h3>
          Lo que <em>podemos construir</em>, en cuatro frentes.
        </h3>
        <p>
          Los tres de arriba son por dónde entra la mayoría. Abajo está el alcance real — si tu
          problema aparece en esta lista, ya lo hemos resuelto antes.
        </p>
      </div>

      <ul className="mapa-grid">
        {FAMILIAS.map((f) => (
          <li className="mapa-fam" key={f.slug}>
            <span className="mapa-int">{f.intencion}</span>
            <h4>{f.titulo}</h4>
            <ul className="mapa-caps">
              {f.capacidades.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <a className="mapa-link" href={`/servicios#${f.slug}`}>
              Ver alcance y plazos
              <span aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
