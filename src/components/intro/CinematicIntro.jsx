// src/components/intro/CinematicIntro.jsx
import React, { useEffect, useState } from "react";
import { useCinematicCovers } from "@/features/portfolio/useCinematicCovers";
import { CINEMATIC_IMAGES_FALLBACK } from "@/app/config";

export default function CinematicIntro({ onDone }) {
  const { covers, loading } = useCinematicCovers();

  // Final image list -> dynamic covers OR fallback
  const images =
    (covers && covers.length ? covers : CINEMATIC_IMAGES_FALLBACK) || [];

  const [idx, setIdx] = useState(0);

  // Simple slideshow
  useEffect(() => {
    if (!images.length) return;

    const id = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 900); // ~0.9s per frame

    return () => window.clearInterval(id);
  }, [images]);

  // Auto close after a few seconds
  useEffect(() => {
    // If nothing useful, close quickly
    if (!images.length) {
      const id = window.setTimeout(() => {
        onDone && onDone();
      }, 800);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      onDone && onDone();
    }, 4200); // ~4.2s reel

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
    <div className="fixed inset-0 z-[60] bg-black">
      {/* Image layer */}
      <div className="absolute inset-0">
        {current && (
          <img
            src={current}
            alt="Cinematic preview"
            className="h-full w-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Text layer */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-10 sm:px-12 sm:pb-14 lg:px-20 lg:pb-20">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-emerald-300">
          Pradhu Photography
        </p>
        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
          A quick dive into the gallery
        </h2>
        <p className="mt-2 max-w-xl text-sm text-slate-200">
          A few favourite frames from fashion, portraits and couples — before
          you step into the full site.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
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
  );
}
