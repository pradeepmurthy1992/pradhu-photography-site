// src/features/portfolio/Portfolio.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { usePageMeta } from "@/app/seo";
import { GH_CATEGORIES } from "./categoriesMeta";
import PortfolioLanding from "./PortfolioLanding";
import PortfolioPage from "./PortfolioPage";
import { ghListFolder } from "@/lib/gh";

function getHash() {
  return typeof window !== "undefined" ? window.location.hash || "" : "";
}

function parsePortfolioHash(h) {
  // Accept "#portfolio", "##/portfolio", "#/portfolio/Category", "#portfolio/Category"
  if (!h) return { route: "", label: "" };
  let raw = h.replace(/^#/, "");
  if (raw.startsWith("/")) raw = raw.slice(1);
  const segs = raw.split("/");
  // segs[0] is "portfolio" if on portfolio route
  if (segs[0] !== "portfolio") return { route: raw, label: "" };
  const label = segs.length > 1 ? decodeURIComponent(segs.slice(1).join("/")) : "";
  return { route: "portfolio", label };
}

export default function Portfolio({ T }) {
  usePageMeta(
    "Portfolio | PRADHU Photography",
    "Explore curated categories — Fashion, Editorial, Kids, Headshots, Events, Landscapes, and more."
  );

  const [states, setStates] = useState(() =>
    GH_CATEGORIES.map(() => ({ loading: true, error: "", images: [] }))
  );

  const [view, setView] = useState("landing");
  const [activeIdx, setActiveIdx] = useState(-1);

  // Hash state kept in a ref to reduce re-renders
  const hashRef = useRef(getHash());
  const setHash = useCallback((newHash) => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
      hashRef.current = newHash;
    }
  }, []);

  // Open a category by label
  const openCat = useCallback((label) => {
    const idx = GH_CATEGORIES.findIndex((c) => c.label.toLowerCase() === label.toLowerCase());
    if (idx < 0) return;
    try { sessionStorage.setItem("pradhu:lastCat", String(idx)); } catch {}
    setActiveIdx(idx);
    setView("page");
    setHash(`#/portfolio/${encodeURIComponent(GH_CATEGORIES[idx].label)}`);
    // Smooth-scroll to section (guard for SSR)
    const el = typeof document !== "undefined" ? document.getElementById("portfolio") : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [setHash]);

  const goLanding = useCallback(() => {
    setView("landing");
    setActiveIdx(-1);
    setHash("#/portfolio");
  }, [setHash]);

  // Hash router listener (throttled by rAF)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const onHash = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const h = getHash();
        if (h === hashRef.current) return;
        hashRef.current = h;
        const { route, label } = parsePortfolioHash(h);
        if (route !== "portfolio") {
          setView("landing");
          setActiveIdx(-1);
          return;
        }
        if (label) {
          const idx = GH_CATEGORIES.findIndex((c) => c.label.toLowerCase() === label.toLowerCase());
          if (idx >= 0) {
            setActiveIdx(idx);
            setView("page");
            return;
          }
        }
        setView("landing");
        setActiveIdx(-1);
      });
    };
    window.addEventListener("hashchange", onHash, { passive: true });
    // Initial hydrate
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Initial GH fetch (manifest-first in ghListFolder)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const owner = import.meta.env.VITE_GH_OWNER || "pradeepmurthy1992";
      const repo = import.meta.env.VITE_GH_REPO || "pradhu-portfolio-media";
      const branch = import.meta.env.VITE_GH_BRANCH || "main";

      const results = await Promise.all(
        GH_CATEGORIES.map(async (cat) => {
          try {
            const list = await ghListFolder(owner, repo, cat.path, branch);
            return { loading: false, error: "", images: list };
          } catch (e) {
            return { loading: false, error: e?.message || "Failed to load", images: [] };
          }
        })
      );
      if (!cancelled) setStates(results);
    })();
    return () => { cancelled = true; };
  }, []);

  // Restore last category if landing and there is a saved one and no label present
  const lastIdx = useMemo(() => {
    try {
      const n = Number(sessionStorage.getItem("pradhu:lastCat") || 0);
      return Number.isFinite(n) ? n : 0;
    } catch { return 0; }
  }, []);

  if (view === "page" && activeIdx >= 0) {
    const cat = GH_CATEGORIES[activeIdx];
    const st = states[activeIdx] || { loading: true, error: "", images: [] };
    return <PortfolioPage T={T} cat={cat} state={st} onBack={goLanding} />;
  }

  return (
    <PortfolioLanding
      T={T}
      cats={GH_CATEGORIES}
      states={states}
      openCat={openCat}
      initialIdx={lastIdx}
    />
  );
}
