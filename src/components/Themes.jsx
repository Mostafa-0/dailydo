import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeMode = () => {
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
      className="fixed bottom-4 right-4 size-9 rounded-full z-10 bg-white dark:bg-gray-900 flex items-center justify-center p-1 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <div className="relative size-5">
        <SunIcon
          className={`absolute size-5 text-yellow-500 transition-transform transform ${
            theme === "dark" ? "scale-0" : "scale-100"
          }`}
        />
        <MoonIcon
          className={`absolute sie-5 text-blue-700 transition-transform transform ${
            theme === "dark" ? "scale-100" : "scale-0"
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeMode;
