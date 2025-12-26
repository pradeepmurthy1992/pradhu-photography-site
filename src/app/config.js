// src/app/config.js

// Fallback list, used only if GitHub cover detection fails.
// You can keep or tweak these paths to match your repo.
export const CINEMATIC_IMAGES_FALLBACK = [
  "/images/portfolio/covers/fashion-cover.jpg",
  "/images/portfolio/covers/editorial-cover.jpg",
  "/images/portfolio/covers/portrait-cover.jpg",
  "/images/portfolio/covers/couple-cover.jpg",
];

// ===== Brand =====
export const BRAND_NAME = "PRADHU Photography";

// ==== Journey tab
export const JOURNEY_ENABLED = false; // keep hidden for now

// ===== Intro overlay =====
export const INTRO_ENABLED = true;
export const INTRO_BRAND = "PRADEEP";
export const INTRO_NAME = "Pradhu Photography";
export const INTRO_AUTO_DISMISS_MS = 0; // 0 = no auto-close, only button
export const INTRO_LEFT_IMAGE_URL =
  "https://raw.githubusercontent.com/pradeepmurthy1992/pradhu-site-test/212bc1f22bc6a32b70ae87d0bb104c38f7c3848e/baseimg/02.jpg";
export const INTRO_REMEMBER = true; // remember 'seen' in localStorage
export const INTRO_FORCE_QUERY = "intro"; // ?intro=1 forces intro
export const INTRO_FORCE_HASH = "#intro"; // #intro forces intro

// ===== Hero =====
export const HERO_BG_URL =
  "https://raw.githubusercontent.com/pradeepmurthy1992/pradhu-site-test/212bc1f22bc6a32b70ae87d0bb104c38f7c3848e/baseimg/02.jpg";

// ===== Media / GitHub (manifest-first) =====
export const MEDIA_MANIFEST_URL =
  "https://raw.githubusercontent.com/pradeepmurthy1992/pradhu-portfolio-media/main/manifest.json";

export const GH_OWNER = "pradeepmurthy1992";
export const GH_REPO = "pradhu-portfolio-media";
export const GH_BRANCH = "main";

export const GH_CACHE_TTL_MS = 5 * 60 * 1000;

// Calendly (inline + links)
export const CALENDLY_URL = "https://calendly.com/pradhuphotography";

// ===== Contact / Social =====
export const CONTACT_EMAIL = "pradhuphotography@gmail.com";

// Now an array, used in Hero + Footer with .join()
export const SERVICE_CITIES = ["Bengaluru", "Chennai", "Pune"];

export const IG_USERNAME = "pradhu_photography";
export const WHATSAPP_NUMBER = "919322584410";

export const SHEET_WEB_APP =
  "https://script.google.com/macros/s/AKfycbypBhkuSpztHIBlYU3nsJJBsJI1SULQRIpGynZvEY6sDb2hDnr1PXN4IZ8342sy5-Dj/exec";

// ===== Nav / Layout =====
export const NAV_ITEMS = [
  { label: "Home", id: "/", icon: "home" },
  { label: "Portfolio", id: "/portfolio", icon: "grid" },
  { label: "Services & Pricing", id: "/services", icon: "briefcase" },
  { label: "About", id: "/about", icon: "user" },
  { label: "Reviews", id: "/reviews", icon: "help" },
  { label: "Contact", id: "/contact", icon: "mail" },
];

export const CONTAINER = "mx-auto w-full max-w-[1800px] px-4 xl:px-8";
