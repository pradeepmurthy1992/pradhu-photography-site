// src/app/App.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useThemeTokens } from "./themeTokens";

// Chrome
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import HeadFonts from "@/components/chrome/HeadFonts";
import HeadPerf from "@/components/chrome/HeadPerf";

// Hero
import Hero from "@/components/hero/Hero";

// CTAs
import StickyCTA from "@/components/ctas/StickyCTA";
import MobileActionFab from "@/components/ctas/MobileActionFab";

// Intro overlay
import IntroOverlay from "@/components/intro/IntroOverlay";

// Pages
import HomeTiles from "@/components/pages/HomeTiles";
import ServicesPricingPage from "@/components/pages/ServicesPricingPage";
import AboutBlock from "@/components/pages/AboutBlock";
import FaqSection from "@/components/pages/FaqSection";
import ContactPage from "@/components/pages/ContactPage";
import ReviewsPage from "@/components/pages/ReviewsPage";
import NotFound from "@/components/pages/NotFound";

// Features
import Portfolio from "@/features/portfolio/Portfolio";

// Optional tracking helper if you want later
// import { trackEvent } from "./track";

const APP_BASE = "/pradhu-photography-site";

function normalizePath(raw) {
  if (!raw) return "/";
  let p = raw;

  // Strip GitHub Pages base prefix
  if (p.startsWith(APP_BASE)) {
    p = p.slice(APP_BASE.length) || "/";
  }

  if (!p.startsWith("/")) p = `/${p}`;
  return p || "/";
}

function getInitialPath() {
  if (typeof window === "undefined") return "/";
  return normalizePath(window.location.pathname || "/");
}

export default function App() {
  // ---------------- THEME ----------------
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    try {
      const saved = window.localStorage.getItem("pradhu:theme");
      if (saved === "light" || saved === "dark") return saved;
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });

  // Apply theme to <html> so Tailwind "dark" works
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      window.localStorage.setItem("pradhu:theme", theme);
    } catch {}
  }, [theme]);

  const T = useThemeTokens(theme);

  // ---------------- ROUTING ----------------
  const [path, setPath] = useState(getInitialPath);

  // Handle back/forward buttons
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPop = () => setPath(getInitialPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to) => {
    if (typeof window === "undefined") return;

    const normalized = normalizePath(to);
    const full =
      APP_BASE + (normalized === "/" ? "" : normalized); // "/pradhu-photography-site" + "/portfolio"

    window.history.pushState({}, "", full);
    setPath(normalized);

    // Optional scroll-to-top for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Optional: tracking later
    // trackEvent("nav_click", { to: normalized });
  };

  // Which page to show?
  const page = useMemo(() => {
    // Portfolio base or category
    if (path === "/portfolio" || path.startsWith("/portfolio/")) {
      return (
        <Portfolio
          T={T}
          path={path} // Portfolio.jsx parses slug from this
        />
      );
    }

    switch (path) {
      case "/":
        return (
          <>
            <Hero
              T={T}
              onPrimaryCta={() => navigate("/contact")}
            />
            <HomeTiles T={T} onNavigate={navigate} />
          </>
        );

      case "/services-pricing":
        return <ServicesPricingPage T={T} />;

      case "/about":
        return (
          <section className="max-w-5xl mx-auto px-4">
            <AboutBlock T={T} />
          </section>
        );

      case "/faq":
        return (
          <section className="max-w-5xl mx-auto px-4">
            <FaqSection T={T} />
          </section>
        );

      case "/contact":
        return <ContactPage T={T} />;

      case "/reviews":
        return <ReviewsPage T={T} />;

      default:
        return <NotFound T={T} />;
    }
  }, [path, T]);

  return (
    <>
      {/* Head performance helpers */}
      <HeadPerf />
      <HeadFonts />

      <div
        className={`min-h-screen ${
          theme === "dark"
            ? "bg-slate-950 text-slate-50"
            : "bg-slate-50 text-slate-900"
        }`}
      >
        {/* Top navigation (desktop + mobile hamburger) */}
        <Navbar
          T={T}
          path={path}
          theme={theme}
          setTheme={setTheme}
          onNavigate={navigate}
        />

        {/* Main content */}
        <main className="pt-16 pb-24">{page}</main>

        {/* Footer with contact + links */}
        <Footer T={T} onNavigate={navigate} />

        {/* Floating CTAs */}
        <StickyCTA
          T={T}
          onPrimary={() => navigate("/contact")}
        />
        <MobileActionFab
          T={T}
          onPrimary={() => navigate("/contact")}
        />

        {/* Cinematic intro gate (if you enabled it) */}
        <IntroOverlay T={T} />
      </div>
    </>
  );
}
