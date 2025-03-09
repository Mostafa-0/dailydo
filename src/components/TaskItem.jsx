import TickIcon from "./ui/TickIcon";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

function TaskItem({
  title,
  description,
  priority,
  status,
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
      className={`relative flex justify-between gap-2 sm:gap-4 items-center px-3 py-4 min-h-16 h-max md:p-4 rounded-lg overflow-hidden ${priorityBg} bg-opacity-5`}
    >
      <div className="flex gap-2 md:gap-4 items-center">
        {/* Check Button */}
        <button onClick={onCheck}>
          <TickIcon status={status} />
          <span className="sr-only">Mark Task as completed</span>
        </button>

        {/* Title and Description */}
        <div>
          <p
            title={title}
            className={`md:text-lg break-all
              ${status == "completed" ? "line-through text-neutral-500" : ""}`}
          >
            {title}
          </p>
          {description && (
            <p
              className={`text-sm opacity-90 break-all
              ${status == "completed" ? "line-through text-neutral-500" : ""}`}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      <button
        className="text-primary hover:brightness-125"
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
