"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Vuelta al inicio: la estrella del logo se transforma en un triángulo.
 *
 * Es un morph real del trazado, no un cambio de icono: ambas figuras se
 * declaran con la misma estructura —cuatro segmentos cúbicos y los mismos
 * anclajes— así que el navegador interpola punto por punto y la estrella se
 * pliega sobre sí misma. Con dos paths de estructura distinta el morph no
 * ocurre y el icono simplemente salta.
 *
 * Los puntos de control del triángulo van sobre la recta entre vértices (a 1/3
 * y 2/3), que es como se dibuja un lado recto con una curva cúbica.
 */

/** La estrella de cuatro puntas del logo. */
const ESTRELLA =
  "M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z";

/** Triángulo apuntando a la izquierda, con los mismos cuatro segmentos.
 *  Hacia la izquierda es la dirección que se lee como "volver". */
const TRIANGULO =
  "M 84 8 C 58.7 22, 33.3 36, 8 50 C 33.3 64, 58.7 78, 84 92 C 84 78, 84 64, 84 50 C 84 36, 84 22, 84 8 Z";

export default function VolverAlInicio() {
  const [activo, setActivo] = useState(false);

  return (
    <Link
      href="/"
      className={`volver${activo ? " volver--activo" : ""}`}
      onMouseEnter={() => setActivo(true)}
      onMouseLeave={() => setActivo(false)}
      onFocus={() => setActivo(true)}
      onBlur={() => setActivo(false)}
    >
      <svg className="volver-marca" viewBox="0 0 100 100" aria-hidden="true">
        <path className="volver-figura" d={activo ? TRIANGULO : ESTRELLA} />
        {/* El destello chico del logo se apaga al plegarse la estrella */}
        <path
          className="volver-chispa"
          d="M 82 14 C 83 19, 87 23, 92 24 C 87 25, 83 29, 82 34 C 81 29, 77 25, 72 24 C 77 23, 81 19, 82 14 Z"
        />
      </svg>
      <span className="volver-texto">Volver al inicio</span>
    </Link>
  );
}
