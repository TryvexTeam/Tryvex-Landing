import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import SiteFooter from "../../components/SiteFooter";
import CookieSettingsLink from "../../components/legal/CookieSettingsLink";
import { CONTACTO_HREF } from "../../lib/mail";

export const metadata: Metadata = {
  title: "Política de privacidad — Tryvex",
  description:
    "Qué datos personales tratamos en Tryvex, con qué finalidad, con quién los compartimos, cuánto tiempo los guardamos y cómo ejercer tus derechos.",
  alternates: { canonical: "https://www.tryvex.tech/privacidad" },
  openGraph: {
    title: "Política de privacidad — Tryvex",
    description: "Cómo tratamos tus datos personales y cómo ejercer tus derechos.",
    url: "https://www.tryvex.tech/privacidad",
    locale: "es_CL",
    type: "website",
  },
};

/** Se sube cuando el texto cambia de forma sustantiva. Debe ir en línea con
 *  CONSENT_VERSION en src/components/legal/useConsent.ts: si suben juntas, el
 *  banner vuelve a pedir consentimiento sobre el texto nuevo. */
const VERSION = "1.0";
const VIGENCIA = "10 de agosto de 2026";

export default function PrivacidadPage() {
  return (
    <>
      <div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
      <div className="grain"></div>

      <NavBar />

      <main>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "760px", paddingTop: "34px", paddingBottom: "40px" }}>
            <span className="eyebrow"><span className="sec-num">—</span><span className="sec-label">Legal</span></span>
            <h1 style={{ marginTop: "16px" }}>Política de <em>privacidad.</em></h1>
            <p className="lede" style={{ maxWidth: "620px" }}>
              Qué datos tuyos tratamos, para qué, con quién los compartimos y qué
              puedes exigirnos. Sin letra chica.
            </p>
            <p className="legal-meta">
              Versión {VERSION} · Vigente desde el {VIGENCIA}
            </p>
          </div>
        </section>

        <section className="block" style={{ paddingTop: "0" }}>
          <div className="wrap legal-doc" style={{ maxWidth: "760px" }}>

            <h2>1. Quién trata tus datos</h2>
            <p>
              Tryvex es un estudio de software con domicilio en Santiago, Chile.
              Somos responsables del tratamiento de los datos personales que
              recogemos a través de este sitio.
            </p>
            {/* TODO al constituir la SpA: agregar razón social, RUT y domicilio
                legal exactos en este bloque. El DS 6/2021 de comercio
                electrónico los exige y hoy no existen todavía. */}
            <p>
              Para cualquier tema relacionado con tus datos personales, incluido
              el ejercicio de los derechos descritos más abajo, el contacto es{" "}
              <a href={CONTACTO_HREF} target="_blank" rel="noopener noreferrer">contacto@tryvex.tech</a>.
              Respondemos dentro de los plazos que fija la ley y, en la práctica,
              dentro de los primeros días hábiles.
            </p>

            <h2>2. Qué datos recogemos y para qué</h2>
            <p>
              No recogemos datos “por si acaso”. Cada dato de esta lista tiene una
              finalidad concreta y se recoge solo cuando esa finalidad existe.
            </p>

            <h3>2.1 Formulario de contacto y agendamiento</h3>
            <p>
              Cuando agendas una llamada nos entregas <strong>nombre, teléfono,
              correo electrónico</strong> y, opcionalmente, <strong>un mensaje</strong>{" "}
              y <strong>la fecha y hora</strong> que prefieres. Los usamos para
              contactarte, coordinar la reunión y responder tu consulta. Nada más.
            </p>
            <p>
              La base de licitud es tu <strong>consentimiento</strong>, que
              entregas marcando la casilla del formulario antes de enviarlo. Es
              revocable en cualquier momento escribiéndonos.
            </p>

            <h3>2.2 Dirección IP</h3>
            <p>
              Registramos temporalmente la dirección IP desde la que se envía el
              formulario, únicamente para limitar envíos automatizados y proteger
              el sitio de abuso. No la cruzamos con ningún otro dato ni la usamos
              para identificarte.
            </p>
            <p>
              La base de licitud es nuestro <strong>interés legítimo</strong> en
              mantener el servicio operativo y seguro.
            </p>

            <h3>2.3 Reuniones y grabaciones</h3>
            <p>
              Algunas reuniones se graban o transcriben para no perder detalles
              del proyecto y dejar registro de lo acordado. Cuando eso ocurre{" "}
              <strong>se te avisa y se te pide autorización al inicio de la
              reunión</strong>. Si no autorizas, la reunión sigue igual, sin
              grabación.
            </p>
            <p>
              La base de licitud es tu <strong>consentimiento</strong>. Puedes
              pedirnos que eliminemos una grabación en cualquier momento.
            </p>

            <h3>2.4 Cookies y análisis de uso</h3>
            <p>
              Usamos cookies necesarias para que el sitio funcione y recuerde tu
              decisión sobre estas mismas cookies. Estas no se pueden desactivar,
              porque sin ellas el servicio no puede prestarse.
            </p>
            <p>
              Además, si nos autorizas, usamos <strong>Microsoft Clarity</strong>{" "}
              para entender cómo se navega el sitio: clics, desplazamiento y
              recorrido entre páginas. Esta herramienta{" "}
              <strong>no se activa hasta que la aceptas</strong>, y puedes cambiar
              tu decisión cuando quieras desde{" "}
              <CookieSettingsLink /> o desde el enlace del pie de página.
            </p>
            <p>
              La base de licitud del análisis es tu <strong>consentimiento previo
              y expreso</strong>. La de las cookies necesarias es la ejecución del
              servicio que solicitaste.
            </p>

            <h2>3. Con quién compartimos tus datos</h2>
            <p>
              No vendemos datos personales ni los cedemos con fines publicitarios.
              Los compartimos solo con los proveedores que necesitamos para operar,
              y cada uno los trata siguiendo nuestras instrucciones:
            </p>
            <ul className="legal-list">
              <li><strong>Resend</strong> — envío de los correos de confirmación y aviso interno.</li>
              <li><strong>Google</strong> — Calendar y Meet, para crear y sostener la reunión agendada.</li>
              <li><strong>Microsoft Clarity</strong> — análisis de uso del sitio, solo si lo aceptaste.</li>
              <li><strong>Vercel</strong> — infraestructura donde se aloja y ejecuta este sitio.</li>
            </ul>

            <h2>4. Transferencia internacional</h2>
            <p>
              Los proveedores del punto anterior procesan la información en{" "}
              <strong>Estados Unidos</strong>. Al usar este sitio y enviarnos tus
              datos, esa transferencia ocurre. Trabajamos únicamente con
              proveedores que ofrecen garantías contractuales de protección de
              datos y que están sujetos a estándares internacionales en la materia.
            </p>

            <h2>5. Cuánto tiempo guardamos tus datos</h2>
            <ul className="legal-list">
              <li><strong>Consultas que no derivan en proyecto:</strong> hasta 12 meses desde el último contacto.</li>
              <li><strong>Clientes:</strong> mientras dure la relación y luego el plazo que exijan las obligaciones legales y tributarias aplicables.</li>
              <li><strong>Grabaciones y transcripciones:</strong> mientras dure el proyecto y hasta 6 meses después del cierre.</li>
              <li><strong>Dirección IP del formulario:</strong> horas. Se descarta apenas deja de ser útil para el control de abuso.</li>
              <li><strong>Decisión sobre cookies:</strong> hasta que la cambies o borres los datos de tu navegador.</li>
            </ul>
            <p>
              Cumplido el plazo, los datos se eliminan. Si quieres que los
              borremos antes, basta con pedirlo.
            </p>

            <h2>6. Tus derechos</h2>
            <p>Sobre tus datos personales puedes ejercer estos derechos:</p>
            <ul className="legal-list">
              <li><strong>Acceso</strong> — saber qué datos tuyos tenemos y qué hacemos con ellos.</li>
              <li><strong>Rectificación</strong> — corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión</strong> — pedir que los eliminemos.</li>
              <li><strong>Oposición</strong> — oponerte a un tratamiento determinado.</li>
              <li><strong>Portabilidad</strong> — recibir tus datos en un formato estructurado y de uso común.</li>
              <li><strong>Revocación</strong> — retirar tu consentimiento cuando esa sea la base del tratamiento, sin que afecte lo hecho antes.</li>
            </ul>
            <p>
              Se ejercen escribiendo a{" "}
              <a href={CONTACTO_HREF} target="_blank" rel="noopener noreferrer">contacto@tryvex.tech</a>. No
              cobramos por ello. Si consideras que no respondimos bien, puedes
              reclamar ante la autoridad de protección de datos competente.
            </p>

            <h2>7. Seguridad</h2>
            <p>
              El sitio opera bajo HTTPS, el formulario valida y sanitiza lo que
              recibe, y el acceso a las herramientas donde viven estos datos está
              restringido al equipo que lo necesita para trabajar. Ningún sistema
              es infalible: si ocurriera una brecha que afecte tus datos, te
              informaremos y notificaremos a la autoridad dentro de los plazos
              legales.
            </p>

            <h2>8. Menores de edad</h2>
            <p>
              Este sitio está dirigido a personas y empresas que contratan
              servicios profesionales. No recogemos datos de menores de edad de
              forma consciente. Si detectamos que ocurrió, los eliminamos.
            </p>

            <h2>9. Cambios en esta política</h2>
            <p>
              Si cambiamos algo sustantivo, subimos la versión del documento y
              volvemos a pedirte consentimiento sobre las cookies de análisis. La
              versión y la fecha de vigencia siempre están arriba, para que puedas
              verificar cuál es la que estás leyendo.
            </p>

            <div className="legal-foot">
              <p>
                ¿Algo no queda claro? Escríbenos a{" "}
                <a href={CONTACTO_HREF} target="_blank" rel="noopener noreferrer">contacto@tryvex.tech</a> y
                lo explicamos en palabras simples.
              </p>
              <p>
                Ver también los <Link href="/terminos">términos y condiciones</Link>.
              </p>
            </div>

          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
