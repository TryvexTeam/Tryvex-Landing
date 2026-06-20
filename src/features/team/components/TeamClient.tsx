"use client";

import { useState, useCallback } from "react";
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

  const filtered = filter === "all" ? members : members.filter((m) => m.category === filter);

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
        <div className="team-grid">
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
