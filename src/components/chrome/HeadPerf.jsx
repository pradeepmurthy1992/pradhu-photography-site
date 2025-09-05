import { useEffect } from "react";
import { HERO_BG_URL } from "@/app/config";

/** Adds preconnects and preloads hero image (high priority) */
export default function HeadPerf() {
  useEffect(() => {
    const head = document.head;

    const pre1 = document.createElement("link");
    pre1.rel = "preconnect";
    pre1.href = "https://raw.githubusercontent.com";
    head.appendChild(pre1);

    const pre2 = document.createElement("link");
    pre2.rel = "preconnect";
    pre2.href = "https://fonts.googleapis.com";
    head.appendChild(pre2);

    const pre3 = document.createElement("link");
    pre3.rel = "preconnect";
    pre3.href = "https://fonts.gstatic.com";
    pre3.crossOrigin = "anonymous";
    head.appendChild(pre3);

    const preloadHero = document.createElement("link");
    preloadHero.rel = "preload";
    preloadHero.as = "image";
    preloadHero.fetchPriority = "high";
    preloadHero.href = HERO_BG_URL;
    head.appendChild(preloadHero);

    return () => {
      [pre1, pre2, pre3, preloadHero].forEach((el) => {
        try { head.removeChild(el); } catch {}
      });
    };
  }, []);

  return null;
}
