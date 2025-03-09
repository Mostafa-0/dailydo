import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeToggler = ({ className }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`${className}  flex rounded-full z-10 border bg-neutral-50 border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 transition-colors duration-300`}
      aria-label="Toggle theme"
    >
      <div className="relative size-6">
        <SunIcon
          className={`absolute inset-0 m-auto size-4 text-yellow-500 transition-transform transform ${
            theme === "dark" ? "scale-0 translate-x-full" : "scale-100"
          }`}
        />
        <MoonIcon
          className={`absolute inset-0 m-auto size-4 text-blue-700 transition-transform transform ${
            theme === "dark" ? "scale-100" : "scale-0 -translate-x-full"
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggler;
