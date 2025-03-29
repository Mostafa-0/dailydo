import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // Otherwise, use system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  // Apply the theme to the document when it changes
  useEffect(() => {
    document.documentElement.classList.remove(
      "light",
      "dark",
      "dim",
      "midnight"
    ); // Reset all themes
    document.documentElement.classList.add(theme); // Apply the selected theme

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
