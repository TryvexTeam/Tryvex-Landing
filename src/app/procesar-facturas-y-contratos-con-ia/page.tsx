import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";

/**
 * Página de captación para "procesar facturas y contratos con IA".
 *
 * El dolor: el documento llega al correo, alguien lo abre, lee de qué se
 * trata, copia los datos a una planilla y lo archiva en la carpeta correcta.
 * Multiplicado por todos los días del año.
 *
 * Sin JSON-LD de FAQPage: ese schema vive solo en `/preguntas`.
 * Sin promesas de exactitud perfecta: el sistema deja el trabajo hecho y una
 * persona revisa lo que tiene consecuencia. No es asesoría legal ni contable.
 */
export const metadata: Metadata = {
  title: "Procesar facturas y contratos con IA — Tryvex",
  description:
    "Clasificación, extracción y redacción de facturas, contratos y correos con IA, conectada a tu CRM o planilla actual. Revisión humana donde hay consecuencia.",
  keywords: [
    "procesar facturas con IA",
    "clasificación de documentos con IA",
    "extracción de datos de contratos",
    "automatización de documentos Chile",
  ],
  alternates: { canonical: "https://www.tryvex.tech/procesar-facturas-y-contratos-con-ia" },
  openGraph: {
    title: "Procesar facturas y contratos con IA — Tryvex",
    description:
      "El documento llega, se clasifica, los datos caen en tu sistema y el borrador de respuesta queda listo para revisar. Sin promesas de cero errores.",
    url: "https://www.tryvex.tech/procesar-facturas-y-contratos-con-ia",
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
      "@id": "https://www.tryvex.tech/procesar-facturas-y-contratos-con-ia#servicio",
      name: "Procesamiento de documentos con IA",
      serviceType: "Clasificación, extracción y redacción de documentos con IA",
      provider: { "@id": "https://www.tryvex.tech/#organization" },
      areaServed: { "@type": "Country", name: "Chile" },
      audience: {
        "@type": "BusinessAudience",
        name: "Pymes y empresas medianas en Chile",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.tryvex.tech" },
        { "@type": "ListItem", position: 2, name: "Procesar facturas y contratos con IA", item: "https://www.tryvex.tech/procesar-facturas-y-contratos-con-ia" },
      ],
    },
  ],
};

export default function ProcesarFacturasYContratosPage() {
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
            <span className="eyebrow" data-anim="fade-down"><span className="sec-label">Procesamiento de documentos con IA</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>
              Facturas y contratos <em>clasificados al llegar.</em>
            </h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "640px" }}>
              El documento llega al correo, alguien lo abre, lee de qué se trata, copia los datos
              a una planilla y lo archiva en la carpeta correcta. Multiplicado por todos los días
              del año. Eso es lo que se automatiza.
            </p>
            <div className="respuesta-directa" data-anim="fade-up">
              <p>
                Procesar documentos con IA consiste en clasificar facturas, contratos y correos
                apenas llegan, extraer sus datos al sistema que ya se usa y dejar redactado un
                borrador de respuesta. Tryvex lo implementa en 4 semanas. Una persona sigue
                revisando lo que tiene consecuencia.
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
                <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Qué hace el sistema</span></div>
                <h2 data-anim="fade-up">De la bandeja de entrada <em>al sistema correcto.</em></h2>
              </div>
              <p className="sec-sub" data-anim="fade-up">
                No prometemos exactitud perfecta ni cero errores. El sistema deja el trabajo hecho
                y una persona revisa lo que tiene consecuencia. No es asesoría legal ni contable.
              </p>
            </div>

            <div className="mapa" style={{ marginTop: "0", paddingTop: "0", borderTop: "none" }} data-anim="fade-up">
              <ul className="mapa-grid">
                <li className="mapa-fam">
                  <span className="mapa-int">Clasificación</span>
                  <h3>Ordenados apenas entran</h3>
                  <ul className="mapa-caps">
                    <li>Facturas, contratos y correos clasificados según las categorías del negocio, no una taxonomía genérica.</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Extracción</span>
                  <h3>Los datos, directo al sistema</h3>
                  <ul className="mapa-caps">
                    <li>Salen del documento y caen directo en la planilla, el CRM o el sistema contable que ya usas.</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Redacción</span>
                  <h3>Borradores listos para revisar</h3>
                  <ul className="mapa-caps">
                    <li>Respuestas escritas con el tono de la empresa, listas para revisar y enviar.</li>
                    <li>La firma la sigue poniendo una persona.</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Búsqueda</span>
                  <h3>Preguntas en lenguaje natural</h3>
                  <ul className="mapa-caps">
                    <li>Preguntas sobre la documentación interna, con el documento de origen a la vista en la respuesta.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <p style={{ color: "var(--muted)", marginTop: "32px" }} data-anim="fade-up">
              Plazo: 4 semanas. Se integra con el CRM o la planilla que ya
              usas, sin migración forzada.
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Preguntas</span></div>
            <h2 data-anim="fade-up" style={{ marginBottom: "36px" }}>Lo que preguntan <em>antes de partir.</em></h2>

            <div className="faq glass" data-anim="fade-up">
              <details open>
                <summary>¿Qué exactitud tiene?</summary>
                <p>
                  No prometemos cero errores ni exactitud perfecta. El sistema deja clasificado,
                  extraído y redactado el trabajo, y una persona revisa lo que tiene consecuencia
                  antes de que salga o se registre. No sustituye asesoría legal ni contable.
                </p>
              </details>
              <details>
                <summary>¿Sirve con documentos escaneados?</summary>
                <p>
                  Sí, siempre que el escaneo sea legible. El sistema extrae el texto y sigue el
                  mismo flujo de clasificación y extracción que un documento digital.
                </p>
              </details>
              <details>
                <summary>¿Dónde quedan los datos extraídos?</summary>
                <p>
                  En el sistema que ya usas: tu planilla, tu CRM o tu sistema contable. No se crea
                  una base de datos paralela que haya que mantener aparte.
                </p>
              </details>
              <details>
                <summary>¿Puede leer mis contratos sin que salgan de la empresa?</summary>
                <p>
                  Sí. Cuando el dato no puede salir de tu red, el modelo corre en tu propia
                  infraestructura. Ver{" "}
                  <Link href="/ia-en-tu-propio-servidor" style={{ color: "var(--red-vivo)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    IA en tu propio servidor
                  </Link>.
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
                Cuéntanos qué <em>documento te quita tiempo.</em>
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
