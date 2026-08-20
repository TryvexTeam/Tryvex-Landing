"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    clarity?: (metodo: string, ...args: unknown[]) => void;
  }
}

/**
 * Cuenta a qué enlace se va la gente desde /links.
 *
 * Es un único listener delegado en el contenedor, no un `onClick` por fila:
 * así las filas siguen siendo markup del servidor y la página no manda un
 * componente cliente por enlace.
 *
 * `window.clarity` solo existe si el visitante aceptó las cookies de análisis
 * —`ClarityScript` no se inyecta antes—, así que el `?.` no es defensa contra
 * un fallo de carga: es lo que hace que negarse al consentimiento signifique
 * de verdad que no se registra nada.
 */
export default function RegistroDeClics({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const alHacerClic = (evento: MouseEvent) => {
      const objetivo = (evento.target as HTMLElement | null)?.closest<HTMLElement>("[data-link]");
      if (!objetivo) return;
      window.clarity?.("event", `links_${objetivo.dataset.link}`);
    };

    document.addEventListener("click", alHacerClic);
    return () => document.removeEventListener("click", alHacerClic);
  }, []);

  return <>{children}</>;
}
