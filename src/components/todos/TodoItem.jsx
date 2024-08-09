import { useContext, useState } from "react";
import EditTodo from "./EditTodo";
import TickIcon from "./TickIcon";
import { TodosContext } from "../../context/TodosContext";
import { PencilSquareIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

function ToDoItem({ todo }) {
  const { editTodoId, setEditTodoId, editTodo } = useContext(TodosContext);
  const [status, setStatus] = useState(todo.status);
  const [showModal, setShowModal] = useState(false);

  const handleCheck = async () => {
    const newStatus = status === "pending" ? "completed" : "pending";
    editTodo(todo.id, { ...todo, status: newStatus });
    setStatus(newStatus);
  };

  let priorityBg = "";
  switch (todo.priority) {
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
    <>
      <li
        className={`relative flex justify-between gap-2 sm:gap-4 items-center px-3 py-4 min-h-16 md:p-4 rounded-lg bg-neutral-100 dark:bg-[#0f0f0f] overflow-hidden`}
      >
        <div className="flex gap-2 md:gap-4 items-center">
          <button onClick={handleCheck}>
            <TickIcon status={status} />
            <span className="sr-only">Mark Todo as completed</span>
          </button>
          <div>
            <p
              title={todo.title}
              className={`md:text-lg overflow-hidden text-ellipsis
              ${status == "completed" ? "line-through text-neutral-500" : ""}`}
            >
              {todo.title}
            </p>
            {todo.description && (
              <p
                title={todo.description}
                className={`text-sm opacity-90 overflow-hidden text-ellipsis mb-2
              ${status == "completed" ? "line-through text-neutral-500" : ""}`}
              >
                {todo.description}
              </p>
            )}
            {todo.dueDate && (
              <p
                className={`flex items-center gap-1 text-sm opacity-75 ${
                  status == "completed" ? "line-through text-neutral-500" : ""
                }`}
              >
                <CalendarDaysIcon className="size-3" /> Due {todo.dueDate}
              </p>
            )}
          </div>
        </div>

        <button
          className="text-emerald-600 hover:brightness-125"
          title="Edit"
          onClick={() => {
            setEditTodoId(todo.id);
            setShowModal(true);
          }}
        >
          <PencilSquareIcon className="size-6" />
          <span className="sr-only">Edit To Do</span>
        </button>

        <div
          className={`absolute w-full h-1 bottom-0 inset-x-0 ${priorityBg}`}
        ></div>
      </li>

      {showModal && (
        <EditTodo
          todo={todo}
          setShowModal={setShowModal}
          editTodoId={editTodoId}
        />
      )}
    </>
  );
}

export default ToDoItem;
