import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";

/**
 * Página de captación para "agente de WhatsApp para empresas".
 *
 * Sigue el mismo patrón que `/agencia-de-ia-en-chile`: hero directo, bloques
 * `mapa-fam` con lo que se construye, FAQ visible sin marcado, CTA final.
 *
 * El diferenciador de la página: la mayoría vende un chatbot que responde,
 * esto agenda, deriva y deja registro. No suavizar ese ángulo.
 */
export const metadata: Metadata = {
  title: "Agente de WhatsApp para empresas — Tryvex",
  description:
    "Un agente de IA para WhatsApp que agenda en tu calendario, deriva con contexto cuando hace falta una persona y deja registro auditable de cada acción. No es un chatbot de menú.",
  keywords: [
    "agente de WhatsApp para empresas",
    "chatbot WhatsApp Chile",
    "agente de IA WhatsApp",
    "automatización de agendamiento",
    "WhatsApp Business IA",
  ],
  alternates: { canonical: "https://www.tryvex.tech/agente-de-whatsapp-para-empresas" },
  openGraph: {
    title: "Agente de WhatsApp para empresas — Tryvex",
    description:
      "Agenda, deriva con contexto y deja registro auditable. La diferencia entre contestar y resolver.",
    url: "https://www.tryvex.tech/agente-de-whatsapp-para-empresas",
    locale: "es_CL",
    type: "website",
  },
};

/** Servicio + migas. La organización ya está declarada en el layout: acá solo
 *  se la referencia por `@id` en vez de repetirla, que duplicaría la entidad. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.tryvex.tech/agente-de-whatsapp-para-empresas#servicio",
      name: "Agentes de IA para WhatsApp",
      serviceType: "Desarrollo de agentes conversacionales con IA",
      provider: { "@id": "https://www.tryvex.tech/#organization" },
      areaServed: { "@type": "Country", name: "Chile" },
      audience: {
        "@type": "BusinessAudience",
        name: "Pymes y empresas medianas en Chile",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Agentes de WhatsApp",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Atención por WhatsApp con IA" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agendamiento automático en Google Calendar" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Derivación a personas con contexto" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Registro auditable de acciones" } },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.tryvex.tech" },
        { "@type": "ListItem", position: 2, name: "Agente de WhatsApp para empresas", item: "https://www.tryvex.tech/agente-de-whatsapp-para-empresas" },
      ],
    },
  ],
};

export default function AgenteWhatsAppEmpresasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
      <div className="grain"></div>

      <NavBar />
      <RevelarAlScroll />

      <main id="contenido" tabIndex={-1}>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "860px", paddingTop: "34px", paddingBottom: "48px" }}>
            <span className="eyebrow" data-anim="fade-down"><span className="sec-label">Santiago · Chile</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>
              Un agente de WhatsApp <em>que agenda.</em>
            </h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "640px" }}>
              La mayoría vende un chatbot que responde. Esto agenda, deriva y deja registro: la
              diferencia entre contestar y resolver. Precio y plazo cerrados desde el primer día.
            </p>
            <div className="respuesta-directa" data-anim="fade-up">
              <p>
                Un agente de WhatsApp es distinto de un chatbot: además de responder, agenda en el
                calendario, deriva a una persona cuando corresponde y deja registro auditable de
                cada acción. Tryvex lo construye en 3 semanas, integrado con Google
                Calendar y el CRM o la planilla que ya se use.
              </p>
            </div>
            <div className="hero-cta" data-anim="fade-up" style={{ marginTop: "28px" }}>
              <Link href="/contacto" className="btn-primary">
                Agenda una llamada de 20 min
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Qué construye Tryvex</span></div>
                <h2 data-anim="fade-up">Atiende, agenda y <em>deja registro.</em></h2>
              </div>
              <p className="sec-sub" data-anim="fade-up">
                Cada conversación queda conectada a tu calendario y a tu equipo, en vez de morir
                en una respuesta genérica.
              </p>
            </div>

            <div className="mapa" style={{ marginTop: "0", paddingTop: "0", borderTop: "none" }} data-anim="fade-up">
              <ul className="mapa-grid">
                <li className="mapa-fam">
                  <span className="mapa-int">Atiende</span>
                  <h3>Responde con información real</h3>
                  <ul className="mapa-caps">
                    <li>Lee el mensaje y entiende qué pide</li>
                    <li>Responde con la información real del negocio, no con un menú de opciones</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Agenda</span>
                  <h3>Toma la hora sola</h3>
                  <ul className="mapa-caps">
                    <li>Toma la hora en Google Calendar</li>
                    <li>Confirma por el mismo WhatsApp</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Deriva</span>
                  <h3>Pasa el caso con contexto</h3>
                  <ul className="mapa-caps">
                    <li>Cuando el caso necesita una persona, lo deriva</li>
                    <li>Pasa el contexto completo de la conversación</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Deja registro</span>
                  <h3>Cada acción es auditable</h3>
                  <ul className="mapa-caps">
                    <li>Cada acción queda anotada y es auditable</li>
                    <li>Se puede revisar qué hizo y por qué</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Por qué distinto</span></div>
                <h2 data-anim="fade-up">La mayoría contesta. <em>Este resuelve.</em></h2>
              </div>
              <p className="sec-sub" data-anim="fade-up">
                La mayoría vende un chatbot que responde preguntas de un menú. Este agenda, deriva
                y deja registro — la diferencia entre contestar y resolver.
              </p>
            </div>
            <p data-anim="fade-up" style={{ color: "var(--muted)", marginTop: "24px" }}>
              El agente toma 3 semanas. Se integra con Google Calendar, tu CRM o planilla
              actual, y correo. Ya se aplicó en restaurantes, automotoras, farmacias e
              inmobiliarias.
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Preguntas</span></div>
            <h2 data-anim="fade-up" style={{ marginBottom: "36px" }}>Lo que preguntan <em>antes de partir.</em></h2>

            <div className="faq glass" data-anim="fade-up">
              <details open>
                <summary>¿Es un chatbot?</summary>
                <p>
                  No en el sentido tradicional. Un chatbot responde desde un menú de opciones;
                  esto entiende el mensaje, agenda la hora, deriva a una persona cuando hace falta
                  y deja registro de cada acción.
                </p>
              </details>
              <details>
                <summary>¿Se conecta a mi calendario y a mi CRM?</summary>
                <p>
                  Sí. Se integra con Google Calendar y con el CRM o la planilla que ya usas, sin
                  migrar tus datos a un sistema nuevo.
                </p>
              </details>
              <details>
                <summary>¿Qué pasa cuando no sabe responder?</summary>
                <p>
                  Deriva la conversación a una persona con el contexto completo, no inventa una
                  respuesta. El traspaso queda registrado.
                </p>
              </details>
              <details>
                <summary>¿Cuánto demora?</summary>
                <p>
                  Toma 3 semanas.
                </p>
              </details>
            </div>

            <p style={{ color: "var(--muted)", marginTop: "32px" }}>
              El resto de las preguntas, con precios y condiciones, están en{" "}
              <Link href="/preguntas" style={{ color: "var(--red-vivo)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                preguntas frecuentes
              </Link>.
            </p>
          </div>
        </section>

        <section className="block" style={{ paddingBottom: "80px" }}>
          <div className="wrap">
            <div className="panel-act glass" data-anim="fade-up" style={{ textAlign: "center" }}>
              <h2 style={{ margin: "0 auto" }}>
                Cuéntanos qué te <em>quita tiempo.</em>
              </h2>
              <p style={{ color: "var(--muted)", maxWidth: "520px", margin: "18px auto 28px" }}>
                Veinte minutos, sin pitch. Salimos con una hipótesis, un alcance estimado y un
                precio. Si no podemos ayudarte, te lo decimos en la misma llamada.
              </p>
              <Link href="/contacto" className="btn-primary">
                Agenda una llamada de 20 min
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
