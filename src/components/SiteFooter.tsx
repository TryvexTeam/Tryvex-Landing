import Link from "next/link";
import CookieSettingsLink from "./legal/CookieSettingsLink";
import { CONTACTO_HREF } from "../lib/mail";

/**
 * Footer único del sitio.
 *
 * Estaba copiado en las ocho rutas y ya había divergido: tres páginas no
 * enlazaban `/catalogo`, sólo `/team` enlazaba al equipo, y el del home
 * apuntaba a anclas de sí mismo (`#offer`, `#faq`) en vez de a las páginas
 * dedicadas. Con una sola fuente, agregar una ruta al footer es un renglón.
 *
 * `revelar` sólo lo usa el home, que es donde el footer entra con la animación
 * de scroll. Las internas lo pintan visible desde el principio, igual que antes.
 */
export default function SiteFooter({ revelar = false }: { revelar?: boolean }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-card glass" {...(revelar ? { "data-anim": "fade-up" } : {})}>
          <div className="foot-top">
            <div className="foot-brand">
              <Link href="/" className="logo">
                <svg className="logo-mark" style={{ width: "32px", height: "32px" }}><use href="#spark"/></svg>
                <span className="logo-word">tryvex<span className="dot">.</span></span>
              </Link>
              <p>Estudio de IA y agencia de software en Santiago. Construimos sistemas que corren solos para negocios que no tienen tiempo que perder.</p>
            </div>
            <div>
              {/* h2 y no h5: el footer es un landmark `contentinfo` y estos son
                  sus encabezados de primer nivel. Con h5 el índice saltaba de
                  h2 a h5 en las ocho rutas. El estilo lo da `.foot-top h2`. */}
              <h2>Servicios</h2>
              <Link href="/servicios">Automatización</Link>
              <Link href="/servicios">Landing pages</Link>
              <Link href="/servicios">SaaS a medida</Link>
            </div>
            <div>
              <h2>Estudio</h2>
              <Link href="/catalogo">Catálogo</Link>
              <Link href="/proceso">Proceso</Link>
              <Link href="/planes">Planes</Link>
              <Link href="/preguntas">Preguntas</Link>
              <Link href="/team">Equipo</Link>
            </div>
            <div>
              <h2>Contacto</h2>
              <Link href="/contacto">Agendar llamada</Link>
              <a href={CONTACTO_HREF} target="_blank" rel="noopener noreferrer">contacto@tryvex.tech</a>
              <span>Santiago · CL</span>
            </div>
          </div>
          <div className="foot-bottom">
            <div>© MMXXVI · Tryvex</div>
            {/* Acceso permanente a lo legal y a revocar el consentimiento. La
                ley pide que retirarlo sea tan fácil como haberlo dado, y eso
                significa un punto de entrada visible en todas las rutas, no
                solo en la primera visita. */}
            <nav className="foot-legal" aria-label="Legal">
              <Link href="/privacidad">Privacidad</Link>
              <Link href="/terminos">Términos</Link>
              <CookieSettingsLink />
            </nav>
            <div>Hecho a mano en Santiago</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
