import { useContext, useEffect, useState } from "react";
import { HabitsContext } from "../../context/HabitsContext";
import HabitForm from "./HabitForm";
import HabitItem from "./HabitItem";
import { BtnCustom } from "../Buttons";

function HabitList() {
  const { habits, setHabits } = useContext(HabitsContext);
  const [filteredHabits, setFilteredHabits] = useState(habits);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let filtered = [...habits];

    if (filter === "weak") {
      filtered = filtered.filter((habit) => habit.negative >= habit.positive);
    } else if (filter === "strong") {
      filtered = filtered.filter((habit) => habit.negative < habit.positive);
    } else filtered = [...habits];

    setFilteredHabits(filtered);
  }, [habits, filter]);

  return (
    <div className="p-3 md:p-6 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-widest my-4">
          Habits
        </h2>
      </div>
      <br />
      <div className="flex gap-2">
        <BtnCustom
          onClick={() => setFilter("all")}
          className={`bg-white dark:bg-neutral-800 ${
            filter === "all"
              ? "bg-opacity-100"
              : "bg-opacity-60 dark:bg-opacity-20"
          }`}
        >
          All
        </BtnCustom>
        <BtnCustom
          onClick={() => setFilter("weak")}
          className={`bg-orange-600 text-white ${
            filter === "weak"
              ? "bg-opacity-100"
              : "bg-opacity-70 dark:bg-opacity-20"
          }`}
        >
          Weak
        </BtnCustom>
        <BtnCustom
          onClick={() => setFilter("strong")}
          className={`bg-green-600 text-white ${
            filter === "strong"
              ? "bg-opacity-100"
              : "bg-opacity-70 dark:bg-opacity-20"
          }`}
        >
          Strong
        </BtnCustom>
      </div>
      <div className="mt-[18px]">
        <HabitForm />
        {habits.length === 0 && (
          <p className="w-fit m-auto mt-12">
            Looks like you have no habits, start adding one!
          </p>
        )}
        {habits.length !== 0 && filteredHabits.length === 0 && (
          <p className="w-fit m-auto mt-12">No matching habits.</p>
        )}
        <ul className="grid gap-4">
          {filteredHabits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} setHabits={setHabits} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HabitList;
