// src/app/routes.js
import HomeTiles from "@/components/pages/HomeTiles";
import ServicesPricingPage from "@/components/pages/ServicesPricingPage";
import AboutBlock from "@/components/pages/AboutBlock";
import FaqSection from "@/components/pages/FaqSection";
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
  // Kept for old links, but hidden from navbar
  {
    path: "/about",
    label: "About",
    component: AboutBlock,
  },
  // Kept for old links, but FAQ content now lives on Home
  {
    path: "/faq",
    label: "FAQ",
    component: FaqSection,
  },
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

// 👇 Navbar items: hide 404, FAQ and About tabs
export const NAV_ITEMS = ROUTES.filter(
  (r) => !["/404", "/faq", "/about"].includes(r.path)
);
