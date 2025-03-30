import { useContext } from "react";
import { TaskListContext } from "@context/TaskListContext";

function TaskSegmentedControl() {
  const { visibleList, setVisibleList } = useContext(TaskListContext);

  const handleClick = (value) => {
    setVisibleList(value);
  };

  return (
    <div className="lg:hidden fixed bottom-4 inset-x-0 mx-auto w-fit flex bg-background border border-border rounded-full shadow-md z-30">
      <button
        onClick={() => handleClick("dailies")}
        className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-all ${
          visibleList === "dailies"
            ? "bg-primary text-primary-foreground shadow"
            : "text-muted-foreground"
        }`}
      >
        Dailies
      </button>
      <button
        onClick={() => handleClick("todos")}
        className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-all ${
          visibleList === "todos"
            ? "bg-primary text-primary-foreground shadow"
            : "text-muted-foreground"
        }`}
      >
        To-dos
      </button>
      {/* Sliding Background */}
      <div
        className={`absolute top-0 bottom-0 w-1/2 bg-primary/75 rounded-full transition-all duration-300 ${
          visibleList === "todos" ? "translate-x-full" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}

export default TaskSegmentedControl;
