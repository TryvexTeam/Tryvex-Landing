/* La convención de archivo de Next asocia `opengraph-image` solo a su propio
   segmento: el que vive en `src/app/` cubría únicamente el home, y las siete
   páginas internas salían compartidas sin imagen. Reexportar la del raíz las
   registra en esta ruta sin duplicar el diseño. */
export { default, alt, size, contentType } from "../opengraph-image";
