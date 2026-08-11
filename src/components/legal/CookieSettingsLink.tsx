"use client";

import { openCookiePreferences } from "./useConsent";

/**
 * Enlace permanente del pie de página para reabrir las preferencias.
 *
 * Existe por exigencia legal, no por comodidad: revocar el consentimiento tiene
 * que ser tan fácil como haberlo dado, y eso implica un punto de acceso visible
 * en todo momento, no solo la primera visita.
 */
export default function CookieSettingsLink() {
  return (
    <button type="button" className="foot-legal__btn" onClick={openCookiePreferences}>
      Preferencias de cookies
    </button>
  );
}
