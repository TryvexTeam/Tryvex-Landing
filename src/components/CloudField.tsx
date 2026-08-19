"use client";
import React, { useEffect, useState } from "react";

interface Cloud {
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  dur: number;
  delay: number;
  hue: number;
}

export default function CloudField({ count = 6 }: { count?: number }) {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    setClouds(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 80,
        w: Math.random() * 480 + 300,
        h: Math.random() * 220 + 120,
        opacity: Math.random() * 0.14 + 0.08,
        dur: Math.random() * 20 + 18,
        delay: Math.random() * 10,
        hue: Math.random() > 0.5 ? 230 : 270, // azul o violeta
      }))
    );
  }, [count]);

  if (!clouds.length) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {clouds.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: `${c.w}px`,
            height: `${c.h}px`,
            borderRadius: "50%",
            background: `radial-gradient(ellipse at center, hsla(${c.hue},60%,70%,${c.opacity}) 0%, transparent 72%)`,
            filter: "blur(48px)",
            animation: `cloud-drift ${c.dur}s ${c.delay}s ease-in-out infinite`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
