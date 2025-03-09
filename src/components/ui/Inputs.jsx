import React from "react";

export const Input = React.forwardRef(
  (
    {
      type = "text",
      id,
      name,
      defaultValue,
      value,
      placeholder = "",
      onChange,
      maxLength,
      required = false,
      autoFocus,
      className,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={`${className} p-3 font-medium bg-white border dark:bg-neutral-900 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out`}
        type={type}
        id={id}
        name={name}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
        autoFocus={autoFocus}
      />
    );
  }
);
Input.displayName = "Input";

export const Textarea = React.forwardRef(
  (
    {
      id,
      name,
      defaultValue,
      value,
      placeholder = "",
      onChange,
      maxLength,
      required = false,
      className,
    },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        className={`${className} max-h-60 p-3 font-medium bg-white dark:bg-neutral-900 border dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out`}
        id={id}
        name={name}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
      ></textarea>
    );
  }
);
Textarea.displayName = "Input";
