// ===== Intro / Branding =====
export const INTRO_ENABLED = true;
export const INTRO_BRAND = "PRADEEP";
export const INTRO_NAME = "Pradhu Photography";
export const INTRO_AUTO_DISMISS_MS = 0;
export const INTRO_LEFT_IMAGE_URL =
  "https://raw.githubusercontent.com/pradeepmurthy1992/pradhu-site-test/5a13fa5f50b380a30762e6d0f3d74ab44eb505a5/baseimg/187232337_402439238105_n.jpg";
export const INTRO_REMEMBER = true;
export const INTRO_FORCE_QUERY = "intro";
export const INTRO_FORCE_HASH = "#intro";

// ===== Hero =====
export const HERO_BG_URL =
  "https://raw.githubusercontent.com/pradeepmurthy1992/pradhu-site-test/212bc1f22bc6a32b70ae87d0bb104c38f7c3848e/baseimg/02.jpg";

// ===== Media / GitHub (manifest-first) =====
export const MEDIA_MANIFEST_URL =
  "https://raw.githubusercontent.com/pradeepmurthy1992/pradhu-portfolio-media/main/manifest.json";

export const GH_OWNER = "pradeepmurthy1992";
export const GH_REPO = "pradhu-portfolio-media";
export const GH_BRANCH = "main";

// (Cache TTL is also defined in lib/gh.js; exported here for reference)
export const GH_CACHE_TTL_MS = 5 * 60 * 1000;

// Calendly (inline + links)
export const CALENDLY_URL = "https://calendly.com/pradhuphotography";

// ===== Contact / Social =====
export const CONTACT_EMAIL = "pradhuphotography@gmail.com";
export const SERVICE_CITIES = "Base : Pune · Available [ Mumbai · Chennai · Bengaluru ]";
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
