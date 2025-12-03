// src/components/intro/CinematicIntro.jsx
import React, { useEffect, useState } from "react";
import { useCinematicCovers } from "@/features/portfolio/useCinematicCovers";
import { CINEMATIC_IMAGES_FALLBACK } from "@/app/config";

const DISPLAY_MS = 2600; // ~2.6s per image

export default function CinematicIntro({ onDone }) {
  const { covers, loading } = useCinematicCovers();

  // Final image list -> dynamic covers OR fallback
  const images =
    (covers && covers.length ? covers : CINEMATIC_IMAGES_FALLBACK) || [];

  const [idx, setIdx] = useState(0);

  // Slideshow timer
  useEffect(() => {
    if (!images.length) return;

    const id = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, DISPLAY_MS);

    return () => window.clearInterval(id);
  }, [images]);

  // Auto close after a few seconds
  useEffect(() => {
    if (!images.length) {
      const id = window.setTimeout(() => {
        onDone && onDone();
      }, 900);
      return () => window.clearTimeout(id);
    }

    // Show at most ~4 images in a loop before closing
    const frames = Math.min(images.length, 4);
    const total = frames * DISPLAY_MS + 1200; // little extra

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
    <div className="fixed inset-0 z-[60] bg-black flex flex-col">
      {/* Image layer */}
      <div className="relative flex-1 flex items-center justify-center cinematic-intro-frame">
        {/* Soft vignette background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.7),_black)]" />

        {current && (
          <img
            key={current}
            src={current}
            alt="Cinematic preview"
            className="
              max-h-[80vh] max-w-[90vw]
              object-contain
              rounded-3xl
              shadow-2xl shadow-black/80
              cinematic-intro-image
            "
          />
        )}
      </div>

      {/* Text layer */}
      <div className="relative z-10 w-full px-6 pb-10 pt-4 sm:px-12 sm:pb-14 sm:pt-6 lg:px-20 lg:pb-20">
        <div className="max-w-3xl">
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
