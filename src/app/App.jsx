// src/app/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import { ROUTES } from "./routes";
import { useThemeTokens } from "./themeTokens";

import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import Hero from "@/components/hero/Hero";
import StickyCTA from "@/components/ctas/StickyCTA";
import MobileActionFab from "@/components/ctas/MobileActionFab";
import IntroOverlay from "@/components/intro/IntroOverlay";

import Portfolio from "@/features/portfolio/Portfolio";

import HomeTiles from "@/components/pages/HomeTiles";
import ServicesPricingPage from "@/components/pages/ServicesPricingPage";
import AboutBlock from "@/components/pages/AboutBlock";
import FaqSection from "@/components/pages/FaqSection";
import ContactPage from "@/components/pages/ContactPage";
import ReviewsPage from "@/components/pages/ReviewsPage";
import NotFound from "@/components/pages/NotFound";

const BASE = (import.meta.env.BASE_URL || "").replace(/\/$/, "");

function getInitialPath() {
  if (typeof window === "undefined") return "/";
  const full = window.location.pathname || "/";
  let path = full.startsWith(BASE) ? full.slice(BASE.length) : full;
  if (!path || path === "") return "/";
  if (!path.startsWith("/")) path = "/" + path;
  return path;
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [path, setPath] = useState(getInitialPath);

  const T = useThemeTokens(theme);

  useEffect(() => {
    const onPop = () => setPath(getInitialPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (nextPath) => {
    if (typeof window === "undefined") return;
    if (!nextPath.startsWith("/")) nextPath = "/" + nextPath;

    const target = BASE + (nextPath === "/" ? "" : nextPath);

    if (window.location.pathname !== target) {
      window.history.pushState({}, "", target);
    }
    setPath(nextPath);
  };

  const routeKey = useMemo(() => {
    if (path === "/") return "home";
    if (path === "/portfolio") return "portfolio";
    if (path.startsWith("/portfolio/")) return "portfolio-category";

    const match = ROUTES.find((r) => r.path === path);
    return match ? match.key : "404";
  }, [path]);

  return (
    <div className={T.bodyClass}>
      <IntroOverlay T={T} />

      <Navbar
        T={T}
        path={path}
        theme={theme}
        setTheme={setTheme}
        onNavigate={navigate}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
        {routeKey === "home" && (
          <>
            <Hero T={T} onNavigate={navigate} />
            <section
              id="home-sections"
              className="max-w-6xl mx-auto px-4 py-10"
            >
              <HomeTiles T={T} onNavigate={navigate} />
            </section>
          </>
        )}

        {routeKey === "portfolio" && (
          <section className="max-w-6xl mx-auto px-4 py-10">
            <Portfolio T={T} path="/portfolio" onNavigate={navigate} />
          </section>
        )}

        {routeKey === "portfolio-category" && (
          <section className="max-w-6xl mx-auto px-4 py-10">
            <Portfolio T={T} path={path} onNavigate={navigate} />
          </section>
        )}

        {routeKey === "services" && (
          <section className="max-w-6xl mx-auto px-4 py-10">
            <ServicesPricingPage T={T} />
          </section>
        )}

        {routeKey === "about" && (
          <section className="max-w-4xl mx-auto px-4 py-10">
            <AboutBlock T={T} />
          </section>
        )}

        {routeKey === "faq" && (
          <section className="max-w-4xl mx-auto px-4 py-10">
            <FaqSection T={T} />
          </section>
        )}

        {routeKey === "contact" && (
          <section className="max-w-4xl mx-auto px-4 py-10">
            <ContactPage T={T} />
          </section>
        )}

        {routeKey === "reviews" && (
          <section className="max-w-4xl mx-auto px-4 py-10">
            <ReviewsPage T={T} />
          </section>
        )}

        {routeKey === "404" && (
          <section className="max-w-4xl mx-auto px-4 py-10">
            <NotFound T={T} onNavigate={navigate} />
          </section>
        )}
      </main>

      <StickyCTA T={T} onNavigate={navigate} />
      <MobileActionFab T={T} onNavigate={navigate} />
      <Footer T={T} onNavigate={navigate} />
    </div>
  );
}
