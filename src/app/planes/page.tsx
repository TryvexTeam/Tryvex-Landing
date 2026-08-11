import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";
import MantencionPlans from "./MantencionPlans";
import OfertaCards from "./OfertaCards";

export const metadata: Metadata = {
  title: "Planes — Tryvex",
  description:
    "Proyecto único con alcance y precio cerrado, o Tryvex partner con equipo dedicado. Dos formas de trabajar con nosotros.",
  alternates: { canonical: "https://www.tryvex.tech/planes" },
  openGraph: {
    title: "Planes — Tryvex",
    description: "Proyectos puntuales o socio continuo. Dos puertas, mismo equipo.",
    url: "https://www.tryvex.tech/planes",
    locale: "es_CL",
    type: "website",
  },
};

export default function PlanesPage() {
  return (
    <>
      <div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
      <div className="grain"></div>



      <NavBar />
      <RevelarAlScroll />

      <main id="contenido" tabIndex={-1}>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "34px", paddingBottom: "60px" }}>
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">04</span><span className="sec-label">Planes</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>Dos puertas. <em>Mismo equipo.</em></h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "600px" }}>
              Proyectos puntuales o socio continuo. Si no calzas en ninguno, lo conversamos.
            </p>
          </div>
        </section>

        <section className="block" style={{ paddingTop: "0" }}>
          <div className="wrap">
            <OfertaCards />

            <div style={{ maxWidth: "1080px", margin: "88px auto 0" }} data-anim="fade-up">
              <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 40px" }}>
                <span className="eyebrow"><span className="sec-num">05</span><span className="sec-label">Mantención</span></span>
                <h2 style={{ marginTop: "14px", marginBottom: "12px" }}>Después de los 90 días, <em>elige tu ritmo</em>.</h2>
                <p style={{ color: "var(--muted)", lineHeight: "1.6" }}>
                  Su sitio no puede vivir en un plan gratuito: la infraestructura real cuesta, y su
                  mensualidad cubre que siga en pie. El plan nunca sube solo — si un mes necesita más,
                  se agrega un bloque puntual de $75.000 por 2 horas.
                </p>
              </div>

              <MantencionPlans />

              <p style={{ color: "var(--muted)", fontSize: "13.5px", textAlign: "center", marginTop: "32px", maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}>
                ¿Es un SaaS que monetizas? En vez de mensualidad fija, se ofrece 5% de lo que factura
                el sistema (piso $150.000/mes) mientras Tryvex aloja tu infraestructura.
              </p>
            </div>

            <div style={{ maxWidth: "760px", margin: "72px auto 0" }} data-anim="fade-up">
              <h2 style={{ marginBottom: "20px" }}>¿Cuál conviene <em>en tu caso?</em></h2>
              <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "18px" }}>
                La pregunta útil no es cuánto cuesta cada uno, sino cuánto trabajo tienes por
                delante. Si lo que te quita el sueño es <strong>un</strong> proceso concreto —el que
                te hace abrir la planilla todos los días— eso es un proyecto único: se define el
                alcance en la llamada, se cierra el precio antes de partir y termina.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "18px" }}>
                El modelo de socio continuo aparece cuando la lista no se acaba: automatizas el
                primer proceso y al mes siguiente ya viste otros tres. Ahí contratar por proyecto
                se vuelve caro en tiempo —cada uno arranca con su propia negociación— y conviene
                tener el equipo disponible con sprints cada dos semanas.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "18px" }}>
                No hay que decidirlo hoy. La mayoría entra con un proyecto acotado, lo ve
                funcionando, y recién entonces conversamos si tiene sentido seguir mes a mes. No
                hay contratos atados en ninguno de los dos: si el sistema queda andando y no
                necesitas nada más, ese es un buen final.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: "1.7" }}>
                En ambos casos el código es tuyo, con repositorio, accesos y documentación, y
                todo lo que entregamos incluye 90 días de mantención sin costo.
              </p>
            </div>

            <p className="sec-sub" style={{ margin: "48px auto 0", textAlign: "center" }}>
              ¿Dudas antes de decidir? Mira <Link href="/preguntas" style={{ color: "var(--red-vivo)" }}>las preguntas frecuentes</Link> o
              revisa <Link href="/proceso" style={{ color: "var(--red-vivo)" }}>cómo trabajamos</Link>.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />

    </>
  );
}
