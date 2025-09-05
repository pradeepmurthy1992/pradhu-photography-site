import React, { useEffect, useState } from "react";
import { GH_CATEGORIES } from "./categoriesMeta";
import PortfolioLanding from "./PortfolioLanding";
import PortfolioPage from "./PortfolioPage";
import { ghListFolder } from "@/lib/gh";
import useHash from "@/hooks/useHash";

export default function Portfolio({ T }) {
  const [states, setStates] = useState(() =>
    GH_CATEGORIES.map(() => ({ loading: true, error: "", images: [] }))
  );
  const [hash, setHash] = useHash();
  const [view, setView] = useState("landing");
  const [activeIdx, setActiveIdx] = useState(-1);

  const openCat = (label) => {
    const idx = GH_CATEGORIES.findIndex((c) => c.label.toLowerCase() === label.toLowerCase());
    if (idx < 0) return;
    try { sessionStorage.setItem("pradhu:lastCat", String(idx)); } catch {}
    setActiveIdx(idx);
    setView("page");
    setHash(`#portfolio/${encodeURIComponent(GH_CATEGORIES[idx].label)}`);
    const el = document.getElementById("portfolio");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goLanding = () => {
    setView("landing");
    setActiveIdx(-1);
    setHash("#portfolio");
  };

  useEffect(() => {
    if (!hash.startsWith("#portfolio")) return;
    const seg = hash.split("/");
    if (seg.length >= 2 && seg[1]) {
      const label = decodeURIComponent(seg[1].replace(/^#?portfolio\/?/, ""));
      const idx = GH_CATEGORIES.findIndex((c) => c.label.toLowerCase() === label.toLowerCase());
      if (idx >= 0) {
        setActiveIdx(idx);
        setView("page");
        return;
      }
    }
    setView("landing");
    setActiveIdx(-1);
  }, [hash]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const results = await Promise.all(
        GH_CATEGORIES.map(async (cat) => {
          try {
            const list = await ghListFolder(
              import.meta.env.VITE_GH_OWNER || "pradeepmurthy1992",
              import.meta.env.VITE_GH_REPO || "pradhu-portfolio-media",
              cat.path,
              import.meta.env.VITE_GH_BRANCH || "main"
            );
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

  if (view === "page" && activeIdx >= 0) {
    const cat = GH_CATEGORIES[activeIdx];
    const st = states[activeIdx] || { loading: true, error: "", images: [] };
    return <PortfolioPage T={T} cat={cat} state={st} onBack={goLanding} />;
  }

  const lastIdx = (() => {
    try {
      const n = Number(sessionStorage.getItem("pradhu:lastCat") || 0);
      return Number.isFinite(n) ? n : 0;
    } catch { return 0; }
  })();

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
