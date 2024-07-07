import { useContext, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BtnDanger, BtnPrimary } from "../Buttons";
import { DataContext } from "../../context/TodosContext";
import Input from "../Input";

function Modal({ setShowModal, todo }) {
  const { editTodo, deleteTodo, error, setError } = useContext(DataContext);
  const [data, setData] = useState({
    ...todo,
  });

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(todo.id, data);
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
        <div className="text-sm text-gray-500 ml-1 mb-1">{todo.date}</div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            value={data.title}
            placeholder="Your Todo Goes Here"
            onChange={handleChange}
            maxLength={30}
            className="mb-4"
          />
          {error && (
            <div className="text-sm font-medium text-orange-400 uppercase">
              {error}
            </div>
          )}
          <BtnPrimary type="submit">Update</BtnPrimary>
          <BtnDanger onClick={() => deleteTodo(todo.id)}>Delete Todo</BtnDanger>
        </form>
      </div>
    </div>
  );
}

export default Modal;
