import React from "react";

export default function FaqSection({ T, showTitle = true }) {
  const items = [
    { q: "How do I receive photos?", a: "Private, watermark-free online gallery with high-res downloads." },
    { q: "How to book?", a: "Send an enquiry with date, service, and location." },
    { q: "Do you travel?", a: "Yes. Travel fee applies outside the base city." },
    { q: "Studio?", a: "Yes. Rentals available; I’ll shortlist spaces for your concept." },
  ];

  return (
    <section className="py-2">
      {showTitle && (
        <h2 className={`text-3xl md:text-4xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}>
          FAQ
        </h2>
      )}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {items.map((it) => (
          <details key={it.q} className={`rounded-2xl border p-5 shadow-sm ${T.panelBg} ${T.panelBorder}`}>
            <summary className={`cursor-pointer font-medium ${T.navTextStrong}`}>{it.q}</summary>
            <p className={`mt-2 text-sm ${T.muted}`}>{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
