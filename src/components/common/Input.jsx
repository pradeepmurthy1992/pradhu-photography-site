// src/components/common/Input.jsx
export default function Input({
  label,
  id,
  type = "text",
  required = false,
  className = "",
  ...rest
}) {
  return (
    <label className="block text-sm mb-4">
      {label && (
        <span className="block mb-1 font-medium text-zinc-200 dark:text-zinc-100">
          {label}
          {required && <span className="text-rose-400 ml-0.5">*</span>}
        </span>
      )}
      <input
        id={id}
        type={type}
        required={required}
        className={
          "w-full rounded-xl border border-zinc-700/70 bg-black/40 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/90 transition " +
          className
        }
        {...rest}
      />
    </label>
  );
}
