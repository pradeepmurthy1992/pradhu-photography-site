// src/components/chrome/Footer.jsx
import React from "react";

export default function Footer({ T, theme = "dark", onNavigate }) {
  const isDark = theme === "dark";

  const footerBg = isDark
    ? "bg-slate-950/98 border-t border-slate-800"
    : "bg-[#ece3d7] border-t border-[#d6c7b4]";

  const headingText = isDark ? "text-slate-200" : "text-[#2b3236]";
  const bodyText = isDark ? "text-slate-400" : "text-[#5e5245]";
  const subtleText = isDark ? "text-slate-500" : "text-[#8a7b68]";
  const brandAccent = "text-emerald-400";

  const linkBase =
    "cursor-pointer transition-colors hover:text-emerald-400";

  return (
    <footer className={`w-full ${footerBg} text-sm`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 md:px-8 lg:px-10">
        {/* Top row: 3 columns */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand / blurb */}
          <div className="flex flex-col gap-3">
            <h2
              className={`tracking-[0.25em] text-[11px] uppercase ${brandAccent}`}
            >
              PRADHU PHOTOGRAPHY
            </h2>
            <p className={bodyText}>
              Cinematic portraits, editorial stories and real moments
              across Pune, Mumbai, Chennai &amp; Bengaluru.
            </p>

            <div className="mt-2 space-y-1">
              <p className={bodyText}>
                <span className={headingText}>WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/919332584410"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-emerald-400"
                >
                  +91 93325 84410
                </a>
              </p>
              <p className={bodyText}>
                <span className={headingText}>Instagram:</span>{" "}
                <a
                  href="https://instagram.com/pradhu_photography"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-emerald-400"
                >
                  @pradhu_photography
                </a>
              </p>
            </div>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-3">
            <h3
              className={`text-xs font-semibold tracking-[0.25em] uppercase ${headingText}`}
            >
              Navigate
            </h3>
            <nav className={`flex flex-col gap-1.5 ${bodyText}`}>
              <button
                type="button"
                onClick={() => onNavigate("/")}
                className={linkBase}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => onNavigate("/portfolio")}
                className={linkBase}
              >
                Portfolio
              </button>
              <button
                type="button"
                onClick={() => onNavigate("/services")}
                className={linkBase}
              >
                Services &amp; Pricing
              </button>
              <button
                type="button"
                onClick={() => onNavigate("/reviews")}
                className={linkBase}
              >
                Reviews
              </button>
              <button
                type="button"
                onClick={() => onNavigate("/contact")}
                className={linkBase}
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Studio */}
          <div className="flex flex-col gap-3 md:items-end md:text-right">
            <h3
              className={`text-xs font-semibold tracking-[0.25em] uppercase ${headingText}`}
            >
              Studio
            </h3>
            <p className={bodyText}>
              Based in Chennai &amp; Bengaluru. Available for travel across
              Pune, Mumbai, Chennai, Bengaluru and beyond.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px w-full bg-gradient-to-r from-transparent via-slate-600/30 to-transparent`} />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-3 pb-2 text-[11px] sm:flex-row">
          <p className={subtleText}>
            © 2025 Pradhu Photography. All rights reserved.
          </p>
          <p className={subtleText}>
            Built with{" "}
            <span className={brandAccent}>React</span>,{" "}
            <span className={brandAccent}>Tailwind</span> &amp;{" "}
            <span className={brandAccent}>GitHub Pages</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
