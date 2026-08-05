import Link from "next/link";

/**
 * Vuelta al inicio desde cualquier página interna.
 *
 * Deliberadamente tipográfico y no un botón flotante: la página es editorial y
 * un control circular pegado en una esquina sería un elemento ajeno al sistema.
 * Usa la misma mono en versalitas que las etiquetas de sección, y la flecha se
 * desplaza con la curva del subrayado del menú, así el gesto se siente parte de
 * la misma familia.
 */
export default function VolverAlInicio() {
  return (
    <Link href="/" className="volver">
      <span className="volver-flecha" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
      </span>
      Volver al inicio
    </Link>
  );
}
