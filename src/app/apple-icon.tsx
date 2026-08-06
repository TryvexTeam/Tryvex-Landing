import { ImageResponse } from "next/og";

/**
 * Icono para "Añadir a pantalla de inicio" en iOS (180×180).
 *
 * Antes esto apuntaba a `/logo-email-dark.png`, el logotipo completo con la
 * palabra: iOS lo mete en un cuadrado, así que el texto quedaba diminuto y con
 * franjas a los lados. La estrella sola llena el cuadro y se reconoce.
 *
 * Sin `runtime = "edge"`: ese export desactiva la generación estática y
 * convertiría el icono en una función que corre en cada request.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0e0e0e",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 100 100">
          <path
            d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z"
            fill="#f4f1ea"
          />
          <path
            d="M 82 14 C 83 19, 87 23, 92 24 C 87 25, 83 29, 82 34 C 81 29, 77 25, 72 24 C 77 23, 81 19, 82 14 Z"
            fill="#e53935"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
