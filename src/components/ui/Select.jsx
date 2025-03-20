import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

function Select({ label, options, setValue, className }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [showOptions]);

  // Handle option selection
  const handleSelect = (option) => {
    setSelectedOption(option.label);
    setValue(option.value);
    setShowOptions(false);
  };

  return (
    <div className={`${className} relative min-w-24`}>
      {/* Button that toggles dropdown */}
      <button
        ref={selectRef}
        aria-label={label}
        aria-expanded={showOptions}
        onClick={() => setShowOptions((prev) => !prev)}
        className="relative h-9 text-sm font-medium px-3 py-2 rounded-md bg-white border border-neutral-300 dark:bg-neutral-900 dark:border-neutral-800 dark:text-white 
        focus:outline-none focus:ring-2 focus:ring-primary flex justify-between items-center gap-4 w-full transition-all"
      >
        {/* Show placeholder if no option is selected */}
        <span className={showOptions || selectedOption ? "hidden" : "block"}>
          {label}
        </span>
        {selectedOption && <span>{selectedOption}</span>}

        {/* Chevron Icon */}
        <ChevronDownIcon
          className={`size-4 stroke-current ml-auto transition ${
            showOptions ? "rotate-180" : ""
          }`}
        />

        {/* Floating Label Effect */}
        <span
          className={`absolute left-2 text-xs px-1 rounded-md text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-900 transition 
          before:content-[''] before:absolute before:inset-0 before:h-1/2 before:w-full before:bg-neutral-50 dark:before:bg-neutral-950 
          ${
            showOptions || selectedOption
              ? "opacity-100 -translate-y-[19px] scale-90"
              : "opacity-0 translate-y-1"
          }`}
        >
          <span className="relative z-10">{label}</span>
        </span>
      </button>

      {/* Dropdown Menu */}
      {showOptions && (
        <ul
          className="absolute top-12 min-w-max w-full text-sm font-medium rounded-md bg-neutral-50 border border-neutral-300 
          dark:bg-neutral-950 dark:border-neutral-800 dark:text-white min-h-12 z-20"
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="hover:bg-neutral-200 dark:hover:bg-neutral-900"
            >
              <button
                className="size-full text-left px-3 py-1 w-full"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
