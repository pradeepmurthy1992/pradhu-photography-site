// src/utils/date.js

export function fmtHuman(s) {
  if (!s) return "";
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getMinDateStr(daysFromToday = 2) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  // Convert to local-ISO (without TZ skew) and take yyyy-mm-dd
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 10);
}
