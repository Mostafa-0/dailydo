import { useContext } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggler = ({ className }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
