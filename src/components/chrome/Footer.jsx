// src/components/chrome/Footer.jsx
import React from "react";
import { NAV_ITEMS } from "@/app/config";

export default function Footer({ theme = "dark", onNavigate }) {
  const isDark = theme === "dark";

  const wrapper =
    (isDark
      ? "bg-[#020617] text-slate-100 border-t border-slate-800"
      : "bg-[#e9e2d5] text-neutral-900 border-t border-neutral-300") +
    " mt-auto";

  const accent = isDark ? "text-emerald-400" : "text-emerald-700";
  const mutedText = isDark ? "text-slate-400" : "text-neutral-600";
  const linkHover = isDark ? "hover:text-emerald-300" : "hover:text-emerald-700";

  const year = new Date().getFullYear();

  // Use same routes as navbar (minus 404)
  const navItems = NAV_ITEMS.filter((item) => item.path !== "/404");

  return (
    <footer className={wrapper}>
      {/* Slightly wider band than before */}
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand / blurb */}
          <div>
            <h3 className="text-sm font-semibold tracking-[0.3em] uppercase">
              <span>PRADHU </span>
              <span className={accent}>PHOTOGRAPHY</span>
            </h3>

            <p className={`mt-4 text-sm leading-relaxed ${mutedText}`}>
              Cinematic portraits, editorial stories and real moments across
              Pune, Mumbai, Chennai & Bengaluru.
            </p>

            <div className="mt-4 space-y-1 text-sm">
              <p>
                <span className="font-semibold">WhatsApp:</span>{" "}
                <a
                  className={`${accent} ${linkHover}`}
                  href="https://wa.me/919322584410"
                  target="_blank"
                  rel="noreferrer"
                >
                  +91&nbsp;93225&nbsp;84410
                </a>
              </p>
              <p>
                <span className="font-semibold">Instagram:</span>{" "}
                <a
                  className={`${accent} ${linkHover}`}
                  href="https://instagram.com/pradhu_photography"
                  target="_blank"
                  rel="noreferrer"
                >
                  @pradhu_photography
                </a>
              </p>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4
              className={`text-xs font-semibold tracking-[0.25em] uppercase ${accent}`}
            >
              Navigate
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.path)}
                    className={`${mutedText} ${linkHover}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <h4
              className={`text-xs font-semibold tracking-[0.25em] uppercase ${accent}`}
            >
              Studio
            </h4>
            <p className={`mt-4 text-sm leading-relaxed ${mutedText}`}>
              Based in Chennai & Bengaluru. Available for travel across Pune,
              Mumbai, Chennai, Bengaluru and beyond.
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className={`mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs ${
            isDark ? "border-slate-800" : "border-neutral-400/40"
          } ${mutedText} md:flex-row`}
        >
          <p>© {year} Pradhu Photography. All rights reserved.</p>
          <p>
            Built with{" "}
            <span className={accent}>React</span> ·{" "}
            <span className={accent}>Tailwind</span> ·{" "}
            <span className={accent}>GitHub Pages</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
