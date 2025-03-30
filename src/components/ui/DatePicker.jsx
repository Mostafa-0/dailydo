import { CalendarIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

const DatePicker = ({ name, id, value, onChange }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.showPicker();
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="date"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="absolute inset-0 invisible w-full h-full"
      />
      <button
        type="button"
        onClick={handleClick}
        aria-hidden="true"
        className="w-full flex items-center justify-between bg-input border border-border text-foreground px-3 py-2 rounded shadow-sm"
      >
        <span className="text-secondary-foreground font-medium tracking-wide">
          {value ? new Date(value).toLocaleDateString() : "Select a date"}
        </span>
        <CalendarIcon className="size-4" />
      </button>
    </div>
  );
};

export default DatePicker;
