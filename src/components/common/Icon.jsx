import React from "react";

// Inline feather-like icons
export function Icon({ name, className = "" }) {
  switch (name) {
    case "home":
      return <svg viewBox="0 0 24 24" className={className}><path d="M3 9.5L12 3l9 6.5V21H3V9.5z" fill="currentColor"/></svg>;
    case "grid":
      return <svg viewBox="0 0 24 24" className={className}><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" fill="currentColor"/></svg>;
    case "briefcase":
      return <svg viewBox="0 0 24 24" className={className}><path d="M10 2h4a2 2 0 012 2v2h4v16H4V6h4V4a2 2 0 012-2z" fill="currentColor"/></svg>;
    case "tag":
      return <svg viewBox="0 0 24 24" className={className}><path d="M20.59 13.41L11 3H4v7l9.59 9.59a2 2 0 002.82 0l4.18-4.18a2 2 0 000-2.82zM6 7a1 1 0 110-2 1 1 0 010 2z" fill="currentColor"/></svg>;
    case "user":
      return <svg viewBox="0 0 24 24" className={className}><path d="M12 2a5 5 0 110 10 5 5 0 010-10zm0 12c-4.42 0-8 2.02-8 4.5V21h16v-2.5c0-2.48-3.58-4.5-8-4.5z" fill="currentColor"/></svg>;
    case "mail":
      return <svg viewBox="0 0 24 24" className={className}><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l8 6.67 8-6.67V18H4z" fill="currentColor"/></svg>;
    case "sun":
      return <svg viewBox="0 0 24 24" className={className}><circle cx="12" cy="12" r="5" fill="currentColor"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" fill="none"/></svg>;
    case "moon":
      return <svg viewBox="0 0 24 24" className={className}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/></svg>;
    default:
      return null;
  }
}
