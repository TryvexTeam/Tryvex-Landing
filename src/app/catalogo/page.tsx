import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import { demosPublicadas } from "../../features/catalogo/data";
import DemoCard from "../../features/catalogo/components/DemoCard";
import "../../features/catalogo/catalogo.css";
import SiteFooter from "../../components/SiteFooter";

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



      <NavBar />
      <RevelarAlScroll />

      <main id="contenido" tabIndex={-1}>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "34px", paddingBottom: "60px" }}>
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">02</span><span className="sec-label">Catálogo</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>Vea el trabajo <em>funcionando</em>, no promesas.</h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "620px" }}>
              Cada proyecto de esta vitrina es una demostración real y navegable:
              entre, recórrala y converse con el asistente como si fuera un cliente.
              Si aparece acá, funciona.
            </p>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            {demosPublicadas.length > 0 ? (
              <div className="cat-grid" data-stagger>
                {demosPublicadas.map((demo) => (
                  <DemoCard key={demo.id} demo={demo} nivel={2} />
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
            <h2 data-anim="fade-up" style={{ fontSize: "1.6rem", marginBottom: "12px" }}>
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

      <SiteFooter />

    </>
  );
}
