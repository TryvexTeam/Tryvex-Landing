"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { openCookiePreferences, useConsent } from "./useConsent";

/**
 * Aviso de cookies. Aparece solo mientras no haya una decisión vigente.
 *
 * "Rechazar" y "Aceptar" comparten la misma clase a propósito: la ley exige que
 * rechazar sea tan fácil y visible como aceptar, así que no puede haber un botón
 * primario y otro degradado a enlace gris.
 *
 * No se cierra solo, no se cierra con Escape y no tiene aspa: cerrar el aviso no
 * es una decisión válida, y dejarlo cerrar sin elegir equivaldría a asumir un
 * consentimiento que nadie dio.
 */
/* Rutas donde el aviso no se muestra.
   /links se abre desde la bio de una red social, ocupa una sola pantalla y su
   única razón de ser es que alguien toque un enlace: un aviso al pie tapa
   justo eso. No hay ilegalidad en omitirlo porque tampoco se activa ninguna
   cookie de análisis sin decisión previa — `ClarityScript` no se inyecta y
   `window.clarity` no existe, así que el registro de clics de esa página
   simplemente no ocurre. El precio es real y conviene tenerlo presente: el
   tráfico que llegue directo a /links y no haya pasado antes por el sitio no
   queda medido. */
const SIN_AVISO = ["/links"];

export default function CookieBanner() {
  const ruta = usePathname();
  const { consent, hydrated, acceptAll, rejectAll } = useConsent();

  if (SIN_AVISO.includes(ruta)) return null;
  if (!hydrated || consent !== null) return null;

  return (
    /* `region` y no `dialog`: esto es un aviso persistente al pie, no una
       ventana modal. Anunciarlo como diálogo prometía a los lectores de pantalla
       un contexto modal que nunca existió — el resto de la página sigue
       navegable a propósito, porque el aviso no debe secuestrar la visita. */
    <div
      className="cookie-banner"
      role="region"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="cookie-banner__card glass strong">
        <p id="cookie-banner-title" className="cookie-banner__title">
          Cookies en este sitio
        </p>
        <p id="cookie-banner-desc" className="cookie-banner__text">
          Usamos cookies necesarias para que el sitio funcione y, si nos
          autorizas, cookies de análisis que registran cómo se navega para
          mejorarlo. Las de análisis no se activan hasta que las aceptas. Puedes
          cambiar de opinión cuando quieras desde el pie de página. Detalle
          completo en la{" "}
          <Link href="/privacidad">política de privacidad</Link>.
        </p>
        <div className="cookie-banner__actions">
          <button
            type="button"
            className="cookie-btn"
            onClick={rejectAll}
            aria-label="Rechazar las cookies de análisis"
          >
            Rechazar
          </button>
          <button
            type="button"
            className="cookie-btn"
            onClick={acceptAll}
            aria-label="Aceptar las cookies de análisis"
          >
            Aceptar
          </button>
        </div>
        <button
          type="button"
          className="cookie-banner__link"
          onClick={openCookiePreferences}
        >
          Personalizar
        </button>
      </div>
    </div>
  );
}
