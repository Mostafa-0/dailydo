import { useContext, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BtnDanger, BtnPrimary } from "../Buttons";
import { HabitsContext } from "../../context/HabitsContext";
import Input from "../Input";

function Modal({ setShowModal, habit }) {
  const { editHabit, deleteHabit, error, setError } = useContext(HabitsContext);
  const [data, setData] = useState({
    title: habit.title,
    positive: habit.positive,
    negative: habit.negative,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "positive" || name === "negative") {
      if (value.length > 3) {
        return;
      }
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editHabit(habit.id, data);
  };

  return (
    <div className="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="modal bg-neutral-100 dark:bg-neutral-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl capitalize font-semibold">Edit Habit</h2>
          <button
            onClick={() => setShowModal(null)}
            className="text-neutral-900 dark:text-white hover:text-red-500 transition ml-2"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>
        <div className="text-sm text-gray-500 ml-1 mb-1">{habit.date}</div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            type="text"
            maxLength={30}
            placeholder="Your habit Goes Here"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="mb-4"
          />
          {error && (
            <div className="text-sm font-medium text-orange-400 uppercase">
              {error}
            </div>
          )}

          <div>
            <h3 className="sr-only">Adjust Counter</h3>
            <div className="flex justify-between mb-3 gap-6">
              <div className="border-b-2 bg-green-600 bg-opacity-20 border-b-green-600 py-1 px-3 rounded-lg rounded-es-none rounded-ee-none shadow-md">
                <label
                  htmlFor="positive"
                  className="text-[12px] uppercase font-medium"
                >
                  Positive
                </label>
                <input
                  type="number"
                  name="positive"
                  id="positive"
                  value={data.positive}
                  onChange={handleChange}
                  className="block text-xl w-full bg-transparent focus:outline-none"
                />
              </div>
              <div className="border-b-2 bg-red-600 bg-opacity-20 border-b-red-600 py-1 px-3 rounded-lg rounded-es-none rounded-ee-none shadow-md">
                <label
                  htmlFor="negative"
                  className="text-[12px] uppercase font-medium"
                >
                  Negative
                </label>
                <input
                  type="number"
                  name="negative"
                  id="negative"
                  value={data.negative}
                  onChange={handleChange}
                  className="block text-xl w-full bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>
          <BtnPrimary type="submit">Update</BtnPrimary>
          <BtnDanger onClick={() => deleteHabit(habit.id)}>
            Delete Habit
          </BtnDanger>
        </form>
      </div>
    </div>
  );
}

export default Modal;
