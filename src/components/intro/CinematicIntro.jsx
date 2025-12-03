// src/components/intro/CinematicIntro.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useCinematicCovers } from "@/features/portfolio/useCinematicCovers";
import { CINEMATIC_IMAGES_FALLBACK } from "@/app/config";

const DISPLAY_MS = 1800; // ~1.8s per focused image

export default function CinematicIntro({ onDone }) {
  const { covers, loading } = useCinematicCovers();

  // Use dynamic covers if available, else fallback from config
  const images =
    (covers && covers.length ? covers : CINEMATIC_IMAGES_FALLBACK) || [];

  const [idx, setIdx] = useState(0);

  // Precompute random meta for background floating images
  const bgMeta = useMemo(() => {
    if (!images.length) return [];
    const unique = Array.from(new Set(images)); // avoid duplicates
    return unique.slice(0, 7).map((src) => ({
      src,
      top: 20 + Math.random() * 55, // 20–75% of height
      left: 10 + Math.random() * 80, // 10–90% of width
      size: 22 + Math.random() * 18, // 22–40 vw
      opacity: 0.18 + Math.random() * 0.22,
      duration: 8000 + Math.random() * 5000, // 8–13s float
      delay: Math.random() * 4000, // staggered
    }));
  }, [images]);

  // Lock page scroll while overlay is active
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Advance focused image
  useEffect(() => {
    if (!images.length) return;

    const id = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, DISPLAY_MS);

    return () => window.clearInterval(id);
  }, [images]);

  // Auto-close after a short reel
  useEffect(() => {
    if (!images.length) {
      const id = window.setTimeout(() => onDone && onDone(), 900);
      return () => window.clearTimeout(id);
    }

    const framesToShow = Math.min(images.length, 5); // up to 5 key frames
    const total = framesToShow * DISPLAY_MS + 1200;

    const id = window.setTimeout(() => {
      onDone && onDone();
    }, total);

    return () => window.clearTimeout(id);
  }, [images, onDone]);

  if (!images.length && loading) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black">
        {/* No visible text requested, so keep this visually empty */}
      </div>
    );
  }

  const current = images[idx] || images[0];

  return (
    <div
      className="fixed inset-0 z-[60] bg-black cinematic-root"
      aria-hidden="true"
    >
      <div className="relative h-full w-full flex items-center justify-center cinematic-frame">
        {/* Soft dark gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.9),_black)]" />

        {/* Cinema bars */}
        <div className="cinematic-bars" aria-hidden="true" />

        {/* Blurry floating background images */}
        {bgMeta.map((m, i) => (
          <img
            key={`${m.src}-${i}`}
            src={m.src}
            alt=""
            className="cinematic-bg-img"
            style={{
              top: `${m.top}%`,
              left: `${m.left}%`,
              width: `${m.size}vw`,
              opacity: m.opacity,
              animationDuration: `${m.duration}ms`,
              animationDelay: `${m.delay}ms`,
            }}
          />
        ))}

        {/* Focused main image */}
        {current && (
          <img
            key={current}
            src={current}
            alt=""
            className="
              cinematic-image
              max-h-[72vh] max-w-[92vw]
              object-cover
              rounded-[2.2rem]
              shadow-2xl shadow-black/80
            "
          />
        )}
      </div>
    </div>
  );
}
