/**
 * Definiciones SVG de la estrella de marca, montadas una sola vez en el layout.
 *
 * Antes cada página declaraba su propio `<defs>` con estos dos `<symbol>`. El
 * problema no era la repetición sino la dependencia invisible: los doce
 * `<use href="#spark">` del sitio —incluido el del `NavBar`, que se renderiza
 * en todas las rutas— sólo pintan si la página que los contiene se acordó de
 * declarar el `<defs>`. Una ruta nueva que lo olvidara mostraba el logo vacío,
 * sin error en consola ni fallo de build.
 *
 * Al vivir en el layout, la dependencia deja de existir.
 */
export default function SparkDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="spark" viewBox="0 0 100 100">
          <path d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z" fill="#0e0e0e"/>
          <path d="M 82 14 C 83 19, 87 23, 92 24 C 87 25, 83 29, 82 34 C 81 29, 77 25, 72 24 C 77 23, 81 19, 82 14 Z" fill="#e53935"/>
        </symbol>
        <symbol id="spark-light" viewBox="0 0 100 100">
          <path d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z" fill="#f4f1ea"/>
          <path d="M 82 14 C 83 19, 87 23, 92 24 C 87 25, 83 29, 82 34 C 81 29, 77 25, 72 24 C 77 23, 81 19, 82 14 Z" fill="#e53935"/>
        </symbol>
      </defs>
    </svg>
  );
}
