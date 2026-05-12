"use client";

import { useState } from "react";

const MARQUES = [
  "Porsche",
  "Ferrari",
  "Aston Martin",
  "Mercedes-Benz",
  "BMW",
  "Lamborghini",
  "Jaguar",
  "Other",
];

const POSTURES = ["Watching", "Researching", "Within 6 months", "Ready when right"];

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "ok"; message: string }
  | { kind: "err"; message: string };

export default function BetaForm() {
  const [email, setEmail] = useState("");
  const [marques, setMarques] = useState<Set<string>>(new Set());
  const [posture, setPosture] = useState<Set<string>>(new Set());
  const [budget, setBudget] = useState("");
  const [cars, setCars] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const toggle = (set: Set<string>, value: string): Set<string> => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          marques: [...marques],
          posture: [...posture],
          budget,
          cars,
        }),
      });
      const data: { ok: boolean; message?: string; error?: string } =
        await res.json();
      if (data.ok) {
        setStatus({ kind: "ok", message: data.message || "You're on the list." });
      } else {
        setStatus({
          kind: "err",
          message: data.error || "Something went wrong.",
        });
      }
    } catch {
      setStatus({ kind: "err", message: "Network error. Try again." });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <form className="beta-form" onSubmit={onSubmit} noValidate>
      <div className="beta-field">
        <label className="beta-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="beta-input"
          type="email"
          placeholder="you@somewhere.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="beta-field">
        <label className="beta-label">Marques you watch</label>
        <div className="beta-chip-group">
          {MARQUES.map((m) => (
            <button
              key={m}
              type="button"
              className={`beta-chip${marques.has(m) ? " active" : ""}`}
              onClick={() => setMarques((s) => toggle(s, m))}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="beta-field">
        <label className="beta-label">Posture</label>
        <div className="beta-chip-group">
          {POSTURES.map((p) => (
            <button
              key={p}
              type="button"
              className={`beta-chip${posture.has(p) ? " active" : ""}`}
              onClick={() => setPosture((s) => toggle(s, p))}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="beta-field">
        <label className="beta-label" htmlFor="band">
          Approximate budget band
        </label>
        <select
          id="band"
          className="beta-select"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option value="">Optional</option>
          <option>Under $50k</option>
          <option>$50k – $100k</option>
          <option>$100k – $250k</option>
          <option>$250k – $500k</option>
          <option>$500k +</option>
          <option>Prefer not to say</option>
        </select>
      </div>

      <div className="beta-field">
        <label className="beta-label" htmlFor="cars">
          Cars currently on your radar
        </label>
        <input
          id="cars"
          className="beta-input"
          type="text"
          placeholder="e.g. 993 Carrera, 599 GTB, BMW M5 E39"
          value={cars}
          onChange={(e) => setCars(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Request Access"}
        <span className="btn-arrow">→</span>
      </button>

      {status.kind === "ok" && (
        <div className="beta-status ok" role="status">
          {status.message}
        </div>
      )}
      {status.kind === "err" && (
        <div className="beta-status err" role="status">
          {status.message}
        </div>
      )}

      <div className="beta-fine">
        We read every submission. We reply by email — usually within a week.
        No marketing list, no follow-on outreach.
      </div>
    </form>
  );
}
