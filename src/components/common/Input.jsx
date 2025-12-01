// src/components/common/Input.jsx
import React from "react";

function Input({
  label,
  name,
  type = "text",
  required = false,
  as = "input",
  className = "",
  ...rest
}) {
  const Field = as === "textarea" ? "textarea" : "input";

  return (
    <label className="block text-sm">
      {label && (
        <span className="mb-1.5 inline-block font-medium text-slate-200">
          {label}
          {required && <span className="ml-1 text-xs text-emerald-400">*</span>}
        </span>
      )}
      <Field
        name={name}
        type={type}
        required={required}
        className={
          "w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 " +
          "text-sm text-slate-50 placeholder:text-slate-500 " +
          "shadow-sm outline-none ring-0 focus:border-emerald-400/80 " +
          "focus:bg-slate-900 focus:shadow-[0_0_0_1px_rgba(45,212,191,0.6)] " +
          className
        }
        {...rest}
      />
    </label>
  );
}

export default Input;
export { Input };
