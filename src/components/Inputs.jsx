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
      className,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={`${className} p-3 font-medium bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition duration-300 ease-in-out`}
        type={type}
        id={id}
        name={name}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
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
        className={`${className} max-h-60 p-3 font-medium bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition duration-300 ease-in-out`}
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
