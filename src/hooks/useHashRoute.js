// src/hooks/useHashRoute.js
import { useEffect, useState, useCallback } from "react";

/**
 * Small SPA router that:
 * - Respects Vite `base` (e.g. /pradhu-photography-site/)
 * - Supports both path-style URLs (/portfolio, /portfolio/weddings)
 *   and legacy hash-style URLs (#/portfolio, #/portfolio/weddings)
 *
 * Returns:
 *   { path, navigate }
 * where `path` is like:
 *   "/" | "/portfolio" | "/portfolio/weddings" | "/services" | ...
 */
export function useHashRoute() {
  const [path, setPath] = useState("/");

  const getBase = () => {
    // Vite injects this at build time; for GH Pages: "/pradhu-photography-site/"
    const b = import.meta.env.BASE_URL || "/";
    // Normalize to no trailing slash except root
    if (b === "/") return "/";
    return b.endsWith("/") ? b.slice(0, -1) : b;
  };

  const computePathFromLocation = useCallback(() => {
    if (typeof window === "undefined") return "/";

    const base = getBase();
    let pathname = window.location.pathname || "/";
    const hash = window.location.hash || "";

    // 1) If hash is in SPA form (e.g. "#/portfolio/xyz") → prefer that
    if (hash.startsWith("#/")) {
      const clean = hash.slice(1); // remove "#"
      return clean || "/";
    }

    // 2) Strip the base from pathname: "/pradhu-photography-site/portfolio"
    //    → "/portfolio"
    if (base !== "/" && pathname.startsWith(base)) {
      pathname = pathname.slice(base.length) || "/";
    }

    // Ensure leading slash
    if (!pathname.startsWith("/")) pathname = `/${pathname}`;

    // Remove potential trailing slash except root
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }

    return pathname || "/";
  }, []);

  // Sync route from actual URL
  useEffect(() => {
    const sync = () => {
      const newPath = computePathFromLocation();
      setPath((prev) => (prev === newPath ? prev : newPath));
    };

    sync(); // initial

    // Listen for back/forward + hash changes
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);

    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [computePathFromLocation]);

  // Programmatic navigation
  const navigate = useCallback((to) => {
    if (typeof window === "undefined") return;

    if (!to) to = "/";
    if (!to.startsWith("/")) to = `/${to}`;

    const base = getBase();

    // Build real URL: base + path, e.g. "/pradhu-photography-site" + "/portfolio"
    const url =
      base === "/"
        ? to
        : `${base}${to === "/" ? "" : to}`;

    window.history.pushState({}, "", url);
    setPath(to);
  }, []);

  return { path, navigate };
}
