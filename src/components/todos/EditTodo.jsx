import { useContext, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BtnCustom, BtnDanger, BtnPrimary } from "../Buttons";
import { TodosContext } from "../../context/TodosContext";
import { Input, Textarea } from "../Inputs";

function UpdateTodo({ todo, setShowModal }) {
  const { editTodo, deleteTodo } = useContext(TodosContext);
  const [data, setData] = useState({
    ...todo,
  });
  const [priority, setPriority] = useState(todo.priority || "medium");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.title.trim().length < 1) {
      setError("You can't leave this empty!");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    }
    try {
      await editTodo(todo.id, {
        ...data,
        priority,
        dueDate: data.dueDate ? data.dueDate : "",
      });
      setShowModal(false);
    } catch (error) {
      setError("An error has occurred");
    }
  };

  return (
    <div className="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="modal bg-neutral-100 dark:bg-neutral-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl capitalize font-semibold">Edit To Do</h3>
          <button
            onClick={() => setShowModal(null)}
            className="text-neutral-900 dark:text-white hover:text-red-500 transition ml-2"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                name="title"
                id="title"
                value={data.title}
                placeholder="Your Todo Goes Here"
                onChange={handleChange}
                maxLength={30}
              />
            </div>
            {error && (
              <div className="text-sm font-medium text-orange-400 uppercase">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Description</label>
              <Textarea
                type="text"
                name="description"
                id="description"
                value={data.description}
                placeholder="Description"
                onChange={handleChange}
              ></Textarea>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="dueDate">Due date</label>
              <Input
                type="date"
                name="dueDate"
                id="dueDate"
                value={data.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h4>Priority</h4>
              <div className="flex flex-wrap gap-2 text-white">
                <BtnCustom
                  type={"button"}
                  onClick={() => setPriority("low")}
                  className={`grow bg-green-600 active:bg-green-700 dark:bg-green-600 dark:active:bg-opacity-60 hover:bg-green-600 ${
                    priority == "low"
                      ? "bg-opacity-100 dark:bg-opacity-100"
                      : "bg-opacity-75 dark:bg-opacity-20"
                  }`}
                >
                  Low
                </BtnCustom>
                <BtnCustom
                  type={"button"}
                  onClick={() => setPriority("medium")}
                  className={`grow bg-yellow-500 active:bg-yellow-600 dark:bg-yellow-600 dark:active:bg-opacity-60 hover:bg-yellow-500 ${
                    priority == "medium"
                      ? "bg-opacity-100 dark:bg-opacity-100"
                      : "bg-opacity-75 dark:bg-opacity-20"
                  }`}
                >
                  Medium
                </BtnCustom>
                <BtnCustom
                  type={"button"}
                  onClick={() => setPriority("high")}
                  className={`grow bg-red-600 active:bg-red-700 dark:bg-red-600 dark:active:bg-opacity-60 hover:bg-red-600 ${
                    priority == "high"
                      ? "bg-opacity-100 dark:bg-opacity-100"
                      : "bg-opacity-75 dark:bg-opacity-20"
                  }`}
                >
                  High
                </BtnCustom>
              </div>
            </div>

            <BtnPrimary type="submit" className={"mt-4"}>
              Update
            </BtnPrimary>
          </form>
          <BtnDanger onClick={() => deleteTodo(todo.id)}>Delete Todo</BtnDanger>
        </div>
      </div>
    </div>
  );
}

export default UpdateTodo;
