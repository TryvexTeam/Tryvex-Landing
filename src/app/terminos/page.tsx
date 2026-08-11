import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import SiteFooter from "../../components/SiteFooter";
import CookieSettingsLink from "../../components/legal/CookieSettingsLink";

export const metadata: Metadata = {
  title: "Términos y condiciones — Tryvex",
  description:
    "Condiciones bajo las que Tryvex presta sus servicios: alcance, precios, plazos, propiedad del código, garantía de 90 días y responsabilidades de cada parte.",
  alternates: { canonical: "https://www.tryvex.tech/terminos" },
  openGraph: {
    title: "Términos y condiciones — Tryvex",
    description: "Alcance, precios, plazos, propiedad del código y garantía.",
    url: "https://www.tryvex.tech/terminos",
    locale: "es_CL",
    type: "website",
  },
};

const VERSION = "1.0";
const VIGENCIA = "10 de agosto de 2026";

export default function TerminosPage() {
  return (
    <>
      <div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
      <div className="grain"></div>

      <NavBar />

      <main>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "760px", paddingTop: "34px", paddingBottom: "40px" }}>
            <span className="eyebrow"><span className="sec-num">—</span><span className="sec-label">Legal</span></span>
            <h1 style={{ marginTop: "16px" }}>Términos y <em>condiciones.</em></h1>
            <p className="lede" style={{ maxWidth: "620px" }}>
              Las reglas del juego: qué hacemos, qué cuesta, en cuánto tiempo, de
              quién es el código y qué esperamos de cada lado.
            </p>
            <p className="legal-meta">
              Versión {VERSION} · Vigente desde el {VIGENCIA}
            </p>
          </div>
        </section>

        <section className="block" style={{ paddingTop: "0" }}>
          <div className="wrap legal-doc" style={{ maxWidth: "760px" }}>

            <h2>1. Quiénes somos</h2>
            <p>
              Tryvex es un estudio de software con domicilio en Santiago, Chile.
              Diseñamos, construimos y mantenemos automatizaciones, landing pages
              y productos SaaS a medida.
            </p>
            {/* TODO al constituir la SpA: agregar razón social, RUT y domicilio
                legal exactos. El DS 6/2021 los exige para el proveedor. */}
            <p>
              Contacto:{" "}
              <a href="mailto:tryvexentreprise@gmail.com">contacto@tryvex.tech</a>.
            </p>

            <h2>2. Qué cubren estos términos</h2>
            <p>
              Estos términos aplican al uso de este sitio y al marco general de
              nuestros servicios. Cada proyecto en particular se rige, además, por
              el <strong>Acuerdo de Términos de Negocio</strong> que firmamos con
              el cliente antes de comenzar, donde quedan por escrito el alcance,
              el precio y el plazo específicos.
            </p>
            <p>
              Si algo del acuerdo firmado contradice lo que dice esta página,{" "}
              <strong>manda el acuerdo firmado</strong>.
            </p>

            <h2>3. Servicios</h2>
            <ul className="legal-list">
              <li><strong>Automatización de procesos</strong> — flujos que conectan las herramientas que ya usas. Referencia: 2 a 4 semanas.</li>
              <li><strong>Landing pages</strong> — diseño, contenido e ingeniería, con seguimiento de métricas. Referencia: 5 a 10 días.</li>
              <li><strong>SaaS a medida</strong> — producto interno o de mercado, con autenticación, roles y despliegue. Referencia: 4 a 8 semanas.</li>
            </ul>
            <p>
              Los plazos indicados son estimaciones basadas en proyectos
              anteriores. El plazo que obliga es el del acuerdo firmado, y
              siempre depende de que recibamos a tiempo la información, los
              accesos y las aprobaciones que dependen del cliente.
            </p>

            <h2>4. Cómo se contrata</h2>
            <ol className="legal-list">
              <li>Conversamos y entendemos el problema.</li>
              <li>Enviamos una propuesta con alcance, precio y plazo.</li>
              <li>Si hay acuerdo, se firma el Acuerdo de Términos de Negocio.</li>
              <li>Se paga el anticipo convenido y empezamos.</li>
            </ol>
            <p>
              Nada de esto obliga a nadie hasta que existe un acuerdo firmado por
              ambas partes. Una cotización enviada no es un contrato.
            </p>

            <h2>5. Precios y pago</h2>
            <p>
              Los precios se expresan en pesos chilenos. El modelo{" "}
              <strong>Sprint</strong> parte desde $150.000 CLP con alcance fijo,
              plazo fijo y precio cerrado. El modelo{" "}
              <strong>Personalizado</strong> se define caso a caso, con sprints
              quincenales y reportes mensuales.
            </p>
            <p>
              La forma de pago, el anticipo y los hitos quedan en el acuerdo de
              cada proyecto. Emitimos el documento tributario que corresponda por
              cada pago recibido.
            </p>

            <h2>6. Cambios de alcance</h2>
            <p>
              Lo que está en el acuerdo es lo que se construye. Si durante el
              proyecto aparece algo nuevo, lo conversamos y queda por escrito con
              su efecto en precio y plazo antes de ejecutarlo. No agregamos
              trabajo sin avisar, y tampoco lo hacemos gratis en silencio.
            </p>

            <h2>7. Propiedad del código</h2>
            <p>
              Pagado el proyecto, <strong>el código es del cliente</strong>. Se
              entrega el repositorio, los accesos y la documentación. Si mañana
              quiere seguir con otro equipo, puede hacerlo sin pedirnos permiso ni
              pagar por liberarlo.
            </p>
            <p>
              Se excluyen de lo anterior las herramientas, librerías y componentes
              de terceros o propios de uso general que se hayan utilizado, que se
              rigen por sus respectivas licencias. Nada de eso limita el uso del
              producto entregado.
            </p>

            <h2>8. Garantía</h2>
            <p>
              Todo proyecto incluye <strong>90 días de mantención sin costo</strong>{" "}
              desde la entrega. Cubre corrección de errores y fallas de lo
              construido y acordado.
            </p>
            <p>
              No cubre funcionalidades nuevas, cambios de alcance, ni fallas
              provocadas por modificaciones hechas por terceros, por caídas de
              servicios externos o por cambios en las plataformas integradas.
            </p>

            <h2>9. Lo que necesitamos del cliente</h2>
            <ul className="legal-list">
              <li>Entregar a tiempo la información, contenidos y accesos necesarios.</li>
              <li>Designar una contraparte con capacidad de aprobar y decidir.</li>
              <li>Contar con los derechos sobre los contenidos que nos entrega.</li>
              <li>Mantener sus propias cuentas y suscripciones de terceros vigentes.</li>
            </ul>
            <p>
              Los retrasos que dependen del cliente corren el plazo de entrega en
              la misma medida.
            </p>

            <h2>10. Accesos y datos</h2>
            <p>
              Cuando un proyecto requiere acceso a sistemas del cliente,
              trabajamos con <strong>accesos temporales</strong> y entregamos las
              instrucciones para que el cliente los cambie o revoque cuando
              quiera. Si en un proyecto tratamos datos personales por cuenta del
              cliente, ese tratamiento se regula en el acuerdo correspondiente.
            </p>
            <p>
              El tratamiento de los datos de quienes visitan este sitio está
              descrito en la{" "}
              <Link href="/privacidad">política de privacidad</Link>.
            </p>

            <h2>11. Confidencialidad</h2>
            <p>
              Todo lo que conocemos del negocio del cliente durante un proyecto es
              confidencial y no se comparte con terceros. Salvo que el cliente
              indique lo contrario, podemos mencionar públicamente que trabajamos
              con él y mostrar el resultado visible del trabajo.
            </p>

            <h2>12. Límite de responsabilidad</h2>
            <p>
              Respondemos por el trabajo que entregamos y por corregirlo cuando
              falla. Nuestra responsabilidad total por un proyecto se limita al
              monto efectivamente pagado por ese proyecto.
            </p>
            <p>
              No respondemos por interrupciones de servicios de terceros, por
              cambios que estos hagan en sus plataformas, ni por el uso que el
              cliente dé al producto entregado después de la entrega. Nada de esto
              limita los derechos que la ley reconoce a los consumidores.
            </p>

            <h2>13. Término anticipado</h2>
            <p>
              Cualquiera de las partes puede terminar un proyecto avisando por
              escrito. Se paga el trabajo realizado hasta ese momento y se entrega
              lo construido hasta esa fecha. No hay multas ni permanencia mínima:
              no trabajamos con contratos atados.
            </p>

            <h2>14. Ley aplicable</h2>
            <p>
              Estos términos se rigen por la ley chilena. Cualquier diferencia se
              somete a los tribunales ordinarios de Santiago, sin perjuicio de los
              derechos que la Ley 19.496 reconoce a los consumidores.
            </p>

            <h2>15. Cambios</h2>
            <p>
              Podemos actualizar estos términos. La versión y la fecha de vigencia
              están arriba. Los proyectos en curso se rigen por la versión vigente
              al momento de firmar su acuerdo.
            </p>

            <div className="legal-foot">
              <p>
                ¿Dudas antes de firmar? Escríbenos a{" "}
                <a href="mailto:tryvexentreprise@gmail.com">contacto@tryvex.tech</a>.
              </p>
              <p>
                Ver también la <Link href="/privacidad">política de privacidad</Link>{" "}
                y los <Link href="/planes">planes</Link>.
              </p>
            </div>

          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
