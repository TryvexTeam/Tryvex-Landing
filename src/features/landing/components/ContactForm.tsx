"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="contact-success">
        <svg style={{ width: 40, height: 40, marginBottom: 16 }}>
          <use href="#spark-light" />
        </svg>
        <p style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8 }}>
          ¡Perfecto! Nos vemos en la llamada.
        </p>
        <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
          Te enviamos una invitación a Google Meet. Revisa tu bandeja de entrada.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-name">Nombre</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            placeholder="Catalina Mella"
            value={form.name}
            onChange={handleChange}
            required
            disabled={status === "loading"}
          />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-email">Correo</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            placeholder="cata@verdura.cl"
            value={form.email}
            onChange={handleChange}
            required
            disabled={status === "loading"}
          />
        </div>
      </div>
      <div className="cf-field">
        <label htmlFor="cf-company">
          Empresa{" "}
          <span style={{ color: "var(--muted)" }}>(opcional)</span>
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          placeholder="Verdura.cl"
          value={form.company}
          onChange={handleChange}
          disabled={status === "loading"}
        />
      </div>
      <div className="cf-field">
        <label htmlFor="cf-message">¿En qué te podemos ayudar?</label>
        <textarea
          id="cf-message"
          name="message"
          rows={3}
          placeholder="Tenemos pedidos en Shopify que se facturan manualmente..."
          value={form.message}
          onChange={handleChange}
          disabled={status === "loading"}
        />
      </div>
      {status === "error" && (
        <p className="cf-error">
          Algo falló. Escríbenos a{" "}
          <a href="mailto:hola@tryvex.cl" style={{ color: "var(--red)" }}>
            hola@tryvex.cl
          </a>
        </p>
      )}
      <button
        type="submit"
        className="btn-primary"
        disabled={status === "loading"}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {status === "loading" ? "Enviando…" : "Agendar llamada de 20 min"}
        {status !== "loading" && (
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
  );
}