import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";

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

      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <symbol id="spark" viewBox="0 0 100 100">
            <path d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z" fill="#0e0e0e"/>
            <path d="M 82 14 C 83 19, 87 23, 92 24 C 87 25, 83 29, 82 34 C 81 29, 77 25, 72 24 C 77 23, 81 19, 82 14 Z" fill="#e53935"/>
          </symbol>
        </defs>
      </svg>

      <NavBar />
      <RevelarAlScroll />

      <main>
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

            <p className="sec-sub" style={{ margin: "48px auto 0", textAlign: "center" }}>
              ¿Dudas antes de decidir? Mira <Link href="/preguntas" style={{ color: "var(--red)" }}>las preguntas frecuentes</Link> o
              revisa <Link href="/proceso" style={{ color: "var(--red)" }}>cómo trabajamos</Link>.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-card glass">
            <div className="foot-top">
              <div className="foot-brand">
                <Link href="/" className="logo">
                  <svg className="logo-mark" style={{ width: "32px", height: "32px" }}><use href="#spark"/></svg>
                  <span className="logo-word">tryvex<span className="dot">.</span></span>
                </Link>
                <p>Software studio en Santiago. Construimos sistemas que corren solos para negocios que no tienen tiempo que perder.</p>
              </div>
              <div>
                <h5>Servicios</h5>
                <Link href="/servicios">Automatización</Link>
                <Link href="/servicios">Landing pages</Link>
                <Link href="/servicios">SaaS a medida</Link>
              </div>
              <div>
                <h5>Estudio</h5>
                <Link href="/catalogo">Catálogo</Link>
                <Link href="/proceso">Proceso</Link>
                <Link href="/planes">Planes</Link>
                <Link href="/preguntas">Preguntas</Link>
              </div>
              <div>
                <h5>Contacto</h5>
                <Link href="/contacto">Agendar llamada</Link>
                <a href="mailto:tryvexentreprise@gmail.com">tryvexentreprise@gmail.com</a>
                <span>Santiago · CL</span>
              </div>
            </div>
            <div className="foot-bottom">
              <div>© MMXXVI · Tryvex</div>
              <div>Hecho a mano en Santiago</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
