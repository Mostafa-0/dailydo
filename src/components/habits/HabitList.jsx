import { useContext } from "react";
import { HabitsContext } from "../../context/HabitsContext";
import HabitForm from "./HabitForm";
import HabitItem from "./HabitItem";

function HabitList() {
  const { habits, setHabits } = useContext(HabitsContext);

  return (
    <div className="p-3 md:p-6 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-widest my-4">
          Habits
        </h2>
      </div>
      <div className="bg-neutral-300 bg-opacity-60 dark:bg-black dark:bg-opacity-60 p-4 rounded-lg">
        <HabitForm />
        {habits.length === 0 && (
          <p className="w-fit m-auto mt-12">
            Looks like you have no habits, start adding one!
          </p>
        )}
        <ul className="grid gap-4">
          {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} setHabits={setHabits} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HabitList;
