import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tryvex — Automatización e Innovación Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          flexDirection: "column",
          gap: "32px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Spark logo — same paths as the inline SVG in the landing */}
        <svg width="140" height="140" viewBox="0 0 100 100">
          <path
            d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z"
            fill="#f4f1ea"
          />
          <path
            d="M 82 14 C 83 19, 87 23, 92 24 C 87 25, 83 29, 82 34 C 81 29, 77 25, 72 24 C 77 23, 81 19, 82 14 Z"
            fill="#e53935"
          />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            fontSize: "88px",
            fontWeight: "700",
            letterSpacing: "-4px",
            color: "#f4f1ea",
            display: "flex",
            alignItems: "baseline",
            lineHeight: 1,
          }}
        >
          tryvex
          <span style={{ color: "#e53935" }}>.</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "26px",
            color: "#666",
            marginTop: "-8px",
          }}
        >
          Automatización e Innovación Digital · Santiago, CL
        </div>
      </div>
    ),
    { ...size }
  );
}
