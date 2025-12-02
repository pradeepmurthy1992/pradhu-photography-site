// src/components/chrome/Navbar.jsx
import React, { useState } from "react";
import { NAV_ITEMS } from "@/app/routes";
import ThemeSlider from "@/components/common/ThemeSlider";
import { Icon } from "@/components/common/Icon";

export default function Navbar({
  T,
  path,
  theme,
  setTheme,
  onNavigate,
  brand = "PRADHU PHOTOGRAPHY",
}) {
  const [open, setOpen] = useState(false);

  const isDark = theme === "dark";

  const handleNav = (p) => {
    setOpen(false);
    if (onNavigate) onNavigate(p);
  };

  const bgBase = isDark ? "bg-slate-900/80" : "bg-white/90";
  const borderBase = isDark ? "border-slate-800" : "border-slate-200";
  const textBase = isDark ? "text-slate-100" : "text-slate-900";

  const mobileDrawerBg = isDark ? "bg-black" : "bg-white";
  const mobileDrawerText = isDark ? "text-white" : "text-black";

  // ✅ build logo path with BASE_URL so it works on GitHub Pages
  const logoSrc = `${import.meta.env.BASE_URL}images/pradhu-logo.png`;

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur border-b ${bgBase} ${borderBase}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: brand */}
        <button
          type="button"
          onClick={() => handleNav("/")}
          className="flex items-center gap-2 group"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black overflow-hidden">
            <img
              src={logoSrc}
              alt="Pradhu Photography logo"
              className="h-8 w-8 object-cover"
              loading="lazy"
              decoding="async"
            />
          </span>
          <span
            className={`text-sm sm:text-base font-semibold tracking-[0.18em] uppercase ${textBase}`}
          >
            {brand}
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const active = path === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNav(item.path)}
                className={`text-xs font-medium tracking-wide uppercase ${
                  active
                    ? "text-emerald-400 border-b border-emerald-400 pb-1"
                    : `${textBase} hover:text-emerald-300`
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <div className="ml-4">
            <ThemeSlider theme={theme} setTheme={setTheme} />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeSlider theme={theme} setTheme={setTheme} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-600/60 bg-slate-900/80 text-slate-100"
          >
            <Icon name={open ? "x" : "menu"} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className={`md:hidden ${mobileDrawerBg} ${mobileDrawerText} border-t border-slate-700/60`}
        >
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] opacity-70">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-500/60"
                aria-label="Close navigation"
              >
                <Icon name="x" size={16} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const active = path === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleNav(item.path)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                      active
                        ? "bg-emerald-500 text-slate-900"
                        : "hover:bg-slate-800/70"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <Icon name="chevron-right" size={16} />}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
