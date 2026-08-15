/**
 * Link de contacto para el sitio (no para los emails transaccionales que
 * salen de `api/contact` y `api/reminders` — esos sí usan `mailto:`, porque
 * los abre el cliente de correo real del destinatario).
 *
 * `mailto:` depende de que el navegador tenga un handler registrado, y en
 * Chrome/Edge sin configurar eso no pasa nada al hacer clic — parece un botón
 * roto sin serlo. El compose de Gmail web funciona en cualquier navegador sin
 * configuración previa.
 */
export const CONTACTO_HREF = "https://mail.google.com/mail/?view=cm&fs=1&to=tryvexentreprise@gmail.com";
