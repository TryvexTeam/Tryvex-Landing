import type { Metadata } from "next";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import FinalCTA from "../../features/landing/components/FinalCTA";
import SiteFooter from "../../components/SiteFooter";

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



      <NavBar />
      <RevelarAlScroll />

      <main id="contenido" tabIndex={-1}>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "34px", paddingBottom: "60px" }}>
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">07</span><span className="sec-label">Contacto</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>Agenda una llamada <em>de 20 minutos.</em></h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "600px" }}>
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

      <SiteFooter />

    </>
  );
}