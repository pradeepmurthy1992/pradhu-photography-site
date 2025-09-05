import React, { useEffect, useMemo, useRef, useState } from "react";
import { GH_CATEGORIES_EXT } from "./categoriesMeta";
import { trackEvent } from "@/app/track";

export default function PortfolioPage({ T, cat, state, onBack }) {
  const items = state.images || [];
  const blurb = GH_CATEGORIES_EXT[cat.label]?.blurb || "";

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lbIdx, setLbIdx] = useState(-1);

  const LAYOUTS = ["carousel", "masonry", "vertical"];
  const [layout, setLayout] = useState(() => {
    const u = new URL(window.location.href);
    const q = (u.searchParams.get("layout") || "").toLowerCase();
    return LAYOUTS.includes(q) ? q : "carousel";
  });

  useEffect(() => {
    const u = new URL(window.location.href);
    u.searchParams.set("layout", layout);
    window.history.replaceState(null, "", u.toString());
  }, [layout]);

  useEffect(() => {
    if (layout !== "carousel") return;
    const root = containerRef.current;
    if (!root) return;

    const update = () => {
      const slides = Array.from(root.querySelectorAll("[data-idx]"));
      if (!slides.length) return;

      const center = root.scrollLeft + root.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      slides.forEach((el, i) => {
        const mid = el.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(mid - center);
        if (d < bestDist) { best = i; bestDist = d; }
      });
      setActiveIndex(best);
    };

    update();
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [layout]);

  useEffect(() => {
    if (lbIdx >= 0) return;

    const goHoriz = (dir) => {
      const idx = Math.min(items.length - 1, Math.max(0, activeIndex + dir));
      const el = containerRef.current?.querySelector(`[data-idx="${idx}"]`);
      el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    };

    const onKey = (e) => {
      if (lbIdx >= 0) return;
      if (layout === "vertical") {
        if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); vertGo(1); }
        if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); vertGo(-1); }
        if (e.key === "Home") vertGoTo(0);
        if (e.key === "End") vertGoTo(items.length - 1);
      } else {
        if (e.key === "ArrowRight") goHoriz(1);
        if (e.key === "ArrowLeft") goHoriz(-1);
        if (e.key === "Home") goHoriz(-999);
        if (e.key === "End") goHoriz(+999);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, items.length, lbIdx, layout]);

  const goTo = (idx) => {
    const el = containerRef.current?.querySelector(`[data-idx="${idx}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const navLightbox = (dir) => {
    setLbIdx((i) => {
      if (i < 0) return i;
      const next = Math.min(items.length - 1, Math.max(0, i + dir));
      return next;
    });
  };

  const closeLbAndSync = () => {
    const idx = lbIdx;
    setLbIdx(-1);
    document.body.classList.remove("lb-open");
    document.body.style.overflow = "";
    if (layout === "carousel" && idx >= 0) {
      const el = containerRef.current?.querySelector(`[data-idx="${idx}"]`);
      el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  useEffect(() => {
    if (lbIdx < 0) return;
    const onKey = (e) => {
      e.stopPropagation();
      if (e.key === "Escape") { e.preventDefault(); closeLbAndSync(); }
      if (e.key === "ArrowRight") { e.preventDefault(); navLightbox(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); navLightbox(-1); }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [lbIdx]);

  const touchStartX = useRef(null);
  const onLbTouchStart = (e) => { touchStartX.current = e.touches?.[0]?.clientX ?? null; };
  const onLbTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = (e.changedTouches?.[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > 50) navLightbox(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  useEffect(() => {
    if (lbIdx >= 0) {
      document.body.classList.add("lb-open");
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.classList.remove("lb-open");
      document.body.style.overflow = "";
    };
  }, [lbIdx]);

  const vWrapRef = useRef(null);
  const vItemRefs = useRef([]);
  vItemRefs.current = [];
  const registerVItem = (el) => { if (el) vItemRefs.current.push(el); };

  const vertGoTo = (idx) => {
    const el = vItemRefs.current[idx];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const vertGo = (dir) => {
    const next = Math.min(items.length - 1, Math.max(0, activeIndex + dir));
    vertGoTo(next);
  };

  useEffect(() => {
    if (layout !== "vertical") return;
    const root = vWrapRef.current;
    if (!root) return;

    const snapLine = () => root.getBoundingClientRect().top + window.innerHeight * 0.2;

    let ticking = false;
    const handle = () => {
      ticking = false;
      const line = snapLine();
      let best = 0, bestDist = Infinity;
      vItemRefs.current.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top - line);
        if (d < bestDist) { best = i; bestDist = d; }
      });
      setActiveIndex(best);
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(handle); }
    };

    const io = new IntersectionObserver(onScroll, { root: null, threshold: [0, 0.5, 1] });
    vItemRefs.current.forEach((el) => io.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handle();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [layout, items.length]);

  return (
    <section className="py-2" id="portfolio">
      {/* Floating quick-exit button */}
      <div className="fixed left-3 md:left-4 top-[calc(72px+10px)] z-[60]">
        <button
          type="button"
          onClick={() => { onBack(); trackEvent("portfolio_back_to_categories", { category: cat.label }); }}
          aria-label="Back to categories"
          className="rounded-full px-3 py-1.5 text-sm border border-white/30 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
        >
          ← All categories
        </button>
      </div>

      {/* Sticky breadcrumb + title */}
      <div className="mb-4 sticky top-[72px] z-[1] backdrop-blur">
        <div className="pt-3">
          <button
            className={`${T.linkSubtle} text-sm`}
            onClick={() => { onBack(); trackEvent("breadcrumb_back", { from: cat.label }); }}
          >
            Portfolio
          </button>
          <span className={`mx-2 ${T.muted2}`}>/</span>
          <span className={`text-sm ${T.navTextStrong}`}>{cat.label}</span>
        </div>
        <h2 className={`mt-1 text-4xl md:text-5xl font-['Playfair_Display'] uppercase tracking-[0.08em] ${T.navTextStrong}`}>
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
            onClick={() => { setLayout(k); trackEvent("layout_change", { category: cat.label, layout: k }); }}
            className={[
              "text-xs rounded-full border px-3 py-1 transition",
              layout === k ? "bg-black text-white border-black" : "border-neutral-300 hover:bg-neutral-100",
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

      {/* ======== Gallery conditional ======== */}
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
                    onClick={() => { setActiveIndex(i); setLbIdx(i); trackEvent("image_open", { category: cat.label, idx: i + 1 }); }}
                    className="absolute inset-0 block w-full h-full"
                    aria-label={`Open image ${i + 1}`}
                  >
                    <img
                      src={it.url}
                      alt={cat.label}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain bg-black/5"
                    />
                  </button>
                </div>

                {it.caption && (
                  <div className="px-4 py-3">
                    <p className={`text-sm ${T.muted}`}>{it.caption}</p>
                  </div>
                )}
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
                className={`
                  relative flex-shrink-0
                  w-[82%] sm:w-[72%] md:w-[64%] lg:w-[58%]
                  snap-center transition-transform duration-300
                  ${i === activeIndex ? "scale-[1.01]" : "scale-[0.995]"}
                `}
              >
                <div className="rounded-2xl shadow-sm">
                  <div className="relative w-full" style={{ aspectRatio: "3 / 2" }}>
                    <img
                      src={it.url}
                      alt={cat.label}
                      className="absolute inset-0 mx-auto rounded-2xl object-contain h-full w-full cursor-zoom-in"
                      loading="lazy"
                      decoding="async"
                      onClick={() => { setLbIdx(i); trackEvent("image_open", { category: cat.label, idx: i + 1 }); }}
                    />
                  </div>
                </div>
              </figure>
            ))}
            <div className="flex-shrink-0 w-[9%] sm:w-[14%] md:w-[18%] lg:w-[21%]" aria-hidden="true" />
          </div>

          <div className="mt-2 flex justify-center">
            <div className="flex gap-2 overflow-x-auto px-2 pb-1" style={{ scrollbarWidth: "none" }}>
              {items.map((it, i) => (
                <button
                  key={`thumb-${i}`}
                  onClick={() => { goTo(i); trackEvent("thumb_click", { category: cat.label, idx: i + 1 }); }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`
                    h-14 w-10 rounded-md overflow-hidden border transition
                    ${i === activeIndex ? "opacity-100 ring-2 ring-white" : "opacity-60 hover:opacity-90"}
                  `}
                >
                  <img src={it.url} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-[1600px] px-2 sm:px-3 md:px-4">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 md:gap-5 [column-fill:_balance]">
            {items.map((it, i) => (
              <button
                key={it.sha || i}
                onClick={() => { setActiveIndex(i); setLbIdx(i); trackEvent("image_open", { category: cat.label, idx: i + 1 }); }}
                className="mb-3 sm:mb-4 md:mb-5 w-full overflow-hidden rounded-2xl border shadow-sm hover:shadow-md transition"
                style={{ breakInside: "avoid" }}
              >
                <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
                  <img src={it.url} alt={cat.label} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lbIdx >= 0 && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => { closeLbAndSync(); trackEvent("lightbox_close", { category: cat.label }); }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
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
            onTouchStart={onLbTouchStart}
            onTouchEnd={onLbTouchEnd}
            decoding="async"
            loading="eager"
          />
        </div>
      )}
    </section>
  );
}
