// src/components/ui/Input.jsx
// Handles: text, email, password, number, search inputs + textarea

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  hint,
  icon: Icon,
  required = false,
  disabled = false,
  rows, // if set → renders <textarea>
  className = "",
  ...props
}) {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPass ? "text" : "password") : type;

  const baseClass = clsx(
    "w-full bg-card border rounded-xl font-[Montserrat] text-sm",
    "text-text-primary placeholder:text-text-subtle",
    "outline-none transition-all duration-200",
    Icon ? "pl-10" : "pl-3",
    isPassword ? "pr-10" : "pr-3",
    "py-2.5",
    error
      ? "border-rose-400/50 focus:border-rose-400/80 focus:ring-1 focus:ring-rose-400/20"
      : "border-border focus:border-gold/50 focus:ring-1 focus:ring-gold/15",
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase">
          {label}
          {required && <span className="text-gold ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Left icon */}
        {Icon && (
          <Icon
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none"
          />
        )}

        {/* Textarea or input */}
        {rows ? (
          <textarea
            className={clsx(baseClass, "resize-none leading-relaxed")}
            style={{ paddingLeft: Icon ? "2.5rem" : "0.75rem" }}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
        ) : (
          <input
            type={inputType}
            className={baseClass}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
        )}

        {/* Password eye toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle
                       hover:text-text-muted transition-colors"
          >
            {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-[10px] text-rose-400">{error}</p>}

      {/* Hint */}
      {hint && !error && <p className="text-[10px] text-text-subtle">{hint}</p>}
    </div>
  );
}

export default Input;
