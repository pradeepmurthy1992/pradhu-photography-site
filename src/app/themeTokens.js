// Theme tokens hook used across the app

export function useThemeTokens(theme) {
  const light = {
    pageBg: "bg-[#faf7f2]",
    pageText: "text-neutral-900",
    navBg: "bg-white/85",
    navBorder: "border-rose-200",
    navTextStrong: "text-neutral-900",
    chipActive: "bg-rose-200 text-rose-900 border-rose-300",
    chipInactive: "bg-white border-neutral-300 text-neutral-700 hover:bg-rose-50",
    btnOutline: "border-neutral-300 text-neutral-900 hover:bg-rose-50",
    sectionAltBg: "bg-[#fdfaf7]",
    panelBg: "bg-white",
    panelBorder: "border-rose-200",
    muted: "text-neutral-600",
    muted2: "text-neutral-500",
    footerBg: "bg-white",
    footerBorder: "border-rose-200",
    link: "text-rose-900 underline",
    linkSubtle: "text-neutral-800 underline",
    inputBg: "bg-white",
    inputBorder: "border-neutral-300",
    inputText: "text-neutral-900",
    placeholder: "placeholder-neutral-400",
    cardBg: "bg-white",
    cardBorder: "border-rose-200",
  };

  const dark = {
    pageBg: "bg-[#1c1e26]",
    pageText: "text-neutral-100",
    navBg: "bg-[#1c1e26]/90",
    navBorder: "border-teal-700",
    navTextStrong: "text-white",
    chipActive: "bg-teal-300 text-[#1c1e26] border-teal-400",
    chipInactive: "bg-[#2a2d36] border-[#3a3d46] text-neutral-200 hover:bg-[#333640]",
    btnOutline: "border-neutral-600 text-neutral-100 hover:bg-[#333640]",
    sectionAltBg: "bg-[#22242c]",
    panelBg: "bg-[#2a2d36]",
    panelBorder: "border-[#3a3d46]",
    muted: "text-neutral-300",
    muted2: "text-neutral-400",
    footerBg: "bg-[#1c1e26]",
    footerBorder: "border-teal-700",
    link: "text-teal-300 underline",
    linkSubtle: "text-teal-200 underline",
    inputBg: "bg-[#1c1e26]",
    inputBorder: "border-neutral-600",
    inputText: "text-neutral-100",
    placeholder: "placeholder-neutral-500",
    cardBg: "bg-[#2a2d36]",
    cardBorder: "border-[#3a3d46]",
  };

  return theme === "light" ? light : dark;
}

export default useThemeTokens;
