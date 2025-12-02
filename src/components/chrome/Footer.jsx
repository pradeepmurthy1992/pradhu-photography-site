import React from "react";
import {
  SERVICE_CITIES,
  WHATSAPP_NUMBER,
  IG_USERNAME,
} from "@/app/config";

export default function Footer({ T, onNavigate }) {
  const year = new Date().getFullYear();
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Pradhu, I’d like to enquire about a shoot."
  )}`;
  const igHref = `https://instagram.com/${IG_USERNAME}`;

  const go = (e, path) => {
    if (!onNavigate) return;
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/95 text-xs text-slate-400">
      {/* top row – now full width */}
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-6 grid gap-4 md:grid-cols-[2fr,1fr,1fr]">
        <div>
          <div className="font-display text-sm tracking-[0.18em] uppercase text-slate-100">
            PRADHU <span className="text-emerald-400">Photography</span>
          </div>
          <p className="mt-2 max-w-md">
            Cinematic portraits, editorial stories and real moments across{" "}
            {SERVICE_CITIES.join(", ")}.
          </p>
          <p className="mt-2">
            <span className="font-semibold text-slate-200">WhatsApp:</span>{" "}
            <a href={waHref} className="text-emerald-400 hover:underline">
              +{WHATSAPP_NUMBER}
            </a>
          </p>
          <p className="mt-1">
            <span className="font-semibold text-slate-200">Instagram:</span>{" "}
            <a href={igHref} className="text-emerald-400 hover:underline">
              @{IG_USERNAME}
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-slate-200 text-[0.7rem] uppercase tracking-[0.2em] mb-2">
            Navigate
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="/"
                onClick={(e) => go(e, "/")}
                className="hover:text-emerald-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/portfolio"
                onClick={(e) => go(e, "/portfolio")}
                className="hover:text-emerald-300"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="/services-pricing"
                onClick={(e) => go(e, "/services-pricing")}
                className="hover:text-emerald-300"
              >
                Services &amp; Pricing
              </a>
            </li>
            <li>
              <a
                href="/reviews"
                onClick={(e) => go(e, "/reviews")}
                className="hover:text-emerald-300"
              >
                Reviews
              </a>
            </li>
            <li>
              <a
                href="/contact"
                onClick={(e) => go(e, "/contact")}
                className="hover:text-emerald-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-slate-200 text-[0.7rem] uppercase tracking-[0.2em] mb-2">
            Studio
          </h3>
          <p>Based in Chennai &amp; Bengaluru.</p>
          <p className="mt-1">
            Available for travel across {SERVICE_CITIES.join(", ")} and beyond.
          </p>
        </div>
      </div>

      {/* bottom strip – also full width */}
      <div className="border-t border-slate-800/80">
        <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {year} Pradhu Photography. All rights reserved.</p>
          <p className="text-[0.65rem]">
            Built with React · Tailwind · GitHub Pages.
          </p>
        </div>
      </div>
    </footer>
  );
}
