// src/utils/date.js

/**
 * Format YYYY-MM-DD into a human-readable date
 * e.g. "2025-09-04" → "04 Sep 2025"
 */
export function fmtHuman(isoStr) {
  if (!isoStr) return "";
  const [y, m, d] = isoStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Get the earliest selectable date string (yyyy-mm-dd).
 * Default is today + 2 days.
 */
export function getMinDateStr(offsetDays = 2) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000); // convert to local
  return local.toISOString().slice(0, 10);
}
