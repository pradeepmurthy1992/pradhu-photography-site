// src/app/App.jsx
import React, { useEffect, useState } from "react";
import { useThemeTokens } from "./themeTokens";
import { NAV_ITEMS, BRAND_NAME } from "./config";
import { useHashRoute } from "@/hooks/useHashRoute";

// Chrome
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";

// Hero + CTAs
import Hero from "@/components/hero/Hero";
import StickyCTA from "@/components/ctas/StickyCTA";
import MobileActionFab from "@/components/ctas/MobileActionFab";

// Pages
import HomeTiles from "@/components/pages/HomeTiles";
import ServicesPricingPage from "@/components/pages/ServicesPricingPage";
import AboutBlock from "@/components/pages/AboutBlock";
import FaqSection from "@/components/pages/FaqSection";
import ContactPage from "@/components/pages/ContactPage";
import ReviewsPage from "@/components/pages/ReviewsPage";
import NotFound from "@/components/pages/NotFound";

// Portfolio
import Portfolio from "@/features/portfolio/Portfolio";

// SEO
import { usePageMeta } from "./seo";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("pradhu:theme");
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")
    .matches;
  return prefersDark ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const { T } = useThemeTokens(theme);
  const { path, setPath } = useHashRoute();

  // Persist theme
  useEffect(() => {
    try {
      window.localStorage.setItem("pradhu:theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  // Basic per-route SEO
  useRouteSeo(path);

  const handleNavigate = (to) => {
    setPath(to);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const page = renderRoute(path, { T, theme, setTheme, onNavigate: handleNavigate });

  return (
    <div
      className={`${T.bodyBg} ${T.pageText} min-h-screen text-sm md:text-base`}
    >
      {/* Use theme tokens for background instead of hard-coded dark gradient */}
      <div className={`${T.bodyBg} ${T.pageText} min-h-screen`}>
        {/* NAVBAR */}
        <Navbar
          T={T}
          path={path}
          theme={theme}
          setTheme={setTheme}
          onNavigate={handleNavigate}
          brand={BRAND_NAME || "PRADHU PHOTOGRAPHY"}
          navItems={NAV_ITEMS}
        />

        {/* MAIN CONTENT */}
        <main className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-20 pb-24">
          {page}
        </main>

        {/* CTAs */}
        <StickyCTA T={T} />
        <MobileActionFab T={T} />

        {/* FOOTER – now uses SPA navigation */}
        <Footer T={T} onNavigate={handleNavigate} />
      </div>
    </div>
  );
}

/**
 * Route → page mapping
 */
function renderRoute(path, { T, theme, setTheme, onNavigate }) {
  const clean = (path || "/").replace(/\/+$/, "") || "/";

  if (clean === "/" || clean === "/home") {
    return (
      <>
        <Hero T={T} onNavigate={onNavigate} />
        <section id="home-tiles" className="mt-12">
          <HomeTiles T={T} onNavigate={onNavigate} />
        </section>
        <section id="about" className="mt-16">
          <AboutBlock T={T} />
        </section>
        <section id="faq" className="mt-16">
          <FaqSection T={T} />
        </section>
      </>
    );
  }

  if (clean === "/services" || clean === "/services-pricing" || clean === "/pricing") {
    return <ServicesPricingPage T={T} />;
  }

  if (clean === "/about") {
    return (
      <>
        <Hero T={T} onNavigate={onNavigate} compact />
        <div className="mt-10">
          <AboutBlock T={T} />
        </div>
      </>
    );
  }

  if (clean === "/faq") {
    return (
      <>
        <Hero T={T} onNavigate={onNavigate} compact />
        <div className="mt-10">
          <FaqSection T={T} />
        </div>
      </>
    );
  }

  if (clean === "/contact") {
    return <ContactPage T={T} />;
  }

  if (clean === "/reviews") {
    return <ReviewsPage T={T} />;
  }

  if (clean.startsWith("/portfolio")) {
    return <Portfolio T={T} path={clean} />;
  }

  return <NotFound T={T} onNavigate={onNavigate} />;
}

/**
 * Route-based SEO
 */
function useRouteSeo(path) {
  const clean = (path || "/").replace(/\/+$/, "") || "/";
  let title = "PRADHU Photography · Pune Portrait & Fashion Photographer";
  let desc =
    "Pradhu Photography – portraits, fashion, editorial, model portfolios and weddings in Pune. Book a cinematic shoot with clear pricing and fast delivery.";

  if (clean === "/" || clean === "/home") {
    // default
  } else if (
    clean === "/services" ||
    clean === "/services-pricing" ||
    clean === "/pricing"
  ) {
    title = "Services & Pricing · PRADHU Photography";
    desc =
      "Explore shoot packages, pricing, add-ons and booking policies for portrait, fashion and event photography.";
  } else if (clean.startsWith("/portfolio")) {
    title = "Portfolio · PRADHU Photography";
    desc =
      "Browse curated shoots across categories – fashion, portraits, kids, editorial, couples and more.";
  } else if (clean === "/about") {
    title = "About Pradhu · PRADHU Photography";
    desc =
      "Learn about Pradhu – Pune-based photographer, gear, experience and the way each shoot is planned.";
  } else if (clean === "/faq") {
    title = "FAQ · PRADHU Photography";
    desc =
      "Answers to common questions on booking, outfits, reschedules, payment terms and gallery delivery.";
  } else if (clean === "/contact") {
    title = "Contact & Booking · PRADHU Photography";
    desc =
      "Send an enquiry, pick a slot and connect via WhatsApp for your next shoot with Pradhu Photography.";
  } else if (clean === "/reviews") {
    title = "Client Reviews · PRADHU Photography";
    desc =
      "Hear from clients about their experience shooting with Pradhu Photography.";
  } else {
    title = "Page Not Found · PRADHU Photography";
    desc =
      "The page you’re looking for is not available. Explore portfolio or contact to book your next shoot.";
  }

  usePageMeta(title, desc);
}
