// src/hooks/useHashRoute.js
import { useEffect, useState } from "react";

/**
 * Normalizes window.location.hash into a clean SPA "path":
 *
 *  "#"                -> "/"
 *  "#/"               -> "/"
 *  "#/portfolio"      -> "/portfolio"
 *  "#portfolio"       -> "/portfolio"
 *  "#/portfolio/wed"  -> "/portfolio/wed"
 *  "#portfolio/wed/"  -> "/portfolio/wed"
 */
function normalizeHash(hash) {
  if (!hash || hash === "#") return "/";

  let raw = hash.startsWith("#") ? hash.slice(1) : hash; // remove "#"
  raw = raw.trim();

  // Accept both "/portfolio" and "portfolio"
  if (raw.startsWith("/")) raw = raw.slice(1);

  // remove duplicate slashes
  raw = raw.replace(/\/+/g, "/");

  if (raw === "" || raw === "/") return "/";

  return "/" + raw.replace(/\/+$/, ""); // strip trailing slash, re-add one leading
}

export function useHashRoute() {
  const [path, setPath] = useState(() => normalizeHash(window.location.hash));

  useEffect(() => {
    const handler = () => {
      setPath(normalizeHash(window.location.hash));
    };

    window.addEventListener("hashchange", handler);
    // handle initial load (in case hash changed before hook mounted)
    handler();

    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return { path };
}
