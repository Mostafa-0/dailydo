import PropTypes from "prop-types";
import React from "react";

const Input = React.forwardRef(
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

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
