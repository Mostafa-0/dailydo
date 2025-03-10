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
      className={`${className} flex gap-2 p-1 w-fit mx-auto rounded-full z-10 border bg-neutral-50 hover:bg-black border-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-200 dark:border-neutral-800 transition-colors duration-300`}
      aria-label="Toggle theme"
    >
      <SunIcon
        className={`size-4 text-yellow-500 transition-transform transform ${
          theme === "dark" ? "scale-0 translate-x-full" : "scale-100"
        }`}
      />
      <MoonIcon
        className={`size-4 text-blue-700 transition-transform transform ${
          theme === "dark" ? "scale-100" : "scale-0 -translate-x-full"
        }`}
      />
    </button>
  );
};

export default ThemeToggler;
