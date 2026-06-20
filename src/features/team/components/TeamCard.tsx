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
        {hasPhoto ? (
          <Image
            src={member.photo}
            alt={member.name}
            width={800}
            height={1000}
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
