import TickButton from "./ui/TickButton";
import { CalendarDaysIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

const priorityColors = {
  low: "bg-green-600",
  medium: "bg-yellow-500",
  high: "bg-red-600",
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
  const textStyle = isCompleted
    ? "line-through text-neutral-500 dark:text-neutral-500"
    : "";

  return (
    <li
      className={`${priorityBg} bg-opacity-5 relative flex justify-between items-center min-h-[72px] h-max rounded-lg overflow-hidden`}
    >
      <div className="flex items-center overflow-hidden">
        <TickButton status={status} priority={priority} onClick={onCheck} />

        <div className="py-3 md:py-5">
          <h3
            title={title}
            className={`text-sm md:text-base font-medium ${textStyle}`}
          >
            {title}
          </h3>

          {description && (
            <p
              className={`text-xs md:text-sm text-neutral-600 dark:text-neutral-300 ${textStyle}`}
            >
              {description}
            </p>
          )}

          {dueDate && (
            <p
              className={`flex items-center gap-1 text-xs md:text-sm text-neutral-600 dark:text-neutral-300 ${textStyle}`}
            >
              <CalendarDaysIcon className="size-3" /> Due {dueDate}
            </p>
          )}
        </div>
      </div>

      <button
        className="text-primary hover:brightness-125 p-3 md:p-5"
        title="Edit"
        onClick={setShowModal}
      >
        <PencilSquareIcon className="size-6" />
        <span className="sr-only">Edit Task</span>
      </button>

      <div
        className={`absolute w-full h-1 bottom-0 inset-x-0 ${priorityBg}`}
      ></div>
    </li>
  );
}

export default TaskItem;
