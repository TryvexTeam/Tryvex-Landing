import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import VolverAlInicio from "../../components/VolverAlInicio";
import RevelarAlScroll from "../../components/RevelarAlScroll";

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

      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <symbol id="spark" viewBox="0 0 100 100">
            <path d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z" fill="#0e0e0e"/>
            <path d="M 82 14 C 83 19, 87 23, 92 24 C 87 25, 83 29, 82 34 C 81 29, 77 25, 72 24 C 77 23, 81 19, 82 14 Z" fill="#e53935"/>
          </symbol>
        </defs>
      </svg>

      <NavBar />
      <RevelarAlScroll />

      <main>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "140px", paddingBottom: "60px" }}>
            <VolverAlInicio />
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">05</span><span className="sec-label">Preguntas</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>Lo que casi siempre nos preguntan <em>antes de la llamada.</em></h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "600px" }}>
              ¿Quedó algo sin responder? Escríbenos a{" "}
              <a href="mailto:tryvexentreprise@gmail.com" style={{ color: "var(--red)" }}>tryvexentreprise@gmail.com</a>{" "}
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
            </div>

            <p className="sec-sub" style={{ margin: "48px auto 0", textAlign: "center" }}>
              ¿Todo claro? Mira <Link href="/planes" style={{ color: "var(--red)" }}>los planes</Link> o{" "}
              <Link href="/contacto" style={{ color: "var(--red)" }}>agenda una llamada de 20 minutos</Link>.
            </p>
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
                <Link href="/catalogo">Catálogo</Link>
                <Link href="/proceso">Proceso</Link>
                <Link href="/planes">Planes</Link>
                <Link href="/preguntas">Preguntas</Link>
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
                name: "¿Qué pasa si no funciona?",
                acceptedAnswer: { "@type": "Answer", text: "Tenemos garantía de 30 días. Si no entregamos lo prometido, devolvemos el último mes. Es raro que pase, pero está por escrito." },
              }
            ],
          }),
        }}
      />
    </>
  );
}
