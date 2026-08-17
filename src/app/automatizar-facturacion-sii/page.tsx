import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";

/**
 * Página de captación para "automatizar facturación SII".
 *
 * Sigue el mismo patrón que `/agencia-de-ia-en-chile`: hero directo, bloques
 * `mapa-fam` con lo que se construye, FAQ visible sin marcado, CTA final.
 *
 * Restricción de veracidad, no tocar sin revisar con el señor Ignacio: Tryvex
 * no es emisor electrónico certificado ante el SII y no reemplaza el software
 * de facturación del cliente. La automatización opera sobre el software
 * certificado que la empresa ya tiene (Bsale u otro), nunca en su lugar.
 */
export const metadata: Metadata = {
  title: "Automatizar la facturación electrónica del SII — Tryvex",
  description:
    "Automatizamos la emisión, envío y conciliación de tus DTE sobre el software de facturación que ya usas. No reemplazamos tu emisor certificado ante el SII. Desde $850.000 CLP.",
  keywords: [
    "automatizar facturación SII",
    "facturación electrónica Chile",
    "DTE automatización",
    "conciliación de pagos",
    "automatización SII",
  ],
  alternates: { canonical: "https://www.tryvex.tech/automatizar-facturacion-sii" },
  openGraph: {
    title: "Automatizar la facturación electrónica del SII — Tryvex",
    description:
      "Emisión, envío y conciliación de DTE automatizados sobre tu software de facturación actual.",
    url: "https://www.tryvex.tech/automatizar-facturacion-sii",
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
      "@id": "https://www.tryvex.tech/automatizar-facturacion-sii#servicio",
      name: "Automatización de facturación electrónica SII",
      serviceType: "Automatización de procesos de facturación",
      provider: { "@id": "https://www.tryvex.tech/#organization" },
      areaServed: { "@type": "Country", name: "Chile" },
      audience: {
        "@type": "BusinessAudience",
        name: "Pymes y empresas medianas en Chile",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Automatización de facturación SII",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emisión automática de DTE" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Envío automático de documentos al cliente" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conciliación de pagos contra facturas pendientes" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Clasificación de documentos recibidos" } },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.tryvex.tech" },
        { "@type": "ListItem", position: 2, name: "Automatizar facturación SII", item: "https://www.tryvex.tech/automatizar-facturacion-sii" },
      ],
    },
  ],
};

export default function AutomatizarFacturacionSIIPage() {
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
              Automatizar la facturación <em>del SII.</em>
            </h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "640px" }}>
              Emitir cada DTE a mano, reenviarlo por correo, perseguir el pago y conciliar la
              cartola contra las facturas pendientes: trabajo que alguien hace todos los días y
              nadie debería hacer a mano. Precio y plazo cerrados desde el primer día.
            </p>
            <div className="respuesta-directa" data-anim="fade-up">
              <p>
                Automatizar la facturación electrónica del SII consiste en conectar el software
                de facturación que la empresa ya usa con su sistema de ventas, para que el DTE se
                emita, se envíe y se concilie sin tipeo manual. Tryvex lo implementa en 3
                semanas desde $850.000 CLP, integrado con SII, Bsale, Shopify, Mercado Libre y
                WhatsApp. Es una capa sobre el software certificado del cliente, no un reemplazo.
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
                <h2 data-anim="fade-up">Del DTE al pago conciliado, <em>sin tipeo manual.</em></h2>
              </div>
              <p className="sec-sub" data-anim="fade-up">
                Cada paso del ciclo de facturación queda conectado al sistema que ya usan, en vez
                de vivir en correos sueltos y planillas aparte.
              </p>
            </div>

            <div className="mapa" style={{ marginTop: "0", paddingTop: "0", borderTop: "none" }} data-anim="fade-up">
              <ul className="mapa-grid">
                <li className="mapa-fam">
                  <span className="mapa-int">Emisión</span>
                  <h3>El DTE se genera solo</h3>
                  <ul className="mapa-caps">
                    <li>Cuando la venta se cierra en el sistema que ya usan, el DTE se genera con los datos correctos y se emite a través de su software de facturación</li>
                    <li>Sin tipeo manual</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Envío</span>
                  <h3>Llega solo al cliente</h3>
                  <ul className="mapa-caps">
                    <li>El documento llega al cliente por correo con PDF y XML</li>
                    <li>Con aviso por WhatsApp si conviene</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Conciliación</span>
                  <h3>El pago se cruza solo</h3>
                  <ul className="mapa-caps">
                    <li>Cruce de los pagos recibidos contra las facturas pendientes</li>
                    <li>Marcando lo que ya está pagado</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Documentos recibidos</span>
                  <h3>Se clasifican al llegar</h3>
                  <ul className="mapa-caps">
                    <li>Los DTE que llegan se clasifican solos</li>
                    <li>Sus datos caen en la planilla o el sistema contable</li>
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
                <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Cómo funciona</span></div>
                <h2 data-anim="fade-up">Sobre tu software de facturación, <em>no en su lugar.</em></h2>
              </div>
              <p className="sec-sub" data-anim="fade-up">
                Tryvex no es emisor electrónico certificado ante el SII y no reemplaza el software
                de facturación que ya usas. La automatización es una capa que opera sobre el
                sistema certificado que tu empresa ya tiene —Bsale u otro—, no un reemplazo de él.
                No gestionamos folios CAF ni firma electrónica propia.
              </p>
            </div>
            <p data-anim="fade-up" style={{ color: "var(--muted)", marginTop: "24px" }}>
              Plazo de 3 semanas, desde $850.000 CLP. Se integra con el SII, Bsale, Shopify,
              Mercado Libre y WhatsApp.
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Comparación</span></div>
                <h2 data-anim="fade-up">A mano contra <em>automatizado.</em></h2>
              </div>
            </div>

            <div className="tabla-comp" data-anim="fade-up">
              <table>
                <caption>Comparación entre facturar a mano y con el flujo automatizado</caption>
                <thead>
                  <tr>
                    <th scope="col"><span className="sr-only">Concepto</span></th>
                    <th scope="col">Hoy, a mano</th>
                    <th scope="col">Con el flujo automatizado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Emisión del DTE</th>
                    <td>Alguien copia los datos de la venta al software de facturación</td>
                    <td>Se emite solo al cerrarse la venta, con los datos que ya están en el sistema</td>
                  </tr>
                  <tr>
                    <th scope="row">Envío al cliente</th>
                    <td>Se adjunta y se manda a mano, cuando alguien se acuerda</td>
                    <td>Sale al momento, con PDF y XML, y aviso por WhatsApp si conviene</td>
                  </tr>
                  <tr>
                    <th scope="row">Seguimiento del pago</th>
                    <td>Se revisa la cartola a ojo contra las facturas pendientes</td>
                    <td>El pago se cruza solo y la factura queda marcada</td>
                  </tr>
                  <tr>
                    <th scope="row">Documentos recibidos</th>
                    <td>Se abren uno por uno para saber de qué son</td>
                    <td>Se clasifican al llegar y sus datos caen en la planilla</td>
                  </tr>
                  <tr>
                    <th scope="row">Rechazo del SII</th>
                    <td>Se descubre después, cuando alguien lo busca</td>
                    <td>El flujo lo detecta y avisa</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="block">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Preguntas</span></div>
            <h2 data-anim="fade-up" style={{ marginBottom: "36px" }}>Lo que preguntan <em>antes de partir.</em></h2>

            <div className="faq glass" data-anim="fade-up">
              <details open>
                <summary>¿Necesito cambiar mi software de facturación?</summary>
                <p>
                  No. La automatización se integra con el software de facturación que ya usas
                  —Bsale u otro—, no lo reemplaza. Tryvex no emite documentos certificados por
                  cuenta propia.
                </p>
              </details>
              <details>
                <summary>¿Cuánto demora?</summary>
                <p>
                  En 3 semanas, cubriendo los puntos del ciclo —emisión, envío, conciliación,
                  documentos recibidos— que correspondan.
                </p>
              </details>
              <details>
                <summary>¿Qué pasa si el SII rechaza un documento?</summary>
                <p>
                  El flujo detecta el rechazo y avisa de inmediato, no lo entierra en una bandeja
                  de entrada. Se puede corregir y reenviar sin perder el resto del proceso.
                </p>
              </details>
              <details>
                <summary>¿De quién es el código?</summary>
                <p>
                  Tuyo. Repositorio propio y documentación completa a la entrega, más 90 días de
                  mantención sin costo.
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
