import SalidaCTA from "../../landing/components/SalidaCTA";
import { KPIS, RANGOS, SEMANAS_MAX, PULSO } from "../data/actividad";

/** Ancho del viewBox del pulso. La altura se fija en 60 y el índice 0-100 la ocupa entera. */
const PULSO_VB = { w: 560, h: 60 } as const;

function trazoPulso(valores: number[]): string {
  const paso = PULSO_VB.w / (valores.length - 1);
  return valores
    .map((v, i) => {
      const px = (i * paso).toFixed(1);
      const py = (PULSO_VB.h - 4 - (v / 100) * (PULSO_VB.h - 10)).toFixed(1);
      return `${i === 0 ? "M" : "L"}${px},${py}`;
    })
    .join(" ");
}

/**
 * Panel de actividad.
 *
 * Muestra evidencia de operación sin exponer un solo dato de cliente: KPIs en
 * rango, plazos por tipo de proyecto y un pulso sin eje numérico. Los valores
 * viven en `data/actividad.ts`, no acá — el markup no es la fuente de verdad.
 */
export default function PanelActividad({ num }: { num?: string }) {
  const linea = trazoPulso(PULSO);
  const area = `${linea} L${PULSO_VB.w},${PULSO_VB.h} L0,${PULSO_VB.h} Z`;

  return (
    <div className="panel-act glass" data-anim="fade-up">
      <div className="pa-head">
        <div>
          <div className="sec-tag">
            {num && <span className="sec-num">{num}</span>}
            <span className="sec-label">Actividad</span>
          </div>
          <h2 data-anim="fade-up">
            Cómo se ve un estudio <em>que entrega.</em>
          </h2>
        </div>
        <p className="sec-sub" data-anim="fade-up">
          Métricas agregadas de nuestra propia operación. En rangos, nunca por cliente: lo que
          contratas con nosotros no se publica.
        </p>
      </div>

      <div className="pa-kpis" data-stagger>
        {KPIS.map((k) => (
          <div className="pa-kpi" key={k.etiqueta}>
            <div className="v">{k.valor}</div>
            <div className="l">{k.etiqueta}</div>
            <div className="n">{k.nota}</div>
          </div>
        ))}
      </div>

      <div className="pa-grid">
        <div className="pa-rangos">
          <h3 className="pa-sub">Plazo de entrega por tipo de proyecto</h3>
          <ul className="pa-lista">
            {RANGOS.map((r) => {
              const izq = (r.desde / SEMANAS_MAX) * 100;
              const ancho = ((r.hasta - r.desde) / SEMANAS_MAX) * 100;
              return (
                <li className="pa-rango" key={r.tipo}>
                  <div className="pa-rango-txt">
                    <span className="t">{r.tipo}</span>
                    <span className="w">
                      {r.desde}–{r.hasta} semanas
                    </span>
                  </div>
                  <div className="pa-barra" aria-hidden="true">
                    <span style={{ left: `${izq}%`, width: `${Math.max(ancho, 4)}%` }} />
                  </div>
                  <div className="pa-rango-det">{r.detalle}</div>
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="pa-pulso">
          <h3 className="pa-sub">Pulso de actividad · últimas 24 semanas</h3>
          <svg
            viewBox={`0 0 ${PULSO_VB.w} ${PULSO_VB.h}`}
            preserveAspectRatio="none"
            role="img"
            aria-label="Índice relativo de actividad de las últimas 24 semanas, con tendencia sostenida al alza."
          >
            <defs>
              <linearGradient id="pulsoFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e53935" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#e53935" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#pulsoFill)" />
            <path d={linea} fill="none" stroke="#0e0e0e" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <figcaption>
            Índice relativo, sin eje: comunica ritmo, no volumen facturado.
          </figcaption>
        </figure>
      </div>

      {/* La salida va dentro del panel, pegada a la prueba que la justifica:
          el visitante acaba de ver plazos y cumplimiento, es el punto donde
          preguntar por el suyo cuesta menos. */}
      <SalidaCTA texto="Estos son nuestros plazos. El tuyo lo estimamos en la llamada, con alcance y precio." />
    </div>
  );
}
