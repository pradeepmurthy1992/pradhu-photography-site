// src/components/chrome/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "@/app/config";
import ThemeSlider from "@/components/common/ThemeSlider";
import { Icon } from "@/components/common/Icon";

export default function Navbar({ T, path, theme, setTheme, brand = "PRADHU PHOTOGRAPHY" }) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const btnRef = useRef(null);

  // close on hashchange (navigations)
  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash, { passive: true });
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // keyboard ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // simple focus trap when open
  useEffect(() => {
    if (!open) return;
    const root = drawerRef.current;
    const focusables = root?.querySelectorAll("a,button,[tabindex]:not([tabindex='-1'])") || [];
    const first = focusables[0], last = focusables[focusables.length - 1];

    const trap = (e) => {
      if (e.key !== "Tab") return;
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", trap);
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur border-b ${T.navBg} ${T.navBorder}`}>
      <nav className={`mx-auto w-full max-w-[1800px] px-4 xl:px-8 py-4 lg:py-5 grid grid-cols-[auto_1fr_auto] items-center gap-3`}>
        {/* Mobile: hamburger */}
        <div className="lg:hidden">
          <button
            ref={btnRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`rounded-xl border px-3 py-2 text-sm ${T.btnOutline}`}
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        {/* Brand */}
        <div className="min-w-0 justify-self-start">
          <p
            className={`font-['Playfair_Display'] uppercase tracking-[0.08em] leading-none ${T.navTextStrong}
                         text-[clamp(18px,2.4vw,40px)] whitespace-nowrap`}
          >
            {brand}
          </p>
        </div>

        {/* Desktop menu */}
        <ul className="hidden lg:flex items-center gap-2 text-sm justify-self-center">
          {NAV_ITEMS.map(({ label, id, icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative group flex items-center gap-2 px-3 py-2 rounded-2xl border transition shadow-sm ${
                  path === id ? T.chipActive : T.chipInactive
                }`}
              >
                <Icon name={icon} className={`h-4 w-4 ${path === id ? "opacity-100" : "opacity-60"}`} />
                <span className="text-sm">{label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Theme */}
        <div className="justify-self-end">
          <ThemeSlider theme={theme} setTheme={setTheme} />
        </div>
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
            "bg-white dark:bg-[#1c1e26] border-r",
            open ? "translate-x-0" : "-translate-x-full",
            "transition-transform duration-200 ease-out",
            T.navBorder,
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="p-3 border-b sticky top-0 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${T.navTextStrong}`}>Menu</span>
              <button
                type="button"
                className={`rounded-md border px-2 py-1 ${T.btnOutline}`}
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
          <nav className="p-2">
            <ul className="flex flex-col">
              {NAV_ITEMS.map(({ label, id, icon }) => (
                <li key={`m-${id}`}>
                  <a
                    href={`#${id}`}
                    className={`flex items-center gap-3 px-3 py-3 border-b ${T.navBorder}`}
                    onClick={() => setOpen(false)}
                  >
                    <Icon name={icon} className="h-4 w-4 opacity-70" />
                    <span className={`${T.navTextStrong}`}>{label}</span>
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
