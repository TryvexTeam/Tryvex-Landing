import { ImageResponse } from "next/og";

/* Igual que la imagen de Open Graph: `runtime = "edge"` impedía prerenderizar
   el favicon y lo convertía en una función que corría en cada carga de página. */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
        <svg width="28" height="28" viewBox="0 0 100 100">
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
