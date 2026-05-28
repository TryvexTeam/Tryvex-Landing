"use client";

import { useState, useMemo } from "react";
import { sileo } from "sileo";

const FALLBACK_SLOTS = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
const DAYS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS_ES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

function toDateISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getWorkingDays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  if (new Date().getHours() >= 17) d.setDate(d.getDate() + 1);
  while (days.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

interface ScheduleForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type View = "cta" | "form" | "success";

export default function FinalCTA() {
  const [view, setView] = useState<View>("cta");
  const [form, setForm] = useState<ScheduleForm>({ name: "", phone: "", email: "", message: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>(FALLBACK_SLOTS);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(false);

  const workingDays = useMemo(() => getWorkingDays(7), []);

  const handleDaySelect = async (day: Date) => {
    setSelectedDate(day);
    setSelectedTime(null);
    setLoadingSlots(true);
    try {
      const res = await fetch(`/api/availability?date=${toDateISO(day)}`);
      if (res.ok) {
        const { slots } = await res.json() as { slots: string[] };
        setAvailableSlots(slots.length > 0 ? slots : FALLBACK_SLOTS);
      }
    } catch {
      setAvailableSlots(FALLBACK_SLOTS);
    } finally {
      setLoadingSlots(false);
    }
  };

  const canSubmit =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "" &&
    selectedDate !== null &&
    selectedTime !== null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);

    const dateStr = selectedDate!.toLocaleDateString("es-CL", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    const request = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        date: dateStr,
        dateISO: toDateISO(selectedDate!),
        time: selectedTime,
      }),
    }).then((res) => {
      if (!res.ok) throw new Error("request failed");
      return res.json();
    });

    try {
      await sileo.promise(request, {
        loading: {
          title: "Enviando solicitud…",
          description: "Un momento.",
        },
        success: {
          title: "¡Quedamos para la llamada!",
          description: "Revisa tu correo — te enviamos la invitación a Google Meet.",
        },
        error: {
          title: "Algo falló",
          description: "Escríbenos directo a tryvexentreprise@gmail.com",
        },
      });
      setView("success");
    } catch {
      // sileo already shows the error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="final glass dark">
      <svg className="final-spark">
        <use href="#spark-light" />
      </svg>

      {/*
        fv-shell: position:relative wrapper.
        The CTA view (fv--ghost when inactive) stays in normal flow
        and defines the shell's height — the container never changes size.
        Form and success are position:absolute overlays within that same space.
      */}
      <div className="fv-shell">

        {/* ── CTA — always in DOM; ghost holds height when inactive ── */}
        <div className={view === "cta" ? "fv fv--active" : "fv fv--ghost"}>
          <h2 data-split="words">
            Hablemos 20 minutos.{" "}
            <em>Sin compromiso, sin pitch.</em>
          </h2>
          <p>
            Te decimos honestamente si podemos ayudarte, y si no, qué
            herramienta o equipo deberías mirar.
          </p>
          <button className="btn-primary" onClick={() => setView("form")}>
            Agendar llamada
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <p className="final-trust">Sin costo. Sin compromiso. Respuesta en menos de 24h.</p>
        </div>

        {/* ── Form — absolute overlay, scrolls if content overflows ── */}
        <div className={`fv fv--overlay${view === "form" ? " fv--active" : ""}`}>
          <form className="sch-form" onSubmit={handleSubmit} noValidate>
            <p className="sch-label">
              Elige un día y hora para tu llamada de 20 min.
            </p>

            <div className="sch-days">
              {workingDays.map((day, i) => {
                const isSelected =
                  selectedDate !== null &&
                  selectedDate.getTime() === day.getTime();
                return (
                  <button
                    key={i}
                    type="button"
                    className={`sch-day${isSelected ? " sch-day--sel" : ""}`}
                    onClick={() => handleDaySelect(day)}
                  >
                    <span className="sch-day-name">{DAYS_ES[day.getDay()]}</span>
                    <span className="sch-day-num">{day.getDate()}</span>
                    <span className="sch-day-month">{MONTHS_ES[day.getMonth()]}</span>
                  </button>
                );
              })}
            </div>

            <div className={`sch-times${selectedDate ? " sch-times--open" : ""}`}>
              {loadingSlots ? (
                <span style={{ fontSize: "12px", color: "rgba(244,241,234,0.4)" }}>
                  Cargando horarios…
                </span>
              ) : (
                availableSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`sch-time${selectedTime === t ? " sch-time--sel" : ""}`}
                    onClick={() => setSelectedTime(t)}
                  >
                    {t}
                  </button>
                ))
              )}
            </div>

            <div className="sch-inputs">
              <input
                name="name"
                type="text"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="name"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Teléfono (+56 9 ···· ····)"
                value={form.phone}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="tel"
              />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="email"
                suppressHydrationWarning
              />
            </div>

            <textarea
              name="message"
              className="sch-msg"
              placeholder="¿En qué podemos ayudarte? (opcional)"
              value={form.message}
              onChange={handleChange}
              disabled={loading}
              rows={3}
            />

            <button
              type="submit"
              className="btn-primary"
              disabled={!canSubmit || loading}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? "Enviando…" : "Confirmar llamada"}
              {!loading && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
            </button>
          </form>
        </div>

        {/* ── Success — absolute overlay ── */}
        <div className={`fv fv--overlay${view === "success" ? " fv--active" : ""}`}>
          <p className="sch-ok-tag">✓ Solicitud recibida</p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 48px)", margin: "0 0 16px" }}>
            ¡Quedamos para la llamada!
          </h2>
          <p>
            Te enviamos un correo con la invitación a Google Meet. Si necesitas
            reagendar, escríbenos a{" "}
            <a href="mailto:tryvexentreprise@gmail.com" style={{ color: "var(--red)" }}>
              tryvexentreprise@gmail.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
