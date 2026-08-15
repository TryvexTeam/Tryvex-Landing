/**
 * Punto de salida hacia la llamada.
 *
 * Existe porque el home pasaba del hero (6% del scroll) a la oferta (65%) sin
 * un solo punto de conversión en el cuerpo: ocho pantallas en las que quien ya
 * estaba convencido tenía que volver arriba para actuar. La recomendación
 * repetida en las guías de páginas B2B de servicios es repetir **el mismo**
 * CTA después de cada bloque que persuade —no CTAs distintos compitiendo—, y
 * los análisis de botones muestran que las páginas con una sola acción
 * primaria puntúan bastante mejor que las que ofrecen tres.
 *
 * Por eso este componente no acepta un `href`: todos los ejemplares apuntan a
 * `#final`, el mismo destino que el hero y la oferta. Lo único que cambia es
 * la frase que lo antecede, que retoma el bloque recién leído.
 */
export default function SalidaCTA({ texto }: { texto: string }) {
  return (
    <div className="salida" data-anim="fade-up">
      <p className="salida-txt">{texto}</p>
      <a href="#final" className="btn-primary">
        Agenda una llamada de 20 min
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  );
}
