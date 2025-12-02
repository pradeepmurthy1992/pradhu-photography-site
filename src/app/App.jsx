// src/app/App.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useThemeTokens } from "./themeTokens";
import {
  BRAND_NAME,
  INTRO_AUTO_DISMISS_MS,
  INTRO_FORCE_HASH,
  INTRO_BRAND,
  INTRO_NAME,
  INTRO_LEFT_IMAGE_URL,
} from "./config";

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

// Portfolio (uses slug from path: "/portfolio", "/portfolio/weddings")
import Portfolio from "@/features/portfolio/Portfolio";

// Optional SEO per-page (pages themselves may also call usePageMeta)
import { usePageMeta } from "./seo";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("pradhu:theme");
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")
    .matches;
  return prefersDark ? "dark" : "dark"; // default to dark
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const { T } = useThemeTokens(theme);
  const { path, setPath } = useHashRoute();

  // Always show intro on refresh (for now)
  const [showIntro, setShowIntro] = useState(true);

  // Persist theme
  useEffect(() => {
    try {
      window.localStorage.setItem("pradhu:theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const handleCloseIntro = useCallback(() => {
    // Just hide the intro for this session
    setShowIntro(false);

    try {
      // If you're on the forced intro hash, move back to home
      if (
        typeof window !== "undefined" &&
        INTRO_FORCE_HASH &&
        window.location.hash === INTRO_FORCE_HASH
      ) {
        setPath("/");
      }
    } catch {
      // ignore
    }
  }, [setPath]);

  // Optional auto-dismiss of intro
  useEffect(() => {
    if (!showIntro || !INTRO_AUTO_DISMISS_MS) return;
    if (typeof window === "undefined") return;

    const id = window.setTimeout(() => {
      handleCloseIntro();
    }, INTRO_AUTO_DISMISS_MS);

    return () => window.clearTimeout(id);
  }, [showIntro, handleCloseIntro]);

  // Basic per-route SEO title/description
  useRouteSeo(path);

  const handleNavigate = (to) => {
    setPath(to);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const page = renderRoute(path, {
    T,
    theme,
    setTheme,
    onNavigate: handleNavigate,
  });

  return (
    <div className="min-h-screen text-sm md:text-base">
      {/* Intro overlay */}
      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
          <div className="relative mx-4 flex max-w-4xl flex-col overflow-hidden rounded-3xl border border-emerald-500/40 bg-slate-950/95 shadow-2xl md:flex-row">
            {INTRO_LEFT_IMAGE_URL && (
              <div className="relative hidden w-1/2 md:block">
                <img
                  src={INTRO_LEFT_IMAGE_URL}
                  alt="Pradhu intro"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                {INTRO_BRAND || "PRADHU PHOTOGRAPHY"}
              </p>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                {INTRO_NAME || "Cinematic portraits & fashion stories"}
              </h1>
              <p className="text-sm text-slate-200">
                A quick intro to my work — portraits, editorials and portfolios
                shot across Pune, Mumbai, Chennai and Bengaluru.
              </p>
              <p className="text-xs text-slate-400">
                Hit “Enter studio” to step into the full website and explore the
                portfolio, services and booking.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCloseIntro}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-emerald-500/40 hover:bg-emerald-400"
                >
                  Enter studio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* THEME-AWARE PAGE BACKGROUND */}
      <div
        className={`min-h-screen ${
          theme === "dark"
            ? "bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950 text-slate-50"
            : // soft, slightly warm light theme
              "bg-[#f3eee5] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(0,0,0,0.04),_transparent_65%)] text-neutral-900"
        }`}
      >
        {/* Flex column so footer sits at the very bottom */}
        <div className="flex min-h-screen flex-col">
          {/* NAVBAR */}
          <Navbar
            T={T}
            path={path}
            theme={theme}
            setTheme={setTheme}
            onNavigate={handleNavigate}
            brand={BRAND_NAME || "PRADHU PHOTOGRAPHY"}
          />

          {/* MAIN */}
          <main className="flex-1 pt-20 pb-24">{page}</main>

          {/* CTAs (fixed, but keep them near the bottom in DOM) */}
          <StickyCTA T={T} />
          <MobileActionFab T={T} />

          {/* FOOTER */}
          <Footer T={T} theme={theme} onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
}

/**
 * Route → page mapping.
 */
function renderRoute(path, { T, theme, setTheme, onNavigate }) {
  let clean = (path || "/").replace(/\/+$/, "") || "/";

  // Treat "/faq" as home (fallback for old links)
  if (clean === "/faq") clean = "/";

  // Full-width shell with side padding (wider layout)
  const Shell = ({ children }) => (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
      {children}
    </div>
  );

  if (clean === "/" || clean === "/home") {
    return (
      <>
        {/* Hero full width */}
        <Hero T={T} />
        {/* Home sections in wide shell */}
        <Shell>
          <section id="home-tiles" className="mt-12">
            <HomeTiles T={T} onNavigate={onNavigate} />
          </section>
          <section id="about" className="mt-16">
            <AboutBlock T={T} />
          </section>
          <section id="faq" className="mt-16">
            <FaqSection T={T} />
          </section>
        </Shell>
      </>
    );
  }

  if (
    clean === "/services" ||
    clean === "/services-pricing" ||
    clean === "/pricing"
  ) {
    return (
      <Shell>
        <ServicesPricingPage T={T} />
      </Shell>
    );
  }

  if (clean === "/about") {
    return (
      <>
        <Hero T={T} />
        <Shell>
          <div className="mt-10">
            <AboutBlock T={T} />
          </div>
        </Shell>
      </>
    );
  }

  // No separate /faq page anymore

  if (clean === "/contact") {
    return (
      <Shell>
        <ContactPage T={T} theme={theme} />
      </Shell>
    );
  }

  if (clean === "/reviews") {
    return (
      <Shell>
        <ReviewsPage T={T} />
      </Shell>
    );
  }

  if (clean.startsWith("/portfolio")) {
    return (
      <Shell>
        <Portfolio T={T} path={clean} />
      </Shell>
    );
  }

  return (
    <Shell>
      <NotFound T={T} onNavigate={onNavigate} />
    </Shell>
  );
}

/**
 * Per-route SEO
 */
function useRouteSeo(path) {
  let clean = (path || "/").replace(/\/+$/, "") || "/";

  // Alias /faq → home for SEO as well
  if (clean === "/faq") clean = "/";

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
      "Learn about Pradhu – photographer, gear, experience and the way each shoot is planned.";
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
