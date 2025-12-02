// src/app/routes.js
import HomeTiles from "@/components/pages/HomeTiles";
import ServicesPricingPage from "@/components/pages/ServicesPricingPage";
import AboutBlock from "@/components/pages/AboutBlock";
import ContactPage from "@/components/pages/ContactPage";
import ReviewsPage from "@/components/pages/ReviewsPage";
import Portfolio from "@/features/portfolio/Portfolio";
import NotFound from "@/components/pages/NotFound";

export const ROUTES = [
  {
    path: "/",
    label: "Home",
    component: HomeTiles,
  },
  {
    path: "/portfolio",
    label: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/services",
    label: "Services & Pricing",
    component: ServicesPricingPage,
  },
  {
    path: "/about",
    label: "About",
    component: AboutBlock,
  },
  // 🚫 FAQ route removed – FAQ lives only on Home now
  {
    path: "/reviews",
    label: "Reviews",
    component: ReviewsPage,
  },
  {
    path: "/contact",
    label: "Contact",
    component: ContactPage,
  },
  {
    path: "/404",
    label: "Not Found",
    component: NotFound,
  },
];

export const NAV_ITEMS = ROUTES.filter((r) => r.path !== "/404");
