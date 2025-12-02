// src/app/themeTokens.js

// Centralised theme tokens for light / dark.
// Keys (pageBg, pageText, panelBg, etc.) match what other components expect.

const light = {
  pageBg: "bg-slate-50",
  pageText: "text-slate-900",

  navBg: "bg-white/90",
  navBorder: "border-slate-200",
  navTextStrong: "text-slate-900",

  chipActive: "bg-emerald-500 text-slate-900 border-emerald-400",
  chipInactive:
    "bg-white border-slate-300 text-slate-700 hover:bg-slate-50",

  btnOutline: "border-slate-300 text-slate-900 hover:bg-slate-50",

  sectionAltBg: "bg-slate-100",

  panelBg: "bg-white",
  panelBorder: "border-slate-200",

  muted: "text-slate-600",
  muted2: "text-slate-500",

  footerBg: "bg-slate-950",
  footerBorder: "border-slate-800",

  link: "text-emerald-600 underline",
  linkSubtle: "text-slate-800 underline",

  inputBg: "bg-white",
  inputBorder: "border-slate-300",
  inputText: "text-slate-900",
  placeholder: "placeholder-slate-400",

  cardBg: "bg-white",
  cardBorder: "border-slate-200",
};

const dark = {
  pageBg: "bg-slate-950",
  pageText: "text-slate-50",

  navBg: "bg-slate-950/90",
  navBorder: "border-slate-800",
  navTextStrong: "text-white",

  chipActive: "bg-emerald-500 text-slate-900 border-emerald-400",
  chipInactive:
    "bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800",

  btnOutline: "border-slate-500 text-slate-100 hover:bg-slate-800",

  sectionAltBg: "bg-slate-900",

  panelBg: "bg-slate-900",
  panelBorder: "border-slate-800",

  muted: "text-slate-400",
  muted2: "text-slate-500",

  footerBg: "bg-slate-950",
  footerBorder: "border-slate-800",

  link: "text-emerald-300 underline",
  linkSubtle: "text-emerald-200 underline",

  inputBg: "bg-slate-950",
  inputBorder: "border-slate-700",
  inputText: "text-slate-100",
  placeholder: "placeholder-slate-500",

  cardBg: "bg-slate-900",
  cardBorder: "border-slate-800",
};

export function useThemeTokens(theme) {
  const base = theme === "light" ? light : dark;

  // Compatibility: App expects T.bodyBg, others use pageBg/pageText/etc.
  const T = {
    bodyBg: base.pageBg,
    ...base,
  };

  return { T };
}

export default useThemeTokens;
