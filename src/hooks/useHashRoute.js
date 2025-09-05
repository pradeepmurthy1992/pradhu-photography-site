import { useEffect, useState } from "react";

/* Minimal hash router: #/route (with portfolio sub-hash normalization) */
const DEFAULT_ROUTES = ["/", "/portfolio", "/services", "/pricing", "/about", "/reviews", "/contact"];

export default function useHashRoute(routes = DEFAULT_ROUTES) {
  const getPath = () => {
    const h = window.location.hash || "#/";
    let path = h.replace(/^#/, "");       // remove leading '#'
    if (!path.startsWith("/")) path = "/" + path; // ensure leading '/'

    // 👇 normalize any portfolio sub-route like "#portfolio/Category"
    if (path.startsWith("/portfolio/")) return "/portfolio";

    // normal match
    return routes.includes(path) ? path : "/404";
  };

  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onHash = () => setPath(getPath());
    window.addEventListener("hashchange", onHash, { passive: true });
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const nav = (to) => {
    if (!to.startsWith("#")) to = `#${to}`;
    if (window.location.hash !== to) window.location.hash = to;
  };

  return [path, nav];
}
