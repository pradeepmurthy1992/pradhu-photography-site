// src/components/chrome/Footer.jsx
import React from "react";

export default function Footer({ T, theme = "dark", onNavigate }) {
  const isDark = theme === "dark";

  const wrapperBg = isDark
    ? "bg-slate-950 border-t border-slate-900/80"
    : "bg-[#e5ddcf] border-t border-[rgba(15,23,42,0.06)]";

  const brandAccent = isDark ? "text-emerald-300" : "text-emerald-700";
  const headingText = isDark ? "text-slate-100" : "text-[rgba(15,23,42,0.86)]";
  const bodyText = isDark ? "text-slate-300" : "text-[rgba(15,23,42,0.78)]";
  const mutedText = isDark ? "text-slate-400" : "text-[rgba(15,23,42,0.55)]";
  const linkText = isDark
    ? "text-emerald-300 hover:text-emerald-200"
    : "text-emerald-700 hover:text-emerald-600";

  const handleNav = (hash) => {
    if (!onNavigate) return;
    onNavigate(hash);
  };

  // ✅ Use BASE_URL so it works on GitHub Pages
  const logoSrc = `${import.meta.env.BASE_URL}images/pradhu-logo.png`;

  return (
    <footer className={`w-full ${wrapperBg}`}>
      <div className="w-full px-4 sm:px-8 lg:px-12 py-10 md:py-12">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {/* Brand / intro */}
          <div className="space-y-3">
            {/* Logo + brand */}
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black shadow-sm overflow-hidden">
                <img
                  src={logoSrc}
                  alt="Pradhu Photography logo"
                  className="h-8 w-8 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            <p
              className={`text-xs font-semibold tracking-[0.3em] uppercase ${brandAccent}`}
            >
              PRADHU PHOTOGRAPHY
            </p>
          </div>

            <p className={`text-sm leading-relaxed ${bodyText}`}>
              Cinematic portraits, editorial stories and real moments across
              Pune, Mumbai, Chennai &amp; Bengaluru.
            </p>
            <div className="space-y-1 text-sm">
              <p className={bodyText}>
                <span className="font-semibold">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/919332584410"
                  target="_blank"
                  rel="noreferrer"
                  className={linkText}
                >
                  +91 93325 84410
                </a>
              </p>
              <p className={bodyText}>
                <span className="font-semibold">Instagram:</span>{" "}
                <a
                  href="https://www.instagram.com/pradhu_photography"
                  target="_blank"
                  rel="noreferrer"
                  className={linkText}
                >
                  @pradhu_photography
                </a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p
              className={`text-xs font-semibold tracking-[0.3em] uppercase ${headingText}`}
            >
              NAVIGATE
            </p>
            <nav className={`flex flex-col gap-1 text-sm ${bodyText}`}>
              <button
                type="button"
                onClick={() => handleNav("/")}
                className="text-left hover:opacity-90"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNav("/portfolio")}
                className="text-left hover:opacity-90"
              >
                Portfolio
              </button>
              <button
                type="button"
                onClick={() => handleNav("/services")}
                className="text-left hover:opacity-90"
              >
                Services &amp; Pricing
              </button>
              <button
                type="button"
                onClick={() => handleNav("/reviews")}
                className="text-left hover:opacity-90"
              >
                Reviews
              </button>
              <button
                type="button"
                onClick={() => handleNav("/contact")}
                className="text-left hover:opacity-90"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Studio / location */}
          <div className="space-y-3">
            <p
              className={`text-xs font-semibold tracking-[0.3em] uppercase ${headingText}`}
            >
              STUDIO
            </p>
            <p className={`text-sm leading-relaxed ${bodyText}`}>
              Based in Chennai &amp; Bengaluru. Available for travel across
              Pune, Mumbai, Chennai, Bengaluru and beyond.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`mt-8 border-t ${
            isDark ? "border-slate-800/80" : "border-[rgba(15,23,42,0.08)]"
          }`}
        />

        {/* Bottom row */}
        <div className="mt-4 flex flex-col items-start justify-between gap-2 text-xs md:flex-row md:items-center">
          <p className={mutedText}>
            © 2025 Pradhu Photography. All rights reserved.
          </p>
          <p className={mutedText}>
            Built with{" "}
            <a
              href="https://react.dev"
              target="_blank"
              rel="noreferrer"
              className={linkText}
            >
              React
            </a>{" "}
            ·{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noreferrer"
              className={linkText}
            >
              Tailwind
            </a>{" "}
            ·{" "}
            <a
              href="https://pages.github.com"
              target="_blank"
              rel="noreferrer"
              className={linkText}
            >
              GitHub Pages
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
