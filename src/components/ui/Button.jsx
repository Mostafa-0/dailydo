import { Link } from "react-router-dom";

export function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
  to,
}) {
  const baseStyles =
    "rounded-md px-4 py-2 text-sm font-medium flex justify-center items-center transition duration-200 ease-in-out disabled:bg-opacity-80 cursor-pointer";

  const variants = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white",
    secondary:
      "bg-neutral-100 border border-neutral-300 hover:bg-neutral-200 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:text-white",
    danger: "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white",
  };

  const styles = `${baseStyles} ${
    variant ? variants[variant] : ""
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${styles} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
