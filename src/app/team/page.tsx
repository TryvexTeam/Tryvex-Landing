import type { Metadata } from "next";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import TeamClient from "../../features/team/components/TeamClient";
import { fetchTeam } from "../../features/team/data/fetch-team";
import "../../features/team/equipo.css";
import SiteFooter from "../../components/SiteFooter";

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

export default async function TeamPage() {
  const members = await fetchTeam();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": members
      .filter((m) => m.bio || m.bioShort)
      .map((m) => ({
        "@type": "Person",
        "@id": `https://www.tryvex.tech/team#${m.id}`,
        name: m.name,
        jobTitle: m.role || undefined,
        description: m.bioShort || m.bio || undefined,
        image: m.photo || undefined,
        url: "https://www.tryvex.tech/team",
        worksFor: { "@id": "https://www.tryvex.tech/#organization" },
        sameAs: [m.linkedin, m.portfolio].filter(Boolean),
      })),
  };

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
        {/* `paddingBottom: 0` como las otras seis internas: `.hero` trae 60px
            propios que acá se sumaban a los 60 del `.wrap`, dejando el doble de
            aire entre la bajada y el contenido que en el resto del sitio. */}
        <section className="hero" style={{ paddingBottom: "0" }}>
          {/* Mismo bloque de 800px centrado que el resto de las internas. Era la
              única ruta con el hero a ancho completo (1280) y en dos columnas:
              su h1 arrancaba 240px más a la izquierda que el de las demás. */}
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "34px", paddingBottom: "60px" }}>
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">06</span><span className="sec-label">Equipo</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>
              El equipo que construye <em>lo que prometemos.</em>
            </h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "600px" }}>
              Ingenieros y diseñadores en Santiago. Construimos sistemas que corren
              solos para negocios que no tienen tiempo que perder.
            </p>
          </div>
        </section>

        <div className="wrap">
          <hr className="team-section-divider" />
          <TeamClient members={members} />
        </div>
      </main>

      <SiteFooter />

    </>
  );
}
