// src/hooks/useHashRoute.js
import { useEffect, useState } from "react";

// Normalize any hash into a path like "/",
function normalizeHash(h) {
  if (typeof h !== "string" || !h) return "/";
  let raw = h;

  // Strip leading "#"
  if (raw.startsWith("#")) raw = raw.slice(1);

  // Default to "/"
  if (!raw) return "/";

  // Ensure leading slash
  if (!raw.startsWith("/")) raw = "/" + raw;

  return raw;
}

/**
 * Simple hash-based router:
 * - path examples: "/", "/portfolio", "/portfolio/weddings", "/contact"
 * - Uses window.location.hash under the hood.
 */
export function useHashRoute() {
  const [path, setPathState] = useState(() => {
    if (typeof window === "undefined") return "/";
    return normalizeHash(window.location.hash || "#/");
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handle = () => {
      setPathState(normalizeHash(window.location.hash || "#/"));
    };

    // Sync once on mount
    handle();
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, []);

  const setPath = (nextPath) => {
    if (typeof window === "undefined") return;

    let p = nextPath || "/";
    // Allow callers to pass "/contact" or "#/contact"
    if (p.startsWith("#")) p = p.slice(1);
    if (!p.startsWith("/")) p = "/" + p;

    const targetHash = "#" + p;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  };

  return { path, setPath };
}
