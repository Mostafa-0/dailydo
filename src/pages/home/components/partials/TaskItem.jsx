import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import TickButton from "@components/ui/TickButton";

const priorityColors = {
  low: "bg-green-500 dark:bg-green-600",
  medium: "bg-yellow-400 dark:bg-yellow-500",
  high: "bg-red-500 dark:bg-red-600",
};

function TaskItem({
  title,
  description,
  priority,
  status,
  dueDate,
  onCheck,
  setShowModal,
}) {
  const priorityBg = priorityColors[priority] || "";
  const isCompleted = status === "completed";
  const textStyle = isCompleted ? "line-through text-muted-foreground" : "";

  return (
    <div className="group relative bg-card dark:bg-card flex justify-between items-center min-h-[72px] h-max rounded-lg shadow-sm shadow-secondary hover:shadow-secondary hover:shadow-lg transition duration-300 overflow-hidden">
      <div
        className={`absolute inset-0 ${priorityBg} bg-opacity-10 dark:bg-opacity-10`}
      ></div>

      <TickButton status={status} priority={priority} onClick={onCheck} />

      <button
        className="relative flex flex-1 items-start text-left py-3 md:py-5 pr-3 z-10"
        onClick={setShowModal}
      >
        <div>
          <h3
            title={title}
            className={`text-sm md:text-base font-medium ${textStyle}`}
          >
            {title}
          </h3>

          {description && (
            <p
              className={`text-xs md:text-sm text-muted-foreground ${textStyle}`}
            >
              {description}
            </p>
          )}

          {dueDate && (
            <p
              className={`flex items-center gap-1 text-xs md:text-sm text-muted-foreground tracking-wide ${textStyle}`}
            >
              <CalendarDaysIcon className="size-3" /> Due{" "}
              {new Date(dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </button>

      <div
        className={`absolute w-full h-1 bottom-0 inset-x-0 ${priorityBg} opacity-60 dark:opacity-80`}
      ></div>
    </div>
  );
}

export default TaskItem;
