import { WHATSAPP_NUMBER } from "../catalogo/data";

/**
 * Fuente única de lo que aparece en /links.
 *
 * Cambiar el orden de este arreglo cambia el orden de la página y la
 * numeración: los `01`, `02`… se derivan del índice, no se escriben a mano.
 * Nadie tiene que acordarse de renumerar al insertar una fila.
 */

/* Handles confirmados por el señor Ignacio el 2026-08-19. Los tres perfiles
   usan el mismo identificador salvo el prefijo que exige cada red, así que
   sale de una sola constante: cambiarlo en un sitio los cambia todos.

   Cuando exista la página de empresa en LinkedIn hay que actualizar también
   `sameAs` en `layout.tsx`, que es lo que une la entidad para un buscador. */
const HANDLE = "tryvex.tech";

export type Enlace = {
  nombre: string;
  /** Lo que se lee a la derecha de la fila: handle, número o ruta. */
  meta: string;
  href: string;
  /** Externo = se abre en pestaña nueva con `rel="noopener"`. */
  externo: boolean;
};

export const ENLACES: Enlace[] = [
  {
    nombre: "Instagram",
    meta: `@${HANDLE}`,
    href: `https://www.instagram.com/${HANDLE}/`,
    externo: true,
  },
  {
    nombre: "LinkedIn",
    meta: "tryvex-tech",
    href: "https://www.linkedin.com/in/tryvex-tech/",
    externo: true,
  },
  {
    nombre: "TikTok",
    meta: `@${HANDLE}`,
    href: `https://www.tiktok.com/@${HANDLE}`,
    externo: true,
  },
  {
    nombre: "WhatsApp",
    meta: "+56 9 5035 8818",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    externo: true,
  },
  { nombre: "Catálogo", meta: "/catalogo", href: "/catalogo", externo: false },
  { nombre: "Servicios", meta: "/servicios", href: "/servicios", externo: false },
  { nombre: "Planes", meta: "/planes", href: "/planes", externo: false },
  { nombre: "Agendar", meta: "30 min", href: "/contacto", externo: false },
];
