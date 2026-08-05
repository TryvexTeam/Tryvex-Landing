import type { Metadata } from "next";
import Link from "next/link";
import NavBar, { INNER_LINKS } from "../../components/NavBar";

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
            <span className="eyebrow"><span className="sec-num">01</span><span className="sec-label">Servicios</span></span>
            <h1 style={{ marginTop: "16px" }}>Tres formas de <em>sacar trabajo</em> de tu cabeza.</h1>
            <p className="lede" style={{ maxWidth: "600px" }}>
              Cada servicio se entrega como sistema vivo: deploy continuo, monitoreo y mantención incluida los primeros 90 días. Sin contratos a largo plazo.
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <div className="services" style={{ marginTop: "0" }}>

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
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--muted)", marginBottom: "8px" }}>Tiempo estimado</div>
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
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--muted)", marginBottom: "8px" }}>Tiempo estimado</div>
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
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "var(--muted)", marginBottom: "8px" }}>Tiempo estimado</div>
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