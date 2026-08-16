import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";
import InteligenciaModelos from "../../features/capacidad/components/InteligenciaModelos";
import { demosPublicadas } from "../../features/catalogo/data";
import DemoCard from "../../features/catalogo/components/DemoCard";
import "../../features/capacidad/capacidad.css";
import "../../features/catalogo/catalogo.css";

/**
 * Página de captación para "agencia de IA en Chile".
 *
 * Existe porque ninguna URL del sitio respondía esa pregunta: el home dice
 * "Hacemos el software", que convierte bien a quien ya llegó pero es invisible
 * para quien está buscando. La competencia local sí tiene una URL con ese
 * nombre exacto, y es la que citan los buscadores.
 *
 * Reglas que se siguieron acá y conviene no romper:
 *
 * - **El H1 es la consulta, literal.** No es un juego de palabras. El resto de
 *   la página sí lleva la voz de la marca; el titular es la puerta.
 * - **Sin JSON-LD de FAQPage.** El repo tiene una regla dura: ese schema vive
 *   solo en `/preguntas`, para no poner dos URLs propias a competir por el
 *   mismo resultado enriquecido. Acá la FAQ es visible pero sin marcado.
 * - **Datos concretos, no adjetivos.** Un buscador generativo cita cifras
 *   —plazos, precios, número de evaluaciones del índice—, no "somos líderes".
 *   Cada dato de esta página existe en otra parte del sitio y coincide con
 *   ella; si cambia allá, cambia acá.
 */
export const metadata: Metadata = {
  title: "Agencia de IA en Chile — Tryvex",
  description:
    "Estudio de IA y agencia de software en Santiago. Agentes conectados a tus sistemas, automatización de procesos e IA aplicada, con precio y plazo cerrados. Primera llamada de 20 minutos sin costo.",
  keywords: [
    "agencia de IA en Chile",
    "estudio de IA",
    "inteligencia artificial aplicada",
    "agentes de IA",
    "automatización de procesos Chile",
  ],
  alternates: { canonical: "https://www.tryvex.tech/agencia-de-ia-en-chile" },
  openGraph: {
    title: "Agencia de IA en Chile — Tryvex",
    description:
      "Agentes conectados a tus sistemas reales, no una demo. Precio y plazo cerrados desde el primer día.",
    url: "https://www.tryvex.tech/agencia-de-ia-en-chile",
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
      "@id": "https://www.tryvex.tech/agencia-de-ia-en-chile#servicio",
      name: "Inteligencia artificial aplicada",
      serviceType: "Desarrollo e integración de IA para empresas",
      provider: { "@id": "https://www.tryvex.tech/#organization" },
      areaServed: { "@type": "Country", name: "Chile" },
      audience: {
        "@type": "BusinessAudience",
        name: "Pymes y empresas medianas en Chile",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "IA aplicada",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentes conectados a sistemas propios" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatización de procesos con IA" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Clasificación y redacción automática de documentos" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Modelos de peso abierto en infraestructura del cliente" } },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.tryvex.tech" },
        { "@type": "ListItem", position: 2, name: "Agencia de IA en Chile", item: "https://www.tryvex.tech/agencia-de-ia-en-chile" },
      ],
    },
  ],
};

/** Las tres demos con IA de por medio, para que la prueba esté en la página. */
const demosIA = demosPublicadas.filter((d) => d.tipo.includes("IA")).slice(0, 3);

export default function AgenciaIAPage() {
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
              Agencia de IA <em>en Chile.</em>
            </h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "640px" }}>
              Tryvex es un estudio de IA y agencia de software con base en Santiago. Ponemos
              modelos a hacer trabajo real dentro de tu operación —leer, clasificar, responder y
              agendar— conectados a los sistemas que ya usas. Precio y plazo cerrados desde el
              primer día.
            </p>
            <div className="respuesta-directa" data-anim="fade-up">
              <p>
                Tryvex es un estudio de IA y agencia de software con base en Santiago de Chile que
                pone agentes a operar dentro de los sistemas que una empresa ya usa: leen tickets y
                correos, consultan la base de datos, agendan y dejan registro auditable. Trabaja
                con precio y plazo cerrados desde el primer día; una automatización de un proceso
                toma 2 semanas desde $450.000 CLP, y un agente afinado sobre los datos del negocio,
                4 semanas desde $1.600.000 CLP. Integra con SII, Bsale, Mercado Libre, Shopify,
                WhatsApp y Google Calendar.
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
                <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Qué hacemos con IA</span></div>
                <h2 data-anim="fade-up">Un modelo no sirve de nada <em>fuera de tu operación.</em></h2>
              </div>
              <p className="sec-sub" data-anim="fade-up">
                La diferencia entre una demo y un sistema es dónde vive: si no está conectado a tus
                datos y a tus herramientas, es una conversación entretenida.
              </p>
            </div>

            <div className="mapa" style={{ marginTop: "0", paddingTop: "0", borderTop: "none" }} data-anim="fade-up">
              <ul className="mapa-grid">
                <li className="mapa-fam">
                  <span className="mapa-int">Agentes</span>
                  <h3>Trabajo hecho, no respuestas</h3>
                  <ul className="mapa-caps">
                    <li>Leen tickets, correos o mensajes y responden con criterio</li>
                    <li>Consultan tu base de datos y tus sistemas actuales</li>
                    <li>Agendan, derivan y dejan registro de cada acción</li>
                    <li>Trazabilidad: se puede auditar qué hizo el agente y por qué</li>
                  </ul>
                  <Link href="/agente-de-whatsapp-para-empresas" style={{ color: "var(--red-vivo)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    Agente de WhatsApp que agenda →
                  </Link>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Documentos</span>
                  <h3>Clasificar y redactar sin copiar y pegar</h3>
                  <ul className="mapa-caps">
                    <li>Facturas, contratos y correos clasificados al llegar</li>
                    <li>Borradores de respuesta con el tono de tu empresa</li>
                    <li>Extracción de datos a la planilla o al sistema que ya usas</li>
                    <li>Búsqueda sobre tu propia documentación interna</li>
                  </ul>
                  <Link href="/procesar-facturas-y-contratos-con-ia" style={{ color: "var(--red-vivo)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    Procesar facturas y contratos →
                  </Link>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Dato sensible</span>
                  <h3>Modelos en tu propia infraestructura</h3>
                  <ul className="mapa-caps">
                    <li>Modelos de peso abierto corriendo donde tú decides</li>
                    <li>El dato no sale de tu servidor cuando no puede salir</li>
                    <li>Ruteo entre proveedores sin reescribir el código</li>
                    <li>Control de costo por tarea, medido y visible</li>
                  </ul>
                  <Link href="/ia-en-tu-propio-servidor" style={{ color: "var(--red-vivo)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    Modelos en tu propio servidor →
                  </Link>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Integración</span>
                  <h3>Con lo que ya tienes en Chile</h3>
                  <ul className="mapa-caps">
                    <li>Facturación electrónica SII</li>
                    <li>WhatsApp, Google Calendar y correo</li>
                    <li>Shopify, Bsale y Mercado Libre</li>
                    <li>Tu CRM o planilla actual, sin migración forzada</li>
                  </ul>
                  <Link href="/automatizar-facturacion-sii" style={{ color: "var(--red-vivo)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    Automatizar la facturación del SII →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* La evidencia de con qué modelos trabajamos, reutilizada de /servicios.
            Es el mismo componente: un solo lugar donde actualizar el snapshot. */}
        <section className="block">
          <div className="wrap">
            <InteligenciaModelos />
          </div>
        </section>

        {demosIA.length > 0 && (
          <section className="block">
            <div className="wrap">
              <div className="sec-head">
                <div>
                  <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Proyectos con IA</span></div>
                  <h2 data-anim="fade-up">Navegables, <em>no capturas de pantalla.</em></h2>
                </div>
                <p className="sec-sub" data-anim="fade-up">
                  Cada uno está publicado y se puede abrir ahora mismo. El catálogo completo vive
                  en <Link href="/catalogo" style={{ color: "var(--red-vivo)", textDecoration: "underline", textUnderlineOffset: "3px" }}>/catálogo</Link>.
                </p>
              </div>
              <div className="cat-grid" data-stagger>
                {demosIA.map((demo) => (
                  <DemoCard key={demo.id} demo={demo} nivel={3} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="block">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Preguntas</span></div>
            <h2 data-anim="fade-up" style={{ marginBottom: "36px" }}>Lo que preguntan <em>antes de partir.</em></h2>

            {/* Mismo patrón que `/preguntas`: `.faq glass` con `details`. No se
                inventa maquetado nuevo para una lista de preguntas que ya tiene
                su componente visual en el sistema. */}
            <div className="faq glass" data-anim="fade-up">
              <details open>
                <summary>¿Cuánto demora un proyecto de IA aplicada?</summary>
                <p>
                  Un agente propio afinado sobre los datos del negocio toma 4 semanas.
                  Una automatización de un proceso toma 2 semanas. El plazo se cierra en la
                  primera llamada, no después de firmar.
                </p>
              </details>
              <details>
                <summary>¿Qué modelo de IA usan?</summary>
                <p>
                  El que corresponda a cada tarea: uno de frontera donde hace falta criterio, uno
                  barato donde solo hace falta volumen, y uno de peso abierto corriendo en tu
                  propia infraestructura cuando el dato no puede salir de ahí. No casamos el
                  proyecto con un proveedor.
                </p>
              </details>
              <details>
                <summary>¿Sirve para una pyme o es solo para empresas grandes?</summary>
                <p>
                  Trabajamos con negocios que todavía resuelven cosas a mano: un restaurante que
                  toma reservas por WhatsApp, una automotora con el inventario en una planilla. El
                  tamaño no decide; decide cuánto tiempo se va en trabajo repetitivo.
                </p>
              </details>
              <details>
                <summary>¿De quién es el código?</summary>
                <p>
                  Tuyo. Repositorio propio y documentación completa a la entrega, más 90 días de
                  mantención sin costo. Sin contratos que amarren.
                </p>
              </details>
              <details>
                <summary>¿Qué pasa si lo que necesito no es IA?</summary>
                <p>
                  Te lo decimos. Buena parte de lo que llega como &ldquo;quiero IA&rdquo; se
                  resuelve mejor con una automatización simple, y sale más barato y más estable.
                  Si el problema no es nuestro, te decimos a quién mirar.
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
