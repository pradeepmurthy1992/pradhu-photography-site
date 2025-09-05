import React, { useEffect, useState } from "react";
import ROUTES from "./routes";
import { CONTAINER, INTRO_ENABLED, INTRO_FORCE_HASH, INTRO_FORCE_QUERY, INTRO_REMEMBER } from "./config";
import useHashRoute from "@/hooks/useHashRoute";
import useThemeTokens from "./themeTokens";

// Chrome
import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import HeadFonts from "@/components/chrome/HeadFonts";
import HeadPerf from "@/components/chrome/HeadPerf";

// Hero / CTAs / Intro
import Hero from "@/components/hero/Hero";
import StickyCTA from "@/components/ctas/StickyCTA";
import MobileActionFab from "@/components/ctas/MobileActionFab";
import IntroOverlay from "@/components/intro/IntroOverlay";

// Pages
import HomeTiles from "@/components/pages/HomeTiles";
import ServicesPricingPage from "@/components/pages/ServicesPricingPage";
import AboutBlock from "@/components/pages/AboutBlock";
import FaqSection from "@/components/pages/FaqSection";
import ContactPage from "@/components/pages/ContactPage";
import ReviewsPage from "@/components/pages/ReviewsPage";
import NotFound from "@/components/pages/NotFound";

// Feature: Portfolio
import Portfolio from "@/features/portfolio";

// Config bits used by Navbar brand
import { NAV_ITEMS } from "./config";

export default function App() {
  // Theme
  const [theme, setTheme] = useState(() => {
    try { return sessionStorage.getItem("pradhu:theme") || "dark"; } catch { return "dark"; }
  });
  const T = useThemeTokens(theme);
  useEffect(() => { try { sessionStorage.setItem("pradhu:theme", theme); } catch {} }, [theme]);

  // Intro overlay gate
  const [showIntro, setShowIntro] = useState(() => {
    if (!INTRO_ENABLED) return false;
    const url = new URL(window.location.href);
    const forced = url.searchParams.get(INTRO_FORCE_QUERY) === "1" || url.hash === INTRO_FORCE_HASH;
    if (forced) return true;
    if (!INTRO_REMEMBER) return true;
    return sessionStorage.getItem("pradhu:intro:dismissed") !== "1";
  });
  const closeIntro = () => {
    setShowIntro(false);
    try { if (INTRO_REMEMBER) sessionStorage.setItem("pradhu:intro:dismissed", "1"); } catch {}
  };

  // Router
  const [path, nav] = useHashRoute(ROUTES);
  useEffect(() => { if (!window.location.hash) nav("/"); }, []); // default to home

  const isContact = path === "/contact";

  return (
    <main
      aria-hidden={showIntro ? "true" : undefined}
      className={`min-h-screen ${T.pageBg} ${T.pageText} font-['Inter'] ${theme === "light" ? "bg-dots-light" : "bg-dots-dark"}`}
    >
      <HeadFonts />
      <HeadPerf />
      {showIntro && <IntroOverlay onClose={closeIntro} />}

      {/* NAVBAR */}
      <Navbar T={T} path={path} theme={theme} setTheme={setTheme} brand="PRADHU PHOTOGRAPHY" />

      {/* ROUTES */}
      {path === "/" && (
        <>
          <Hero />
          <div className={`${CONTAINER} py-10`}>
            <HomeTiles T={T} />
          </div>
        </>
      )}

      {path === "/portfolio" && (
        <div className={`${CONTAINER} py-12`}>
          <Portfolio T={T} />
        </div>
      )}

      {(path === "/services" || path === "/pricing") && (
        <div className={`${CONTAINER} py-12`}>
          <ServicesPricingPage T={T} />
        </div>
      )}

      {path === "/about" && (
        <div className={`${CONTAINER} py-12`}>
          <AboutBlock T={T} />
          <FaqSection T={T} showTitle />
        </div>
      )}

      {path === "/reviews" && (
        <div className={`${CONTAINER} py-12`}>
          <ReviewsPage T={T} />
        </div>
      )}

      {path === "/contact" && (
        <div className={`${CONTAINER} py-12`}>
          <ContactPage T={T} />
        </div>
      )}

      {path === "/404" && (
        <div className={`${CONTAINER} py-20`}>
          <NotFound />
        </div>
      )}

      {/* CTAs */}
      <StickyCTA T={T} hide={isContact} />
      <MobileActionFab hide={isContact} />

      {/* FOOTER */}
      <Footer T={T} />
    </main>
  );
}
