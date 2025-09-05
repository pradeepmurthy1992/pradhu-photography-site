// Tiny analytics wrapper – safe no-op if gtag isn't present
export function trackEvent(name, params = {}) {
  try {
    window.gtag?.("event", name, params);
  } catch {
    // no-op
  }
}
export default trackEvent;
