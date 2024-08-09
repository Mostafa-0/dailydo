import { useContext } from "react";
import Modal from "./EditHabit";
import {
  PencilSquareIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { HabitsContext } from "../../context/HabitsContext";

function HabitItem({ habit }) {
  const { editHabitId, setEditHabitId, positiveCount, negativeCount } =
    useContext(HabitsContext);

  return (
    <>
      <li className="flex justify-between min-h-16 gap-2 sm:gap-4 items-center rounded-lg bg-neutral-100 dark:bg-[#0f0f0f] overflow-hidden relative">
        <button
          className="bg-green-600 hover:bg-green-700 active:bg-green-600 h-full p-2 sm:p-3"
          onClick={() => positiveCount(habit.id)}
        >
          <PlusIcon className="size-6 text-white" />
        </button>
        <div className="w-full flex justify-between items-center py-2">
          <div>
            <p
              title={habit.title}
              className={`md:text-lg overflow-hidden text-ellipsis`}
            >
              {habit.title}
            </p>
            {habit.description && (
              <p
                title={habit.description}
                className="text-sm opacity-90 overflow-hidden text-ellipsis mb-2"
              >
                {habit.description}
              </p>
            )}
            <div className="text-sm font-bold text-gray-500">
              <span className="text-green-600">+{habit.positive}</span> |{" "}
              <span className="text-red-600">-{habit.negative}</span>
            </div>
          </div>
          <button
            className="text-emerald-600 hover:brightness-125"
            onClick={() => setEditHabitId(habit.id)}
            title="Edit"
          >
            <PencilSquareIcon className="size-6" />
            <span className="sr-only">Edit To Do</span>
          </button>
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 active:bg-red-600 h-full p-2 sm:p-3"
          onClick={() => negativeCount(habit.id)}
        >
          <MinusIcon className="size-6 text-white" />
        </button>
      </li>

      {editHabitId === habit.id && (
        <Modal setShowModal={setEditHabitId} habit={habit} />
      )}
    </>
  );
}

export default HabitItem;
