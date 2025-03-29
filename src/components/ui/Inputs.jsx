import React from "react";

const baseClass =
  "px-3 py-[10px] font-medium bg-input text-foreground border border-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition duration-300 ease-in-out";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input ref={ref} className={`${baseClass} ${className || ""}`} {...props} />
  );
});
Input.displayName = "Input";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`${baseClass} ${className || ""} max-h-60`}
      {...props}
    ></textarea>
  );
});
Textarea.displayName = "Textarea";
