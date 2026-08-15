import {
  MODELOS,
  ACTUALIZADO,
  FUENTE_URL,
  INDICE_VERSION,
  VB,
  PLOT,
  TICKS_COSTO,
  TICKS_INDICE,
  x,
  y,
} from "../data/modelos";

const dinero = (v: number) => `$${v.toFixed(2)}`;

/**
 * "Con qué inteligencia trabajamos".
 *
 * El scatter es decorativo-informativo: la tabla de abajo lleva los mismos
 * datos en texto, así que el SVG va con `aria-hidden` y nadie pierde
 * información por no verlo. Duplicar los valores en `aria-label` de cada punto
 * solo genera ruido en el lector de pantalla.
 */
interface Props {
  /** Número de sección; se omite fuera de un recorrido numerado. */
  num?: string;
  /**
   * `data-split="words"` solo funciona donde se monta `LandingClient` — el
   * home. En las páginas internas el splitter no corre y el CSS dejaría las
   * palabras en opacity 0: el titular no se vería nunca. Misma precaución que
   * `BloqueResultados`.
   */
  conSplit?: boolean;
}

export default function InteligenciaModelos({ num, conSplit = false }: Props) {
  return (
    <>
      <div className="sec-head">
        <div>
          <div className="sec-tag" data-anim="fade-down">
            {num && <span className="sec-num">{num}</span>}
            <span className="sec-label">Inteligencia</span>
          </div>
          <h2 {...(conSplit ? { "data-split": "words" } : { "data-anim": "fade-up" })}>
            Trabajamos con los <em>mejores modelos del mercado.</em>
          </h2>
        </div>
        <p className="sec-sub" data-anim="fade-up">
          No casamos el proyecto con un proveedor. Elegimos el modelo por tarea — el de frontera
          donde hace falta criterio, el barato donde solo hace falta volumen, y uno corriendo en
          tu propia infraestructura cuando el dato no puede salir de ahí.
        </p>
      </div>

      <div className="ia-panel glass" data-anim="fade-up">
        <figure className="ia-scatter">
          <figcaption className="ia-cap">
            <span className="t">Inteligencia frente a costo por tarea</span>
            <span className="s">Arriba es más capaz · a la izquierda es más barato · escala logarítmica</span>
          </figcaption>

          <svg viewBox={`0 0 ${VB.w} ${VB.h}`} aria-hidden="true" focusable="false">
            {TICKS_INDICE.map((t) => (
              <g key={`gy-${t}`}>
                <line x1={PLOT.izq} y1={y(t)} x2={PLOT.der} y2={y(t)} className="ia-grid" />
                <text x={PLOT.izq - 10} y={y(t) + 4} className="ia-tick ia-tick-y">
                  {t}
                </text>
              </g>
            ))}
            {TICKS_COSTO.map((t) => (
              <text key={`gx-${t}`} x={x(t)} y={PLOT.inf + 22} className="ia-tick ia-tick-x">
                {dinero(t)}
              </text>
            ))}

            <line x1={PLOT.izq} y1={PLOT.inf} x2={PLOT.der} y2={PLOT.inf} className="ia-eje" />
            <line x1={PLOT.izq} y1={PLOT.sup} x2={PLOT.izq} y2={PLOT.inf} className="ia-eje" />

            <text x={PLOT.izq} y={PLOT.inf + 42} className="ia-eje-lbl">
              Costo por tarea (USD)
            </text>
            <text
              className="ia-eje-lbl"
              transform={`translate(16 ${PLOT.sup + 4}) rotate(-90)`}
              textAnchor="end"
            >
              Índice de inteligencia
            </text>

            {MODELOS.map((m) => (
              <g key={m.nombre} className={m.enUso ? "ia-pt ia-pt-uso" : "ia-pt"}>
                <circle cx={x(m.costo)} cy={y(m.indice)} r={m.enUso ? 6 : 4.5} />
                <text x={x(m.costo) + (m.dx ?? 0)} y={y(m.indice) + (m.dy ?? -12)}>
                  {m.nombre}
                </text>
              </g>
            ))}
          </svg>

          <ul className="ia-leyenda">
            <li className="uso">En nuestro stack hoy</li>
            <li>Resto del panorama</li>
          </ul>
        </figure>

        <div className="ia-tabla-wrap">
          <table className="ia-tabla">
            <caption className="sr-only">
              Modelos ordenados por índice de inteligencia, con su costo por tarea y si Tryvex los
              usa en producción.
            </caption>
            <thead>
              <tr>
                <th scope="col">Modelo</th>
                <th scope="col">Índice</th>
                <th scope="col">Costo / tarea</th>
                <th scope="col">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {MODELOS.map((m) => (
                <tr key={m.nombre} className={m.enUso ? "uso" : undefined}>
                  <th scope="row">
                    {m.nombre}
                    {m.enUso && <span className="ia-chip">en uso</span>}
                  </th>
                  <td>{m.indice}</td>
                  <td>{dinero(m.costo)}</td>
                  <td>{m.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="ia-metodo">
          A la tabla se suman los modelos que no entran en el ranking público: enrutamos por
          OpenRouter cuando conviene cambiar de proveedor sin tocar el código, y corremos modelos
          de peso abierto —Qwen entre ellos— dentro de la infraestructura del cliente con Ollama
          cuando el dato es sensible y no puede salir de ahí.
          <br />
          <br />
          Snapshot mensual del {INDICE_VERSION} de{" "}
          <a href={FUENTE_URL} target="_blank" rel="noopener noreferrer">
            Artificial Analysis
          </a>
          , un evaluador independiente. Actualizado el {ACTUALIZADO}. No consultamos su API en
          vivo: preferimos un dato con fecha visible antes que una tabla vacía el día que un
          tercero se cae.
        </p>
      </div>
    </>
  );
}
