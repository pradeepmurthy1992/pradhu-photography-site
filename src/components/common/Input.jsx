import React from "react";

export function Input({ T, label, name, type = "text", value, onChange, required, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className={`text-sm ${T.muted}`}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`mt-1 w-full rounded-xl border px-3 py-2 ${T.inputBg} ${T.inputBorder} ${T.inputText} ${T.placeholder}`}
      />
    </div>
  );
}
