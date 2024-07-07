import { useContext, useState } from "react";
import { HabitsContext } from "../../context/HabitsContext";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Input from "../Input";

function HabitForm() {
  const { showModal, addHabit, error, setError } = useContext(HabitsContext);
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <label htmlFor="addHabit" className="sr-only">
          Add Habit
        </label>
        <Input
          type="text"
          id="addHabit"
          maxLength={50}
          placeholder="Add a Habit.."
          name="title"
          value={title}
          onChange={handleChange}
          className="w-full p-3"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-3 hover:brightness-110 active:scale-110"
        >
          <span className="sr-only">Add a Habit</span>
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

export default HabitForm;
