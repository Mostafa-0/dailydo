import { useContext, useState } from "react";
import { DataContext } from "../../context/TodosContext";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Input from "../Input";

function TodoForm() {
  const { showModal, addTodo, error, setError } = useContext(DataContext);
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <label htmlFor="addTodo" className="sr-only">Add Todo</label>
        <Input
          type="text"
          id="addTodo"
          maxLength={50}
          placeholder="Add a To Do.."
          name="title"
          value={title}
          onChange={handleChange}
          className="w-full p-3"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-3 hover:brightness-110 active:scale-110"
        >
          <span className="sr-only">Add To Do</span>
          <PlusCircleIcon className="size-8 text-emerald-500" />
        </button>
      </div>
      {error && !showModal && (
        <div className="text-sm font-medium text-orange-400 uppercase mt-2 ml-2">
          {error}
        </div>
      )}
    </form>
  );
}

export default TodoForm;
