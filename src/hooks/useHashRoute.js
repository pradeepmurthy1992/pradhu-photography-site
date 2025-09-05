import { useEffect, useState } from "react";

/* Minimal hash router: #/route */
const DEFAULT_ROUTES = ["/", "/portfolio", "/services", "/pricing", "/about", "/reviews", "/contact"];

export default function useHashRoute(routes = DEFAULT_ROUTES) {
  const getPath = () => {
    const h = window.location.hash || "#/";
    const path = h.replace(/^#/, "");
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
