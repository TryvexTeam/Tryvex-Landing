"use client";

import Script from "next/script";
import { useConsent } from "./useConsent";

const CLARITY_PROJECT_ID = "wst2su25gg";

/**
 * Microsoft Clarity graba sesión y mapas de calor: es perfilamiento, no una
 * cookie técnica. Por eso el script no se inyecta hasta que la categoría de
 * análisis quedó aceptada. Si la persona revoca, React desmonta el componente y
 * Clarity deja de cargarse en las visitas siguientes.
 */
export default function ClarityScript() {
  const { analyticsAllowed } = useConsent();

  if (!analyticsAllowed) return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_PROJECT_ID}");`,
      }}
    />
  );
}
