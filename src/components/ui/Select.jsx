import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";

function Select({ label, groups, setValue, className }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const selectRef = useRef();

  // Initialize default values
  useEffect(() => {
    const defaults = {};
    groups.forEach((group) => {
      const defaultOption = group.options.find((option) => option.default);
      if (defaultOption) {
        defaults[group.label] = defaultOption.value;
        setValue(group.label, defaultOption.value);
      }
    });
    setSelectedOptions(defaults);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showOptions]);

  // Handle option selection
  const handleSelect = (groupLabel, option) => {
    setSelectedOptions((prev) => ({ ...prev, [groupLabel]: option.value }));
    setValue(groupLabel, option.value);
    setShowOptions(false);
  };

  return (
    <div className={`${className} relative min-w-32`}>
      {/* Button that toggles dropdown */}
      <button
        ref={selectRef}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={showOptions}
        aria-controls="dropdown-options"
        onClick={() => setShowOptions((prev) => !prev)}
        className="relative h-9 text-sm font-medium px-3 py-2 rounded bg-input border border-border 
        focus:outline-none focus:ring-2 focus:ring-primary flex justify-between items-center gap-4 w-full transition-all"
      >
        {/* Always show the label, never change it */}
        <span>{label}</span>

        {/* Chevron Icon */}
        <ChevronDownIcon
          className={`size-4 stroke-current ml-auto transition ${
            showOptions ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {showOptions && (
        <div
          id="dropdown-options"
          role="listbox"
          className="absolute top-12 min-w-max w-full text-sm font-medium rounded bg-input border border-border 
          min-h-12 z-30 p-1 shadow-md"
        >
          {groups.map((group, index) => (
            <div key={index} className="p-2">
              <span className="block text-xs text-muted-foreground font-medium mb-1">
                {group.label}
              </span>
              {group.options.map((option, idx) => (
                <button
                  type="button"
                  key={idx}
                  role="option"
                  aria-selected={selectedOptions[group.label] === option.value}
                  onClick={() => handleSelect(group.label, option)}
                  className="w-full text-left hover:bg-secondary rounded-md cursor-pointer px-3 py-[6px] flex items-center justify-between"
                >
                  {option.label}
                  {selectedOptions[group.label] === option.value && (
                    <CheckIcon className="size-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
