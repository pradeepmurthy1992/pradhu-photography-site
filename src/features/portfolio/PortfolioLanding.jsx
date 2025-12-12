// src/features/portfolio/PortfolioLanding.jsx
import React, { useEffect, useRef, useState } from "react";
import { pickCoverForCategory } from "@/lib/images";
import { trackEvent } from "@/app/track";

const SHOW_ARROW_NAV = true;
const SHOW_CHIP_BAR = true;

const TAP_MOVE_PX = 12;
const OPEN_GUARD_MS = 500;

export default function PortfolioLanding({ T, cats, states, openCat, initialIdx = 0 }) {
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

  // --- press tracking
  const pressRef = useRef({ active: false, moved: false, startX: 0, startY: 0, idx: -1 });

  // --- snap disable/restore
  const snapRef = useRef({ disabled: false, prev: "" });
  const snapRestoreTimer = useRef(null);

  const clearSnapTimer = () => {
    if (snapRestoreTimer.current) {
      clearTimeout(snapRestoreTimer.current);
      snapRestoreTimer.current = null;
    }
  };

  const disableSnapNow = () => {
    const root = trackRef.current;
    if (!root || snapRef.current.disabled) return;
    snapRef.current.prev = root.style.scrollSnapType || "";
    root.style.scrollSnapType = "none";
    snapRef.current.disabled = true;
  };

  const restoreSnapSoon = () => {
    clearSnapTimer();
    snapRestoreTimer.current = setTimeout(() => {
      const root = trackRef.current;
      if (!root || !snapRef.current.disabled) return;
      root.style.scrollSnapType = snapRef.current.prev || "";
      snapRef.current.disabled = false;
    }, 140);
  };

  // --- open guard
  const openGuardRef = useRef({ label: "", ts: 0 });

  const scrollToIdx = (idx, behavior = "smooth") => {
    const clamped = Math.min(cats.length - 1, Math.max(0, idx));
    const el = trackRef.current?.querySelector(`[data-idx="${clamped}"]`);
    el?.scrollIntoView({ behavior, inline: "center", block: "nearest" });
  };

  const guardedOpenByIdx = (idx) => {
    const c = cats[idx];
    if (!c) return;

    const now = Date.now();
    const prev = openGuardRef.current;
    if (prev.label === c.label && now - prev.ts < OPEN_GUARD_MS) return;
    openGuardRef.current = { label: c.label, ts: now };

    // keep last center logic intact via your existing openCat/sessionStorage
    setActive(idx);
    requestAnimationFrame(() => scrollToIdx(idx, "smooth"));

    openCat(c.label);
    trackEvent("portfolio_card_open", { category: c.label });
  };

  const idxFromPoint = (clientX, clientY) => {
    if (typeof document === "undefined") return -1;
    const el = document.elementFromPoint(clientX, clientY);
    const card = el?.closest?.("[data-idx]");
    const raw = card?.getAttribute?.("data-idx");
    const idx = raw != null ? Number(raw) : -1;
    return Number.isFinite(idx) ? idx : -1;
  };

  // Center the initial category card
  useEffect(() => {
    if (!trackRef.current) return;
    const idx = Math.min(cats.length - 1, Math.max(0, initialIdx));
    setActive(idx);
    requestAnimationFrame(() => {
      const el = trackRef.current?.querySelector(`[data-idx="${idx}"]`);
      el?.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
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
      let best = 0, bestDist = Infinity;

      slides.forEach((el, i) => {
        const mid = el.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) { bestDist = d; best = i; }
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
      clearSnapTimer();
    };
  }, []);

  const go = (dir) => scrollToIdx(active + dir);

  // Edge-hover logic for arrows
  const EDGE_ZONE = 88;
  const onPointerMoveEdge = (e) => {
    const host = wrapRef.current;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const x = e.clientX - r.left;
    if (x <= EDGE_ZONE) setEdge("left");
    else if (x >= r.width - EDGE_ZONE) setEdge("right");
    else setEdge(null);
  };
  const onPointerLeaveEdge = () => setEdge(null);

  const showLeft = SHOW_ARROW_NAV && edge === "left" && canLeft;
  const showRight = SHOW_ARROW_NAV && edge === "right" && canRight;

  // ===== Core: disable snap while pressing, detect tap vs swipe
  const onTrackPointerDownCapture = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    disableSnapNow();

    const idx = idxFromPoint(e.clientX, e.clientY);
    pressRef.current = { active: true, moved: false, startX: e.clientX, startY: e.clientY, idx };
  };

  const onTrackPointerMoveCapture = (e) => {
    const p = pressRef.current;
    if (!p.active) return;

    const dx = e.clientX - p.startX;
    const dy = e.clientY - p.startY;
    if (Math.hypot(dx, dy) > TAP_MOVE_PX) p.moved = true;
  };

  const finishPress = () => {
    pressRef.current.active = false;
    restoreSnapSoon();
  };

  const onTrackPointerUpCapture = (e) => {
    const p = pressRef.current;
    if (!p.active) return;

    const moved = p.moved;
    finishPress();
    if (moved) return;

    const idx = idxFromPoint(e.clientX, e.clientY);
    if (idx >= 0) guardedOpenByIdx(idx);
  };

  const onTrackPointerCancel = () => {
    const p = pressRef.current;
    if (!p.active) return;

    const moved = p.moved;
    finishPress();

    // If cancel happened without movement, treat it like a tap (fixes “first tap centers only”)
    if (!moved && p.idx >= 0) guardedOpenByIdx(p.idx);
  };

  return (
    <section id="portfolio" className="py-2">
      <header className="mb-4">
        <h2 className={`text-4xl md:text-5xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}>
          Portfolio
        </h2>
        <p className={`mt-2 ${T.muted}`}>Hover near the edges for arrows, or use chips to jump.</p>

        {showMediaBanner && (
          <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 text-sm p-3">
            Couldn’t load images right now. Ensure manifest.json has category paths, or try <code>?refresh=1</code>.
          </div>
        )}
      </header>

      {SHOW_CHIP_BAR && (
        <nav aria-label="Categories" className="mb-3 px-4 sm:px-6 md:px-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                    className={`px-3 py-1.5 rounded-2xl border text-sm transition shadow-sm ${isActive ? T.chipActive : T.chipInactive}`}
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

      <div ref={wrapRef} className="relative" onMouseMove={onPointerMoveEdge} onMouseLeave={onPointerLeaveEdge}>
        {SHOW_ARROW_NAV && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className={[
                "pointer-events-auto absolute left-2 md:left-3 top-1/2 -translate-y-1/2",
                "h-9 w-9 md:h-10 md:w-10 rounded-full border grid place-items-center transition",
                "backdrop-blur-sm text-white",
                showLeft ? "bg-black/40 hover:bg-black/55 border-white/20 opacity-100" : "opacity-0 pointer-events-none",
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
                showRight ? "bg-black/40 hover:bg-black/55 border-white/20 opacity-100" : "opacity-0 pointer-events-none",
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
          onPointerDownCapture={onTrackPointerDownCapture}
          onPointerMoveCapture={onTrackPointerMoveCapture}
          onPointerUpCapture={onTrackPointerUpCapture}
          onPointerCancel={onTrackPointerCancel}
        >
          <div className="flex-shrink-0 w-[6%] sm:w-[10%] md:w-[14%]" aria-hidden="true" />

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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      guardedOpenByIdx(i);
                    }
                  }}
                  className={[
                    "touch-pan-x",
                    "group block w-full rounded-2xl overflow-hidden border shadow-sm transition-transform duration-200",
                    isActive ? "ring-2 ring-white/80" : "",
                    T.cardBorder,
                    T.cardBg,
                  ].join(" ")}
                  style={{ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})` }}
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

          <div className="flex-shrink-0 w-[6%] sm:w-[10%] md:w-[14%]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
