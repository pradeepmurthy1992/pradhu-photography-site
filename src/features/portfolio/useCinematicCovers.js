// src/features/portfolio/useCinematicCovers.js
import { useEffect, useState } from "react";
import { GH_CATEGORIES } from "./categoriesMeta";
import { ghListFolder } from "@/lib/gh";
import { pickCoverForCategory } from "@/lib/images";

/**
 * Fetch a list of "cover" images, one per portfolio category.
 * This mirrors the cover logic already used in PortfolioLanding / PortfolioPage.
 */
export function useCinematicCovers() {
  const [covers, setCovers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const owner = import.meta.env.VITE_GH_OWNER || "pradeepmurthy1992";
        const repo = import.meta.env.VITE_GH_REPO || "pradhu-portfolio-media";
        const branch = import.meta.env.VITE_GH_BRANCH || "main";

        const results = await Promise.all(
          GH_CATEGORIES.map(async (cat) => {
            try {
              const list = await ghListFolder(owner, repo, cat.path, branch);
              const coverUrl = pickCoverForCategory(list, cat.label);
              return coverUrl || null;
            } catch {
              return null;
            }
          })
        );

        if (!cancelled) {
          setCovers(results.filter(Boolean));
        }
      } catch {
        if (!cancelled) {
          setCovers([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { covers, loading };
}
