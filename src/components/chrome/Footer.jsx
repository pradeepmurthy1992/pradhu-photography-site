// src/components/chrome/Footer.jsx
import React from "react";

export default function Footer({ T, onNavigate }) {
  const baseBg = T.footerBg || "bg-slate-950";
  const baseText = T.footerText || "text-slate-200";
  const headingText = T.footerHeading || "text-slate-50";
  const accentText = T.footerAccent || "text-emerald-400";
  const subtleText = T.footerSubtle || "text-slate-400";

  const handleNav = (to) => {
    if (onNavigate) onNavigate(to);
  };

  return (
    <footer className={`${baseBg} ${baseText} border-t border-white/5`}>
      {/* full-width, no max-w — stretches to screen edges */}
      <div className="flex w-full flex-col gap-10 px-4 py-10 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Brand / blurb */}
        <div className="space-y-3 lg:w-1/3">
          <h3
            className={`text-xs font-semibold tracking-[0.35em] uppercase ${accentText}`}
          >
            PRADHU PHOTOGRAPHY
          </h3>
          <p className={`${subtleText} text-sm leading-relaxed`}>
            Cinematic portraits, editorial stories and real moments across Pune,
            Mumbai, Chennai &amp; Bengaluru.
          </p>

          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold">WhatsApp: </span>
              <a
                href="https://wa.me/919332584410"
                target="_blank"
                rel="noreferrer"
                className={accentText}
              >
                +91&nbsp;93325&nbsp;84410
              </a>
            </p>
            <p>
              <span className="font-semibold">Instagram: </span>
              <a
                href="https://instagram.com/pradhu_photography"
                target="_blank"
                rel="noreferrer"
                className={accentText}
              >
                @pradhu_photography
              </a>
            </p>
          </div>
        </div>

        {/* Navigate */}
        <div className="space-y-3 text-sm lg:w-1/3">
          <h4 className={`${headingText} text-xs font-semibold uppercase`}>
            NAVIGATE
          </h4>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => handleNav("/")}
                className="transition-colors hover:text-emerald-400"
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav("/portfolio")}
                className="transition-colors hover:text-emerald-400"
              >
                Portfolio
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav("/services")}
                className="transition-colors hover:text-emerald-400"
              >
                Services &amp; Pricing
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav("/reviews")}
                className="transition-colors hover:text-emerald-400"
              >
                Reviews
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNav("/contact")}
                className="transition-colors hover:text-emerald-400"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Studio info */}
        <div className="space-y-3 text-sm lg:w-1/3">
          <h4 className={`${headingText} text-xs font-semibold uppercase`}>
            STUDIO
          </h4>
          <p className={`${subtleText} leading-relaxed`}>
            Based in Chennai &amp; Bengaluru. Available for travel across Pune,
            Mumbai, Chennai, Bengaluru and beyond.
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/5 px-4 py-4 text-xs sm:px-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className={subtleText}>
          © {new Date().getFullYear()} Pradhu Photography. All rights reserved.
        </p>
        <p className={`${subtleText} space-x-2`}>
          <span>Built with</span>
          <span className={accentText}>React</span>
          <span>·</span>
          <span className={accentText}>Tailwind</span>
          <span>·</span>
          <span className={accentText}>GitHub Pages</span>
        </p>
      </div>
    </footer>
  );
}
