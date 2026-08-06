/**
 * Escapa texto que viene de fuera antes de interpolarlo en el HTML de un correo.
 *
 * Las plantillas de `/api/contact` y `/api/reminders` se arman con template
 * strings: el `name` o el `message` que escribe un visitante entraban crudos al
 * markup. Un correo no ejecuta scripts, pero sí permite inyectar etiquetas y
 * enlaces — basta para falsificar el contenido del aviso que le llega al equipo.
 */
export function escaparHtml(valor: string) {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
