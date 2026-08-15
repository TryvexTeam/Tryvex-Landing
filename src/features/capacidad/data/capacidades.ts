/**
 * Mapa de capacidades — el "qué podemos hacer" completo.
 *
 * Complementa a los tres servicios del home, que son la puerta de entrada
 * comercial. Este bloque existe porque un visitante que llega con un problema
 * fuera de esos tres titulares se iba sin saber que también lo cubrimos.
 *
 * Las familias y sus `slug` son las mismas de `/servicios`: cada grupo enlaza
 * a su sección allá. Si se renombra una familia en esa página, se renombra
 * acá — el enlace roto no lo detecta ni el build ni el lint.
 */

export type Familia = {
  slug: string;
  titulo: string;
  intencion: string;
  capacidades: string[];
};

export const FAMILIAS: Familia[] = [
  {
    slug: "automatizacion",
    titulo: "Sacar el trabajo repetitivo del día",
    intencion: "Automatización de procesos",
    capacidades: [
      "Flujos a medida entre tus herramientas actuales",
      "Facturación electrónica SII y sincronización de inventario",
      "Atención y agendamiento por WhatsApp",
      "Panel de control con logs y alertas",
    ],
  },
  {
    slug: "productos",
    titulo: "Reemplazar la planilla por un producto",
    intencion: "Productos a medida",
    capacidades: [
      "MVP completo: frontend, backend, auth y despliegue",
      "Paneles internos con roles y permisos",
      "Portales de cliente con documentos y estado",
      "Migración de datos desde planillas y sistemas viejos",
    ],
  },
  {
    slug: "ia",
    titulo: "Poner un modelo a trabajar de verdad",
    intencion: "Inteligencia aplicada",
    capacidades: [
      "Agentes conectados a tus sistemas, con trazabilidad de cada acción",
      "Clasificación y redacción automática de documentos y correos",
      "Búsqueda sobre tu propia documentación",
      "Modelos corriendo en tu infraestructura cuando el dato es sensible",
    ],
  },
  {
    slug: "presencia-digital",
    titulo: "Que te encuentren y te entiendan",
    intencion: "Presencia digital",
    capacidades: [
      "Landings y sitios con SEO técnico desde el día uno",
      "Copy y diseño enfocados en conversión",
      "Medición real: eventos, embudos y A/B testing",
      "Rendimiento 90+ en Core Web Vitals",
    ],
  },
];
