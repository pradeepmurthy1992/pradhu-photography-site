// src/utils/analytics.js
import ReactGA from "react-ga4";

let isInit = false;

/**
 * Initialize Google Analytics for this app.
 * Call this ONCE when the app loads.
 */
export const initAnalytics = () => {
  if (isInit) return;

  // Use your real Measurement ID
  ReactGA.initialize("G-9KV8DQSBCJ");

  isInit = true;
};

/**
 * Track a page view for Single Page App routing.
 * Call this whenever the route/section changes.
 */
export const trackPageView = (path) => {
  if (!isInit) return;

  ReactGA.send({
    hitType: "pageview",
    page: path,
  });

  // In dev builds, log to console so we can see it firing
  if (import.meta && import.meta.env && import.meta.env.DEV) {
    console.log("[GA] Page view:", path);
  }
};
