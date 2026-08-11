"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

export const CONSENT_STORAGE_KEY = "tryvex_cookie_consent";
export const CONSENT_EVENT = "tryvex-consent-change";
export const PREFERENCES_EVENT = "tryvex-consent-open-preferences";

/**
 * La versión viaja dentro del registro guardado. Si el texto de la política
 * cambia de forma sustantiva se sube este número: el banner vuelve a aparecer y
 * el consentimiento anterior deja de considerarse vigente. La Ley 21.719 pone la
 * carga de la prueba en nosotros, así que hay que poder demostrar QUÉ versión
 * aceptó cada persona, no solo que aceptó algo alguna vez.
 */
export const CONSENT_VERSION = "1.0";

export interface ConsentCategories {
  /** Sesión, seguridad y preferencias mínimas. No son opcionales ni requieren consentimiento. */
  necessary: true;
  /** Microsoft Clarity: mapas de calor y grabación de sesión. Perfilamiento: exige consentimiento previo. */
  analytics: boolean;
}

export interface ConsentRecord {
  version: string;
  timestamp: string;
  categories: ConsentCategories;
}

function buildRecord(analytics: boolean): ConsentRecord {
  return {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: { necessary: true, analytics },
  };
}

/**
 * Lee el registro guardado. Devuelve null cuando no hay decisión vigente, lo que
 * incluye el caso de un consentimiento otorgado sobre una versión anterior de la
 * política: ese hay que volver a pedirlo.
 */
function parsearConsentimiento(raw: string | null): ConsentRecord | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;

    // Formato heredado: { decision: "accepted" | "rejected" }. Se migra en vez de
    // descartarse, para no volver a molestar a quien ya decidió.
    if (typeof parsed.decision === "string") {
      if (parsed.decision !== "accepted" && parsed.decision !== "rejected") return null;
      return buildRecord(parsed.decision === "accepted");
    }

    const categories = parsed.categories as Partial<ConsentCategories> | undefined;
    if (!categories || typeof categories.analytics !== "boolean") return null;
    if (parsed.version !== CONSENT_VERSION) return null;

    return {
      version: CONSENT_VERSION,
      timestamp: typeof parsed.timestamp === "string" ? parsed.timestamp : new Date().toISOString(),
      categories: { necessary: true, analytics: categories.analytics },
    };
  } catch {
    return null;
  }
}

function writeStoredConsent(record: ConsentRecord | null) {
  if (typeof window === "undefined") return;

  if (record === null) {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } else {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  }

  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Avisa de cualquier cambio del consentimiento, sea de esta pestaña o de otra. */
function suscribir(alCambiar: () => void) {
  window.addEventListener(CONSENT_EVENT, alCambiar);
  window.addEventListener("storage", alCambiar);
  return () => {
    window.removeEventListener(CONSENT_EVENT, alCambiar);
    window.removeEventListener("storage", alCambiar);
  };
}

/* Devuelve la cadena cruda, no el objeto ya parseado: `useSyncExternalStore`
   compara el resultado por identidad y un objeto nuevo en cada lectura lo
   dejaría re-renderizando sin fin. El parseo va después, memorizado. */
const leerCrudo = () => window.localStorage.getItem(CONSENT_STORAGE_KEY);

/* En el servidor no hay localStorage. Devolver null equivale a "sin decisión",
   que es la suposición segura: ante la duda, no se asume consentimiento. */
const leerEnServidor = () => null;

const suscribirMontaje = () => () => {};
const montadoEnCliente = () => true;
const montadoEnServidor = () => false;

/**
 * Estado del consentimiento de cookies, persistido en localStorage.
 *
 * Usa `useSyncExternalStore` porque el consentimiento vive fuera de React —en
 * el almacenamiento del navegador y en otras pestañas—, que es exactamente el
 * caso para el que existe esta API. Leerlo desde un efecto de montaje dejaba un
 * render intermedio con el valor equivocado.
 *
 * `hydrated` distingue "todavía no leí el almacenamiento" de "no hay decisión",
 * para que el aviso no parpadee ante quien ya eligió.
 */
export function useConsent() {
  const crudo = useSyncExternalStore(suscribir, leerCrudo, leerEnServidor);
  const hydrated = useSyncExternalStore(suscribirMontaje, montadoEnCliente, montadoEnServidor);

  const consent = useMemo(() => parsearConsentimiento(crudo), [crudo]);

  const save = useCallback((analytics: boolean) => {
    writeStoredConsent(buildRecord(analytics));
  }, []);

  const acceptAll = useCallback(() => save(true), [save]);
  const rejectAll = useCallback(() => save(false), [save]);

  /** Borra la decisión guardada: el aviso vuelve a aparecer desde cero. */
  const reset = useCallback(() => writeStoredConsent(null), []);

  return {
    consent,
    hydrated,
    analyticsAllowed: consent?.categories.analytics === true,
    acceptAll,
    rejectAll,
    save,
    reset,
  };
}

/** Abre el panel de preferencias desde cualquier punto del sitio (footer, política). */
export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PREFERENCES_EVENT));
}
