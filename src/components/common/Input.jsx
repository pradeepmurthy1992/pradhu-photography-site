// src/components/common/Input.jsx
import React from "react";

// Generic labeled input used in Contact form (and elsewhere if needed)
export function Input({
  label,
  name,
  id,
  type = "text",
  placeholder = "",
  required = false,
  value,
  onChange,
  autoComplete,
  as = "input", // allow "textarea" if needed
  rows = 4,
  error,
}) {
  const InputTag = as === "textarea" ? "textarea" : "input";
  const inputId = id || name;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400"
        >
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}

      <InputTag
        id={inputId}
        name={name}
        type={as === "textarea" ? undefined : type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        rows={as === "textarea" ? rows : undefined}
        className={[
          "w-full rounded-xl border bg-white/80 dark:bg-slate-900/60",
          "border-slate-200/80 dark:border-slate-700/80",
          "px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100",
          "shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/70 focus:border-emerald-400/70",
          "placeholder:text-slate-400 dark:placeholder:text-slate-500",
          "transition-colors duration-150",
          error ? "border-rose-400 focus:ring-rose-400/70 focus:border-rose-400" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      {error && (
        <p className="text-[11px] text-rose-500 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

// Default export so `import Input from ".../Input";` works
export default Input;
