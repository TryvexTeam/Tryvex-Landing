import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import VolverAlInicio from "../../components/VolverAlInicio";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import TeamClient from "../../features/team/components/TeamClient";
import "../../features/team/equipo.css";

export const metadata: Metadata = {
  title: "Equipo — Tryvex",
  description: "Conoce al equipo detrás de Tryvex. Ingenieros y diseñadores en Santiago que construyen software que corre solo.",
  alternates: { canonical: "https://www.tryvex.tech/team" },
  openGraph: {
    title: "Equipo — Tryvex",
    description: "Conoce al equipo detrás de Tryvex.",
    url: "https://www.tryvex.tech/team",
    locale: "es_CL",
    type: "website",
  },
};

export default function TeamPage() {
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
        <section className="hero">
          <div className="wrap" style={{ paddingTop: "140px", paddingBottom: "40px" }}>
            <VolverAlInicio />
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">04</span><span className="sec-label">Equipo</span></span>
            <div className="team-hero-editorial">
              <h1 data-anim="fade-up" className="team-hero-editorial__h1">
                El equipo que construye<br />lo que prometemos.
              </h1>
              <p className="team-hero-editorial__desc">
                Ingenieros y diseñadores en Santiago.
                Construimos sistemas que corren solos
                para negocios que no tienen tiempo que perder.
              </p>
            </div>
          </div>
        </section>

        <div className="wrap">
          <hr className="team-section-divider" />
          <TeamClient />
        </div>
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
                <Link href="/proceso">Proceso</Link>
                <Link href="/team">Equipo</Link>
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
