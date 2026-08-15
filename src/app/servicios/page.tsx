import type { Metadata } from "next";
import type { ReactElement } from "react";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import RevelarAlScroll from "../../components/RevelarAlScroll";
import SiteFooter from "../../components/SiteFooter";
import ServiciosMotion from "./ServiciosMotion";
import InteligenciaModelos from "../../features/capacidad/components/InteligenciaModelos";
import "../../features/capacidad/capacidad.css";

export const metadata: Metadata = {
  title: "Servicios — Tryvex",
  description: "Presencia digital, automatización de procesos, productos a medida e inteligencia aplicada. Precio y plazo cerrados desde el primer día.",
  alternates: { canonical: "https://www.tryvex.tech/servicios" },
  openGraph: {
    title: "Servicios — Tryvex",
    description: "Catálogo completo con precio y plazo cerrados. Sin letra chica.",
    url: "https://www.tryvex.tech/servicios",
    locale: "es_CL",
    type: "website",
  },
};

const ICONS: Record<string, ReactElement> = {
  monitor: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 14h5" /></svg>,
  flow: <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h10M4 17h7" /><circle cx="20" cy="17" r="2" /></svg>,
  link: <svg viewBox="0 0 24 24"><path d="M9 15l6-6M8 12l-3 3a3 3 0 004 4l3-3M16 12l3-3a3 3 0 00-4-4l-3 3" /></svg>,
  chat: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  cube: <svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M5 7l14 10M19 7L5 17" /></svg>,
  panel: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>,
  key: <svg viewBox="0 0 24 24"><circle cx="8" cy="15" r="4" /><path d="M10.5 12.5L20 3M17 6l3 3M14 9l2 2" /></svg>,
  brain: <svg viewBox="0 0 24 24"><path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 4a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3M9 4v16M15 4v16" /></svg>,
};

type Servicio = {
  num: string;
  familia: string;
  nombre: string;
  h2: string;
  desc: string;
  bullets: string[];
  plazo: string;
  precio: string;
  icon: keyof typeof ICONS;
  /** Override del texto de mantención. Si no se define, usa el genérico $49.000/mes. */
  mantencion?: string;
  /** Versión corta para el chip junto al precio. Si no se define, usa "$49.000/mes". */
  mantencionCorta?: string;
};

const FAMILIAS: { slug: string; titulo: string; nota: string; servicios: Servicio[] }[] = [
  {
    slug: "presencia-digital",
    titulo: "Presencia digital",
    nota: "Sitios y landings que convierten, no que decoran.",
    servicios: [
      {
        num: "01",
        familia: "Presencia digital",
        nombre: "Landing esencial",
        h2: "Una página, un formulario, métricas desde el día uno.",
        desc: "Puerta de entrada: diseño, copy y despliegue en una semana. Sin plantillas.",
        bullets: ["Diseño y copy enfocado en conversión", "SEO técnico desde el día uno", "Tracking de conversiones", "Performance 90+ en Core Web Vitals"],
        plazo: "7 días hábiles",
        precio: "desde $150.000",
        icon: "monitor",
        mantencion: "+ desde $20.000/mes de mantención (primeros 90 días sin costo)",
        mantencionCorta: "$20.000/mes",
      },
      {
        num: "02",
        familia: "Presencia digital",
        nombre: "Landing avanzada",
        h2: "Multipágina, animación, contenido editable.",
        desc: "Para negocios que necesitan más de una página y quieren editar contenido sin depender de un dev.",
        bullets: ["Múltiples secciones y rutas", "Animación e interacción a medida", "Contenido editable", "A/B testing y mejora continua"],
        plazo: "3 semanas",
        precio: "desde $650.000",
        icon: "monitor",
        mantencion: "+ desde $49.000/mes de mantención (primeros 90 días sin costo)",
      },
    ],
  },
  {
    slug: "automatizacion",
    titulo: "Automatización de procesos",
    nota: "El trabajo repetitivo, resuelto. Desde un pedido hasta una factura firmada.",
    servicios: [
      {
        num: "03",
        familia: "Automatización",
        nombre: "Automatización de un proceso",
        h2: "Un flujo, hasta 3 integraciones.",
        desc: "El proceso concreto que te hace abrir la planilla todos los días, resuelto y corriendo solo.",
        bullets: ["Ingeniería propia primero; n8n o Zapier cuando conviene", "Hasta 3 integraciones", "Logs y alertas", "Mantención primeros 90 días sin costo"],
        plazo: "2 semanas",
        precio: "desde $450.000",
        icon: "flow",
      },
      {
        num: "04",
        familia: "Automatización",
        nombre: "Automatización operativa",
        h2: "Varios flujos, panel de control.",
        desc: "Cuando ya no es un proceso, es la operación completa la que necesita conectarse.",
        bullets: ["Múltiples flujos coordinados", "Panel de control en tiempo real", "Alertas y logs centralizados", "Conexión con Shopify, Bsale, Mercado Libre y más"],
        plazo: "4 semanas",
        precio: "desde $1.200.000",
        icon: "flow",
      },
      {
        num: "05",
        familia: "Automatización",
        nombre: "Integración con sistemas chilenos",
        h2: "SII, Bsale, Shopify, Mercado Libre.",
        desc: "Conectamos tus herramientas locales entre sí, sin depender de exportar planillas a mano.",
        bullets: ["Facturación electrónica SII", "Sincronización de inventario y ventas", "Panel con estado en tiempo real", "Fase de validación antes de comprometer alcance"],
        plazo: "3 semanas",
        precio: "desde $850.000",
        icon: "link",
      },
      {
        num: "06",
        familia: "Automatización",
        nombre: "Atención automatizada por WhatsApp",
        h2: "Responde, agenda y deriva sin que nadie esté pegado al teléfono.",
        desc: "Flujo conversacional conectado a tu calendario, tu catálogo o tu sistema de tickets.",
        bullets: ["Respuestas y agendamiento automático", "Derivación a humano cuando corresponde", "Conexión con Google Calendar y CRM", "Métricas de conversación"],
        plazo: "3 semanas",
        precio: "desde $900.000",
        icon: "chat",
      },
    ],
  },
  {
    slug: "productos",
    titulo: "Productos a medida",
    nota: "Cuando una hoja de cálculo dejó de alcanzar.",
    servicios: [
      {
        num: "07",
        familia: "Productos a medida",
        nombre: "Producto a medida (MVP)",
        h2: "Frontend, backend, autenticación y despliegue completo.",
        desc: "Producto interno o de mercado desde cero, con stack moderno y CI/CD incluido.",
        bullets: ["Stack: Next.js, TypeScript, PostgreSQL", "Autenticación, roles y panel de administración", "Despliegue en producción con CI/CD", "Soporte mensual opcional post-entrega"],
        plazo: "8 semanas",
        precio: "desde $2.800.000",
        icon: "cube",
        mantencion: "Si es un SaaS que monetizas: 5% mensual de lo que factura (piso $150.000), en vez de mantención fija — mientras alojamos tu infraestructura.",
        mantencionCorta: "5% si es SaaS",
      },
      {
        num: "08",
        familia: "Productos a medida",
        nombre: "Panel interno / dashboard",
        h2: "Operación visible en un solo lugar.",
        desc: "El panel que reemplaza la planilla compartida y el reporte armado a mano cada semana.",
        bullets: ["Métricas y estado en tiempo real", "Roles y permisos por usuario", "Exportación de reportes", "Diseño pensado para uso diario"],
        plazo: "4 semanas",
        precio: "desde $1.400.000",
        icon: "panel",
      },
      {
        num: "09",
        familia: "Productos a medida",
        nombre: "Portal de clientes",
        h2: "Acceso, estado y documentos, sin correos de ida y vuelta.",
        desc: "Un lugar donde tu cliente ve el estado de su proyecto o pedido sin tener que preguntarte.",
        bullets: ["Acceso con autenticación propia", "Estado y documentos centralizados", "Notificaciones automáticas", "Panel de administración incluido"],
        plazo: "5 semanas",
        precio: "desde $2.200.000",
        icon: "key",
      },
    ],
  },
  {
    slug: "ia",
    titulo: "Inteligencia aplicada",
    nota: "Agentes y asistentes conectados a tus sistemas reales, no una demo.",
    servicios: [
      {
        num: "10",
        familia: "Inteligencia aplicada",
        nombre: "Agente de IA aplicada",
        h2: "Clasifica, redacta y consulta tus sistemas.",
        desc: "Un agente que hace trabajo dentro de tu operación real: lee tickets, redacta respuestas, consulta tu base de datos.",
        bullets: ["Conectado a tus sistemas actuales", "Clasificación y redacción automática", "Trazabilidad de cada acción", "Fase de validación antes del alcance final"],
        plazo: "4 semanas",
        precio: "desde $1.600.000",
        icon: "brain",
      },
    ],
  },
];

const COMPARADOR: { criterio: string; tryvex: string; agencia: string; nocode: string }[] = [
  { criterio: "Quién escribe el código", tryvex: "Ingenieros propios", agencia: "Ingenieros propios", nocode: "Nadie — plantillas y conectores" },
  { criterio: "Precio y plazo", tryvex: "Cerrados antes de partir", agencia: "Cerrados, con letra chica", nocode: "Bajo, pero sube con cada add-on" },
  { criterio: "Dueño del código", tryvex: "El cliente, siempre", agencia: "El cliente", nocode: "La plataforma — no te lo llevas" },
  { criterio: "Agentes de IA conectados a tus sistemas", tryvex: "Sí, hecho a medida", agencia: "Depende del equipo", nocode: "Solo lo que el plugin permita" },
  { criterio: "Mantención después de la entrega", tryvex: "90 días sin costo, luego plan claro", agencia: "Variable", nocode: "Incluida, pero no puedes migrar" },
];

const EXPLORACION = [
  {
    nombre: "Sprint de diagnóstico",
    desc: "Qué se puede automatizar en tu negocio y cuánto rinde. Entregable propio, aunque no sigas con nosotros.",
    plazo: "1 semana",
    precio: "$450.000",
  },
  {
    nombre: "Prueba de concepto",
    desc: "El problema difícil, resuelto en pequeño, antes de comprometer un proyecto completo.",
    plazo: "2 semanas",
    precio: "$900.000",
  },
];

export default function ServiciosPage() {
  return (
    <>
      <div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
      <div className="grain"></div>

      <NavBar />
      <RevelarAlScroll />
      <ServiciosMotion />

      <main id="contenido" tabIndex={-1}>
        <section className="hero" style={{ paddingBottom: "0" }}>
          <div className="wrap" style={{ maxWidth: "800px", paddingTop: "34px", paddingBottom: "60px" }}>
            <span className="eyebrow" data-anim="fade-down"><span className="sec-num">01</span><span className="sec-label">Servicios</span></span>
            <h1 data-anim="fade-up" style={{ marginTop: "16px" }}>Precio y plazo <em>cerrados</em>, desde el primer día.</h1>
            <p className="lede" data-anim="fade-up" style={{ maxWidth: "620px" }}>
              Cada servicio se entrega como sistema vivo: deploy continuo, monitoreo y mantención incluida los primeros 90 días. Sin contratos a largo plazo.
            </p>
            <p style={{ color: "var(--muted)", fontSize: "13.5px", marginTop: "12px" }} data-anim="fade-up">
              Precios base. Se ajustan según componentes que pidas (más páginas, integraciones, e-commerce, etc.),
              siempre cotizado antes de partir. Se paga 50% al iniciar y 50% contra entrega.
            </p>

            <nav className="servicios-jump" aria-label="Saltar a una familia de servicios" data-anim="fade-up">
              {FAMILIAS.map((f) => (
                <a key={f.slug} href={`#${f.slug}`}>{f.titulo}</a>
              ))}
            </nav>
          </div>
        </section>

        {FAMILIAS.filter((f) => f.titulo !== "Inteligencia aplicada").map((familia, fi) => (
          <section className="block" id={familia.slug} key={familia.titulo} style={{ paddingTop: fi === 0 ? "0" : undefined, scrollMarginTop: "100px" }}>
            <div className="wrap">
              <div style={{ marginBottom: "28px" }} data-anim="fade-up">
                <h2 style={{ fontSize: "1.6rem" }}>{familia.titulo}</h2>
                <p style={{ color: "var(--muted)", marginTop: "6px" }}>{familia.nota}</p>
              </div>

              <div className="services" data-stagger style={{ marginTop: "0" }}>
                {familia.servicios.map((s) => (
                  <div className="svc glass" key={s.num}>
                    <div className="svc-head">
                      <div className="svc-num">{s.num} — {s.nombre}</div>
                      <div className="svc-icon">{ICONS[s.icon]}</div>
                    </div>
                    <h2 style={{ fontSize: "1.4rem" }}>{s.h2}</h2>

                    <div className="svc-price-row">
                      <strong>{s.precio}</strong>
                      <span className="svc-plazo">{s.plazo}</span>
                      <span className="svc-mant-chip" title={s.mantencion ?? "+ desde $49.000/mes de mantención (primeros 90 días sin costo)"}>{s.mantencionCorta ?? "$49.000/mes"} mantención</span>
                    </div>

                    <p>{s.desc}</p>
                    <ul className="svc-list">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Spotlight — Inteligencia aplicada es el diferenciador real (ver
            docs/negocio/arquitectura-de-servicios.md §3): pesa distinto de
            las demás familias, así que se muestra distinto: mock de flujo en
            vez de tarjeta de catálogo, mismo lenguaje visual que el hero.

            El `id` es el slug de su familia en FAMILIAS: la nav de salto de
            arriba la enlaza igual que a las otras tres, y sin el id ese ítem
            no llevaba a ninguna parte — el filtro que la saca de la grilla no
            la saca de la navegación. */}
        <section className="block" id="ia" style={{ scrollMarginTop: "100px" }}>
          <div className="wrap">
            <div style={{ marginBottom: "28px" }} data-anim="fade-up">
              <span className="eyebrow"><span className="sec-num">04</span><span className="sec-label">Inteligencia aplicada</span></span>
              <h2 style={{ fontSize: "1.6rem", marginTop: "12px" }}>Agentes que hacen trabajo real, no una demo.</h2>
              <p style={{ color: "var(--muted)", marginTop: "6px", maxWidth: "560px" }}>Conectados a tus sistemas reales, no una demo. Es lo que más pesa cuando nos comparan con consultoras grandes.</p>
            </div>

            <div className="hero-grid" data-anim="scale-in">
              <div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "12px" }}>Clasifica, redacta y consulta tus sistemas.</h3>
                <p style={{ color: "var(--muted)", marginBottom: "20px" }}>Un agente que hace trabajo dentro de tu operación real: lee tickets, redacta respuestas, consulta tu base de datos.</p>
                <ul className="svc-list" style={{ marginBottom: "24px" }}>
                  <li>Conectado a tus sistemas actuales</li>
                  <li>Clasificación y redacción automática</li>
                  <li>Trazabilidad de cada acción</li>
                  <li>Fase de validación antes del alcance final</li>
                </ul>
                <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "24px" }}>
                  <strong style={{ fontSize: "1.3rem" }}>desde $1.600.000</strong>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--muted)" }}>4 semanas</span>
                </div>
                <Link href="/contacto" className="btn-primary">
                  Agendar llamada
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>

              <div className="hero-visual glass">
                <svg className="hv-spark"><use href="#spark" /></svg>
                <div className="hv-rule">{"// agente-tryvex-10.run"}</div>
                <div className="hv-title">Consulta entra → agente clasifica, responde y deriva.</div>
                <div className="hv-flow">
                  <div className="hv-step"><span className="dot"></span><span className="lbl">Trigger · mensaje recibido</span><span className="meta">00:00.0s</span></div>
                  <div className="hv-step"><span className="dot"></span><span className="lbl">Clasificar con modelo propio</span><span className="meta">00:01.2s</span></div>
                  <div className="hv-step active"><span className="dot"></span><span className="lbl">Responder o derivar a humano</span><span className="meta">00:02.8s</span></div>
                  <div className="hv-step"><span className="dot"></span><span className="lbl">Registrar en CRM</span><span className="meta">— pendiente</span></div>
                </div>
                <div className="hv-foot">
                  <div>agente ID · 0x4af2</div>
                  <div className="ok">Sistema activo</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Panorama de modelos. Vivía en el home, donde caía pasado el píxel
            6.600 —territorio de atención marginal según las mediciones de
            scroll— y alargaba el camino a la llamada. Acá está el público que
            sí lo necesita: quien ya está comparando proveedores. Va justo
            después del spotlight de IA porque responde su pregunta siguiente:
            "¿con qué modelos, exactamente?". */}
        <section className="block" id="modelos" style={{ scrollMarginTop: "100px" }}>
          <div className="wrap">
            <InteligenciaModelos />
          </div>
        </section>

        {/* Comparador — sin nombrar competidores, solo la estructura de la
            decisión: por qué "hecho a medida" gana contra plantilla o
            no-code cuando el negocio ya pasó cierto tamaño. */}
        <section className="block">
          <div className="wrap">
            <div style={{ marginBottom: "28px" }} data-anim="fade-up">
              <h2 style={{ fontSize: "1.6rem" }}>¿En qué se nota la diferencia?</h2>
              <p style={{ color: "var(--muted)", marginTop: "6px", maxWidth: "620px" }}>No competimos en quién cobra menos. Competimos en qué te queda cuando el proyecto termina.</p>
            </div>
            <div className="compare-wrap glass" data-anim="fade-up">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th></th>
                    <th className="compare-tryvex">Tryvex</th>
                    <th>Agencia tradicional</th>
                    <th>Plataforma no-code</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARADOR.map((row) => (
                    <tr key={row.criterio}>
                      <td className="compare-criterio">{row.criterio}</td>
                      <td className="compare-tryvex">{row.tryvex}</td>
                      <td>{row.agencia}</td>
                      <td>{row.nocode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="block">
          <div className="wrap">
            <div style={{ marginBottom: "28px" }} data-anim="fade-up">
              <h2 style={{ fontSize: "1.6rem" }}>¿Territorio nuevo para los dos?</h2>
              <p style={{ color: "var(--muted)", marginTop: "6px", maxWidth: "620px" }}>
                Cuando el problema no calza en el catálogo, no lo cotizamos como proyecto cerrado —
                lo exploramos primero, con un entregable propio. Si sigues con nosotros, el monto se descuenta del proyecto.
              </p>
            </div>
            <div className="offer" data-stagger>
              {EXPLORACION.map((e) => (
                <div className="plan glass" key={e.nombre}>
                  <h2 style={{ fontSize: "1.4rem" }}>{e.nombre}</h2>
                  <p className="desc">{e.desc}</p>
                  <div className="plan-price" style={{ fontSize: "2rem" }}>{e.precio}<small>{e.plazo}</small></div>
                  <Link href="/contacto" className="btn-primary">
                    Agendar llamada
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "64px", paddingBottom: "40px" }}>
              <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
                ¿No sabes por cuál empezar? Conversamos 20 minutos y te decimos qué tiene más impacto para tu negocio.
              </p>
              <Link href="/contacto" className="btn-primary">
                Agendar llamada gratuita
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
