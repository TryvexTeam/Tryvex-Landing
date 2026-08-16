import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";

/**
 * Página de captación para "IA en tu propio servidor" — modelos de peso
 * abierto corriendo en la infraestructura del cliente.
 *
 * Ángulo: para las empresas cuyos datos no pueden salir de su red. El dato
 * nunca abandona el servidor del cliente.
 *
 * Sin JSON-LD de FAQPage: ese schema vive solo en `/preguntas`.
 * La Ley 21.719 se menciona solo como contexto: correr el modelo en
 * infraestructura propia es una decisión de arquitectura, no una promesa de
 * cumplimiento legal ni una certificación. Sin nombres de modelos ni cifras
 * de rendimiento.
 */
export const metadata: Metadata = {
  title: "IA en tu propio servidor — modelos de peso abierto — Tryvex",
  description:
    "Modelos de IA de peso abierto corriendo en tu propia infraestructura. El dato no sale de tu red. Decisión de arquitectura para documentos legales, datos financieros e información de clientes.",
  keywords: [
    "IA en servidor propio",
    "modelos de peso abierto",
    "IA on-premise Chile",
    "infraestructura de IA privada",
  ],
  alternates: { canonical: "https://www.tryvex.tech/ia-en-tu-propio-servidor" },
  openGraph: {
    title: "IA en tu propio servidor — modelos de peso abierto — Tryvex",
    description:
      "Cuando el dato no puede salir de la red de la empresa, el modelo corre donde está el dato. Sin llamadas a una API externa.",
    url: "https://www.tryvex.tech/ia-en-tu-propio-servidor",
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
      "@id": "https://www.tryvex.tech/ia-en-tu-propio-servidor#servicio",
      name: "Modelos de IA en infraestructura del cliente",
      serviceType: "Implementación de modelos de IA de peso abierto en infraestructura propia",
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
        { "@type": "ListItem", position: 2, name: "IA en tu propio servidor", item: "https://www.tryvex.tech/ia-en-tu-propio-servidor" },
      ],
    },
  ],
};

export default function IAEnTuPropioServidorPage() {
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
            <span className="eyebrow" data-anim="fade-down"><span className="sec-label">Modelos de IA en infraestructura del cliente</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>
              Modelos de IA que corren <em>en tu servidor.</em>
            </h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "640px" }}>
              Hay datos que no pueden salir de la red de la empresa: contratos, información
              financiera, datos de clientes. Para esos casos, el modelo corre en tu propio
              servidor. El dato nunca abandona el servidor del cliente.
            </p>
            <div className="respuesta-directa" data-anim="fade-up">
              <p>
                Correr IA en infraestructura propia significa ejecutar modelos de peso abierto
                dentro del servidor de la empresa, de modo que ningún dato salga de su red. Tryvex
                lo implementa en 4 semanas, con ruteo entre proveedores sin reescribir el
                código y costo por tarea medido. Es la opción cuando los datos son sensibles y no
                pueden viajar a una API externa.
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
                <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Infraestructura propia</span></div>
                <h2 data-anim="fade-up">El dato no sale <em>de tu servidor.</em></h2>
              </div>
              <p className="sec-sub" data-anim="fade-up">
                El contexto es la Ley 21.719 de protección de datos personales, pero esto no es
                asesoría legal ni una certificación: correr el modelo en infraestructura propia es
                una decisión de arquitectura que ayuda cuando hay datos sensibles de por medio.
              </p>
            </div>

            <div className="mapa" style={{ marginTop: "0", paddingTop: "0", borderTop: "none" }} data-anim="fade-up">
              <ul className="mapa-grid">
                <li className="mapa-fam">
                  <span className="mapa-int">Peso abierto</span>
                  <h3>Corren en tu infraestructura</h3>
                  <ul className="mapa-caps">
                    <li>Modelos que se descargan y corren dentro de la infraestructura de la empresa, sin llamadas a una API externa.</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">El dato se queda</span>
                  <h3>Nada sale de la red</h3>
                  <ul className="mapa-caps">
                    <li>Nada de lo que procesa el modelo viaja fuera de la red. Aplica a documentos legales, datos financieros e información de clientes.</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Ruteo sin reescribir</span>
                  <h3>Cambiar de modelo sin tocar código</h3>
                  <ul className="mapa-caps">
                    <li>Se cambia de modelo o de proveedor sin tocar el código de la aplicación.</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Costo por tarea</span>
                  <h3>Medido y visible</h3>
                  <ul className="mapa-caps">
                    <li>En volumen alto, el hardware propio se paga una vez en vez de pagarse por cada consulta.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <p style={{ color: "var(--muted)", marginTop: "32px" }} data-anim="fade-up">
              Plazo: 4 semanas. El criterio de modelo en Tryvex: uno de frontera donde
              hace falta criterio, uno barato donde solo hace falta volumen, y uno de peso
              abierto en infraestructura propia cuando el dato es sensible — sin casar el
              proyecto con un proveedor.
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Comparación</span></div>
                <h2 data-anim="fade-up">API externa contra <em>servidor propio.</em></h2>
              </div>
            </div>

            <div className="tabla-comp" data-anim="fade-up">
              <table>
                <caption>Comparación entre usar una API externa y correr el modelo en tu propio servidor</caption>
                <thead>
                  <tr>
                    <th scope="col"><span className="sr-only">Concepto</span></th>
                    <th scope="col">API externa</th>
                    <th scope="col">Modelo en tu servidor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Dónde va el dato</th>
                    <td>Sale de tu red hacia el proveedor</td>
                    <td>No sale nunca del servidor</td>
                  </tr>
                  <tr>
                    <th scope="row">Costo</th>
                    <td>Se paga por cada consulta</td>
                    <td>El hardware se paga una vez; conviene con volumen alto</td>
                  </tr>
                  <tr>
                    <th scope="row">Dependencia</th>
                    <td>El proveedor puede cambiar precio, política o discontinuar el modelo</td>
                    <td>El modelo queda descargado y sigue disponible</td>
                  </tr>
                  <tr>
                    <th scope="row">Capacidad</th>
                    <td>Acceso a los modelos de frontera</td>
                    <td>Modelos de peso abierto, que alcanzan de sobra para la mayoría de las tareas operativas</td>
                  </tr>
                  <tr>
                    <th scope="row">Cuándo conviene</th>
                    <td>Tareas que exigen el máximo criterio</td>
                    <td>Datos sensibles que no pueden salir de la empresa</td>
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
                <summary>¿Qué hardware necesito?</summary>
                <p>
                  Depende del modelo y del volumen que se necesite procesar. Se define en el
                  levantamiento, no antes.
                </p>
              </details>
              <details>
                <summary>¿Es más barato que usar una API?</summary>
                <p>
                  En volumen alto, sí. El hardware propio se paga una vez, mientras que una API
                  externa se cobra por cada consulta.
                </p>
              </details>
              <details>
                <summary>¿Rinde igual que un modelo de frontera?</summary>
                <p>
                  Para muchas tareas operativas alcanza de sobra. Para las que exigen más
                  criterio, se rutea al modelo de frontera sin reescribir la aplicación.
                </p>
              </details>
              <details>
                <summary>¿Sirve para cumplir con la Ley 21.719?</summary>
                <p>
                  Ayuda como decisión de arquitectura: el dato queda dentro de tu red. No es
                  asesoría legal ni una certificación de cumplimiento.
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
                Cuéntanos qué dato <em>no puede salir.</em>
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
