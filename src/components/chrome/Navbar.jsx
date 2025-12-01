// src/components/chrome/Navbar.jsx
import { useState } from "react";
import { NAV_ITEMS, WHATSAPP_NUMBER, IG_USERNAME } from "@/app/config";
import ThemeSlider from "@/components/common/ThemeSlider";
import Icon from "@/components/common/Icon";

function navHref(path) {
  // Ensure all internal nav links are "#/something"
  if (!path || path === "/") return "#/";
  return `#${path.startsWith("/") ? path : `/${path}`}`;
}

export default function Navbar({
  T,
  path,
  theme,
  setTheme,
  brand = "PRADHU PHOTOGRAPHY",
}) {
  const [open, setOpen] = useState(false);

  const isDark = theme === "dark";
  const baseBg = isDark ? "bg-slate-950/80" : "bg-white/80";
  const baseBorder = isDark ? "border-slate-800/80" : "border-slate-200/80";
  const baseShadow = isDark ? "shadow-black/40" : "shadow-slate-400/30";

  const drawerBg = isDark ? "bg-slate-950 text-slate-50" : "bg-white text-slate-900";
  const drawerBorder = isDark ? "border-slate-800" : "border-slate-200";

  return (
    <>
      <header
        className={`sticky top-0 z-40 backdrop-blur-md ${baseBg} ${baseBorder} border-b shadow-sm shadow-black/10`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Brand */}
          <a
            href="#/"
            className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-current text-[0.7rem]">
              PR
            </span>
            <span>{brand}</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em]">
              {NAV_ITEMS.map((item) => {
                const href = navHref(item.path);
                const isActive =
                  path === item.path ||
                  (item.path !== "/" && path.startsWith(item.path));

                return (
                  <li key={item.path}>
                    <a
                      href={href}
                      className={`flex items-center gap-1 border-b-2 pb-1 transition-all ${
                        isActive
                          ? "border-emerald-500 text-emerald-500"
                          : "border-transparent text-slate-500 hover:border-slate-400 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                      }`}
                    >
                      {item.icon ? <Icon name={item.icon} size={14} /> : null}
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* IG + Theme + CTA */}
            <div className="flex items-center gap-4">
              {IG_USERNAME && (
                <a
                  href={`https://instagram.com/${IG_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-pink-500 dark:text-slate-300"
                >
                  <Icon name="instagram" size={16} />
                  <span>@{IG_USERNAME}</span>
                </a>
              )}

              <ThemeSlider theme={theme} setTheme={setTheme} />

              {WHATSAPP_NUMBER && (
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi, I’d like to enquire about a photoshoot."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm shadow-emerald-500/40 hover:bg-emerald-400"
                >
                  <Icon name="whatsapp" size={16} />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          {/* Mobile: theme + menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeSlider theme={theme} setTheme={setTheme} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/70 bg-white/70 text-slate-800 shadow-sm shadow-black/10 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
              aria-label="Open navigation menu"
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div
            className={`absolute inset-y-0 right-0 flex w-72 max-w-full flex-col border-l ${drawerBg} ${drawerBorder} shadow-2xl`}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <a
                href="#/"
                className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase"
                onClick={() => setOpen(false)}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-current text-[0.7rem]">
                  PR
                </span>
                <span>{brand}</span>
              </a>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/60 bg-transparent text-slate-200 hover:bg-slate-800/80 dark:border-slate-500"
                aria-label="Close navigation menu"
              >
                <Icon name="x" size={18} />
              </button>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" />

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-2 text-sm font-medium uppercase tracking-[0.16em]">
                {NAV_ITEMS.map((item) => {
                  const href = navHref(item.path);
                  const isActive =
                    path === item.path ||
                    (item.path !== "/" && path.startsWith(item.path));

                  return (
                    <li key={item.path}>
                      <a
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 transition ${
                          isActive
                            ? "bg-emerald-500 text-white"
                            : "text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800/80"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon ? <Icon name={item.icon} size={16} /> : null}
                          <span>{item.label}</span>
                        </span>
                        {isActive && <Icon name="chevron-right" size={16} />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Bottom contact strip */}
            <div className="border-t border-slate-700/50 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 px-4 py-3 text-xs text-slate-200">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1">
                  <Icon name="map-pin" size={14} />
                  <span>Based in Chennai · Shoots across India</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {WHATSAPP_NUMBER && (
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Hi, I’d like to enquire about a photoshoot."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-emerald-500 px-3 py-2 font-semibold uppercase tracking-[0.16em] text-white"
                  >
                    <Icon name="whatsapp" size={16} />
                    <span>WhatsApp</span>
                  </a>
                )}
                {IG_USERNAME && (
                  <a
                    href={`https://instagram.com/${IG_USERNAME}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 text-slate-200"
                    aria-label="Instagram"
                  >
                    <Icon name="instagram" size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
