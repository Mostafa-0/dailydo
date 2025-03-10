import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

function Select({ label, options, setValue, className }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const selectRef = useRef();
  const optionsRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target) &&
        !optionsRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  const handleClick = ({ label, value }) => {
    setSelectedOption(label);
    setValue(value);
    setShowOptions(false);
  };

  return (
    <div className={`${className} relative min-w-24`}>
      <button
        ref={selectRef}
        aria-label={label}
        onClick={() => setShowOptions(!showOptions)}
        className="relative h-9 text-sm font-medium px-3 py-2 rounded-md bg-neutral-50 border border-neutral-300 dark:bg-neutral-950 dark:border-neutral-800 dark:text-white flex justify-between items-center gap-4 w-full"
      >
        <span className={`${showOptions || selectedOption ? "hidden" : ""}`}>
          {label}
        </span>
        {selectedOption && <span>{selectedOption}</span>}
        <ChevronDownIcon
          className={`size-4 stroke-current ml-auto transition ${
            showOptions ? "rotate-180" : ""
          }`}
        />
        <span
          className={`absolute text-xs px-1 rounded-md text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-950 transition ${
            showOptions || selectedOption
              ? "opacity-100 -translate-y-[19px]"
              : "opacity-0 translate-y-1"
          }`}
        >
          {label}
        </span>
      </button>
      {/* Options */}
      <ul
        ref={optionsRef}
        className={`absolute top-12 min-w-max w-full text-sm font-medium rounded-md bg-neutral-50 border border-neutral-300 dark:bg-neutral-950 dark:border-neutral-800 dark:text-white min-h-12 z-10
          ${showOptions ? "visible" : "invisible"}`}
      >
        {options?.map((option, index) => (
          <li
            key={index}
            className="hover:bg-neutral-200 dark:hover:bg-neutral-900"
          >
            <button
              className="size-full text-left px-3 py-1"
              onClick={() => handleClick(option)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
