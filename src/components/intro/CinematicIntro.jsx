// src/components/intro/CinematicIntro.jsx
import React, { useEffect, useState } from "react";
import { useCinematicCovers } from "@/features/portfolio/useCinematicCovers";
import { CINEMATIC_IMAGES_FALLBACK } from "@/app/config";

const DISPLAY_MS = 1800; // ~1.8s per image → snappier & cinematic

export default function CinematicIntro({ onDone }) {
  const { covers, loading } = useCinematicCovers();

  // If dynamic covers available, use them; else fall back to config list
  const images =
    (covers && covers.length ? covers : CINEMATIC_IMAGES_FALLBACK) || [];

  const [idx, setIdx] = useState(0);

  // Advance frames
  useEffect(() => {
    if (!images.length) return;

    const id = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, DISPLAY_MS);

    return () => window.clearInterval(id);
  }, [images]);

  // Auto-close after a few frames
  useEffect(() => {
    if (!images.length) {
      const id = window.setTimeout(() => onDone && onDone(), 800);
      return () => window.clearTimeout(id);
    }

    const framesToShow = Math.min(images.length, 5); // show up to 5 frames
    const total = framesToShow * DISPLAY_MS + 1200;

    const id = window.setTimeout(() => {
      onDone && onDone();
    }, total);

    return () => window.clearTimeout(id);
  }, [images, onDone]);

  if (!images.length && loading) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black">
        <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
          Loading gallery…
        </p>
      </div>
    );
  }

  const current = images[idx] || images[0];

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col cinematic-root">
      {/* Main visual area */}
      <div className="relative flex-1 flex items-center justify-center cinematic-frame">
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.9),_black)]" />

        {/* Top & bottom letterbox (cinema bars) */}
        <div className="cinematic-bars" aria-hidden="true" />

        {current && (
          <img
            key={current}
            src={current}
            alt="Cinematic preview"
            className="
              cinematic-image
              max-h-[72vh] max-w-[92vw]
              object-cover
              rounded-[2rem]
              shadow-2xl shadow-black/80
            "
          />
        )}

        {/* Tiny tag in top-left */}
        <div className="absolute left-6 top-6 sm:left-10 sm:top-8 text-[0.65rem] uppercase tracking-[0.35em] text-slate-300/80">
          PRADHU REEL · 01
        </div>
      </div>

      {/* Bottom copy & button */}
      <div className="relative z-10 w-full px-6 pb-10 pt-4 sm:px-12 sm:pb-14 sm:pt-6 lg:px-20 lg:pb-20">
        <div className="max-w-3xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-emerald-300">
            Pradhu Photography
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
            A quick cinematic glimpse before you enter.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-200">
            Frames from fashion, portraits and couples — playing as a teaser
            before you step into the full site.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={onDone}
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-emerald-500/40 hover:bg-emerald-400"
            >
              Enter site
            </button>
            <span className="text-[0.7rem] uppercase tracking-[0.26em] text-slate-400">
              Auto-continue in a moment…
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
