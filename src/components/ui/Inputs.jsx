import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const baseClass =
  "px-3 py-[10px] font-medium bg-input text-foreground border border-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition duration-300 ease-in-out";

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    return (
      <div className="relative">
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={`${baseClass} ${className || ""} w-full pr-10`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          {showPassword ? (
            <EyeSlashIcon className="size-5" />
          ) : (
            <EyeIcon className="size-5" />
          )}
        </button>
      </div>
    );
  }

  return (
    <input
      ref={ref}
      type={type}
      className={`${baseClass} ${className || ""}`}
      {...props}
    />
  );
});
Input.displayName = "Input";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`${baseClass} ${className || ""} max-h-52`}
      {...props}
    ></textarea>
  );
});
Textarea.displayName = "Textarea";
