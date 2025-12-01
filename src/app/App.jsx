// src/App.jsx
import React, { useMemo, useState } from "react";
import { ROUTES } from "@/app/routes";
import { useThemeTokens } from "@/app/themeTokens";
import { useHashRoute } from "@/hooks/useHashRoute";

import Navbar from "@/components/chrome/Navbar";
import Footer from "@/components/chrome/Footer";
import Hero from "@/components/hero/Hero";
import StickyCTA from "@/components/ctas/StickyCTA";
import MobileActionFab from "@/components/ctas/MobileActionFab";
import IntroOverlay from "@/components/intro/IntroOverlay";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const { T, className: themeClass } = useThemeTokens(theme);

  const [path, navigate] = useHashRoute();

  const route = useMemo(() => {
    const found = ROUTES.find((r) => r.path === path);
    return found || ROUTES.find((r) => r.path === "/404");
  }, [path]);

  const PageComponent = route.component;

  return (
    <div className={`${themeClass} min-h-screen bg-slate-950 text-slate-100`}>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
        <IntroOverlay T={T} />

        <Navbar
          T={T}
          path={path}
          theme={theme}
          setTheme={setTheme}
          onNavigate={navigate}
        />

        <main className="max-w-6xl mx-auto px-4 pb-16 pt-4">
          {route.path === "/" && <Hero T={T} onNavigate={navigate} />}
          <PageComponent T={T} path={path} onNavigate={navigate} />
        </main>

        <Footer T={T} onNavigate={navigate} />

        <StickyCTA T={T} />
        <MobileActionFab T={T} />
      </div>
    </div>
  );
}
