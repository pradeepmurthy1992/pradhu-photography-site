// src/hooks/useRouteSeo.js
import { useEffect } from "react";

const SEO_CONFIG = {
  home: {
    title: "Pradhu Photography | Fashion, Portrait & Model Portfolio",
    description:
      "Cinematic fashion and portrait photography. Explore the latest model portfolios, editorial shoots and personal projects.",
  },
  portfolio: {
    title: "Portfolio | Pradhu Photography",
    description:
      "Browse fashion, portrait and editorial work from Pradhu Photography. Handpicked favourites from recent shoots.",
  },
  services: {
    title: "Services & Packages | Pradhu Photography",
    description:
      "Choose from fashion, portrait, model portfolio and brand shoots. Transparent pricing and custom packages available.",
  },
  contact: {
    title: "Book a Shoot | Pradhu Photography",
    description:
      "Ready to shoot? Share your idea and get a customised concept and quote from Pradhu Photography.",
  },
};

export function useRouteSeo(routeKey) {
  useEffect(() => {
    const cfg = SEO_CONFIG[routeKey] || SEO_CONFIG.home;

    // Update <title>
    document.title = cfg.title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", cfg.description);
  }, [routeKey]);
}
