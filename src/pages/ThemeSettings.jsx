import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  SunIcon,
  MoonIcon,
  SparklesIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

const themeOptions = [
  {
    label: "Light",
    value: "light",
    icon: <SunIcon className="size-6 text-yellow-500" />,
    bgColor: "bg-white text-black", // Light theme colors
  },
  {
    label: "Dark",
    value: "dark",
    icon: <MoonIcon className="size-6 text-sky-900" />,
    bgColor: "bg-black text-white", // Dark theme colors
  },
  {
    label: "Dim",
    value: "dim",
    icon: <MoonIcon className="size-6 text-gray-300" />,
    bgColor: "bg-gray-700 text-white", // Dim theme colors
  },
  {
    label: "Midnight",
    value: "midnight",
    icon: <SparklesIcon className="size-6 text-indigo-400" />,
    bgColor: "bg-indigo-900 text-white", // Midnight theme colors
  },
];

function ThemeSettings() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <section>
      <h2 className="text-xl font-semibold">Theme</h2>
      <div className="flex flex-wrap gap-4">
        {themeOptions.map(({ label, value, icon, bgColor }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`relative grow w-40 px-3 py-2 border-2 rounded-full shadow-md flex items-center gap-2 transition-all hover:shadow-lg 
            ${bgColor} ${
              theme === value
                ? "border-2 border-primary"
                : "border-transparent hover:border-primary"
            }`}
          >
            {/* ✅ Check icon for selected theme */}
            {theme === value && (
              <span className="absolute top-3 right-4 bg-primary text-white rounded-full p-1">
                <CheckIcon className="size-2 stroke-current" />
              </span>
            )}

            {icon}
            <h3 className="text-sm font-semibold">{label}</h3>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ThemeSettings;
