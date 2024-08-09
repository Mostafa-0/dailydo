import { createContext, useEffect, useState } from "react";

export const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
  const [editHabitId, setEditHabitId] = useState(null);
  const [habits, setHabits] = useState(() => {
    const localValue = localStorage.getItem("HABITS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("HABITS", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit) => {
    setHabits((prevHabits) => [habit, ...prevHabits]);
  };

  const editHabit = (id, data) => {
    setHabits((prevHabits) =>
      prevHabits.map((t) =>
        t.id === id
          ? {
              ...t,
              title: data.title,
              description: data.description,
              date: data.date,
              positive: Number(data.positive),
              negative: Number(data.negative),
            }
          : t
      )
    );
    setEditHabitId(null);
  };

  const positiveCount = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((t) =>
        t.id === id ? { ...t, positive: t.positive + 1 } : t
      )
    );
  };

  const negativeCount = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((t) =>
        t.id === id ? { ...t, negative: t.negative + 1 } : t
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  return (
    <HabitsContext.Provider
      value={{
        editHabitId,
        setEditHabitId,
        habits,
        setHabits,
        addHabit,
        editHabit,
        deleteHabit,
        positiveCount,
        negativeCount,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
