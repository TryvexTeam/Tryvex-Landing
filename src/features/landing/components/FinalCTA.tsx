"use client";

import { useState, useMemo } from "react";

const TIME_SLOTS = ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
const DAYS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS_ES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

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
}

type View = "cta" | "form" | "success";

export default function FinalCTA() {
  const [view, setView] = useState<View>("cta");
  const [form, setForm] = useState<ScheduleForm>({ name: "", phone: "", email: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const workingDays = useMemo(() => getWorkingDays(7), []);

  const canSubmit =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "" &&
    selectedDate !== null &&
    selectedTime !== null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(false);
    try {
      const dateStr = selectedDate!.toLocaleDateString("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: dateStr, time: selectedTime }),
      });
      if (!res.ok) throw new Error("failed");
      setView("success");
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="final glass dark">
      <svg className="final-spark">
        <use href="#spark-light" />
      </svg>

      {/* ── CTA view ── */}
      <div className={`fv${view === "cta" ? " fv--active" : ""}`}>
        <h2 data-split="words">
          Hablemos 20 minutos.{" "}
          <em>Sin compromiso, sin pitch.</em>
        </h2>
        <p>
          Te decimos honestamente si podemos ayudarte, y si no, qué herramienta
          o equipo deberías mirar.
        </p>
        <button className="btn-primary" onClick={() => setView("form")}>
          Agendar llamada
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* ── Schedule form view ── */}
      <div className={`fv fv--form${view === "form" ? " fv--active" : ""}`}>
        <form className="sch-form" onSubmit={handleSubmit} noValidate>
          <p className="sch-label">
            Elige un día y hora para tu llamada de 20 min.
          </p>

          {/* Day picker */}
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
                  onClick={() => {
                    setSelectedDate(day);
                    setSelectedTime(null);
                  }}
                >
                  <span className="sch-day-name">{DAYS_ES[day.getDay()]}</span>
                  <span className="sch-day-num">{day.getDate()}</span>
                  <span className="sch-day-month">
                    {MONTHS_ES[day.getMonth()]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Time slots — reveal after day selection */}
          <div
            className={`sch-times${selectedDate ? " sch-times--open" : ""}`}
          >
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                className={`sch-time${selectedTime === t ? " sch-time--sel" : ""}`}
                onClick={() => setSelectedTime(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Inputs */}
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
            />
          </div>

          {error && (
            <p className="sch-error">
              Algo falló. Escríbenos a{" "}
              <a href="mailto:hola@tryvex.cl" style={{ color: "var(--red)" }}>
                hola@tryvex.cl
              </a>
            </p>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={!canSubmit || loading}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loading ? "Enviando…" : "Confirmar llamada"}
            {!loading && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </button>
        </form>
      </div>

      {/* ── Success view ── */}
      <div className={`fv fv--success${view === "success" ? " fv--active" : ""}`}>
        <p className="sch-ok-tag">✓ Solicitud recibida</p>
        <h2 style={{ fontSize: "clamp(28px, 3vw, 48px)", margin: "0 0 16px" }}>
          ¡Quedamos para la llamada!
        </h2>
        <p>
          Te enviamos un correo con la invitación a Google Meet. Si necesitas
          reagendar, escríbenos a{" "}
          <a href="mailto:hola@tryvex.cl" style={{ color: "var(--red)" }}>
            hola@tryvex.cl
          </a>
        </p>
      </div>
    </div>
  );
}
