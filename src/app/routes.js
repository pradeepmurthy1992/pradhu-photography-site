// src/app/routes.js

// Canonical route list for hash-based SPA.
// These paths assume `useHashRoute()` returns values like "/", "/portfolio", "/services", etc.
export const ROUTES = [
  {
    path: "/",
    key: "home",
    title: "Home",
  },
  {
    path: "/portfolio",
    key: "portfolio",
    title: "Portfolio",
  },
  {
    path: "/services",
    key: "services",
    title: "Services & Pricing",
  },
  {
    path: "/about",
    key: "about",
    title: "About",
  },
  {
    path: "/reviews",
    key: "reviews",
    title: "Reviews",
  },
  {
    path: "/contact",
    key: "contact",
    title: "Contact",
  },
];

// Helper to find the active route for a path like "/portfolio"
export function findRoute(path) {
  return ROUTES.find((r) => r.path === path) || null;
}
