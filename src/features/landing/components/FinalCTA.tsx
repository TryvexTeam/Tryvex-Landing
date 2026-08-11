"use client";

import { useState, useMemo } from "react";
import { sileo } from "sileo";

import { HORARIOS } from "../../../lib/horarios";
import { errorDelCampo, type CampoAgenda } from "../../../lib/validacion-agenda";

const FALLBACK_SLOTS: string[] = [...HORARIOS];
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

  /**
   * Errores por campo, y cuáles ya se tocaron.
   *
   * El aviso no aparece mientras se escribe por primera vez —marcar en rojo un
   * campo a medio llenar es molesto y no ayuda—, sino al salir del campo o al
   * intentar enviar. Una vez que un campo tiene error, sí se corrige en vivo:
   * así el visitante ve el momento exacto en que queda bien.
   *
   * Las reglas salen de `lib/validacion-agenda`, el mismo módulo que usa
   * `/api/contact`. Antes el cliente solo miraba que no estuviera vacío y el
   * servidor solo miraba longitudes, así que un nombre con números y un
   * teléfono con letras pasaban los dos filtros.
   */
  const [errores, setErrores] = useState<Partial<Record<CampoAgenda, string>>>({});
  const [tocados, setTocados] = useState<Partial<Record<CampoAgenda, boolean>>>({});

  const workingDays = useMemo(() => getWorkingDays(7), []);

  /**
   * Elige un día, o lo suelta si ya estaba elegido.
   *
   * La hora se va con el día: una hora sin día no significa nada, y dejarla
   * marcada al cambiar de día arrastraba una selección que en el día nuevo
   * podía estar ocupada — el visitante creía tener las 18:00 y el servidor le
   * decía que no.
   */
  const handleDaySelect = async (day: Date) => {
    if (selectedDate?.getTime() === day.getTime()) {
      setSelectedDate(null);
      setSelectedTime(null);
      return;
    }
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

  /* El botón se habilita con los campos llenos y el horario elegido. La
     validación de formato NO lo bloquea a propósito: un botón apagado sin
     explicación deja al visitante sin saber qué le falta. Se deja pulsar, y al
     pulsar se le muestra exactamente qué corregir. */
  /* El consentimiento es requisito para enviar, no un extra. La Ley 21.719 pide
     que sea previo, expreso e inequívoco: por eso arranca desmarcado y bloquea
     el envío mientras no se marque. */
  const [consentimiento, setConsentimiento] = useState(false);
  const [errorConsentimiento, setErrorConsentimiento] = useState(false);

  const canSubmit =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "" &&
    selectedDate !== null &&
    selectedTime !== null &&
    consentimiento;

  const revisar = (campo: CampoAgenda, valor: string) =>
    setErrores((prev) => {
      const error = errorDelCampo(campo, valor);
      if (error) return { ...prev, [campo]: error };
      const resto = { ...prev };
      delete resto[campo];
      return resto;
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const campo = e.target.name as CampoAgenda;
    const valor = e.target.value;
    setForm((prev) => ({ ...prev, [campo]: valor }));
    // Solo se corrige en vivo lo que ya estaba marcado como error.
    if (errores[campo]) revisar(campo, valor);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const campo = e.target.name as CampoAgenda;
    setTocados((prev) => ({ ...prev, [campo]: true }));
    revisar(campo, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    /* Se revisa todo antes de salir a la red. El servidor vuelve a validar con
       el mismo esquema —es el que manda—, pero rebotar acá evita un viaje y,
       sobre todo, permite decir qué campo está mal en vez del "algo falló"
       genérico que devolvía el toast. */
    const campos: CampoAgenda[] = ["name", "phone", "email", "message"];
    const encontrados: Partial<Record<CampoAgenda, string>> = {};
    campos.forEach((c) => {
      const error = errorDelCampo(c, form[c]);
      if (error) encontrados[c] = error;
    });

    if (Object.keys(encontrados).length) {
      setErrores(encontrados);
      setTocados({ name: true, phone: true, email: true, message: true });
      const primero = campos.find((c) => encontrados[c]);
      document.getElementById(`sch-${primero}`)?.focus();
      return;
    }

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
          description: "Escríbenos directo a contacto@tryvex.tech",
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
      {/* Sin `data-anim`: la anima el timeline de la escena final en
          LandingClient, con scrub. Gira al entrar y al salir — eso es
          deliberado, es una animación de scroll. */}
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
                    aria-pressed={isSelected}
                  >
                    <span className="sch-day-name">{DAYS_ES[day.getDay()]}</span>
                    <span className="sch-day-num">{day.getDate()}</span>
                    <span className="sch-day-month">{MONTHS_ES[day.getMonth()]}</span>
                  </button>
                );
              })}
            </div>

            {/* La franja del aviso va dentro de la misma celda que los horarios,
                no como bloque aparte: así reutiliza el hueco reservado en vez de
                sumar otro. */}
            <div className="sch-campo">
              {/* Mientras carga, los horarios siguen en pantalla apagados en vez
                  de dar paso a un "Cargando horarios…". Ese cambio sustituía dos
                  filas de píldoras por una línea de texto: el bloque se encogía
                  46px y el formulario entero daba un salto al elegir el día, y
                  otro al volver. Apagados no se pueden pulsar, así que nadie
                  reserva una hora del día anterior. */}
              <div className={`sch-times${selectedDate ? " sch-times--open" : ""}`}>
                {availableSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`sch-time${selectedTime === t ? " sch-time--sel" : ""}`}
                    /* Segundo clic sobre la hora elegida la suelta. */
                    onClick={() =>
                      setSelectedTime((prev) => (prev === t ? null : t))
                    }
                    disabled={loadingSlots}
                    aria-pressed={selectedTime === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Con el día puesto y sin hora, el botón de confirmar queda
                  apagado. Apagarlo sin decir por qué deja al visitante
                  adivinando —el mismo criterio que en los campos—, así que el
                  hueco reservado bajo los horarios dice qué falta.

                  Va en tono neutro y no en rojo: no es un dato mal escrito, es
                  el paso siguiente. `role="status"` lo anuncia al lector de
                  pantalla, que si no ve el botón apagarse no se entera. */}
              <p className="sch-aviso sch-aviso--guia" role="status">
                {loadingSlots
                  ? "Buscando horarios libres…"
                  : selectedDate && !selectedTime
                    ? "Ahora elige la hora."
                    : ""}
              </p>
            </div>

            {/* Las etiquetas van ocultas a la vista pero presentes para el lector
                de pantalla: el diseño se apoya en el placeholder, que desaparece
                al escribir y deja el campo sin nombre accesible. */}
            {/* `aria-invalid` y `aria-describedby` conectan cada campo con su
                aviso, para que un lector de pantalla lo anuncie al llegar en vez
                de dejar al usuario adivinando por qué no se envía. */}
            <div className="sch-inputs">
              <div className="sch-campo sch-campo--ancho">
              <label htmlFor="sch-name" className="sr-only">Nombre</label>
              <input
                id="sch-name"
                name="name"
                type="text"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={loading}
                autoComplete="name"
                aria-invalid={tocados.name && !!errores.name}
                aria-describedby={errores.name ? "err-name" : undefined}
              />
              <p className="sch-aviso" id="err-name">
                {tocados.name && errores.name ? errores.name : ""}
              </p>
              </div>

              <div className="sch-campo">
              <label htmlFor="sch-phone" className="sr-only">Teléfono</label>
              <input
                id="sch-phone"
                name="phone"
                type="tel"
                placeholder="Teléfono (+56 9 ···· ····)"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={loading}
                autoComplete="tel"
                aria-invalid={tocados.phone && !!errores.phone}
                aria-describedby={errores.phone ? "err-phone" : undefined}
              />
              <p className="sch-aviso" id="err-phone">
                {tocados.phone && errores.phone ? errores.phone : ""}
              </p>
              </div>

              <div className="sch-campo">
              <label htmlFor="sch-email" className="sr-only">Correo electrónico</label>
              <input
                id="sch-email"
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={loading}
                autoComplete="email"
                suppressHydrationWarning
                aria-invalid={tocados.email && !!errores.email}
                aria-describedby={errores.email ? "err-email" : undefined}
              />
              <p className="sch-aviso" id="err-email">
                {tocados.email && errores.email ? errores.email : ""}
              </p>
              </div>
            </div>

            {/* También en celda, para que su aviso tampoco empuje al botón. */}
            <div className="sch-campo">
            <label htmlFor="sch-message" className="sr-only">
              ¿En qué podemos ayudarte? (opcional)
            </label>
            <textarea
              id="sch-message"
              name="message"
              className="sch-msg"
              placeholder="¿En qué podemos ayudarte? (opcional)"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              rows={3}
              aria-invalid={tocados.message && !!errores.message}
              aria-describedby={errores.message ? "err-message" : undefined}
            />
            <p className="sch-aviso" id="err-message">
              {tocados.message && errores.message ? errores.message : ""}
            </p>
            </div>

            <div className="cf-consent">
              <label htmlFor="consentimiento-datos">
                <input
                  type="checkbox"
                  id="consentimiento-datos"
                  checked={consentimiento}
                  onChange={(e) => {
                    setConsentimiento(e.target.checked);
                    if (e.target.checked) setErrorConsentimiento(false);
                  }}
                  aria-describedby={errorConsentimiento ? "err-consentimiento" : undefined}
                />
                <span>
                  Autorizo que Tryvex use mis datos para contactarme por esta
                  solicitud, según su{" "}
                  <a href="/privacidad" target="_blank" rel="noopener noreferrer">
                    política de privacidad
                  </a>
                  .
                </span>
              </label>
              <p className="cf-error" id="err-consentimiento" role="alert" aria-live="polite">
                {errorConsentimiento ? "Necesitamos tu autorización para poder contactarte." : ""}
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              onClick={() => {
                if (!consentimiento) setErrorConsentimiento(true);
              }}
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
              contacto@tryvex.tech
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
