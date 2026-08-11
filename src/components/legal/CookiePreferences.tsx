"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PREFERENCES_EVENT, useConsent } from "./useConsent";

/**
 * Panel de preferencias por categoría. Se abre desde el aviso ("Personalizar"),
 * desde el pie de página y desde la política de privacidad.
 *
 * Usa `<dialog>` nativo en vez de un div con `role="dialog"`: el navegador ya
 * resuelve la retención del foco, el cierre con Escape, el fondo inerte y el
 * `::backdrop`. Escribir eso a mano obligaba a un contenedor con `onClick` que
 * el teclado no podía alcanzar.
 *
 * A diferencia del aviso, este sí se cierra con Escape: cerrarlo no guarda nada
 * ni se interpreta como consentimiento. Si la persona todavía no había decidido,
 * al cerrar vuelve a ver el aviso.
 */
export default function CookiePreferences() {
  const { consent, analyticsAllowed, save } = useConsent();
  const [analytics, setAnalytics] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const abrir = () => {
      setAnalytics(analyticsAllowed);
      if (!dialogRef.current?.open) dialogRef.current?.showModal();
    };

    window.addEventListener(PREFERENCES_EVENT, abrir);
    return () => window.removeEventListener(PREFERENCES_EVENT, abrir);
  }, [analyticsAllowed]);

  /* Fuera del render: `toLocaleDateString` depende de la zona horaria del
     entorno, así que formatear durante el render puede dar un texto en el
     servidor y otro en el cliente. Al memorizarlo contra el timestamp, se
     calcula una sola vez por decisión y no en cada pintado. */
  const fechaDecision = useMemo(() => {
    if (!consent) return null;
    return new Date(consent.timestamp).toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }, [consent]);

  const cerrar = useCallback(() => dialogRef.current?.close(), []);

  const guardar = useCallback(() => {
    save(analytics);
    dialogRef.current?.close();
  }, [analytics, save]);

  /* Clic en el fondo. El `::backdrop` no es un elemento aparte: los clics fuera
     del contenido llegan al propio dialog, así que basta comparar el destino.
     Es comodidad para quien usa mouse, no la única salida: con teclado ya están
     Escape —nativo del dialog— y el botón Cancelar. */
  const clicEnFondo = useCallback((evento: React.MouseEvent<HTMLDialogElement>) => {
    if (evento.target === dialogRef.current) dialogRef.current?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="cookie-prefs"
      aria-labelledby="cookie-prefs-title"
      onClick={clicEnFondo}
    >
      <div className="cookie-prefs__card glass strong">
        <h2 id="cookie-prefs-title" className="cookie-prefs__title">
          Preferencias de cookies
        </h2>

        <p className="cookie-prefs__intro">
          Elige qué se activa. Puedes volver a cambiarlo cuando quieras desde el
          enlace del pie de página.
        </p>

        <div className="cookie-prefs__group">
          <div className="cookie-prefs__row">
            <div>
              <p className="cookie-prefs__name">Necesarias</p>
              <p className="cookie-prefs__desc">
                Mantienen la sesión, la seguridad del formulario y tu decisión
                sobre estas mismas cookies. Sin ellas el sitio no funciona, por
                eso no se pueden desactivar.
              </p>
            </div>
            <span className="cookie-prefs__fixed">Siempre activas</span>
          </div>

          <div className="cookie-prefs__row">
            <div>
              <p className="cookie-prefs__name">Análisis</p>
              <p className="cookie-prefs__desc">
                Microsoft Clarity. Registra clics, desplazamiento y recorrido de
                navegación para entender qué funciona y qué no. Los datos se
                procesan en Estados Unidos.
              </p>
            </div>
            <label className="cookie-prefs__toggle">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(evento) => setAnalytics(evento.target.checked)}
              />
              <span>{analytics ? "Activadas" : "Desactivadas"}</span>
            </label>
          </div>
        </div>

        <div className="cookie-prefs__actions">
          <button type="button" className="cookie-btn" onClick={cerrar}>
            Cancelar
          </button>
          <button type="button" className="cookie-btn" onClick={guardar}>
            Guardar preferencias
          </button>
        </div>

        {consent && (
          <p className="cookie-prefs__meta">
            Última decisión registrada: {fechaDecision} · versión {consent.version}
          </p>
        )}

        <p className="cookie-prefs__meta">
          Más detalle en la <Link href="/privacidad">política de privacidad</Link>.
        </p>
      </div>
    </dialog>
  );
}
