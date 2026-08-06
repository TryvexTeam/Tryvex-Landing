import type { Stats } from "../stats";

interface Props {
  stats: Stats;
  /** Número de sección; se omite fuera del recorrido numerado del home. */
  num?: string;
  /** Solo el home divide el titular en palabras: ese efecto lo mueve GSAP
   *  desde `LandingClient`, que no se monta en las páginas internas. */
  conSplit?: boolean;
}

/**
 * Bloque oscuro de resultados.
 *
 * Vive en un solo lugar porque lo usan el home y `/proceso`. En `/proceso`
 * había una versión propia con solo la etiqueta sobre los números —sin
 * titular— y la tarjeta quedaba con un hueco muerto arriba que la hacía ver
 * desarmada frente a la del home.
 */
export default function BloqueResultados({ stats, num, conSplit = false }: Props) {
  const { businesses, leads_identificados } = stats;

  return (
    <div className="metrics-block glass dark">
      <div className="sec-tag">
        {num && <span className="sec-num">{num}</span>}
        <span className="sec-label">Resultados</span>
      </div>
      <h2 {...(conSplit ? { "data-split": "words" } : { "data-anim": "fade-up" })}>
        Lo que nuestros clientes <em>dejaron de hacer</em> a mano.
      </h2>
      <div className="metrics" data-stagger>
        <div className="metric">
          <div className="v">{leads_identificados}<em>+</em></div>
          <div className="l">Empresas mapeadas en Chile</div>
        </div>
        <div className="metric">
          <div className="v">4.7<em>×</em></div>
          <div className="l">Conversión promedio en landings nuevas</div>
        </div>
        <div className="metric">
          <div className="v">98<em>%</em></div>
          <div className="l">SLA de uptime en flujos críticos</div>
        </div>
        <div className="metric">
          <div className="v">{businesses}</div>
          <div className="l">Clientes activos con Tryvex</div>
        </div>
      </div>
    </div>
  );
}
