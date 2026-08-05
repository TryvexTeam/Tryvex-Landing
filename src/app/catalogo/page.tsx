import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import VolverAlInicio from "../../components/VolverAlInicio";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import { demosPublicadas } from "../../features/catalogo/data";
import DemoCard from "../../features/catalogo/components/DemoCard";
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
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "140px", paddingBottom: "40px" }}>
            <VolverAlInicio />
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
                  <DemoCard key={demo.id} demo={demo} />
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
    </>
  );
}
