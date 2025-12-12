// src/features/portfolio/PortfolioLanding.jsx
import React, { useEffect, useRef, useState } from "react";
import { pickCoverForCategory } from "@/lib/images";
import { trackEvent } from "@/app/track";

const SHOW_ARROW_NAV = true;
const SHOW_CHIP_BAR = true;

export default function PortfolioLanding({
  T,
  cats,
  states,
  openCat,
  initialIdx = 0,
}) {
  const [hoverIdx, setHoverIdx] = useState(-1);
  const [active, setActive] = useState(0);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [edge, setEdge] = useState(null);

  const trackRef = useRef(null);
  const wrapRef = useRef(null);

  const allLoaded = states.every((s) => !s.loading);
  const anyImages = states.some((s) => (s.images?.length || 0) > 0);
  const showMediaBanner = allLoaded && !anyImages;

  // Center the initial category card
  useEffect(() => {
    if (!trackRef.current) return;
    const idx = Math.min(cats.length - 1, Math.max(0, initialIdx));
    setActive(idx);
    requestAnimationFrame(() => {
      const el = trackRef.current?.querySelector(`[data-idx="${idx}"]`);
      el?.scrollIntoView({
        behavior: "auto",
        inline: "center",
        block: "nearest",
      });
    });
  }, [initialIdx, cats.length]);

  // Track which card is visually centered & arrow availability
  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;

    const update = () => {
      const slides = Array.from(root.querySelectorAll("[data-idx]"));
      if (!slides.length) return;

      const center = root.scrollLeft + root.clientWidth / 2;
      let best = 0,
        bestDist = Infinity;

      slides.forEach((el, i) => {
        const mid = el.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);

      const sl = root.scrollLeft;
      const max = root.scrollWidth - root.clientWidth;
      setCanLeft(sl > 8);
      setCanRight(sl < max - 8);
    };

    update();
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToIdx = (idx) => {
    const clamped = Math.min(cats.length - 1, Math.max(0, idx));
    const el = trackRef.current?.querySelector(`[data-idx="${clamped}"]`);
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const go = (dir) => scrollToIdx(active + dir);

  // Edge-hover logic for arrows
  const EDGE_ZONE = 88;
  const onPointerMove = (e) => {
    const host = wrapRef.current;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const x = e.clientX - r.left;
    if (x <= EDGE_ZONE) setEdge("left");
    else if (x >= r.width - EDGE_ZONE) setEdge("right");
    else setEdge(null);
  };
  const onPointerLeave = () => setEdge(null);

  const showLeft = SHOW_ARROW_NAV && edge === "left" && canLeft;
  const showRight = SHOW_ARROW_NAV && edge === "right" && canRight;

  return (
    <section id="portfolio" className="py-2">
      <header className="mb-4">
        <h2
          className={`text-4xl md:text-5xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}
        >
          Portfolio
        </h2>
        <p className={`mt-2 ${T.muted}`}>
          Hover near the edges for arrows, or use chips to jump.
        </p>

        {showMediaBanner && (
          <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-sm p-3">
            Couldn’t load images right now. If this is a new deploy, ensure
            your <span className="font-medium">manifest.json</span> contains
            category paths, or try a refresh (<code>?refresh=1</code>).
          </div>
        )}
      </header>

      {SHOW_CHIP_BAR && (
        <nav
          aria-label="Categories"
          className="mb-3 px-4 sm:px-6 md:px-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex gap-2 items-center">
            <li className="flex-shrink-0 w-1" aria-hidden="true" />
            {cats.map((c, i) => {
              const isActive = i === active;
              return (
                <li key={`chip-${c.label}`}>
                  <button
                    onClick={() => {
                      scrollToIdx(i);
                      trackEvent("portfolio_chip_click", { category: c.label });
                    }}
                    className={`px-3 py-1.5 rounded-2xl border text-sm transition shadow-sm ${
                      isActive ? T.chipActive : T.chipInactive
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {c.label}
                  </button>
                </li>
              );
            })}
            <li className="flex-shrink-0 w-1" aria-hidden="true" />
          </ul>
        </nav>
      )}

      <div
        ref={wrapRef}
        className="relative"
        onMouseMove={onPointerMove}
        onMouseLeave={onPointerLeave}
      >
        {SHOW_ARROW_NAV && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className={[
                "pointer-events-auto absolute left-2 md:left-3 top-1/2 -translate-y-1/2",
                "h-9 w-9 md:h-10 md:w-10 rounded-full border grid place-items-center transition",
                "backdrop-blur-sm text-white",
                showLeft
                  ? "bg-black/40 hover:bg-black/55 border-white/20 opacity-100"
                  : "opacity-0 pointer-events-none",
              ].join(" ")}
              aria-label="Previous category"
              style={{ zIndex: 5 }}
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              className={[
                "pointer-events-auto absolute right-2 md:right-3 top-1/2 -translate-y-1/2",
                "h-9 w-9 md:h-10 md:w-10 rounded-full border grid place-items-center transition",
                "backdrop-blur-sm text-white",
                showRight
                  ? "bg-black/40 hover:bg-black/55 border-white/20 opacity-100"
                  : "opacity-0 pointer-events-none",
              ].join(" ")}
              aria-label="Next category"
              style={{ zIndex: 5 }}
            >
              →
            </button>
          </>
        )}

        <div
          ref={trackRef}
          className="
            touch-pan-x
            flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto px-2 sm:px-3 md:px-4
            snap-x snap-mandatory
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
          role="region"
          aria-roledescription="carousel"
          aria-label="Category cards"
          tabIndex={0}
        >
          {/* left spacer so first card can center nicely */}
          <div
            className="flex-shrink-0 w-[6%] sm:w-[10%] md:w-[14%]"
            aria-hidden="true"
          />

          {cats.map((c, i) => {
            const st = states[i] || { images: [], loading: true, error: "" };
            const cover = pickCoverForCategory(st.images, c.label);
            const [rx, ry, s] = hoverIdx === i ? [4, -4, 1.02] : [0, 0, 1];
            const isActive = i === active;

            return (
              <article
                key={c.label}
                data-idx={i}
                className="snap-center relative flex-shrink-0 w-[64%] sm:w-[44%] md:w-[30%] lg:w-[24%] xl:w-[20%]"
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(-1)}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx(-1)}
              >
                <button
                  type="button"
                  // ✅ Critical: stop mouse-click focus from triggering snap-centering first
                  // (touch/drag unaffected)
                  onPointerDown={(e) => {
                    if (e.pointerType === "mouse") e.preventDefault();
                  }}
                  onClick={() => {
                    openCat(c.label);
                    trackEvent("portfolio_card_open", { category: c.label });
                  }}
                  className={[
                    "touch-pan-x",
                    "group block w-full rounded-2xl overflow-hidden border shadow-sm transition-transform duration-200",
                    isActive ? "ring-2 ring-white/80" : "",
                    T.cardBorder,
                    T.cardBg,
                  ].join(" ")}
                  style={{
                    transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`,
                  }}
                  aria-label={`Open ${c.label}`}
                >
                  <div className="aspect-[3/4] relative">
                    {cover ? (
                      <img
                        src={cover}
                        alt={c.label}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-600/30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
                    <div className="absolute left-3 right-3 bottom-3">
                      <h3 className="text-white font-['Playfair_Display'] uppercase tracking-[0.08em] text-[clamp(18px,2.2vw,28px)] drop-shadow">
                        {c.label}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-white/90 text-[11px] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        Enter →
                      </span>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}

          {/* right spacer so last card can center nicely */}
          <div
            className="flex-shrink-0 w-[6%] sm:w-[10%] md:w-[14%]"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
