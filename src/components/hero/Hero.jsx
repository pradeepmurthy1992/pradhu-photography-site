// src/components/hero/Hero.jsx
import {
  HERO_BG_URL,
  SERVICE_CITIES,
  WHATSAPP_NUMBER,
  IG_USERNAME,
} from "@/app/config";
import Icon from "@/components/common/Icon";

function buildWhatsAppUrl() {
  if (!WHATSAPP_NUMBER) return null;
  const msg =
    "Hi, I’d like to enquire about a photoshoot. I saw your website and want to know availability & pricing.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function Hero() {
  const waUrl = buildWhatsAppUrl();

  return (
    <section
      className="
        relative overflow-hidden
        w-full
        bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
      "
      aria-labelledby="hero-heading"
    >
      {/* Background image fills full width */}
      {HERO_BG_URL && (
        <div className="pointer-events-none absolute inset-0">
          <img
            src={HERO_BG_URL}
            alt="Editorial portrait photography by Pradhu"
            className="h-full w-full object-cover opacity-40 mix-blend-screen"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-emerald-900/30" />
        </div>
      )}

      {/* Content wrapper pinned near bottom */}
      <div
        className="
          relative z-10
          w-full
          min-h-[82vh]
          flex items-end
          px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32
          pt-24 sm:pt-28 lg:pt-32
          pb-10 sm:pb-12 lg:pb-16
        "
      >
        <div className="flex w-full flex-col gap-10 xl:flex-row xl:items-end xl:justify-between">
          {/* LEFT: main headline & CTAs */}
          <div className="max-w-3xl space-y-7">
            <div className="space-y-4">
              <h1
                id="hero-heading"
                className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.3rem] leading-tight"
              >
                Collect your Treasure
                <span className="block text-emerald-300">
                  ONE PIECE at a time.
                </span>
              </h1>
              <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
                Editorial-style photoshoots that feel effortless, look timeless
                &amp; tell your story in every frame.
              </p>
            </div>

            {/* Cities */}
            {Array.isArray(SERVICE_CITIES) && SERVICE_CITIES.length > 0 && (
              <p className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <Icon name="map-pin" size={14} />
                <span className="uppercase tracking-[0.22em] text-slate-400">
                  BASED IN
                </span>
                <span className="font-medium text-slate-100">
                  {SERVICE_CITIES.join(" · ")}
                </span>
                <span className="text-slate-400">· Available to travel</span>
              </p>
            )}

            {/* Desktop CTAs */}
            <div className="hidden gap-3 pt-2 sm:flex">
              <a
                href="#/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-emerald-500/40 hover:bg-emerald-400"
              >
                <Icon name="calendar" size={16} />
                <span>Book a Shoot</span>
              </a>

              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/70 bg-black/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200 hover:bg-emerald-500/10"
                >
                  <Icon name="whatsapp" size={16} />
                  <span>WhatsApp</span>
                </a>
              )}

              <a
                href="#/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 hover:bg-white/10"
              >
                <Icon name="grid" size={14} />
                <span>View Portfolio</span>
              </a>
            </div>
          </div>

          {/* RIGHT: shoot types + IG card */}
          <div className="flex max-w-lg flex-col gap-4 text-sm text-slate-100 sm:flex-row sm:items-end xl:flex-col xl:text-right xl:max-w-md">
            <div className="space-y-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                SHOOT TYPES
              </p>
              <p className="text-xs text-slate-50">
                Model &amp; actor portfolios · Editorial · Designer lookbooks ·
                Couple &amp; pre-wedding · Brand campaigns.
              </p>
            </div>

            {IG_USERNAME && (
              <a
                href={`https://instagram.com/${IG_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl border border-pink-500/40 bg-black/40 px-4 py-3 text-xs font-medium text-slate-50 hover:bg-pink-500/10"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                  <Icon name="instagram" size={18} />
                </span>
                <span className="text-left leading-snug">
                  See latest work on{" "}
                  <span className="font-semibold">@{IG_USERNAME}</span>
                  <span className="block text-[0.7rem] text-slate-300">
                    Reels · BTS · before/after edits
                  </span>
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Mobile FAB row (WhatsApp + Call) */}
        {waUrl && (
          <div className="mt-6 flex w-full items-center justify-between gap-3 sm:hidden">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-emerald-500/40"
            >
              <Icon name="whatsapp" size={16} />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+91XXXXXXXXXX"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/70 bg-black/60 text-emerald-200"
              aria-label="Call"
            >
              <Icon name="phone" size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
