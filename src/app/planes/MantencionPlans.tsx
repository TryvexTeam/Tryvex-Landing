"use client";

import { useState } from "react";
import Link from "next/link";

type Ciclo = "mensual" | "anual";

type Plan = {
  id: string;
  tag: string;
  nombre: string;
  desc: string;
  mensual: number;
  feat?: boolean;
  items: string[];
};

const PLANES: Plan[] = [
  {
    id: "esencial",
    tag: "Landing",
    nombre: "Esencial",
    desc: "Sitios sin panel ni datos que operar. Mantención liviana, escala con el proyecto.",
    mensual: 20000,
    items: [
      "Infraestructura, dominio y certificado",
      "Respaldos y monitoreo de caídas",
      "Actualizaciones de seguridad",
      "Respuesta ante incidente: 72 h",
    ],
  },
  {
    id: "activo",
    tag: "Recomendado",
    nombre: "Activo",
    desc: "Para automatizaciones, paneles e integraciones que ya operan tu negocio.",
    mensual: 139000,
    feat: true,
    items: [
      "Todo lo de Esencial",
      "3 horas de evolución al mes",
      "Respuesta ante incidente: 48 h",
      "Reporte mensual",
    ],
  },
  {
    id: "socio",
    tag: "Sistemas críticos",
    nombre: "Socio",
    desc: "Para MVP, portales y agentes de IA que la empresa usa todos los días.",
    mensual: 320000,
    items: [
      "Todo lo de Activo",
      "8 horas de evolución al mes",
      "Respuesta ante incidente: 24 h",
      "Reunión de revisión mensual",
    ],
  },
];

const formatCLP = (n: number) => `$${n.toLocaleString("es-CL")}`;

export default function MantencionPlans() {
  const [ciclo, setCiclo] = useState<Ciclo>("mensual");

  return (
    <>
      <div className="billing-toggle-wrap" data-anim="fade-up">
        <span className="billing-toggle-label">Anual ahorra 2 mensualidades</span>
        <div className="billing-toggle" role="group" aria-label="Ciclo de facturación">
          <span
            className="billing-toggle__pill"
            style={{
              width: "calc(50% - 4px)",
              transform: ciclo === "anual" ? "translateX(calc(100% + 4px))" : "translateX(0)",
            }}
            aria-hidden="true"
          />
          <button
            type="button"
            className={ciclo === "mensual" ? "active" : ""}
            aria-pressed={ciclo === "mensual"}
            onClick={() => setCiclo("mensual")}
          >
            Mensual
          </button>
          <button
            type="button"
            className={ciclo === "anual" ? "active" : ""}
            aria-pressed={ciclo === "anual"}
            onClick={() => setCiclo("anual")}
          >
            Anual
          </button>
        </div>
      </div>

      <div className="services" data-stagger style={{ marginTop: "0" }}>
        {PLANES.map((p) => {
          const precio = ciclo === "anual" ? p.mensual * 10 : p.mensual;
          return (
            <div key={p.id} className={`plan glass${p.feat ? " feat" : ""}`}>
              <div className="plan-tag"><span className="dot"></span> {p.tag}</div>
              <h2 style={{ fontSize: "1.4rem" }}>{p.nombre}</h2>
              <p className="desc">{p.desc}</p>
              <div className="plan-price" style={{ fontSize: "2rem" }}>
                {formatCLP(precio)}
                <small>/{ciclo === "anual" ? "año" : "mes"}</small>
              </div>
              {ciclo === "anual" && (
                <p className="plan-annual-save">Ahorras {formatCLP(p.mensual * 2)} al año</p>
              )}
              <ul>
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/contacto" className="btn-primary">
                Empezar
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
