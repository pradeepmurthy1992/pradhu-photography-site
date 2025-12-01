// src/features/portfolio/Portfolio.jsx
import { useMemo } from "react";
import { GH_CATEGORIES } from "./categoriesMeta";
import PortfolioLanding from "./PortfolioLanding";
import PortfolioPage from "./PortfolioPage";

// path is like "/portfolio" or "/portfolio/weddings"
export default function Portfolio({ T, path }) {
  const { categorySlug, category } = useMemo(() => {
    if (!path || path === "/portfolio") {
      return { categorySlug: null, category: null };
    }
    const parts = path.split("/").filter(Boolean); // ["portfolio", "weddings"]
    const slug = parts[1] ?? null;

    if (!slug) return { categorySlug: null, category: null };

    const match =
      GH_CATEGORIES.find(
        (c) => c.slug.toLowerCase() === slug.toLowerCase()
      ) ?? null;

    return { categorySlug: slug, category: match };
  }, [path]);

  // No slug → show landing with all categories
  if (!categorySlug || !category) {
    return <PortfolioLanding T={T} />;
  }

  // Slug present & matched → category page
  return <PortfolioPage T={T} category={category} />;
}
