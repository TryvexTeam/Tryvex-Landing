"use client";
import React, { useEffect, useState } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
  glow: boolean;
}

export default function StarField({ count = 220 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, () => {
        const size = Math.random() * 2.4 + 0.4;
        return {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          dur: Math.random() * 4 + 2,
          delay: Math.random() * 6,
          glow: size > 1.8,
        };
      })
    );
  }, [count]);

  if (!stars.length) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: "rgba(255,255,255,0.95)",
            boxShadow: s.glow
              ? `0 0 ${s.size * 3}px ${s.size}px rgba(200,210,255,0.55)`
              : undefined,
            animation: `star-twinkle ${s.dur}s ${s.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
