// src/components/pages/ContactPage.jsx
import React, { useMemo, useState } from "react";
import { usePageMeta } from "@/app/seo";
import { SHEET_WEB_APP, WHATSAPP_NUMBER } from "@/app/config";
import AboutBlock from "./AboutBlock";

export default function ContactPage({ T, theme }) {
  // theme is "dark" or "light" passed from App.jsx
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

    if (missing.length)
      return setNote({
        kind: "error",
        text: `Please fill: ${missing.join(", ")}`,
      });

    if (!isValidEmail(form.email))
      return setNote({
        kind: "error",
        text: "Enter a valid email address.",
      });

    if (!isValidINPhone(form.phone))
      return setNote({
        kind: "error",
        text: "Enter a valid Indian mobile.",
      });

    setSubmitting(true);
    try {
      await fetch(SHEET_WEB_APP, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website" }),
      });

      const waText = encodeURIComponent(
        `Hi Pradhu! This is ${form.name}. I just sent an enquiry from your website.\nService: ${
          form.service
        }\nCity: ${form.city}\nPreferred date: ${
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

  // ------------------------
  // THEME-AWARE STYLES
  // ------------------------
  const labelClass =
    theme === "dark"
      ? "text-sm font-semibold text-slate-100"
      : "text-sm font-semibold text-neutral-900";

  const fieldBase =
    "mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500";

  const fieldTone =
    theme === "dark"
      ? "bg-slate-900/70 border-slate-600 text-slate-100 placeholder:text-slate-400"
      : "bg-slate-100 border-slate-300 text-neutral-900 placeholder:text-neutral-500";

  const selectTone =
    theme === "dark"
      ? "bg-slate-900/70 border-slate-600 text-slate-100"
      : "bg-slate-100 border-slate-300 text-neutral-900";

  return (
    <section className="py-6" id="contact">
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
          {/* NAME */}
          <div>
            <label className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              required
              className={`${fieldBase} ${fieldTone}`}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              className={`${fieldBase} ${fieldTone}`}
            />
          </div>

          {/* PHONE */}
          <div>
            <label className={labelClass}>
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              required
              placeholder="+91-XXXXXXXXXX"
              className={`${fieldBase} ${fieldTone}`}
            />
          </div>

          {/* DATE */}
          <div>
            <label className={labelClass}>Preferred Date</label>
            <input
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
              className={`${fieldBase} ${fieldTone}`}
            />
            <p className="text-xs opacity-70 mt-1">
              Earliest selectable: {fmtHuman(minDateStr)}
            </p>
          </div>

          {/* MESSAGE */}
          <div>
            <label className={labelClass}>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={5}
              className={`${fieldBase} ${fieldTone} resize-y`}
              placeholder="Shoot location, timings, concept, references, usage (personal/commercial), etc."
            />
          </div>

          {/* SERVICE & CITY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Service</label>
              <select
                name="service"
                className={`${fieldBase} ${selectTone} cursor-pointer`}
                value={form.service}
                onChange={onChange}
              >
                {[
                  "Portraits",
                  "Fashion",
                  "Candids",
                  "Street",
                  "Events",
                  "Other",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>City</label>
              <select
                name="city"
                className={`${fieldBase} ${selectTone} cursor-pointer`}
                value={form.city}
                onChange={onChange}
              >
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Chennai</option>
                <option>Bengaluru</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-neutral-900 text-white px-4 py-2 font-semibold hover:opacity-90 disabled:opacity-60"
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
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50"
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
