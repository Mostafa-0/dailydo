import { useContext, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BtnDanger, BtnPrimary } from "../Buttons";
import { Input, Textarea } from "../Inputs";
import { HabitsContext } from "../../context/HabitsContext";

function UpdateHabit({ habit, setShowModal }) {
  const { editHabit, deleteHabit } = useContext(HabitsContext);
  const [data, setData] = useState({
    ...habit,
  });
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
      await editHabit(habit.id, {
        ...data,
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
          <h3 className="text-2xl capitalize font-semibold">Edit Habit</h3>
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
                placeholder="Your Habit Goes Here"
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
            <div>
              <h4>Counter</h4>
              <div className="flex justify-between mt-1 mb-3 gap-6">
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
            <BtnPrimary type="submit" className={"mt-4"}>
              Update
            </BtnPrimary>
          </form>
          <BtnDanger onClick={() => deleteHabit(habit.id)}>
            Delete Habit
          </BtnDanger>
        </div>
      </div>
    </div>
  );
}

export default UpdateHabit;
