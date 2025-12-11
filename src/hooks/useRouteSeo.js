// src/hooks/useRouteSeo.js
import { useEffect } from "react";

// We will map your SPA paths to nice SEO titles + descriptions.
// Note: here we use "home", "portfolio", "services", "contact" as keys.
const SEO_CONFIG = {
  home: {
    title: "Pradhu Photography | Fashion, Portrait & Model Portfolio",
    description:
      "Cinematic fashion and portrait photography. Explore model portfolios, editorial shoots and personal projects.",
  },
  portfolio: {
    title: "Portfolio | Pradhu Photography",
    description:
      "Browse fashion, portrait and editorial work from Pradhu Photography. Handpicked favourites from recent shoots.",
  },
  services: {
    title: "Services & Packages | Pradhu Photography",
    description:
      "Fashion, portrait, model portfolio and brand shoots. Transparent pricing and custom packages available.",
  },
  contact: {
    title: "Book a Shoot | Pradhu Photography",
    description:
      "Ready to shoot? Share your idea and get a customised concept and quote from Pradhu Photography.",
  },
};

// This hook expects the *path* string your router already has, e.g.
// "/", "/portfolio", "/services", "/contact"
export function useRouteSeo(path) {
  useEffect(() => {
    // 1) Decide which "route key" this path belongs to
    let routeKey = "home";

    if (!path || path === "/" || path === "#/" || path === "#") {
      routeKey = "home";
    } else if (path.startsWith("/portfolio") || path.startsWith("#/portfolio")) {
      routeKey = "portfolio";
    } else if (path.startsWith("/services") || path.startsWith("#/services")) {
      routeKey = "services";
    } else if (path.startsWith("/contact") || path.startsWith("#/contact")) {
      routeKey = "contact";
    }

    const cfg = SEO_CONFIG[routeKey] || SEO_CONFIG.home;

    // 2) Update <title>
    document.title = cfg.title;

    // 3) Update <meta name="description">
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", cfg.description);
  }, [path]);
}
