import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";
import { CONTACTO_HREF } from "../../lib/mail";

export const metadata: Metadata = {
  title: "Preguntas frecuentes — Tryvex",
  description:
    "Plazos, propiedad del código, garantía y cobertura fuera de Chile. Lo que casi siempre nos preguntan antes de la llamada.",
  alternates: { canonical: "https://www.tryvex.tech/preguntas" },
  openGraph: {
    title: "Preguntas frecuentes — Tryvex",
    description: "Lo que casi siempre nos preguntan antes de la llamada.",
    url: "https://www.tryvex.tech/preguntas",
    locale: "es_CL",
    type: "website",
  },
};

export default function PreguntasPage() {
  return (
    <>
      <div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
      <div className="grain"></div>



      <NavBar />
      <RevelarAlScroll />

      <main id="contenido" tabIndex={-1}>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "34px", paddingBottom: "60px" }}>
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">05</span><span className="sec-label">Preguntas</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>Lo que casi siempre nos preguntan <em>antes de la llamada.</em></h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "600px" }}>
              ¿Quedó algo sin responder? Escríbenos a{" "}
              <a href={CONTACTO_HREF} target="_blank" rel="noopener noreferrer" style={{ color: "var(--red)" }}>contacto@tryvex.tech</a>{" "}
              y te contestamos el mismo día.
            </p>
          </div>
        </section>

        <section className="block" style={{ paddingTop: "0" }}>
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="faq glass">
                <details open>
                  <summary>¿Trabajan con empresas chicas?</summary>
                  <p>Sí. La mayoría de nuestros clientes son negocios entre 2 y 30 personas. Si la planilla ya te queda chica, calzamos.</p>
                </details>
                <details>
                  <summary>¿Cuánto se demora un proyecto?</summary>
                  <p>Una landing entre 5 y 10 días. Una automatización completa entre 2 y 4 semanas. Un MVP de SaaS entre 4 y 8 semanas.</p>
                </details>
                <details>
                  <summary>¿El código es nuestro?</summary>
                  <p>Sí, sin asteriscos. Te entregamos repositorio, accesos y documentación. Si mañana quieres trabajar con otro equipo, lo puedes hacer.</p>
                </details>
                <details>
                  <summary>¿Atienden fuera de Chile?</summary>
                  <p>Sí. Trabajamos remoto con equipos en LatAm y EE.UU. La mayoría de las herramientas son en español o inglés indistintamente.</p>
                </details>
                <details>
                  <summary>¿Qué pasa si no funciona?</summary>
                  <p>Tenemos garantía de 30 días. Si no entregamos lo prometido, devolvemos el último mes. Es raro que pase, pero está por escrito.</p>
                </details>
                <details>
                  <summary>¿Qué pasa cuando el sistema ya está en producción?</summary>
                  <p>Quedan 90 días de mantención incluida, sin costo extra. En ese período el flujo corre con monitoreo y alertas: si algo se cae, nos enteramos nosotros antes que tú.</p>
                </details>
                <details>
                  <summary>¿Qué necesitan de nuestra parte para partir?</summary>
                  <p>Una llamada de 20 minutos y, entre el día 1 y el 3, acceso de lectura a las herramientas que ya usan. Con eso armamos el diagrama del proceso actual contra el ideal. De ahí en adelante el trabajo es nuestro.</p>
                </details>
                <details>
                  <summary>¿Hay que cambiar las herramientas que ya usamos?</summary>
                  <p>Casi nunca. Automatizamos sobre lo que ya existe: integramos SII, WhatsApp y Calendar con ingeniería propia, y n8n o Zapier cuando conviene. Cambiar de herramienta es la última opción, no la primera.</p>
                </details>
                <details>
                  <summary>¿Cómo sabemos que está funcionando?</summary>
                  <p>Cada flujo entrega logs, alertas y un panel de control donde se ve qué corrió y qué falló. Con el plan de socio continuo, además llega un reporte mensual con las métricas del período.</p>
                </details>
                <details>
                  <summary>¿Necesito cambiar mi software de facturación para automatizar el SII?</summary>
                  <p>No. La automatización es una capa que opera sobre el software de facturación certificado que tu empresa ya usa, sea Bsale u otro. Tryvex no es emisor electrónico certificado ante el SII ni gestiona folios CAF: conecta lo que ya tienes con tu sistema de ventas para que el DTE se emita, se envíe y se concilie sin tipeo manual.</p>
                </details>
                <details>
                  <summary>¿En qué se diferencia un agente de IA de un chatbot?</summary>
                  <p>Un chatbot responde preguntas. Un agente hace el trabajo: consulta la base de datos, agenda en el calendario, deriva a una persona cuando el caso lo necesita y deja registro auditable de cada acción. La diferencia práctica es si al final de la conversación quedó algo hecho o solo contestado.</p>
                </details>
                <details>
                  <summary>¿Pueden correr la IA sin que mis datos salgan de la empresa?</summary>
                  <p>Sí. Cuando el dato es sensible, montamos modelos de peso abierto dentro de tu propia infraestructura, de modo que nada de lo que procesa el modelo viaje fuera de tu red. Toma 4 semanas desde $1.600.000 CLP e incluye ruteo entre proveedores sin reescribir el código.</p>
                </details>
                <details>
                  <summary>¿Cuánto cuesta un proyecto?</summary>
                  <p>Una landing esencial parte desde $150.000 CLP y una automatización de un proceso desde $450.000 CLP. Un agente de IA conectado a tus sistemas desde $1.600.000 CLP y un producto a medida desde $2.800.000 CLP. El precio exacto se cierra en la llamada de 20 minutos, antes de firmar nada, y no cambia después.</p>
                </details>
                <details>
                  <summary>¿Qué tan exacto es el procesamiento de documentos con IA?</summary>
                  <p>El sistema deja el trabajo hecho y una persona revisa lo que tiene consecuencia. No prometemos exactitud perfecta: lo que se gana es que nadie tenga que abrir cada documento para saber de qué se trata y copiar los datos a mano.</p>
                </details>
            </div>

            <p className="sec-sub" style={{ margin: "48px auto 0", textAlign: "center" }}>
              ¿Todo claro? Mira <Link href="/planes" style={{ color: "var(--red)" }}>los planes</Link> o{" "}
              <Link href="/contacto" style={{ color: "var(--red)" }}>agenda una llamada de 20 minutos</Link>.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "¿Trabajan con empresas chicas?",
                acceptedAnswer: { "@type": "Answer", text: "Sí. La mayoría de nuestros clientes son negocios entre 2 y 30 personas. Si la planilla ya te queda chica, calzamos." },
              },
              {
                "@type": "Question",
                name: "¿Cuánto se demora un proyecto?",
                acceptedAnswer: { "@type": "Answer", text: "Una landing entre 5 y 10 días. Una automatización completa entre 2 y 4 semanas. Un MVP de SaaS entre 4 y 8 semanas." },
              },
              {
                "@type": "Question",
                name: "¿El código es nuestro?",
                acceptedAnswer: { "@type": "Answer", text: "Sí, sin asteriscos. Te entregamos repositorio, accesos y documentación. Si mañana quieres trabajar con otro equipo, lo puedes hacer." },
              },
              {
                "@type": "Question",
                name: "¿Atienden fuera de Chile?",
                acceptedAnswer: { "@type": "Answer", text: "Sí. Trabajamos remoto con equipos en LatAm y EE.UU. La mayoría de las herramientas son en español o inglés indistintamente." },
              },
              {
                "@type": "Question",
                name: "¿Qué pasa cuando el sistema ya está en producción?",
                acceptedAnswer: { "@type": "Answer", text: "Quedan 90 días de mantención incluida, sin costo extra. En ese período el flujo corre con monitoreo y alertas: si algo se cae, nos enteramos nosotros antes que tú." },
              },
              {
                "@type": "Question",
                name: "¿Qué necesitan de nuestra parte para partir?",
                acceptedAnswer: { "@type": "Answer", text: "Una llamada de 20 minutos y, entre el día 1 y el 3, acceso de lectura a las herramientas que ya usan. Con eso armamos el diagrama del proceso actual contra el ideal. De ahí en adelante el trabajo es nuestro." },
              },
              {
                "@type": "Question",
                name: "¿Hay que cambiar las herramientas que ya usamos?",
                acceptedAnswer: { "@type": "Answer", text: "Casi nunca. Automatizamos sobre lo que ya existe: integramos SII, WhatsApp y Calendar con ingeniería propia, y n8n o Zapier cuando conviene. Cambiar de herramienta es la última opción, no la primera." },
              },
              {
                "@type": "Question",
                name: "¿Cómo sabemos que está funcionando?",
                acceptedAnswer: { "@type": "Answer", text: "Cada flujo entrega logs, alertas y un panel de control donde se ve qué corrió y qué falló. Con el plan de socio continuo, además llega un reporte mensual con las métricas del período." },
              },
              {
                "@type": "Question",
                name: "¿Qué pasa si no funciona?",
                acceptedAnswer: { "@type": "Answer", text: "Tenemos garantía de 30 días. Si no entregamos lo prometido, devolvemos el último mes. Es raro que pase, pero está por escrito." },
              },
              {
                "@type": "Question",
                name: "¿Necesito cambiar mi software de facturación para automatizar el SII?",
                acceptedAnswer: { "@type": "Answer", text: "No. La automatización es una capa que opera sobre el software de facturación certificado que tu empresa ya usa, sea Bsale u otro. Tryvex no es emisor electrónico certificado ante el SII ni gestiona folios CAF: conecta lo que ya tienes con tu sistema de ventas para que el DTE se emita, se envíe y se concilie sin tipeo manual." },
              },
              {
                "@type": "Question",
                name: "¿En qué se diferencia un agente de IA de un chatbot?",
                acceptedAnswer: { "@type": "Answer", text: "Un chatbot responde preguntas. Un agente hace el trabajo: consulta la base de datos, agenda en el calendario, deriva a una persona cuando el caso lo necesita y deja registro auditable de cada acción. La diferencia práctica es si al final de la conversación quedó algo hecho o solo contestado." },
              },
              {
                "@type": "Question",
                name: "¿Pueden correr la IA sin que mis datos salgan de la empresa?",
                acceptedAnswer: { "@type": "Answer", text: "Sí. Cuando el dato es sensible, montamos modelos de peso abierto dentro de tu propia infraestructura, de modo que nada de lo que procesa el modelo viaje fuera de tu red. Toma 4 semanas desde $1.600.000 CLP e incluye ruteo entre proveedores sin reescribir el código." },
              },
              {
                "@type": "Question",
                name: "¿Cuánto cuesta un proyecto?",
                acceptedAnswer: { "@type": "Answer", text: "Una landing esencial parte desde $150.000 CLP y una automatización de un proceso desde $450.000 CLP. Un agente de IA conectado a tus sistemas desde $1.600.000 CLP y un producto a medida desde $2.800.000 CLP. El precio exacto se cierra en la llamada de 20 minutos, antes de firmar nada, y no cambia después." },
              },
              {
                "@type": "Question",
                name: "¿Qué tan exacto es el procesamiento de documentos con IA?",
                acceptedAnswer: { "@type": "Answer", text: "El sistema deja el trabajo hecho y una persona revisa lo que tiene consecuencia. No prometemos exactitud perfecta: lo que se gana es que nadie tenga que abrir cada documento para saber de qué se trata y copiar los datos a mano." },
              }
            ],
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".faq summary", ".faq p"],
            },
          }),
        }}
      />
    </>
  );
}
