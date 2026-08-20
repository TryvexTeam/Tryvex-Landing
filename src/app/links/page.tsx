import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Anton } from "next/font/google";

import { ENLACES } from "../../features/links/data";
import AuroraRoja from "../../features/links/components/AuroraRoja";
import EstrellaTryvex from "../../features/links/components/EstrellaTryvex";
import RegistroDeClics from "../../features/links/components/RegistroDeClics";
import "../../features/links/links.css";

/**
 * /links — la página que va en la bio de las redes.
 *
 * No está en `NAV_LINKS` a propósito: se llega por la URL directa, desde
 * Instagram o TikTok, nunca navegando por el sitio. Tampoco monta el NavBar
 * ni el footer, porque no es una página del recorrido: es el punto de entrada
 * al recorrido.
 *
 * Sí está en el sitemap y es indexable —el señor Ignacio pidió que estuviera
 * fuera del menú, no fuera de Google—, así que lleva canonical propio para no
 * competir con la home por la misma consulta de marca.
 */

/* Anton solo vive acá. Cargarla en el layout la metería en las ocho rutas del
   sitio para usarla en una. */
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--cond",
});

/* El layout raíz declara el crema del sitio para toda la ruta; esta página es
   la única oscura, así que redeclara los dos. `themeColor` es lo que tiñe la
   barra de estado y la barra de direcciones en los navegadores móviles: sin
   esto, /links se abre con una franja crema encima de un fondo casi negro.

   Dónde funciona: Chrome y Samsung Internet en Android lo respetan, y Safari
   en iOS también desde la 15. Fuera de ahí manda el navegador y no hay nada
   que hacer desde la página. `colorScheme: "dark"` es el complemento: es lo
   que evita que el oscurecido automático de algunos navegadores intente
   invertir una página que ya es oscura. */
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#08080a",
};

export const metadata: Metadata = {
  title: "Enlaces — Tryvex",
  description:
    "Todos los canales de Tryvex en un solo lugar: redes, catálogo de demos en vivo, planes y agenda.",
  alternates: { canonical: "https://www.tryvex.tech/links" },
  openGraph: {
    title: "Enlaces — Tryvex",
    description: "Redes, demos en vivo, planes y agenda de Tryvex en un solo lugar.",
    url: "https://www.tryvex.tech/links",
    type: "website",
  },
};

const FlechaExterna = () => (
  <svg className="links-fila__flecha" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export default function LinksPage() {
  return (
    <RegistroDeClics>
      <main className={`links-pagina ${anton.variable}`}>
        <div className="links-fondo" aria-hidden="true" />
        <AuroraRoja />
        <div className="links-brasa" aria-hidden="true" />
        <div className="links-guias" aria-hidden="true">
          <span /><span /><span /><span /><span /><span />
        </div>

        <header className="links-marca">
          <div className="links-pill">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <use href="#spark" />
            </svg>
            Tryvex
            <span className="links-pill__sep" aria-hidden="true" />
            <Link href="/catalogo" data-link="pill-catalogo">Catálogo</Link>
            <Link href="/planes" data-link="pill-planes">Planes</Link>
          </div>
        </header>

        <div className="links-escena">
          <EstrellaTryvex />
        </div>

        <div className="links-contenido">
          <div className="links-cuerpo">
            <div className="links-intro">
            <span className="links-eyebrow">[00] Entrada</span>
            <h1 className="links-titular">
              Software
              <br />
              que ya <em>corre.</em>
            </h1>
            <p className="links-bajada">
              Estudio de IA y software a medida. Trece piezas nuestras están en producción ahora
              mismo — acá está todo lo demás.
            </p>

            <span className="links-claim">
              Hecho para operar.
              <br />
              No para demostrar.
            </span>
            </div>

            <nav className="links-indice" aria-label="Canales de Tryvex">
              <span className="links-indice__titulo">[{String(ENLACES.length).padStart(2, "0")}] Dónde estamos</span>
              <ul className="links-lista">
                {ENLACES.map((enlace, i) => (
                  <li key={enlace.href}>
                    {enlace.externo ? (
                      <a
                        className="links-fila"
                        href={enlace.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-link={enlace.nombre.toLowerCase()}
                      >
                        <span className="links-fila__num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="links-fila__nombre">{enlace.nombre}</span>
                        <span className="links-fila__meta">{enlace.meta}</span>
                        <FlechaExterna />
                      </a>
                    ) : (
                      <Link
                        className="links-fila"
                        href={enlace.href}
                        data-link={enlace.nombre.toLowerCase()}
                      >
                        <span className="links-fila__num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="links-fila__nombre">{enlace.nombre}</span>
                        <span className="links-fila__meta">{enlace.meta}</span>
                        <FlechaExterna />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="links-cierre">
              {/* La frase se repite en `data-texto` para que el CSS pueda pintar
                  una segunda capa en tinta sobre la zona que tapa la estrella.
                  Va en un atributo y no en un segundo nodo de texto para que un
                  lector de pantalla siga leyendo la pregunta una sola vez. */}
              <p className="links-pregunta" data-texto="¿Estás listo para dar el salto a la era de la IA con Tryvex?">
                ¿Estás listo para dar el salto a la <em>era de la IA</em> con Tryvex?
              </p>

                <Link className="links-cta" href="/" data-link="home">
                <span className="links-cta__texto">tryvex.tech</span>
                {/* Dos flechas idénticas: la de dentro sale por la derecha y la
                    de fuera entra por la izquierda, de modo que el relevo se lee
                    como una sola flecha que cruza el círculo. */}
                <span className="links-cta__brillo" aria-hidden="true" />
                {/* Flecha diagonal, la misma que usan las tarjetas del panel de
                    TryvexPlataform y las filas del índice de acá: en toda la
                    marca, «salir hacia afuera» se dibuja igual.

                    Van dos idénticas en un riel: la de dentro sale por arriba a
                    la derecha y la de fuera entra por abajo a la izquierda, de
                    modo que el relevo se lee como una sola flecha cruzando. */}
                <span className="links-cta__icono" aria-hidden="true">
                  <span className="links-cta__riel">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f2f0ec" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#f2f0ec" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </span>
              </Link>
            </div>

          </div>

          <p className="links-pie">
            © {new Date().getFullYear()} Tryvex SpA · <Link href="/privacidad">Privacidad</Link>
          </p>
        </div>

        <div className="links-grano" aria-hidden="true" />
      </main>
    </RegistroDeClics>
  );
}
