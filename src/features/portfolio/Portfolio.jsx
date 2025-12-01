// src/features/portfolio/Portfolio.jsx
import React, { useMemo } from "react";
import { GH_CATEGORIES } from "./categoriesMeta";
import PortfolioLanding from "./PortfolioLanding";
import PortfolioPage from "./PortfolioPage";

// path like "/portfolio" or "/portfolio/weddings"
export default function Portfolio({ T, path, onNavigate }) {
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

  if (!categorySlug || !category) {
    // Landing: show all categories
    return (
      <PortfolioLanding
        T={T}
        onOpenCategory={(slug) => onNavigate(`/portfolio/${slug}`)}
      />
    );
  }

  // Category route
  return (
    <PortfolioPage
      T={T}
      category={category}
      onBack={() => onNavigate("/portfolio")}
    />
  );
}
