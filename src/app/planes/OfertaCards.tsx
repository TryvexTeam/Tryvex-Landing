import Link from "next/link";

export default function OfertaCards() {
  return (
    <div className="offer" data-stagger>
      <div className="plan glass">
        <div className="plan-tag"><span className="dot"></span> Sprint</div>
        <h2>Proyecto único</h2>
        <p className="desc">Una landing, un flujo, un MVP. Alcance fijo, plazo fijo, precio cerrado.</p>
        <div className="plan-price">desde $150K+<small>CLP</small></div>
        <p style={{ color: "var(--muted)", fontSize: "12.5px", marginTop: "-4px" }}>50% al iniciar, 50% contra entrega.</p>
        <ul>
          <li>Reunión de descubrimiento</li>
          <li>Diseño y desarrollo</li>
          <li>Despliegue en producción</li>
          <li>90 días de mantención incluida</li>
        </ul>
        <Link href="/contacto" className="btn-primary">
          Empezar un proyecto
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>
      <div className="plan glass feat">
        <div className="plan-tag"><span className="dot"></span> Personalizado</div>
        <h2>Tryvex <em>partner</em></h2>
        <p className="desc">Para negocios que necesitan un equipo propio. Alcance, ritmo y precio se definen juntos en una llamada.</p>
        <div className="plan-price" style={{ fontSize: "1.4rem", letterSpacing: "-0.02em" }}>Precio a medida</div>
        <ul>
          <li>Equipo dedicado (diseño + dev)</li>
          <li>Sprints quincenales adaptados a tu ritmo</li>
          <li>Catálogo de servicios completo a tu disposición</li>
          <li>Reportes mensuales con métricas reales</li>
        </ul>
        <Link href="/contacto" className="btn-primary">
          Agendar una llamada
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      </div>
    </div>
  );
}
