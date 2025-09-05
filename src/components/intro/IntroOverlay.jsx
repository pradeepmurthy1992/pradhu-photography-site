import React, { useEffect, useRef, useState } from "react";
import { INTRO_LEFT_IMAGE_URL } from "@/app/config";

export default function IntroOverlay({ onClose }) {
  const [phase, setPhase] = useState("typeName");
  const NAME = "PRADEEP MOORTHY";
  const BRAND = "PRADHU PHOTOGRAPHY";
  const [typed, setTyped] = useState("");
  const [step, setStep] = useState(0);
  const typingRef = useRef(null);
  const rippleLayerRef = useRef(null);
  const enterBtnRef = useRef(null);

  useEffect(() => {
    enterBtnRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === "Enter") onClose();
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const makeRipple = (x, y, withFlash = false) => {
    const host = rippleLayerRef.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const mk = (cls) => {
      const el = document.createElement("span");
      el.className = cls;
      el.style.left = `${x - rect.left}px`;
      el.style.top = `${y - rect.top}px`;
      host.appendChild(el);
      setTimeout(() => el.remove(), cls.includes("flash") ? 360 : 800);
    };
    mk("cin-ripple circle");
    if (withFlash) mk("cin-flash");
  };

  useEffect(() => {
    const str = phase === "typeName" ? NAME : phase === "typeBrand" ? BRAND : "";
    if (!str) return;
    setTyped("");
    setStep(0);
    clearInterval(typingRef.current);
    let i = 0;
    typingRef.current = setInterval(() => {
      i++; setTyped(str.slice(0, i));
      if (i >= str.length) {
        clearInterval(typingRef.current);
        setStep(1);
        setTimeout(() => {
          setStep(2);
          setTimeout(() => { setPhase(phase === "typeName" ? "typeBrand" : "revealImg"); }, 520);
        }, phase === "typeName" ? 600 : 700);
      }
    }, 75);
    return () => clearInterval(typingRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase !== "revealImg") return;
    const t = setTimeout(() => setPhase("titles"), 1400);
    return () => clearTimeout(t);
  }, [phase]);

  const onAnyClick = (e) => makeRipple(e.clientX, e.clientY, true);

  const renderTyping = (text) => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-white text-center">
        <div
          className={[
            "inline-flex items-center gap-1 font-['Playfair_Display'] uppercase tracking-[0.08em]",
            "text-[clamp(26px,7vw,88px)] leading-none whitespace-nowrap",
            step === 2 ? "cin-explode-out" : "",
          ].join(" ")}
        >
          <span>{text}</span>
          {step === 0 ? <span className="cin-caret w-[0.5ch] inline-block align-bottom" /> : null}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black text-white"
      style={{ zIndex: 9999 }}
      role="dialog"
      aria-modal="true"
      onClick={onAnyClick}
    >
      <div ref={rippleLayerRef} className="absolute inset-0 cin-ripple-layer" />
      {phase === "typeName" && renderTyping(typed)}
      {phase === "typeBrand" && renderTyping(typed)}

      <div
        className={[
          "h-full w-full grid items-center justify-center p-6",
          "md:grid-cols-[640px_1fr] gap-4",
          phase === "typeName" || phase === "typeBrand" ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div className="relative cin-image-holder">
          <img
            src={INTRO_LEFT_IMAGE_URL}
            alt="Intro"
            className={[
              "w-full h-auto object-contain max-h-[78vh]",
              phase === "revealImg" ? "cin-radial-reveal cin-image-move-in" : "",
              phase === "titles" ? "opacity-100" : "",
            ].join(" ")}
            decoding="async"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 cin-vignette" />
        </div>

        <div className={["flex flex-col items-end gap-3 text-right whitespace-nowrap select-none",
          phase === "titles" ? "opacity-100" : "opacity-0"].join(" ")}>
          <div className={["text-[12px] tracking-[0.25em] opacity-80",
            phase === "titles" ? "cin-overshoot-in" : ""].join(" ")}>VISUAL & HONEST STORIES</div>
          <h1 className={["mt-1 font-['Playfair_Display'] uppercase",
            "text-[clamp(32px,6vw,72px)] leading-tight",
            phase === "titles" ? "cin-overshoot-in delay-[480ms]" : ""].join(" ")}>PRADEEP MOORTHY</h1>
          <div className={["mt-0.5 font-['Playfair_Display'] uppercase",
            "text-[clamp(24px,4.5vw,50px)] leading-tight",
            phase === "titles" ? "cin-overshoot-in delay-[850ms]" : ""].join(" ")}>PRADHU PHOTOGRAPHY</div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className={[
              "rounded-full border border-white/40 px-5 py-2 text-sm",
              "hover:bg:white/10 transition mt-6",
              phase === "titles" ? "cin-fade-in-delayed" : "opacity-0",
            ].join(" ")}
            ref={enterBtnRef}
          >
            Enter ↵
          </button>
        </div>
      </div>
    </div>
  );
}
