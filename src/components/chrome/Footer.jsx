// src/components/chrome/Footer.jsx
import { IG_USERNAME, WHATSAPP_NUMBER } from "@/app/config";
import Icon from "@/components/common/Icon";

export default function Footer() {
  const year = new Date().getFullYear();
  const waUrl =
    WHATSAPP_NUMBER &&
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi, I’d like to enquire about a photoshoot."
    )}`;

  return (
    <footer className="mt-10 border-t border-slate-800/70 bg-black/90 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-start lg:justify-between">
        {/* Brand & NAP */}
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            PRADHU PHOTOGRAPHY
          </p>
          <p className="max-w-sm text-xs text-slate-400">
            Fashion, editorial and portrait photography for brands, models and
            couples who want cinematic stories — not just pictures.
          </p>
          <div className="space-y-1 text-xs text-slate-400">
            <p className="flex items-center gap-2">
              <Icon name="map-pin" size={14} />
              <span>Chennai, India · Shoots across major cities</span>
            </p>
            <p className="flex items-center gap-2">
              <Icon name="phone" size={14} />
              <span>+91-XXXXXXXXXX</span>
            </p>
            <p className="flex items-center gap-2">
              <Icon name="mail" size={14} />
              <span>pradhuphotography@example.com</span>
            </p>
          </div>
        </div>

        {/* Sitemap */}
        <div className="flex flex-1 flex-wrap gap-8 text-xs">
          <div>
            <h3 className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Pages
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#/"
                  className="text-slate-300 hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#/portfolio"
                  className="text-slate-300 hover:text-white"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#/services"
                  className="text-slate-300 hover:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#/pricing"
                  className="text-slate-300 hover:text-white"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#/about"
                  className="text-slate-300 hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#/reviews"
                  className="text-slate-300 hover:text-white"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#/contact"
                  className="text-slate-300 hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social / Actions */}
          <div>
            <h3 className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Connect
            </h3>
            <ul className="space-y-1">
              {IG_USERNAME && (
                <li>
                  <a
                    href={`https://instagram.com/${IG_USERNAME}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-pink-400"
                  >
                    <Icon name="instagram" size={14} />
                    <span>@{IG_USERNAME}</span>
                  </a>
                </li>
              )}
              {waUrl && (
                <li>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-slate-300 hover:text-emerald-400"
                  >
                    <Icon name="whatsapp" size={14} />
                    <span>WhatsApp</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800/80 bg-black/95">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-[0.7rem] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {year} Pradhu Photography. All rights reserved.</p>
          <p className="text-slate-500">
            Crafted with{" "}
            <span className="text-emerald-400">light, stories</span> &amp; lots
            of chai.
          </p>
        </div>
      </div>
    </footer>
  );
}
