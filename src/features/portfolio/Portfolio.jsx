// src/features/portfolio/Portfolio.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePageMeta } from "@/app/seo";
import { GH_CATEGORIES } from "./categoriesMeta";
import PortfolioLanding from "./PortfolioLanding";
import PortfolioPage from "./PortfolioPage";
import { ghListFolder } from "@/lib/gh";

function getHash() {
  return typeof window !== "undefined" ? window.location.hash || "" : "";
}

function parsePortfolioHash(h) {
  if (!h) return { route: "", label: "" };
  let raw = h.replace(/^#/, "");
  if (raw.startsWith("/")) raw = raw.slice(1);
  const segs = raw.split("/");
  if (segs[0] !== "portfolio") return { route: raw, label: "" };
  const label = segs.length > 1 ? decodeURIComponent(segs.slice(1).join("/")) : "";
  return { route: "portfolio", label };
}

function readLastIdxSafe() {
  try {
    const n = Number(sessionStorage.getItem("pradhu:lastCat") || 0);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
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
  const [lastIdx, setLastIdx] = useState(() => readLastIdxSafe());

  const hashRef = useRef(getHash());

  const setHash = useCallback((newHash) => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
    // keep ref updated
    hashRef.current = newHash;
  }, []);

  const openCat = useCallback(
    (label) => {
      const idx = GH_CATEGORIES.findIndex(
        (c) => c.label.toLowerCase() === label.toLowerCase()
      );
      if (idx < 0) return;

      try {
        sessionStorage.setItem("pradhu:lastCat", String(idx));
      } catch {}

      setLastIdx(idx);
      setActiveIdx(idx);
      setView("page");
      setHash(`#/portfolio/${encodeURIComponent(GH_CATEGORIES[idx].label)}`);

      const el =
        typeof document !== "undefined"
          ? document.getElementById("portfolio")
          : null;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [setHash]
  );

  const goLanding = useCallback(() => {
    setView("landing");
    setActiveIdx(-1);
    setLastIdx(readLastIdxSafe());
    setHash("#/portfolio");
  }, [setHash]);

  // ✅ ALWAYS sync initial state from current hash (force = true on first run)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyHash = (force = false) => {
      const h = getHash();
      if (!force && h === hashRef.current) return; // keep guard for normal events
      hashRef.current = h;

      const { route, label } = parsePortfolioHash(h);

      if (route !== "portfolio") {
        setView("landing");
        setActiveIdx(-1);
        return;
      }

      if (label) {
        const idx = GH_CATEGORIES.findIndex(
          (c) => c.label.toLowerCase() === label.toLowerCase()
        );
        if (idx >= 0) {
          setActiveIdx(idx);
          setLastIdx(idx);
          setView("page");
          return;
        }
      }

      setView("landing");
      setActiveIdx(-1);
    };

    let ticking = false;
    const onHash = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        applyHash(false);
      });
    };

    window.addEventListener("hashchange", onHash, { passive: true });

    // ✅ Force initial sync EVEN if hashRef matches
    applyHash(true);

    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Initial GitHub fetch
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
            return {
              loading: false,
              error: e?.message || "Failed to load",
              images: [],
            };
          }
        })
      );

      if (!cancelled) setStates(results);
    })();

    return () => {
      cancelled = true;
    };
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
