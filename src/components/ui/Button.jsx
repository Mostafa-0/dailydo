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
    "rounded px-4 py-2 text-sm font-medium flex justify-center items-center transition duration-200 ease-in-out disabled:opacity-50";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 disabled:hover:bg-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:hover:bg-secondary",
    danger:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:hover:bg-destructive",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
