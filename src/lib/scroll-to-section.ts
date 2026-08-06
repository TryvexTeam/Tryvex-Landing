/** Alto del nav flotante, para no dejar el título pegado al borde. */
const OFFSET_NAV = 100;

/**
 * Lleva la vista a una sección por id.
 *
 * Si la sección vive dentro de una escena animada por scroll (`[data-scene]`),
 * su contenido se revela progresivamente a medida que bajas: aterrizar en el
 * borde superior te deja en el fotograma 0, con el contenido invisible y varios
 * cientos de píxeles de scroll por delante. En ese caso saltamos directo al
 * final de la escena —donde la animación ya terminó— y sin transición: no tiene
 * sentido animar un recorrido cuyo único propósito es saltárselo.
 *
 * Para secciones normales se mantiene el scroll suave de siempre.
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const escena = el.closest("[data-scene]") as HTMLElement | null;

  if (escena) {
    const caja = escena.getBoundingClientRect();
    const finDeEscena = caja.top + window.scrollY + caja.height - window.innerHeight;
    /* Scroll suave, pero al FINAL de la escena y no a su borde superior.
       El problema original no era la animación sino el punto de llegada: al
       aterrizar en el borde de arriba quedabas en el fotograma 0, con el
       contenido invisible y cientos de píxeles por delante. Yendo al final se
       ve la escena armarse durante el viaje y se llega con todo montado. */
    window.scrollTo({ top: Math.max(0, finDeEscena), behavior: "smooth" });
    return;
  }

  const destino = el.getBoundingClientRect().top + window.scrollY - OFFSET_NAV;
  window.scrollTo({ top: Math.max(0, destino), behavior: "smooth" });
}
