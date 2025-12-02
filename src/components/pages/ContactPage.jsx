// src/components/pages/ContactPage.jsx
import React, { useMemo, useState } from "react";
import { usePageMeta } from "@/app/seo";
import { SHEET_WEB_APP, WHATSAPP_NUMBER } from "@/app/config";
import AboutBlock from "./AboutBlock";

export default function ContactPage({ T, theme }) {
  usePageMeta(
    "Book a Shoot | PRADHU Photography",
    "Get in touch to schedule your shoot — portraits, fashion, events. Quick WhatsApp or form booking with transparent timelines."
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Portraits",
    city: "Pune",
    date: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState({ kind: "", text: "" });
  const [whatsCTA, setWhatsCTA] = useState("");

  const minDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    const off = d.getTimezoneOffset();
    const local = new Date(d.getTime() - off * 60000);
    return local.toISOString().slice(0, 10);
  }, []);

  const fmtHuman = (s) => {
    if (!s) return "";
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const onChange = (e) => {
    setWhatsCTA("");
    setNote({ kind: "", text: "" });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const normalizePhone = (v) => v.replace(/[^\d]/g, "");
  const isValidINPhone = (v) =>
    /^(?:\+?91)?[6-9]\d{9}$/.test(normalizePhone(v)) ||
    /^0[6-9]\d{9}$/.test(normalizePhone(v));

  const onSubmit = async (e) => {
    e.preventDefault();
    const missing = [];
    if (!form.name.trim()) missing.push("Name");
    if (!form.email.trim()) missing.push("Email");
    if (!form.phone.trim()) missing.push("Phone");
    if (form.date && form.date < minDateStr)
      missing.push(`Preferred Date (≥ ${fmtHuman(minDateStr)})`);

    if (missing.length) {
      return setNote({
        kind: "error",
        text: `Please fill: ${missing.join(", ")}`,
      });
    }
    if (!isValidEmail(form.email)) {
      return setNote({
        kind: "error",
        text: "Enter a valid email address.",
      });
    }
    if (!isValidINPhone(form.phone)) {
      return setNote({
        kind: "error",
        text: "Enter a valid Indian mobile.",
      });
    }

    setSubmitting(true);
    try {
      await fetch(SHEET_WEB_APP, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website" }),
      });

      const waText = encodeURIComponent(
        `Hi Pradhu! This is ${form.name}. I just sent an enquiry from your website.\nService: ${form.service}\nCity: ${
          form.city
        }\nPreferred date: ${
          form.date ? fmtHuman(form.date) : "TBD"
        }\nDetails: ${form.message || "—"}`
      );
      const utm =
        "utm_source=site&utm_medium=booking_success_cta&utm_campaign=booking";
      const waHref = `https://wa.me/${WHATSAPP_NUMBER.replace(
        /[^\d]/g,
        ""
      )}?text=${waText}&${utm}`;

      setNote({
        kind: "success",
        text: "Thanks! Your enquiry was submitted. I’ll reply shortly.",
      });
      setWhatsCTA(waHref);
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "Portraits",
        city: "Pune",
        date: "",
        message: "",
      });
    } catch (err) {
      setNote({
        kind: "error",
        text: "Couldn’t submit right now. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- FORCED FIELD STYLES ----------
  const baseFieldClasses =
    "mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70";

  const labelClasses = "text-sm text-slate-800 dark:text-slate-200";

  const lightFieldStyle = {
    backgroundColor: "#f3f4f6", // light grey
    color: "#020617",           // almost black text
    borderColor: "#d1d5db",     // light grey border
  };

  const darkFieldStyle = {
    backgroundColor: "#020617", // very dark background
    color: "#e5e7eb",           // light text
    borderColor: "#1e293b",     // dark border
  };

  const fieldStyle = theme === "dark" ? darkFieldStyle : lightFieldStyle;

  // ----------------------------------------

  return (
    <section className="py-6 text-slate-900 dark:text-slate-50" id="contact">
      <h1
        className={`text-4xl md:text-5xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}
      >
        Contact
      </h1>
      <p className={`mt-2 ${T.muted}`}>
        Share details and I’ll reply with availability and a quote.
      </p>

      <div className="mt-6">
        <AboutBlock T={T} />
      </div>

      <form
        onSubmit={onSubmit}
        className={`mt-4 rounded-2xl border p-6 shadow-sm ${T.panelBg} ${T.panelBorder}`}
      >
        <div className="grid grid-cols-1 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name<span className="text-red-500"> *</span>
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              className={baseFieldClasses}
              style={fieldStyle}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email<span className="text-red-500"> *</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className={baseFieldClasses}
              style={fieldStyle}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone<span className="text-red-500"> *</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              placeholder="+91-XXXXXXXXXX"
              className={baseFieldClasses}
              style={fieldStyle}
              required
            />
          </div>

          {/* Preferred Date */}
          <div>
            <label htmlFor="date" className={labelClasses}>
              Preferred Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              min={minDateStr}
              value={form.date}
              onKeyDown={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onChange={(e) => {
                let v = e.target.value;
                if (v && v < minDateStr) {
                  v = minDateStr;
                  setNote({
                    kind: "info",
                    text: `Earliest available date is ${fmtHuman(minDateStr)}.`,
                  });
                }
                setForm({ ...form, date: v });
              }}
              className={baseFieldClasses}
              style={fieldStyle}
            />
            <p className="mt-1 text-xs opacity-70">
              Earliest selectable: {fmtHuman(minDateStr)}
            </p>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelClasses}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              className={baseFieldClasses}
              style={fieldStyle}
              placeholder="Shoot location, timings, concept, references, usage (personal/commercial), etc."
            />
          </div>

          {/* Service + City */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="service" className={labelClasses}>
                Service
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={onChange}
                className={baseFieldClasses}
                style={fieldStyle}
              >
                {["Portraits", "Fashion", "Candids", "Street", "Events", "Other"].map(
                  (s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label htmlFor="city" className={labelClasses}>
                City
              </label>
              <select
                id="city"
                name="city"
                value={form.city}
                onChange={onChange}
                className={baseFieldClasses}
                style={fieldStyle}
              >
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Chennai</option>
                <option>Bengaluru</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-neutral-900 px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Send Enquiry"}
            </button>

            {note.text ? (
              <span
                className={`text-sm ${
                  note.kind === "error"
                    ? "text-red-600"
                    : note.kind === "success"
                    ? "text-emerald-600"
                    : "opacity-80"
                }`}
              >
                {note.text}
              </span>
            ) : null}

            {whatsCTA && (
              <a
                href={whatsCTA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-900 hover:bg-neutral-50 dark:border-slate-600 dark:text-slate-50 dark:hover:bg-slate-800/70"
              >
                Continue on WhatsApp
              </a>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
