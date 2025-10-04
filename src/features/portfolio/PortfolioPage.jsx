// src/features/portfolio/PortfolioPage.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { GH_CATEGORIES_EXT } from "./categoriesMeta";

export default function PortfolioPage({ T, cat, state, onBack }) {
  const items = state.images || [];
  const blurb = GH_CATEGORIES_EXT[cat.label]?.blurb || "";

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lbIdx, setLbIdx] = useState(-1);

  // Stable list of layouts
  const LAYOUTS = useMemo(() => ["carousel", "masonry", "vertical"], []);
  const [layout, setLayout] = useState(() => {
    const u = new URL(window.location.href);
    const q = (u.searchParams.get("layout") || "").toLowerCase();
    return LAYOUTS.includes(q) ? q : "carousel";
  });

  // Avoid URL churn: only update query when layout actually changes
  useEffect(() => {
    const u = new URL(window.location.href);
    if (u.searchParams.get("layout") !== layout) {
      u.searchParams.set("layout", layout);
      window.history.replaceState(null, "", u.toString());
    }
  }, [layout]);

  // ===== Scroll / index sync (carousel) – rAF throttled
  useEffect(() => {
    if (layout !== "carousel") return;
    const root = containerRef.current;
    if (!root) return;

    let ticking = false;
    const onScroll = () => {
      if (lbIdx >= 0) return; // do not update when lightbox open
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const slides = Array.from(root.querySelectorAll("[data-idx]"));
        if (!slides.length) return;
        const center = root.scrollLeft + root.clientWidth / 2;
        let best = 0, bestDist = Infinity;
        for (let i = 0; i < slides.length; i++) {
          const el = slides[i];
          const mid = el.offsetLeft + el.offsetWidth / 2;
          const d = Math.abs(mid - center);
          if (d < bestDist) { best = i; bestDist = d; }
        }
        setActiveIndex(best);
      });
    };

    // Initial compute
    onScroll();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [layout, lbIdx]);

  // ===== Keyboard navigation (disabled when lightbox open)
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const goHoriz = (dir) => {
      const idx = Math.min(items.length - 1, Math.max(0, activeIndex + dir));
      const el = root.querySelector(`[data-idx="${idx}"]`);
      el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    };

    const onKey = (e) => {
      if (lbIdx >= 0) return;
      if (layout === "vertical") {
        if (e.key === "Home") scrollToVert(0);
        if (e.key === "End") scrollToVert(items.length - 1);
      } else {
        if (e.key === "ArrowRight") goHoriz(1);
        if (e.key === "ArrowLeft") goHoriz(-1);
        if (e.key === "Home") goHoriz(-999);
        if (e.key === "End") goHoriz(999);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [layout, activeIndex, lbIdx, items.length]);

  const goTo = useCallback((idx) => {
    const el = containerRef.current?.querySelector(`[data-idx="${idx}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  // ===== Lightbox: stable, no background scroll jump
  const scrollLockRef = useRef({ y: 0, locked: false });
  const navLightbox = useCallback((dir) => {
    setLbIdx((i) => {
      if (i < 0) return i;
      const next = Math.min(items.length - 1, Math.max(0, i + dir));
      return next;
    });
  }, [items.length]);

  const closeLbAndSync = useCallback(() => {
    const idx = lbIdx;
    setLbIdx(-1);
    const body = document.body;
    // unlock body scroll & restore
    if (scrollLockRef.current.locked) {
      body.style.position = "";
      body.style.top = "";
      window.scrollTo(0, scrollLockRef.current.y);
      scrollLockRef.current.locked = false;
    }
    if (layout === "carousel" && idx >= 0) {
      const el = containerRef.current?.querySelector(`[data-idx="${idx}"]`);
      el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [lbIdx, layout]);

  useEffect(() => {
    if (lbIdx < 0) return;
    const onKey = (e) => {
      e.stopPropagation();
      if (e.key === "Escape") { e.preventDefault(); closeLbAndSync(); }
      if (e.key === "ArrowRight") { e.preventDefault(); navLightbox(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); navLightbox(-1); }
    };
    window.addEventListener("keydown", onKey, { capture: true });

    // lock background scroll (no layout jump)
    const body = document.body;
    scrollLockRef.current.y = window.scrollY;
    body.style.position = "fixed";
    body.style.top = `-${scrollLockRef.current.y}px`;
    scrollLockRef.current.locked = true;

    return () => {
      window.removeEventListener("keydown", onKey, { capture: true });
      // unlock handled in closeLbAndSync (also runs on unmount safety below)
    };
  }, [lbIdx, closeLbAndSync, navLightbox]);

  useEffect(() => {
    // safety: unlock on unmount if still locked
    return () => {
      if (scrollLockRef.current.locked) {
        const body = document.body;
        body.style.position = "";
        body.style.top = "";
        window.scrollTo(0, scrollLockRef.current.y);
        scrollLockRef.current.locked = false;
      }
    };
  }, []);

  // ===== Vertical layout helpers
  const vWrapRef = useRef(null);
  const vItemRefs = useRef([]);
  vItemRefs.current = [];
  const registerVItem = (el) => { if (el) vItemRefs.current.push(el); };

  const scrollToVert = useCallback((idx) => {
    const el = vItemRefs.current[idx];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (layout !== "vertical") return;
    const root = vWrapRef.current;
    if (!root) return;

    const snapLine = () => root.getBoundingClientRect().top + window.innerHeight * 0.2;

    let ticking = false;
    const onScroll = () => {
      if (lbIdx >= 0) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const line = snapLine();
        let best = 0, bestDist = Infinity;
        vItemRefs.current.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.top - line);
          if (d < bestDist) { best = i; bestDist = d; }
        });
        setActiveIndex(best);
      });
    };

    // initial compute
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [layout, lbIdx]);

  const titleId = useMemo(() => `h-${Math.random().toString(36).slice(2)}`, []);

  return (
    <section className="py-2" id="portfolio" aria-labelledby={titleId}>
      {/* Floating quick-exit button */}
      <div className="fixed left-3 md:left-4 top-[calc(72px+10px)] z-[60]">
        <button
          type="button"
          onClick={() => { onBack(); }}
          aria-label="Back to categories"
          className="rounded-full px-3 py-1.5 text-sm border border-white/30 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
        >
          ← All categories
        </button>
      </div>

      {/* Sticky breadcrumb + title */}
      <div className="mb-4 sticky top-[72px] z-[1] backdrop-blur bg-white/70 dark:bg-[#1c1e26]/70 border-b border-white/10">
        <div className="pt-3">
          <button className={`${T.linkSubtle} text-sm`} onClick={() => { onBack(); }}>
            Portfolio
          </button>
          <span className={`mx-2 ${T.muted2}`}>/</span>
          <span className={`text-sm ${T.navTextStrong}`}>{cat.label}</span>
        </div>
        <h2 id={titleId} className={`mt-1 text-4xl md:text-5xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}>
          {cat.label}
        </h2>
        {blurb ? <p className={`mt-1 ${T.muted}`}>{blurb}</p> : null}
      </div>

      {/* Layout picker */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xs opacity-70">Layout:</span>
        {["carousel", "masonry", "vertical"].map((k) => (
          <button
            key={k}
            onClick={() => setLayout(k)}
            className={[
              "text-xs rounded-full border px-3 py-1 transition",
              layout === k ? "bg-black text-white border-black" : "border-neutral-300 hover:bg-neutral-100"
            ].join(" ")}
            aria-pressed={layout === k}
          >
            {k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>

      {/* Right side counter */}
      <div className="fixed right-4 md:right-6 top-[calc(72px+12px)] text-[11px] tracking-[0.25em] opacity-80 pointer-events-none z-[60]">
        {items.length ? `${activeIndex + 1} / ${items.length}` : "0 / 0"}
      </div>

      {/* ===== Content area with all three layouts ===== */}
      {state.error ? (
        <div className="text-red-500">{String(state.error)}</div>
      ) : state.loading ? (
        <div className={`${T.muted2}`}>Loading…</div>
      ) : !items.length ? (
        <div className={`${T.muted}`}>No images yet for {cat.label}.</div>
      ) : layout === "vertical" ? (
        <div
          ref={vWrapRef}
          className="
            mx-auto max-w-[980px]
            px-2 sm:px-3 md:px-4
            space-y-6 sm:space-y-8
            overflow-y-auto
            scroll-smooth
            snap-y snap-mandatory
          "
          style={{ maxHeight: "calc(100vh - 110px)" }}
        >
          {items.map((it, i) => (
            <article key={it.sha || i} ref={registerVItem} data-idx={i} className="snap-start">
              <div className={`rounded-2xl border shadow-sm ${T.cardBg} ${T.cardBorder}`}>
                <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
                  <button
                    onClick={() => { setActiveIndex(i); setLbIdx(i); }}
                    className="absolute inset-0 block w-full h-full"
                    aria-label={`Open image ${i + 1}`}
                  >
                    <img
                      src={it.url}
                      alt={cat.label}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain bg-black/5 will-change-transform"
                    />
                  </button>
                </div>
                {it.caption && (<div className="px-4 py-3"><p className={`text-sm ${T.muted}`}>{it.caption}</p></div>)}
              </div>
            </article>
          ))}
        </div>
      ) : layout === "carousel" ? (
        <>
          <div
            ref={containerRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={`${cat.label} images`}
            aria-live="polite"
            tabIndex={0}
            className="
              mx-auto max-w-[1600px]
              overflow-x-auto
              snap-x snap-mandatory
              flex items-stretch gap-4 sm:gap-5 md:gap-6
              px-2 sm:px-3 md:px-4
              pb-6
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              select-none
            "
          >
            <div className="flex-shrink-0 w-[9%] sm:w-[14%] md:w-[18%] lg:w-[21%]" aria-hidden="true" />
            {items.map((it, i) => (
              <figure
                key={it.sha || i}
                data-idx={i}
                className={[
                  "relative flex-shrink-0",
                  "w-[82%] sm:w-[72%] md:w-[64%] lg:w-[58%]",
                  "snap-center transition-transform duration-300",
                  i === activeIndex ? "scale-[1.01]" : "scale-[0.995]"
                ].join(" ")}
                style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
              >
                <div className="rounded-2xl shadow-sm">
                  <div className="relative w-full" style={{ aspectRatio: "3 / 2" }}>
                    <img
                      src={it.url}
                      alt={cat.label}
                      className="absolute inset-0 mx-auto rounded-2xl object-contain h-full w-full cursor-zoom-in will-change-transform"
                      loading="lazy"
                      decoding="async"
                      onClick={() => { setLbIdx(i); }}
                    />
                  </div>
                </div>
              </figure>
            ))}
            <div className="flex-shrink-0 w-[9%] sm:w-[14%] md:w-[18%] lg:w-[21%]" aria-hidden="true" />
          </div>

          {/* Thumbnails */}
          <div className="mt-2 flex justify-center">
            <div className="flex gap-2 overflow-x-auto px-2 pb-1" style={{ scrollbarWidth: "none" }}>
              {items.map((it, i) => (
                <button
                  key={`thumb-${i}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={[
                    "h-14 w-10 rounded-md overflow-hidden border transition",
                    i === activeIndex ? "opacity-100 ring-2 ring-white" : "opacity-70 hover:opacity-100"
                  ].join(" ")}
                >
                  <img src={it.url} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Masonry
        <div className="mx-auto max-w-[1600px] px-2 sm:px-3 md:px-4">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 md:gap-5 [column-fill:_balance]">
            {items.map((it, i) => (
              <button
                key={it.sha || i}
                onClick={() => { setActiveIndex(i); setLbIdx(i); }}
                className="mb-3 sm:mb-4 md:mb-5 w-full overflow-hidden rounded-2xl border shadow-sm hover:shadow-md transition"
                style={{ breakInside: "avoid" }}
              >
                <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
                  <img
                    src={it.url}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover will-change-transform"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== Lightbox ===== */}
      {lbIdx >= 0 && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeLbAndSync}
        >
          {/* edge controls */}
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); navLightbox(-1); }}
              className="pointer-events-auto mx-2 md:mx-4 h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center"
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); navLightbox(1); }}
              className="pointer-events-auto mx-2 md:mx-4 h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center"
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <img
            src={items[lbIdx].url}
            alt={cat.label}
            className="max-h-[92vh] max-w-[92vw] object-contain cursor-zoom-out"
            onClick={(e) => { e.stopPropagation(); closeLbAndSync(); }}
            decoding="async"
            loading="eager"
          />
        </div>
      )}
    </section>
  );
}
