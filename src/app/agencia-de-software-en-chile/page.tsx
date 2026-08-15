import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";
import BloqueResultados from "../../features/landing/components/BloqueResultados";
import { fetchStats } from "../../features/landing/stats";
import "../../features/capacidad/capacidad.css";

/**
 * Página de captación para "agencia de software en Chile".
 *
 * Hermana de `/agencia-de-ia-en-chile`, y **deliberadamente distinta**: dos
 * páginas que dicen lo mismo con otro título se canibalizan —Google elige una
 * y descarta la otra, y normalmente no elige la que uno quería—. Aquí el eje
 * es el desarrollo a medida: producto, panel, portal, migración desde
 * planillas. La IA se menciona una vez y enlaza a la otra página, no se
 * desarrolla.
 *
 * Sin JSON-LD de FAQPage: ese schema vive solo en `/preguntas` por la regla del
 * repo. La FAQ acá es visible pero no marcada.
 */
export const metadata: Metadata = {
  title: "Agencia de software en Chile — Tryvex",
  description:
    "Desarrollo de software a medida en Santiago: productos SaaS, paneles internos y portales de cliente. MVP en producción en 4 a 8 semanas, con precio y plazo cerrados y el código a tu nombre.",
  keywords: [
    "agencia de software en Chile",
    "desarrollo de software a medida",
    "fábrica de software Santiago",
    "MVP SaaS Chile",
    "desarrollo web a medida",
  ],
  alternates: { canonical: "https://www.tryvex.tech/agencia-de-software-en-chile" },
  openGraph: {
    title: "Agencia de software en Chile — Tryvex",
    description:
      "Software a medida con precio y plazo cerrados. MVP en producción en 4 a 8 semanas.",
    url: "https://www.tryvex.tech/agencia-de-software-en-chile",
    locale: "es_CL",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.tryvex.tech/agencia-de-software-en-chile#servicio",
      name: "Desarrollo de software a medida",
      serviceType: "Desarrollo de software y aplicaciones web",
      provider: { "@id": "https://www.tryvex.tech/#organization" },
      areaServed: { "@type": "Country", name: "Chile" },
      audience: {
        "@type": "BusinessAudience",
        name: "Pymes y empresas medianas en Chile",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software a medida",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Producto SaaS a medida (MVP)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Panel interno con roles y permisos" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Portal de clientes" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing pages y sitios con SEO técnico" } },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.tryvex.tech" },
        { "@type": "ListItem", position: 2, name: "Agencia de software en Chile", item: "https://www.tryvex.tech/agencia-de-software-en-chile" },
      ],
    },
  ],
};

export default async function AgenciaSoftwarePage() {
  const stats = await fetchStats();

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
              Agencia de software <em>en Chile.</em>
            </h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "640px" }}>
              Construimos el producto que tu negocio necesita cuando la planilla dejó de alcanzar:
              SaaS a medida, paneles internos, portales de cliente y sitios que convierten. Precio
              y plazo cerrados antes de empezar, y el código a tu nombre al terminar.
            </p>
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
                <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Qué construimos</span></div>
                <h2 data-anim="fade-up">Producto que se usa el lunes, <em>no un entregable.</em></h2>
              </div>
              <p className="sec-sub" data-anim="fade-up">
                Todo se entrega desplegado y corriendo en producción, con monitoreo y 90 días de
                mantención incluidos. No entregamos un ZIP.
              </p>
            </div>

            <div className="mapa" style={{ marginTop: "0", paddingTop: "0", borderTop: "none" }} data-anim="fade-up">
              <ul className="mapa-grid">
                <li className="mapa-fam">
                  <span className="mapa-int">4 a 8 semanas</span>
                  <h3>Producto a medida (MVP)</h3>
                  <ul className="mapa-caps">
                    <li>Frontend, backend, autenticación y despliegue</li>
                    <li>Next.js, TypeScript y PostgreSQL</li>
                    <li>Roles, permisos y panel de administración</li>
                    <li>CI/CD desde el primer día, no al final</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Operación diaria</span>
                  <h3>Paneles internos</h3>
                  <ul className="mapa-caps">
                    <li>Estado y métricas del negocio en tiempo real</li>
                    <li>Permisos por usuario y por equipo</li>
                    <li>Exportación de reportes</li>
                    <li>Diseñado para usarse ocho horas al día, no para una demo</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Tus clientes</span>
                  <h3>Portales y sitios</h3>
                  <ul className="mapa-caps">
                    <li>Portal con acceso, documentos y estado de cada cuenta</li>
                    <li>Landings con SEO técnico y medición desde el día uno</li>
                    <li>Rendimiento 90+ en Core Web Vitals</li>
                    <li>Contenido editable sin depender de nosotros</li>
                  </ul>
                </li>
                <li className="mapa-fam">
                  <span className="mapa-int">Lo que ya existe</span>
                  <h3>Migración e integración</h3>
                  <ul className="mapa-caps">
                    <li>Datos que hoy viven en planillas o sistemas viejos</li>
                    <li>Facturación electrónica SII, Shopify, Bsale, Mercado Libre</li>
                    <li>APIs propias documentadas</li>
                    <li>Sin migración forzada: convive con lo que ya usas</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <BloqueResultados stats={stats} />
          </div>
        </section>

        <section className="block">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Cómo trabajamos</span></div>
            <h2 data-anim="fade-up" style={{ marginBottom: "28px" }}>Precio cerrado <em>o socio continuo.</em></h2>
            <p style={{ color: "var(--muted)", marginBottom: "20px" }}>
              Dos formas, y se eligen en la primera llamada. <strong style={{ color: "var(--ink)" }}>Proyecto
              único</strong>: alcance fijo, precio y plazo cerrados antes de empezar — una landing
              toma de 1 a 2 semanas, una automatización de 2 a 4, un MVP de 4 a 8.{" "}
              <strong style={{ color: "var(--ink)" }}>Socio continuo</strong>: sprints quincenales
              con prioridades tuyas, sin contrato que amarre y cancelable cuando quieras.
            </p>
            <p style={{ color: "var(--muted)" }}>
              Los precios de cada formato están publicados en{" "}
              <Link href="/planes" style={{ color: "var(--red-vivo)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                planes
              </Link>
              , y el detalle de servicio por servicio en{" "}
              <Link href="/servicios" style={{ color: "var(--red-vivo)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                servicios
              </Link>
              . Si tu proyecto necesita inteligencia artificial de por medio, eso lo cubrimos en{" "}
              <Link href="/agencia-de-ia-en-chile" style={{ color: "var(--red-vivo)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                agencia de IA en Chile
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap" style={{ maxWidth: "820px" }}>
            <div className="sec-tag" data-anim="fade-down"><span className="sec-label">Preguntas</span></div>
            <h2 data-anim="fade-up" style={{ marginBottom: "36px" }}>Antes de contratar <em>a cualquiera.</em></h2>

            <div className="faq glass" data-anim="fade-up">
              <details open>
                <summary>¿Cuánto cuesta desarrollar software a medida en Chile?</summary>
                <p>
                  Depende del alcance, y por eso lo cerramos antes de empezar en vez de cobrar por
                  hora. Una landing parte más abajo que un MVP completo; los rangos de cada
                  formato están publicados en la página de planes, sin letra chica.
                </p>
              </details>
              <details>
                <summary>¿Trabajan con empresas fuera de Santiago?</summary>
                <p>
                  Sí. Trabajamos remoto con clientes en todo Chile y en LatAm. Las reuniones son
                  por videollamada y el avance se ve funcionando cada semana, no en un informe.
                </p>
              </details>
              <details>
                <summary>¿Qué pasa si quiero cambiar de equipo después?</summary>
                <p>
                  Te llevas todo: repositorio, accesos, documentación e infraestructura a tu
                  nombre. No usamos plataformas propietarias que obliguen a quedarse.
                </p>
              </details>
              <details>
                <summary>¿Cómo sé que van a entregar?</summary>
                <p>
                  Cada viernes ves un avance funcional en producción, no un mockup. Si algo no
                  avanza, se nota esa misma semana y no al final del proyecto.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="block" style={{ paddingBottom: "80px" }}>
          <div className="wrap">
            <div className="panel-act glass" data-anim="fade-up" style={{ textAlign: "center" }}>
              <h2 style={{ margin: "0 auto" }}>
                Cuéntanos qué <em>quieres construir.</em>
              </h2>
              <p style={{ color: "var(--muted)", maxWidth: "520px", margin: "18px auto 28px" }}>
                Veinte minutos, sin pitch. Salimos con un alcance estimado y un precio. Si no
                podemos ayudarte, te lo decimos en la misma llamada.
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
