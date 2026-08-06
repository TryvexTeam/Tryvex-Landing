import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Servicios — Tryvex",
  description: "Automatizaciones de procesos, landing pages de alta conversión y SaaS a medida. Tres formas de sacar trabajo de tu cabeza.",
  alternates: { canonical: "https://www.tryvex.tech/servicios" },
  openGraph: {
    title: "Servicios — Tryvex",
    description: "Automatizaciones, landing pages y SaaS para empresas que quieren escalar.",
    url: "https://www.tryvex.tech/servicios",
    locale: "es_CL",
    type: "website",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
      <div className="grain"></div>


      <NavBar />
      <RevelarAlScroll />

      <main id="contenido" tabIndex={-1}>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "34px", paddingBottom: "60px" }}>
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">01</span><span className="sec-label">Servicios</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>Tres formas de <em>sacar trabajo</em> de tu cabeza.</h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "600px" }}>
              Cada servicio se entrega como sistema vivo: deploy continuo, monitoreo y mantención incluida los primeros 90 días. Sin contratos a largo plazo.
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <div className="services" data-stagger style={{ marginTop: "0" }}>

              <div className="svc glass">
                <div className="svc-head">
                  <div className="svc-num">01 — Automatización de procesos</div>
                  <div className="svc-icon">
                    <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h10M4 17h7"/><circle cx="20" cy="17" r="2"/></svg>
                  </div>
                </div>
                <h2 style={{ fontSize: "1.4rem" }}>Procesos que corren mientras duermes.</h2>
                <p>Desde un pedido en Shopify hasta una factura SII firmada. Conectamos tus herramientas con flujos hechos a medida que reemplazan trabajo manual y repetitivo.</p>
                <ul className="svc-list">
                  <li>Integraciones con SII Chile, WhatsApp y Google Calendar</li>
                  <li>Workflows con <a href="https://n8n.io" target="_blank" rel="noopener noreferrer">n8n</a>, <a href="https://zapier.com" target="_blank" rel="noopener noreferrer">Zapier</a> o código propio</li>
                  <li>Conexión con Shopify, Bsale, Mercado Libre y más</li>
                  <li>Logs, alertas y panel de control en tiempo real</li>
                  <li>Mantención los primeros 90 días sin costo adicional</li>
                </ul>
                <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)", marginBottom: "8px" }}>Tiempo estimado</div>
                  <strong>2 a 4 semanas</strong>
                </div>
              </div>

              <div className="svc glass">
                <div className="svc-head">
                  <div className="svc-num">02 — Landing pages de alta conversión</div>
                  <div className="svc-icon">
                    <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14h5"/></svg>
                  </div>
                </div>
                <h2 style={{ fontSize: "1.4rem" }}>Páginas que cargan rápido y convierten.</h2>
                <p>Diseño + copy + ingeniería en una semana. Sin Wix, sin plantillas. Hechas para captar y medir, no para verse bonitas en un demo.</p>
                <ul className="svc-list">
                  <li>Diseño y copy estratégico enfocado en conversión</li>
                  <li>Optimización SEO técnica desde el día uno</li>
                  <li>Tracking de conversiones y eventos de salida</li>
                  <li>A/B testing y mejora continua basada en datos reales</li>
                  <li>Performance 90+ en Core Web Vitals (Google)</li>
                </ul>
                <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)", marginBottom: "8px" }}>Tiempo estimado</div>
                  <strong>5 a 10 días</strong>
                </div>
              </div>

              <div className="svc glass">
                <div className="svc-head">
                  <div className="svc-num">03 — SaaS a medida</div>
                  <div className="svc-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M5 7l14 10M19 7L5 17"/></svg>
                  </div>
                </div>
                <h2 style={{ fontSize: "1.4rem" }}>Producto interno o de mercado, sin ruedas.</h2>
                <p>Cuando una hoja de cálculo dejó de alcanzar. Construimos producto desde cero — frontend, backend, autenticación y despliegue completo incluido.</p>
                <ul className="svc-list">
                  <li>MVPs funcionales en 4 a 8 semanas</li>
                  <li>Stack moderno: Next.js, TypeScript, PostgreSQL</li>
                  <li>Autenticación, roles y panel de administración</li>
                  <li>Despliegue en producción con CI/CD incluido</li>
                  <li>Soporte mensual opcional post-entrega</li>
                </ul>
                <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)", marginBottom: "8px" }}>Tiempo estimado</div>
                  <strong>4 a 8 semanas</strong>
                </div>
              </div>

            </div>

            <div style={{ textAlign: "center", marginTop: "64px", paddingBottom: "40px" }}>
              <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
                ¿No sabes por cuál empezar? Conversamos 20 minutos y te decimos qué tiene más impacto para tu negocio.
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