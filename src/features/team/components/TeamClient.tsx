"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { members, type Member, type MemberCategory } from "../data/members";
import TeamCard from "./TeamCard";
import TeamDrawer from "./TeamDrawer";

const MEMBERS_WITH_PHOTO = new Set(["ignacio-navarrete", "fabian-melivilu", "vicente-garcia", "joseph-mailens", "cristian-de-la-fuente"]);

type FilterValue = "all" | MemberCategory;

const FILTER_LABELS: Record<FilterValue, string> = {
  all: "Todos",
  core: "Core",
  engineering: "Engineering",
};

export default function TeamClient() {
  const [selected, setSelected] = useState<Member | null>(null);
  const [filter, setFilter] = useState<FilterValue>("all");
  const handleClose = useCallback(() => setSelected(null), []);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "all" ? members : members.filter((m) => m.category === filter);

  /**
   * Revelado de las tarjetas al entrar en pantalla.
   *
   * `equipo.css` deja `.team-card` en opacity 0 y solo la muestra con la clase
   * `.revealed`, pero nadie la agregaba: la grilla del equipo estaba en blanco
   * desde el primer despliegue. Se rehace acá, escalonada y respetando
   * prefers-reduced-motion.
   *
   * Depende del filtro porque al cambiarlo React monta tarjetas nuevas que
   * también necesitan revelarse.
   */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const tarjetas = [...grid.querySelectorAll<HTMLElement>(".team-card")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      tarjetas.forEach((c) => c.classList.add("revealed"));
      return;
    }

    const pendientes: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = tarjetas.indexOf(e.target as HTMLElement);
          pendientes.push(setTimeout(() => e.target.classList.add("revealed"), Math.max(0, i) * 80));
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    tarjetas.forEach((c) => io.observe(c));

    return () => {
      io.disconnect();
      pendientes.forEach(clearTimeout);
    };
  }, [filter]);

  return (
    <>
      <div className="team-filters" role="group" aria-label="Filtrar por área">
        <span className="team-filters__label">Área</span>
        {(["all", "core", "engineering"] as FilterValue[]).map((f) => (
          <button
            key={f}
            className={`team-filter-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      <section aria-label="Equipo Tryvex">
        <div className="team-grid" ref={gridRef}>
          {filtered.map((member) => (
            <TeamCard
              key={member.id}
              member={member}
              hasPhoto={MEMBERS_WITH_PHOTO.has(member.id)}
              onSelect={setSelected}
            />
          ))}
        </div>
      </section>

      <TeamDrawer member={selected} onClose={handleClose} />
    </>
  );
}
