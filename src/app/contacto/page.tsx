import type { Metadata } from "next";
import Link from "next/link";
import NavBar, { INNER_LINKS } from "../../components/NavBar";
import FinalCTA from "../../features/landing/components/FinalCTA";

export const metadata: Metadata = {
  title: "Contacto — Tryvex",
  description: "Agenda una llamada de 20 minutos con el equipo de Tryvex. Sin compromiso, sin formularios kilométricos.",
  alternates: { canonical: "https://www.tryvex.tech/contacto" },
  openGraph: {
    title: "Contacto — Tryvex",
    description: "Agenda una llamada de 20 minutos con el equipo de Tryvex. Sin compromiso.",
    url: "https://www.tryvex.tech/contacto",
    locale: "es_CL",
    type: "website",
  },
};

export default function ContactoPage() {
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
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "140px", paddingBottom: "40px" }}>
            <span className="eyebrow"><span className="live"></span> 03 · Contacto</span>
            <h1 style={{ marginTop: "16px" }}>Agenda una llamada <em>de 20 minutos.</em></h1>
            <p className="lede" style={{ maxWidth: "600px" }}>
              Sin compromiso y sin costo. Cuéntanos tu problema y te decimos si podemos ayudarte — y en cuánto tiempo.
            </p>
          </div>
        </section>

        <section className="block" id="final">
          <div className="wrap">
            <FinalCTA />
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <div className="faq glass" style={{ maxWidth: "680px", margin: "0 auto" }}>
              <div className="sec-tag" style={{ marginBottom: "24px" }}>Preguntas frecuentes sobre la llamada</div>
              <details open={true}>
                <summary>¿Qué pasa en esa llamada de 20 minutos?</summary>
                <p>Conversamos sobre tu negocio, el proceso o problema que quieres resolver, y te damos una estimación de tiempo y costo. Sin venta agresiva.</p>
              </details>
              <details>
                <summary>¿Tienen experiencia en mi industria?</summary>
                <p>Trabajamos con negocios de retail, servicios profesionales, e-commerce y startups en Chile y LatAm. Si tu industria tiene procesos manuales, tenemos experiencia.</p>
              </details>
              <details>
                <summary>¿Cuánto cuesta un proyecto?</summary>
                <p>Una automatización parte desde $150.000 CLP. Una landing page desde $200.000 CLP. Un SaaS desde $800.000 CLP. El precio exacto lo cerramos en la llamada.</p>
              </details>
              <details>
                <summary>¿Puedo escribirles por email?</summary>
                <p>Sí. Escríbenos a <a href="mailto:tryvexentreprise@gmail.com" style={{ color: "var(--red)" }}>tryvexentreprise@gmail.com</a> y te respondemos el mismo día hábil.</p>
              </details>
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