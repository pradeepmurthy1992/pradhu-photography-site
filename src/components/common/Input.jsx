// src/components/common/Input.jsx
import React from "react";

export function Input({
  T, // kept in signature in case you use it later
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm text-slate-800 dark:text-slate-200"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="
          mt-1 w-full rounded-xl border px-3 py-2 text-sm
          bg-slate-100 text-slate-900 border-slate-300
          placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70
          dark:bg-slate-800 dark:text-slate-50 dark:border-slate-700
          dark:placeholder:text-slate-400
        "
      />
    </div>
  );
}
