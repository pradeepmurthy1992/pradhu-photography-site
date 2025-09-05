// src/components/chrome/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/app/config";
import ThemeSlider from "@/components/common/ThemeSlider";
import { Icon } from "@/components/common/Icon";

export default function Navbar({ T, path, theme, setTheme, brand = "PRADHU PHOTOGRAPHY" }) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash, { passive: true });
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur border-b ${T.navBg} ${T.navBorder}`}>
      <nav className="mx-auto w-full max-w-[1800px] px-4 xl:px-8 py-4 lg:py-5 grid grid-cols-[auto_1fr_auto] items-center gap-3">
        {/* Hamburger (mobile) */}
        <div className="lg:hidden">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border px-3 py-2 text-sm bg-black text-white dark:bg-white dark:text-black"
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        {/* Brand */}
        <p className={`font-['Playfair_Display'] uppercase tracking-[0.08em] leading-none ${T.navTextStrong}
                      text-[clamp(18px,2.4vw,40px)] whitespace-nowrap`}>
          {brand}
        </p>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center gap-2 text-sm justify-self-center">
          {NAV_ITEMS.map(({ label, id, icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-2xl border transition shadow-sm ${
                  path === id ? T.chipActive : T.chipInactive
                }`}
              >
                <Icon name={icon} className="h-4 w-4" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <ThemeSlider theme={theme} setTheme={setTheme} />
      </nav>

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        className={[
          "lg:hidden fixed inset-0 z-[60] transition",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <aside
          ref={drawerRef}
          className={[
            "absolute left-0 top-0 h-full w-[82%] max-w-[360px]",
            // 👇 Light mode = white bg + black text, Dark mode = black bg + white text
            "bg-white text-black dark:bg-black dark:text-white shadow-xl",
            open ? "translate-x-0" : "-translate-x-full",
            "transition-transform duration-200 ease-out",
          ].join(" ")}
        >
          {/* Header */}
          <div className="p-3 border-b border-black/10 dark:border-white/20 flex justify-between items-center">
            <span className="text-sm font-semibold">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
            >
              {/* X icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="p-2">
            <ul className="flex flex-col">
              {NAV_ITEMS.map(({ label, id, icon }) => (
                <li key={`m-${id}`}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 border-b border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <Icon name={icon} className="h-4 w-4" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </header>
  );
}
