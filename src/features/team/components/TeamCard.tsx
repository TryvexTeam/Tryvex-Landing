"use client";

import Image from "next/image";
import type { Member } from "../data/members";

interface TeamCardProps {
  member: Member;
  hasPhoto?: boolean;
  onSelect: (member: Member) => void;
}

export default function TeamCard({ member, hasPhoto = false, onSelect }: TeamCardProps) {
  return (
    <button
      className="team-card"
      data-member={member.id}
      onClick={() => onSelect(member)}
      aria-label={`Ver perfil de ${member.name}`}
    >
      <div className="team-card__photo-frame">
        {/* Sin `sizes`, Next asume que la imagen ocupa el ancho completo y sirve
            828px para un hueco que nunca pasa de 283. Los cortes siguen a los de
            `.team-grid` en equipo.css: 1 columna bajo 420px, 2 bajo 680, 3 bajo
            1100, y 4 de ahí en adelante dentro de `.wrap`. */}
        {hasPhoto ? (
          <Image
            src={member.photo}
            alt={member.name}
            width={800}
            height={1000}
            sizes="(max-width: 420px) 100vw, (max-width: 680px) 50vw, (max-width: 1100px) 33vw, 283px"
            className="team-card__photo"
            loading="lazy"
          />
        ) : (
          <div className="team-card__photo-placeholder" aria-hidden="true" />
        )}
        <div className="team-card__hover-plus" aria-hidden="true">+</div>
      </div>
      <div className="team-card__info">
        <span className="team-card__name">{member.name}</span>
        <span className="team-card__role">{member.role}</span>
      </div>
    </button>
  );
}
