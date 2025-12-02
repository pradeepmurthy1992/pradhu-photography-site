// src/components/pages/AboutBlock.jsx
import React from "react";

export default function AboutBlock({ T = {} }) {
  return (
    <section id="about" className="py-10 md:py-14">
      <header className="mb-4 md:mb-6">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] uppercase tracking-[0.12em] ${
            T.navTextStrong || ""
          }`}
        >
          About Pradhu
        </h2>
        <p className={`mt-3 max-w-4xl text-sm md:text-base ${T.muted || ""}`}>
          Aspiring photographer from Kanchipuram, working across fashion, portraits,
          candids and events. Client-first process with tailored recommendations on
          looks, lighting, locations and timelines.
        </p>
      </header>

      <div className="space-y-2 text-sm md:text-base">
        <p>
          <span className="font-semibold">Genres:</span>{" "}
          Fashion, High Fashion, Portraits, Editorials, Candids, Portfolio,
          Headshots, Street, Studio
        </p>
        <p>
          <span className="font-semibold">Kit:</span>{" "}
          Nikon D7500, softboxes (octa &amp; strip), multiple flashes, modifiers
        </p>
        <p>
          <span className="font-semibold">Base cities:</span>{" "}
          Pune · Mumbai · Chennai · Bengaluru (available to travel)
        </p>
      </div>

      {/* Social / contact icons */}
      <div className="mt-6 flex gap-3">
        {/* Instagram icon – now correctly shown as IG */}
        <a
          href="https://www.instagram.com/pradhu_photography"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition"
          aria-label="Instagram — @pradhu_photography"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* outer rounded square */}
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
            {/* camera circle */}
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            {/* small top-right dot */}
            <circle cx="17.5" cy="6.5" r="0.9" />
          </svg>
        </a>

        {/* Email icon */}
        <a
          href="mailto:pradhuphotography@gmail.com"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition"
          aria-label="Email Pradhu"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3.5" y="5" width="17" height="14" rx="2.2" />
            <path d="M5 7.5 12 12l7-4.5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
