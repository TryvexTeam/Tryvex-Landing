import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import BloqueResultados from "../../features/landing/components/BloqueResultados";
import { fetchStats } from "../../features/landing/stats";
import SiteFooter from "../../components/SiteFooter";

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

export default async function ProcesoPage() {
  const stats = await fetchStats();

  return (
    <>
      <div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
      <div className="grain"></div>



      <NavBar />
      <RevelarAlScroll />

      <main id="contenido" tabIndex={-1}>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "34px", paddingBottom: "80px" }}>
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">03</span><span className="sec-label">Proceso</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>De la idea a producción <em>en cuatro pasos.</em></h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "600px" }}>
              Sin briefs eternos ni reuniones de status. Conversamos, mapeamos, construimos y entregamos. Así de simple.
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <div className="process" data-stagger style={{ marginTop: "0" }}>

              <div className="step glass">
                <div className="step-num">01</div>
                <h2>Llamada inicial</h2>
                <p>20 minutos. Cuéntanos qué te quita tiempo o qué quieres construir. Salimos con una hipótesis clara y un alcance estimado.</p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: "12px" }}>Sin compromiso. Sin formularios kilométricos. Solo una conversación honesta sobre tu negocio.</p>
                <div className="step-meta">Día 0</div>
              </div>

              <div className="step glass">
                <div className="step-num">02</div>
                <h2>Mapeo del flujo</h2>
                <p>Diagramamos el proceso actual y el ideal. Definimos integraciones, fuentes de datos, puntos de fallo y métricas de éxito.</p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: "12px" }}>Recibes un documento con el alcance exacto, el costo y el plazo antes de firmar cualquier cosa.</p>
                <div className="step-meta">Día 1–3</div>
              </div>

              <div className="step glass">
                <div className="step-num">03</div>
                <h2>Build & ship</h2>
                <p>Iteramos en sprints cortos de una semana. Cada viernes ves un avance funcional — no un mockup en Figma, sino algo que puedes tocar.</p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: "12px" }}>Acceso al repositorio desde el día uno. Tú eres dueño del código en todo momento.</p>
                <div className="step-meta">Semana 1–4</div>
              </div>

              <div className="step glass">
                <div className="step-num">04</div>
                <h2>En vivo</h2>
                <p>Dejamos el sistema corriendo en producción con monitoreo, alertas y logs. Incluimos 90 días de mantención sin costo adicional.</p>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: "12px" }}>Si algo no funciona como lo prometimos en los primeros 30 días, lo resolvemos o devolvemos el último pago.</p>
                <div className="step-meta">Semana 4+</div>
              </div>

            </div>

            <div style={{ marginTop: "64px" }}>
              <BloqueResultados stats={stats} />
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

      <SiteFooter />

    </>
  );
}