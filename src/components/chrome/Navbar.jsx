// src/components/chrome/Navbar.jsx
import React, { useState } from "react";
import { NAV_ITEMS } from "@/app/config";
import ThemeSlider from "@/components/common/ThemeSlider";
import Icon from "@/components/common/Icon";

export default function Navbar({ T, path, theme, setTheme, onNavigate }) {
  const [open, setOpen] = useState(false);

  const handleNav = (e, p) => {
    e.preventDefault();
    setOpen(false);
    onNavigate && onNavigate(p);
  };

  const isActive = (itemPath) =>
    path === itemPath ||
    (itemPath === "/portfolio" && path.startsWith("/portfolio"));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 backdrop-blur bg-slate-950/80">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <a
          href="/"
          onClick={(e) => handleNav(e, "/")}
          className="font-display text-lg tracking-[0.18em] uppercase"
        >
          <span className="text-slate-50">PRADHU</span>
          <span className="text-emerald-400"> Photography</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-4 text-xs font-medium tracking-wide">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <a
                  href={item.path}
                  onClick={(e) => handleNav(e, item.path)}
                  className={`uppercase transition-colors ${
                    isActive(item.path)
                      ? "text-emerald-400"
                      : "text-slate-300 hover:text-emerald-300"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeSlider theme={theme} setTheme={setTheme} />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-700/70 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Icon
            name={open ? "x" : "menu"}
            className="w-5 h-5 text-slate-100"
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className={`md:hidden border-t ${
            theme === "light"
              ? "bg-white text-slate-900 border-slate-200"
              : "bg-slate-950 text-slate-50 border-slate-800"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-[0.2em] opacity-70">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1 text-xs"
              >
                <Icon name="x" className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.path}
                    onClick={(e) => handleNav(e, item.path)}
                    className={`block rounded-xl px-3 py-2 ${
                      isActive(item.path)
                        ? theme === "light"
                          ? "bg-slate-900 text-emerald-300"
                          : "bg-slate-100 text-emerald-600"
                        : theme === "light"
                        ? "text-slate-900 hover:bg-slate-100"
                        : "text-slate-100 hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center">
              <span className="text-[0.65rem] uppercase tracking-[0.18em] opacity-70">
                Theme
              </span>
              <ThemeSlider theme={theme} setTheme={setTheme} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
