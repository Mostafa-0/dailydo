import TickIcon from "./ui/TickIcon";
import { CalendarDaysIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

function TaskItem({
  title,
  description,
  priority,
  status,
  dueDate,
  onCheck,
  setShowModal,
}) {
  let priorityBg = "";
  switch (priority) {
    case "low":
      priorityBg = "bg-green-600";
      break;
    case "medium":
      priorityBg = "bg-yellow-500";
      break;
    case "high":
      priorityBg = "bg-red-600";
      break;
    default:
      priorityBg = "";
      break;
  }

  return (
    <li
      className={`${priorityBg} bg-opacity-5 relative flex justify-between gap-2 sm:gap-4 items-center min-h-[72px] h-max rounded-lg overflow-hidden`}
    >
      <div className="flex gap-2 md:gap-4 items-center overflow-hidden p-3 md:p-5">
        {/* Check Button */}
        <button onClick={onCheck}>
          <TickIcon status={status} priority={priority} />
          <span className="sr-only">Mark Task as completed</span>
        </button>

        {/* Title and Description */}
        <div>
          <h3
            title={title}
            className={`text-sm md:text-base font-medium ${
              status == "completed"
                ? "line-through text-neutral-500 dark:text-neutral-500"
                : ""
            }`}
          >
            {title}
          </h3>
          {description && (
            <p
              className={`text-xs md:text-sm text-neutral-600 dark:text-neutral-300
              ${
                status == "completed"
                  ? "line-through text-neutral-500 dark:text-neutral-500"
                  : ""
              }`}
            >
              {description}
            </p>
          )}
          {dueDate && (
            <p
              className={`flex items-center gap-1 text-xs md:text-sm text-neutral-600 ${
                status == "completed"
                  ? "line-through text-neutral-500 dark:text-neutral-500"
                  : ""
              }`}
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
