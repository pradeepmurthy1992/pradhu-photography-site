import { useEffect, useState } from "react";

/* Tiny hash util for #portfolio/... (state sync) */
export default function useHash() {
  const [hash, setHashState] = useState(() => window.location.hash || "");

  useEffect(() => {
    const onHash = () => setHashState(window.location.hash || "");
    window.addEventListener("hashchange", onHash, { passive: true });
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setHash = (h) => {
    if (window.location.hash !== h) window.location.hash = h;
  };

  return [hash, setHash];
}
