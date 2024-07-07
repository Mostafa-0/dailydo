import { useState, useContext } from "react";
import Modal from "./EditTodo";
import TickIcon from "./TickIcon";
import { DataContext } from "../../context/TodosContext";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

function ToDoItem({ todo }) {
  const { editTodoId, setEditTodoId, setTodos } = useContext(DataContext);
  const [isChecked, setIsChecked] = useState(todo.completed);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <>
      <li className="flex justify-between gap-2 sm:gap-4 items-center px-3 py-4 min-h-16 md:p-4 rounded-lg bg-neutral-100 dark:bg-[#0f0f0f]">
        <div className="flex gap-2 md:gap-4 items-center">
          <button onClick={handleCheck}>
            <TickIcon isChecked={isChecked} />
            <span className="sr-only">Check To Do</span>
          </button>
          <p
            title={todo.title}
            className={`md:text-lg overflow-hidden text-ellipsis
              ${isChecked ? "line-through text-neutral-500" : ""}`}
          >
            {todo.title}
          </p>
        </div>

        <button
          className="text-emerald-600 hover:brightness-125"
          onClick={() => setEditTodoId(todo.id)}
          title="Edit"
        >
          <PencilSquareIcon className="size-6" />
          <span className="sr-only">Edit To Do</span>
        </button>
      </li>

      {editTodoId === todo.id && (
        <Modal setShowModal={setEditTodoId} todo={todo} />
      )}
    </>
  );
}

export default ToDoItem;
