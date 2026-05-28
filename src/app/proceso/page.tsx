import type { Metadata } from "next";
import Link from "next/link";
import NavBar, { INNER_LINKS } from "../../components/NavBar";

export const metadata: Metadata = {
  title: "Proceso — Tryvex",
  description: "De la idea a producción en cuatro pasos. Así trabajamos en Tryvex: sin briefs eternos ni reuniones de status.",
  alternates: { canonical: "https://www.tryvex.tech/proceso" },
  openGraph: {
    title: "Proceso — Tryvex",
    description: "De la idea a producción en cuatro pasos. Así trabajamos en Tryvex.",
    url: "https://www.tryvex.tech/proceso",
    locale: "es_CL",
    type: "website",
  },
};

export default function ProcesoPage() {
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

      <NavBar links={INNER_LINKS} ctaHref="/contacto" />

      <main>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "140px", paddingBottom: "80px" }}>
            <span className="eyebrow"><span className="live"></span> 02 · Proceso</span>
            <h1 style={{ marginTop: "16px" }}>De la idea a producción <em>en cuatro pasos.</em></h1>
            <p className="lede" style={{ maxWidth: "600px" }}>
              Sin briefs eternos ni reuniones de status. Conversamos, mapeamos, construimos y entregamos. Así de simple.
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <div className="process" style={{ marginTop: "0" }}>

              <div className="step glass">
                <div className="step-num">01</div>
                <h3>Llamada inicial</h3>
                <p>20 minutos. Cuéntanos qué te quita tiempo o qué quieres construir. Salimos con una hipótesis clara y un alcance estimado.</p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: "12px" }}>Sin compromiso. Sin formularios kilométricos. Solo una conversación honesta sobre tu negocio.</p>
                <div className="step-meta">Día 0</div>
              </div>

              <div className="step glass">
                <div className="step-num">02</div>
                <h3>Mapeo del flujo</h3>
                <p>Diagramamos el proceso actual y el ideal. Definimos integraciones, fuentes de datos, puntos de fallo y métricas de éxito.</p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: "12px" }}>Recibes un documento con el alcance exacto, el costo y el plazo antes de firmar cualquier cosa.</p>
                <div className="step-meta">Día 1–3</div>
              </div>

              <div className="step glass">
                <div className="step-num">03</div>
                <h3>Build & ship</h3>
                <p>Iteramos en sprints cortos de una semana. Cada viernes ves un avance funcional — no un mockup en Figma, sino algo que puedes tocar.</p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: "12px" }}>Acceso al repositorio desde el día uno. Tú eres dueño del código en todo momento.</p>
                <div className="step-meta">Semana 1–4</div>
              </div>

              <div className="step glass">
                <div className="step-num">04</div>
                <h3>En vivo</h3>
                <p>Dejamos el sistema corriendo en producción con monitoreo, alertas y logs. Incluimos 90 días de mantención sin costo adicional.</p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: "12px" }}>Si algo no funciona como lo prometimos en los primeros 30 días, lo resolvemos o devolvemos el último pago.</p>
                <div className="step-meta">Semana 4+</div>
              </div>

            </div>

            <div className="metrics-block glass dark" style={{ marginTop: "64px" }}>
              <div className="sec-tag">Números que importan</div>
              <div className="metrics" style={{ marginTop: "32px" }}>
                <div className="metric">
                  <div className="v">3<em>d</em></div>
                  <div className="l">Primer entregable funcional</div>
                </div>
                <div className="metric">
                  <div className="v">14</div>
                  <div className="l">Negocios activos ahora mismo</div>
                </div>
                <div className="metric">
                  <div className="v">90<em>d</em></div>
                  <div className="l">Mantención post-entrega incluida</div>
                </div>
                <div className="metric">
                  <div className="v">0</div>
                  <div className="l">Contratos de permanencia</div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "64px", paddingBottom: "40px" }}>
              <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
                ¿Listo para el paso 1? La llamada es gratis y sin compromiso.
              </p>
              <Link href="/contacto" className="btn-primary">
                Agendar llamada gratuita
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
            </div>
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
                <Link href="/proceso">Proceso</Link>
                <Link href="/#offer">Planes</Link>
                <Link href="/#faq">Preguntas</Link>
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