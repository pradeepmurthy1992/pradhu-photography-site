// src/hooks/useHashRoute.js
import { useCallback, useEffect, useState } from "react";

/**
 * Normalise the hash into a route path:
 *  "" or "#"            → "/"
 *  "#/about"           → "/about"
 *  "#about"            → "/about"
 *  "#/portfolio/kids"  → "/portfolio"  (category handled inside Portfolio)
 */
function normalizeHash(hash) {
  if (!hash || hash === "#") return "/";

  let h = hash;
  if (h.startsWith("#")) h = h.slice(1); // remove "#"
  if (!h.startsWith("/")) h = "/" + h;

  if (h.startsWith("/portfolio")) return "/portfolio";
  return h;
}

export function useHashRoute() {
  const [path, setPath] = useState(() => {
    if (typeof window === "undefined") return "/";
    return normalizeHash(window.location.hash);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onHashChange = () => {
      setPath(normalizeHash(window.location.hash));
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((nextPath) => {
    if (typeof window === "undefined") return;

    if (!nextPath || nextPath === "/") {
      window.location.hash = "";
      return;
    }

    let p = nextPath;
    if (!p.startsWith("/")) p = "/" + p;
    window.location.hash = p; // e.g. "#/contact", "#/portfolio"
  }, []);

  return [path, navigate];
}
