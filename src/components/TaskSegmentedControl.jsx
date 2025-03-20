import { useState } from "react";

function TaskSegmentedControl({ handleSelection }) {
  const [selection, setSelection] = useState("dailies");

  const handleClick = (value) => {
    setSelection(value);
    handleSelection(value);
  };

  return (
    <div className="fixed bottom-4 inset-x-0 mx-auto w-fit flex bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-full shadow-md lg:hidden z-40">
      <button
        onClick={() => handleClick("dailies")}
        className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-all ${
          selection === "dailies"
            ? "bg-emerald-700 text-white shadow"
            : "text-neutral-600 dark:text-neutral-400"
        }`}
      >
        Dailies
      </button>
      <button
        onClick={() => handleClick("todos")}
        className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-all ${
          selection === "todos"
            ? "bg-emerald-700 text-white shadow"
            : "text-neutral-600 dark:text-neutral-400"
        }`}
      >
        To-dos
      </button>
      {/* Sliding Background */}
      <div
        className={`absolute top-0 bottom-0 w-1/2 bg-emerald-700/75 rounded-full transition-all duration-300 ${
          selection === "todos" ? "translate-x-full" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}

export default TaskSegmentedControl;
