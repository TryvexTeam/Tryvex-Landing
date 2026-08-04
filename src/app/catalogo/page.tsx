import type { Metadata } from "next";
import Link from "next/link";
import NavBar, { INNER_LINKS } from "../../components/NavBar";
import { demosPublicadas, whatsappLink } from "../../features/catalogo/data";
import "../../features/catalogo/catalogo.css";

export const metadata: Metadata = {
  title: "Catálogo de demos — Tryvex",
  description:
    "Demostraciones reales y navegables por rubro: página web con asistente de IA que responde, cotiza y agenda. Entre, pruebe la de su rubro y hable con el bot.",
  alternates: { canonical: "https://www.tryvex.tech/catalogo" },
  openGraph: {
    title: "Catálogo de demos — Tryvex",
    description:
      "Demostraciones reales y navegables por rubro, con el asistente respondiendo de verdad.",
    url: "https://www.tryvex.tech/catalogo",
    locale: "es_CL",
    type: "website",
  },
};

export default function CatalogoPage() {
  return (
    <>
      <div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
      <div className="grain"></div>

      <NavBar links={INNER_LINKS} ctaHref="/contacto" />

      <main>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "140px", paddingBottom: "40px" }}>
            <span className="eyebrow"><span className="live"></span> Catálogo</span>
            <h1 style={{ marginTop: "16px" }}>Vea el trabajo <em>funcionando</em>, no promesas.</h1>
            <p className="lede" style={{ maxWidth: "620px" }}>
              Cada proyecto de esta vitrina es una demostración real y navegable:
              entre, recórrala y converse con el asistente como si fuera un cliente.
              Si aparece acá, funciona.
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            {demosPublicadas.length > 0 ? (
              <div className="cat-grid">
                {demosPublicadas.map((demo) => (
                  <article key={demo.id} className="cat-card glass">
                    <a
                      className="cat-thumb"
                      href={demo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir la demo de ${demo.nicho} en una pestaña nueva`}
                    >
                      {demo.imagen ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={demo.imagen}
                          alt={`Captura de la demo para ${demo.nicho}`}
                          loading="lazy"
                        />
                      ) : (
                        <span className="cat-thumb-fallback">{demo.nicho}</span>
                      )}
                      <span className="cat-tag">{demo.categoria}</span>
                    </a>

                    <div className="cat-body">
                      <h3>{demo.nicho}</h3>
                      <p>{demo.descripcion}</p>
                      <ul className="cat-incluye">
                        {demo.incluye.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <div className="cat-actions">
                        <a
                          className="btn-ghost"
                          href={demo.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver demo
                        </a>
                        <a
                          className="btn-primary"
                          href={whatsappLink(demo.whatsappRef)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Probar el bot
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="cat-empty glass">
                <h2>Las primeras demos están en construcción</h2>
                <p>
                  Preferimos mostrar solo lo que está construido y funcionando.
                  Si quiere ver cómo se vería un sistema así en su rubro, lo
                  conversamos en una llamada de 20 minutos.
                </p>
                <Link href="/contacto" className="btn-primary">
                  Agendar llamada
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="block" style={{ paddingTop: "0" }}>
          <div className="wrap" style={{ maxWidth: "680px", textAlign: "center", paddingBottom: "100px" }}>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "12px" }}>
              ¿No encuentra su rubro? Lo construimos igual.
            </h2>
            <p className="lede" style={{ margin: "0 auto 24px" }}>
              El sistema es el mismo para cualquier negocio que agende horas o
              cotice por WhatsApp — cambia la piel, no el motor.
            </p>
            <Link href="/contacto" className="btn-primary">
              Agendar una llamada
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
