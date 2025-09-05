import React from "react";
import { NAV_ITEMS, CONTAINER } from "@/app/config";
import ThemeSlider from "@/components/common/ThemeSlider";
import { Icon } from "@/components/common/Icon";
import { trackEvent } from "@/app/track";

export default function Navbar({ T, path, setTheme, theme, brand = "PRADHU PHOTOGRAPHY" }) {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur border-b ${T.navBg} ${T.navBorder}`}>
      <nav className={`${CONTAINER} py-4 lg:py-5 grid grid-cols-[1fr_auto_auto] items-center gap-3`}>
        <div className="min-w-0">
          <p
            className={`font-['Playfair_Display'] uppercase tracking-[0.08em] leading-none ${T.navTextStrong}
                         text-[clamp(20px,2.4vw,40px)] whitespace-nowrap`}
          >
            {brand}
          </p>
        </div>

        <ul className="hidden lg:flex items-center gap-2 text-sm">
          {NAV_ITEMS.map(({ label, id, icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => trackEvent("nav_click", { to: id })}
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

        <ThemeSlider theme={theme} setTheme={setTheme} />
      </nav>
    </header>
  );
}
