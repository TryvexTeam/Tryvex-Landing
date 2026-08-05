import React from "react";
import NavBar from "../components/NavBar";
import LandingClient from "../features/landing/components/LandingClient";
import FinalCTA from "../features/landing/components/FinalCTA";
import { demosPublicadas } from "../features/catalogo/data";
import "../features/catalogo/catalogo.css";

/** Preview del catálogo: las primeras demos publicadas. El resto vive en /catalogo. */
const demosPreview = demosPublicadas.slice(0, 3);

const HOME_LINKS = [
  { href: "#services", label: "Servicios"  },
  { href: "/catalogo", label: "Catálogo", section: "catalogo" },
  { href: "#process",  label: "Proceso"    },
  { href: "#offer",    label: "Planes"     },
  { href: "#faq",      label: "Preguntas"  },
  { href: "/team",     label: "Equipo"     },
];

type Stats = {
  businesses: number;
  leads_identificados: number;
  ultima_ejecucion: string | null;
};

async function fetchStats(): Promise<Stats> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/stats`, { next: { revalidate: 3600 } });
    if (!res.ok) return { businesses: 14, leads_identificados: 847, ultima_ejecucion: null };
    return (await res.json()) as Stats;
  } catch {
    return { businesses: 14, leads_identificados: 847, ultima_ejecucion: null };
  }
}

export default async function Home() {
  const stats = await fetchStats();
  const { businesses, leads_identificados } = stats;
  return (
    <>

﻿<div className="scroll-progress"></div>
<div className="ambient"><div className="b1"></div><div className="b2"></div><div className="b3"></div><div className="b4"></div></div>
<div className="grain"></div>

<svg width="0" height="0" style={{position: "absolute"}} aria-hidden="true">
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

{/* NAV */}
<NavBar
  links={HOME_LINKS}
  ctaHref="#final"
/>

{/* HERO */}
<section className="hero">
  <div className="hero-aurora" aria-hidden="true"><div className="a1"></div><div className="a2"></div><div className="a3"></div></div>
  {/* Scene A — floating spark pieces, scattered by GSAP ScrollTrigger scrub */}
  <svg className="scene-piece sa-p1" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z" fill="var(--red)"/>
  </svg>
  <svg className="scene-piece sa-p2" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z" fill="var(--ink)"/>
  </svg>
  <svg className="scene-piece sa-p3" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z" fill="var(--red)"/>
    <path d="M 82 14 C 83 19, 87 23, 92 24 C 87 25, 83 29, 82 34 C 81 29, 77 25, 72 24 C 77 23, 81 19, 82 14 Z" fill="var(--ink)"/>
  </svg>
  <svg className="scene-piece sa-p4" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z" fill="var(--muted-2)"/>
  </svg>
  <svg className="scene-piece sa-p5" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z" fill="var(--red)"/>
  </svg>
  <svg className="scene-piece sa-p6" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z" fill="var(--ink)"/>
  </svg>
  <div className="wrap hero-grid">
    <div className="hero-col">
      <span className="eyebrow" data-anim="fade-down"><span className="live"></span> Atendiendo a {businesses} negocios · Santiago, CL</span>
      <h1 data-split="words">Automatizamos lo aburrido. Tú vendes <em>lo importante.</em></h1>
      <p className="lede" data-anim="fade-up">
        Tryvex es un studio de software que diseña, construye y mantiene <a href="/servicios">automatizaciones,
        landing pages y SaaS a medida</a>. Reemplazamos la planilla, el copy-paste y el
        "lo veo después" con sistemas que corren solos. Conoce <a href="/proceso">cómo trabajamos</a> o <a href="/contacto">agenda una llamada gratuita</a>.
      </p>
      <div className="hero-cta" data-anim="fade-up">
        <a href="#final" className="btn-primary">
          Agenda una llamada de 20 min
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <a href="#process" className="btn-ghost">Ver cómo trabajamos →</a>
      </div>
      <div className="hero-meta" data-anim="fade-up">
        <div><strong>{businesses}</strong> · proyectos activos</div>
        <div><strong>3d</strong> · primer entregable</div>
        <div><strong>0</strong> · contratos atados</div>
      </div>
    </div>

    <div style={{position: "relative"}} data-anim="scale-in">
      <div className="float-chip glass strong fc-1" data-parallax style={{"--p-amt": "-20px"} as React.CSSProperties}>
        <div className="ic" style={{background: "var(--red)"}}>S</div>
        <div>
          <div style={{fontWeight: "600", fontSize: "13px"}}>Pedido nuevo · Shopify</div>
          <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted)", letterSpacing: "0.06em"}}>Hace 3 segundos · webhook</div>
        </div>
      </div>

      <div className="hero-visual glass">
        <svg className="hv-spark"><use href="#spark"/></svg>
        <div className="hv-rule">// flow-tryvex-04.run</div>
        <div className="hv-title">Pedido nuevo en Shopify → factura, agenda y notificación.</div>
        <div className="hv-flow">
          <div className="hv-step"><span className="dot"></span><span className="lbl">Trigger · pedido recibido</span><span className="meta">00:00.0s</span></div>
          <div className="hv-step"><span className="dot"></span><span className="lbl">Crear factura · SII Chile</span><span className="meta">00:01.2s</span></div>
          <div className="hv-step active"><span className="dot"></span><span className="lbl">Agendar despacho · Calendar</span><span className="meta">00:02.8s</span></div>
          <div className="hv-step"><span className="dot"></span><span className="lbl">Notificar cliente · WhatsApp</span><span className="meta">— pendiente</span></div>
        </div>
        <div className="hv-foot">
          <div>flow ID · 0x4af2</div>
          <div className="ok">Sistema activo</div>
        </div>
      </div>

      <div className="float-chip glass strong fc-2" data-parallax style={{"--p-amt": "20px"} as React.CSSProperties}>
        <div className="ic" style={{background: "var(--red)"}}>↑</div>
        <div>
          <div style={{fontWeight: "600", fontSize: "13px"}}>+312h ahorradas este mes</div>
          <div style={{fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "var(--muted)", letterSpacing: "0.06em"}}>vs. operación manual</div>
        </div>
      </div>
    </div>
  </div>

  {/* strip removido — nombres de clientes se reservan por confidencialidad */}
</section>

{/* MANIFESTO */}
<section className="manifesto-break">
  <div className="wrap">
    <p className="manifesto-line" data-anim="fade-up">
      Dale el <em>brillo</em> que le falta<br/>a tu negocio. Con nosotros.
    </p>
  </div>
</section>

{/* SERVICES */}
<section className="block" id="services">
  <div className="wrap">
    <div className="sec-head">
      <div>
        <div className="sec-tag" data-anim="fade-down">01 · Servicios</div>
        <h2 data-split="words">Tres formas de <em>sacar trabajo</em> de tu cabeza.</h2>
      </div>
      <p className="sec-sub" data-anim="fade-up">Cada uno se entrega como sistema vivo: deploy continuo, monitoreo y mantención incluida los primeros 90 días.</p>
    </div>

    <div className="services" data-stagger>
      <div className="svc glass dark">
        <div className="svc-head">
          <div className="svc-num">01 — Automatización</div>
          <div className="svc-icon"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h10M4 17h7"/><circle cx="20" cy="17" r="2"/></svg></div>
        </div>
        <h3>Procesos que corren mientras duermes.</h3>
        <p>Desde un pedido en Shopify hasta una factura SII firmada. Conectamos tus herramientas con flujos hechos a medida que reemplazan trabajo manual.</p>
        <ul className="svc-list">
          <li>Integraciones SII / WhatsApp / Calendar</li>
          <li>Workflows con <a href="https://n8n.io" target="_blank" rel="noopener noreferrer">n8n</a>, <a href="https://zapier.com" target="_blank" rel="noopener noreferrer">Zapier</a> o código propio</li>
          <li>Logs, alertas y panel de control</li>
        </ul>
        <p className="svc-industries">Usado por restaurantes, automotoras y farmacias</p>
      </div>
      <div className="svc glass">
        <div className="svc-head">
          <div className="svc-num">02 — Landing pages</div>
          <div className="svc-icon"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14h5"/></svg></div>
        </div>
        <h3>Páginas que cargan rápido y convierten.</h3>
        <p>Diseño + copy + ingeniería en una semana. Sin Wix, sin plantillas. Hechas para captar y medir, no para verse bonitas en un demo.</p>
        <ul className="svc-list">
          <li>Diseño y copy estratégico</li>
          <li>Tracking de conversiones de salida</li>
          <li>A/B testing y mejora continua</li>
        </ul>
        <p className="svc-industries">E-commerce, servicios locales, consultoras</p>
      </div>
      <div className="svc glass">
        <div className="svc-head">
          <div className="svc-num">03 — SaaS a medida</div>
          <div className="svc-icon"><svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M5 7l14 10M19 7L5 17"/></svg></div>
        </div>
        <h3>Producto interno o de mercado, sin ruedas.</h3>
        <p>Cuando una hoja de cálculo dejó de alcanzar. Construimos producto desde cero — frontend, backend, autenticación y despliegue.</p>
        <ul className="svc-list">
          <li>MVPs en 4 a 8 semanas</li>
          <li>Stack moderno: Next.js + Postgres</li>
          <li>Soporte mensual opcional</li>
        </ul>
        <p className="svc-industries">Gestión interna, reservas, facturación</p>
      </div>
    </div>
  </div>
</section>

{/* CATÁLOGO — preview de la vitrina completa en /catalogo */}
<section className="block" id="catalogo">
  <div className="wrap">
    <div className="sec-head">
      <div>
        <div className="sec-tag" data-anim="fade-down">02 · Catálogo</div>
        {/* La puntuación va dentro del <em>: si queda suelta tras cerrarlo, el
            splitter de palabras la trata como palabra propia y la coma puede
            saltar sola al inicio de la línea siguiente. */}
        <h2 data-split="words">Véalo funcionando, <em>no en promesas.</em></h2>
      </div>
      <p className="sec-sub" data-anim="fade-up">Cada demo de la vitrina es un proyecto real y navegable. Entre, recórralo y converse con el asistente como si fuera un cliente.</p>
    </div>

    <div className="cat-preview-grid" data-stagger>
      {demosPreview.map((demo) => (
        <article key={demo.id} className="cat-card glass">
          <a
            className="cat-thumb"
            href={demo.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir la demo de ${demo.nicho} en una pestaña nueva`}
          >
            {demo.imagen ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={demo.imagen} alt={`Captura de la demo para ${demo.nicho}`} loading="lazy" />
            ) : (
              <span className="cat-thumb-fallback">{demo.nicho}</span>
            )}
            <span className="cat-tag">{demo.categoria}</span>
          </a>
          <div className="cat-body">
            <h3>{demo.nicho}</h3>
            <p>{demo.descripcion}</p>
            <div className="cat-actions">
              <a className="btn-ghost" href={demo.demoUrl} target="_blank" rel="noopener noreferrer">
                Ver demo
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>

    <div className="cat-preview-more" data-anim="fade-up">
      <a href="/catalogo" className="btn-primary">
        Ver catálogo completo
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </div>
</section>

{/* PROCESS */}
<section className="block" id="process">
  <div className="wrap">
    <div className="sec-head">
      <div>
        <div className="sec-tag" data-anim="fade-down">03 · Proceso</div>
        <h2 data-split="words">De la idea a producción <em>en cuatro pasos.</em></h2>
      </div>
      <p className="sec-sub" data-anim="fade-up">Sin briefs eternos ni reuniones de status. Conversamos, mapeamos, construimos y entregamos.</p>
    </div>

    <div className="process" data-stagger>
      <div className="step glass">
        <div className="step-num">01</div>
        <h4>Llamada inicial</h4>
        <p>20 minutos. Cuéntanos qué te quita tiempo. Salimos con una hipótesis y un alcance estimado.</p>
        <div className="step-meta">Día 0</div>
      </div>
      <div className="step glass">
        <div className="step-num">02</div>
        <h4>Mapeo del flujo</h4>
        <p>Diagramamos el proceso actual y el ideal. Definimos integraciones, datos y métricas de éxito.</p>
        <div className="step-meta">Día 1–3</div>
      </div>
      <div className="step glass">
        <div className="step-num">03</div>
        <h4>Build & ship</h4>
        <p>Iteramos en sprints cortos. Cada viernes ves un avance funcional, no un mockup en Figma.</p>
        <div className="step-meta">Semana 1–4</div>
      </div>
      <div className="step glass">
        <div className="step-num">04</div>
        <h4>En vivo</h4>
        <p>Lo dejamos corriendo en producción con alertas y soporte. 90 días de mantención sin costo.</p>
        <div className="step-meta">Semana 4+</div>
      </div>
    </div>
  </div>
</section>

{/* METRICS — DARK GLASS */}
<div className="scene-metrics-wrap" data-scene="metrics">
<section className="block">
  <div className="wrap">
    <div className="metrics-block glass dark">
      <div className="sec-tag">04 · Resultados</div>
      <h2 data-split="words">Lo que nuestros clientes <em>dejaron de hacer</em> a mano.</h2>
      <div className="metrics" data-stagger>
        <div className="metric">
          <div className="v">{leads_identificados}<em>+</em></div>
          <div className="l">Empresas mapeadas en Chile</div>
        </div>
        <div className="metric">
          <div className="v">4.7<em>×</em></div>
          <div className="l">Conversión promedio en landings nuevas</div>
        </div>
        <div className="metric">
          <div className="v">98<em>%</em></div>
          <div className="l">SLA de uptime en flujos críticos</div>
        </div>
        <div className="metric">
          <div className="v">{businesses}</div>
          <div className="l">Clientes activos con Tryvex</div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>{/* /scene-metrics-wrap */}

{/* TESTIMONIAL */}
<section className="block">
  <div className="wrap quote-block">
    <div data-anim="fade-right">
      <div className="sec-tag">05 · Lo que dicen</div>
      <p className="quote">Pasamos de revisar pedidos a las 11pm a no abrir la planilla en tres semanas. El equipo de Tryvex entregó algo que de verdad usamos."</p>
      <div className="quote-author">
        <div className="qa-avatar">C</div>
        <div>
          <div className="qa-name">C.M.</div>
          <div className="qa-role">Co-founder · Cliente e-commerce</div>
        </div>
      </div>
    </div>
    <div className="quote-card glass" data-anim="fade-left">
      <div className="qc-rule">// case study · 2026</div>
      <div className="qc-title">E-commerce: tres flujos, un panel, cero planillas.</div>
      <div className="qc-mini">
        <div className="qc-stat">
          <div className="v">−87%</div>
          <div className="l">Tiempo de operación manual</div>
        </div>
        <div className="qc-stat">
          <div className="v">+42%</div>
          <div className="l">Pedidos despachados a tiempo</div>
        </div>
      </div>
      <div className="qc-chart">
        <svg viewBox="0 0 400 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e53935" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#e53935" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,70 L40,65 L80,68 L120,52 L160,55 L200,40 L240,42 L280,28 L320,22 L360,12 L400,8 L400,90 L0,90 Z" fill="url(#cg)"/>
          <path d="M0,70 L40,65 L80,68 L120,52 L160,55 L200,40 L240,42 L280,28 L320,22 L360,12 L400,8" fill="none" stroke="#0e0e0e" strokeWidth="1.5"/>
          <circle cx="400" cy="8" r="3" fill="#e53935"/>
        </svg>
      </div>
    </div>
  </div>
</section>

{/* OFFER */}
<section className="block" id="offer">
  <div className="wrap">
    <div className="sec-head">
      <div>
        <div className="sec-tag" data-anim="fade-down">06 · Cómo trabajar con nosotros</div>
        <h2 data-split="words">Dos puertas. <em>Mismo equipo.</em></h2>
      </div>
      <p className="sec-sub" data-anim="fade-up">Proyectos puntuales o socio continuo. Si no calzas en ninguno, lo conversamos.</p>
    </div>

    <div className="offer" data-stagger>
      <div className="plan glass">
        <div className="plan-tag"><span className="dot"></span> Sprint</div>
        <h3>Proyecto único</h3>
        <p className="desc">Una landing, un flujo, un MVP. Alcance fijo, plazo fijo, precio cerrado.</p>
        <div className="plan-price">desde $150K+<small>CLP</small></div>
        <ul>
          <li>Reunión de descubrimiento</li>
          <li>Diseño y desarrollo</li>
          <li>Despliegue en producción</li>
          <li>30 días de soporte incluido</li>
        </ul>
        <a href="#final" className="btn-primary">
          Empezar un proyecto
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div className="plan glass feat">
        <div className="plan-tag"><span className="dot"></span> Personalizado</div>
        <h3>Tryvex <em>partner</em></h3>
        <p className="desc">Para negocios que necesitan un equipo propio. Alcance, ritmo y precio se definen juntos en una llamada.</p>
        <div className="plan-price" style={{fontSize: "1.4rem", letterSpacing: "-0.02em"}}>Precio a medida</div>
        <ul>
          <li>Equipo dedicado (diseño + dev)</li>
          <li>Sprints quincenales adaptados a tu ritmo</li>
          <li>Catálogo de servicios completo a tu disposición</li>
          <li>Reportes mensuales con métricas reales</li>
        </ul>
        <a href="#final" className="btn-primary">
          Agendar una llamada
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

{/* FAQ */}
<section className="block" id="faq">
  <div className="wrap faq-grid">
    <div data-anim="fade-right">
      <div className="sec-tag">07 · Preguntas</div>
      <h2 data-split="words">Lo que casi siempre nos preguntan <em>antes de la llamada.</em></h2>
      <p className="sec-sub" style={{marginTop: "24px"}}>¿Quedó algo sin responder? Escríbenos a <a href="mailto:tryvexentreprise@gmail.com" style={{color: "var(--red)"}}>tryvexentreprise@gmail.com</a> y te contestamos el mismo día.</p>
    </div>
    <div className="faq glass" data-anim="fade-left">
      <details open={true}>
        <summary>¿Trabajan con empresas chicas?</summary>
        <p>Sí. La mayoría de nuestros clientes son negocios entre 2 y 30 personas. Si la planilla ya te queda chica, calzamos.</p>
      </details>
      <details>
        <summary>¿Cuánto se demora un proyecto?</summary>
        <p>Una landing entre 5 y 10 días. Una automatización completa entre 2 y 4 semanas. Un MVP de SaaS entre 4 y 8 semanas.</p>
      </details>
      <details>
        <summary>¿El código es nuestro?</summary>
        <p>Sí, sin asteriscos. Te entregamos repositorio, accesos y documentación. Si mañana quieres trabajar con otro equipo, lo puedes hacer.</p>
      </details>
      <details>
        <summary>¿Atienden fuera de Chile?</summary>
        <p>Sí. Trabajamos remoto con equipos en LatAm y EE.UU. La mayoría de las herramientas son en español o inglés indistintamente.</p>
      </details>
      <details>
        <summary>¿Qué pasa si no funciona?</summary>
        <p>Tenemos garantía de 30 días. Si no entregamos lo prometido, devolvemos el último mes. Es raro que pase, pero está por escrito.</p>
      </details>
    </div>
  </div>
</section>

{/* FINAL CTA */}
<div className="scene-final-wrap" data-scene="final">
<section className="block" id="final">
  <div className="wrap">
    <FinalCTA />
  </div>
</section>
</div>{/* /scene-final-wrap */}

{/* FOOTER */}
<footer>
  <div className="wrap">
    <div className="foot-card glass" data-anim="fade-up">
      <div className="foot-top">
        <div className="foot-brand">
          <a href="#" className="logo">
            <svg className="logo-mark" style={{width: "32px", height: "32px"}}><use href="#spark"/></svg>
            <span className="logo-word">tryvex<span className="dot">.</span></span>
          </a>
          <p>Software studio en Santiago. Construimos sistemas que corren solos para negocios que no tienen tiempo que perder.</p>
        </div>
        <div>
          <h5>Servicios</h5>
          <a href="/servicios">Automatización</a>
          <a href="/servicios">Landing pages</a>
          <a href="/servicios">SaaS a medida</a>
        </div>
        <div>
          <h5>Estudio</h5>
          <a href="/proceso">Proceso</a>
          <a href="#offer">Planes</a>
          <a href="#faq">Preguntas</a>
        </div>
        <div>
          <h5>Contacto</h5>
          <a href="/contacto">Agendar llamada</a>
          <a href="mailto:tryvexentreprise@gmail.com">tryvexentreprise@gmail.com</a>
          <a href="#">Santiago · CL</a>
        </div>
      </div>
      <div className="foot-bottom">
        <div>© MMXXVI · Tryvex</div>
        <div>Hecho a mano en Santiago</div>
      </div>
    </div>
  </div>
</footer>
      <LandingClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "¿Trabajan con empresas chicas?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sí. La mayoría de nuestros clientes son negocios entre 2 y 30 personas. Si la planilla ya te queda chica, calzamos.",
                },
              },
              {
                "@type": "Question",
                name: "¿Cuánto se demora un proyecto?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Una landing entre 5 y 10 días. Una automatización completa entre 2 y 4 semanas. Un MVP de SaaS entre 4 y 8 semanas.",
                },
              },
              {
                "@type": "Question",
                name: "¿El código es nuestro?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sí, sin asteriscos. Te entregamos repositorio, accesos y documentación. Si mañana quieres trabajar con otro equipo, lo puedes hacer.",
                },
              },
              {
                "@type": "Question",
                name: "¿Atienden fuera de Chile?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sí. Trabajamos remoto con equipos en LatAm y EE.UU. La mayoría de las herramientas son en español o inglés indistintamente.",
                },
              },
              {
                "@type": "Question",
                name: "¿Qué pasa si no funciona?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tenemos garantía de 30 días. Si no entregamos lo prometido, devolvemos el último mes. Es raro que pase, pero está por escrito.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
