import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Planes — Tryvex",
  description:
    "Proyecto único con alcance y precio cerrado, o Tryvex partner con equipo dedicado. Dos formas de trabajar con nosotros.",
  alternates: { canonical: "https://www.tryvex.tech/planes" },
  openGraph: {
    title: "Planes — Tryvex",
    description: "Proyectos puntuales o socio continuo. Dos puertas, mismo equipo.",
    url: "https://www.tryvex.tech/planes",
    locale: "es_CL",
    type: "website",
  },
};

export default function PlanesPage() {
  return (
    <>
      <div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
      <div className="grain"></div>



      <NavBar />
      <RevelarAlScroll />

      <main id="contenido" tabIndex={-1}>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "34px", paddingBottom: "60px" }}>
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">04</span><span className="sec-label">Planes</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>Dos puertas. <em>Mismo equipo.</em></h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "600px" }}>
              Proyectos puntuales o socio continuo. Si no calzas en ninguno, lo conversamos.
            </p>
          </div>
        </section>

        <section className="block" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <div className="offer" data-stagger>
              <div className="plan glass">
                <div className="plan-tag"><span className="dot"></span> Sprint</div>
                <h2>Proyecto único</h2>
                <p className="desc">Una landing, un flujo, un MVP. Alcance fijo, plazo fijo, precio cerrado.</p>
                <div className="plan-price">desde $150K+<small>CLP</small></div>
                <ul>
                  <li>Reunión de descubrimiento</li>
                  <li>Diseño y desarrollo</li>
                  <li>Despliegue en producción</li>
                  <li>30 días de soporte incluido</li>
                </ul>
                <Link href="/contacto" className="btn-primary">
                  Empezar un proyecto
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </Link>
              </div>
            </div>

            {/* Contenido propio de esta página: el home muestra las dos tarjetas
                para convertir, pero el criterio para elegir entre una y otra no
                estaba escrito en ninguna parte del sitio. */}
            <div style={{ maxWidth: "760px", margin: "72px auto 0" }} data-anim="fade-up">
              <h2 style={{ marginBottom: "20px" }}>¿Cuál conviene <em>en tu caso?</em></h2>
              <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "18px" }}>
                La pregunta útil no es cuánto cuesta cada uno, sino cuánto trabajo tienes por
                delante. Si lo que te quita el sueño es <strong>un</strong> proceso concreto —el que
                te hace abrir la planilla todos los días— eso es un proyecto único: se define el
                alcance en la llamada, se cierra el precio antes de partir y termina.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "18px" }}>
                El modelo de socio continuo aparece cuando la lista no se acaba: automatizas el
                primer proceso y al mes siguiente ya viste otros tres. Ahí contratar por proyecto
                se vuelve caro en tiempo —cada uno arranca con su propia negociación— y conviene
                tener el equipo disponible con sprints cada dos semanas.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "18px" }}>
                No hay que decidirlo hoy. La mayoría entra con un proyecto acotado, lo ve
                funcionando, y recién entonces conversamos si tiene sentido seguir mes a mes. No
                hay contratos atados en ninguno de los dos: si el sistema queda andando y no
                necesitas nada más, ese es un buen final.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: "1.7" }}>
                En ambos casos el código es tuyo, con repositorio, accesos y documentación, y
                todo lo que entregamos incluye 90 días de mantención sin costo.
              </p>
            </div>

            <p className="sec-sub" style={{ margin: "48px auto 0", textAlign: "center" }}>
              ¿Dudas antes de decidir? Mira <Link href="/preguntas" style={{ color: "var(--red-vivo)" }}>las preguntas frecuentes</Link> o
              revisa <Link href="/proceso" style={{ color: "var(--red-vivo)" }}>cómo trabajamos</Link>.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />

    </>
  );
}
