import { createContext, useEffect, useState } from "react";

export const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
  const [editHabitId, setEditHabitId] = useState(null);
  const [habits, setHabits] = useState(() => {
    const localValue = localStorage.getItem("HABITS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("HABITS", JSON.stringify(habits));
  }, [habits]);

  const validateData = (title) => {
    if (title.trim().length < 1) {
      setError(
        "A habit of doing nothing isn't that impressive don't you think ? 😧"
      );
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }
    return true;
  };

  const addHabit = (title) => {
    if (validateData(title)) {
      setHabits((prevHabits) => [
        {
          id: crypto.randomUUID(),
          title: title,
          date: new Date().toISOString().split("T")[0],
          positive: 0,
          negative: 0,
        },
        ...prevHabits,
      ]);
    }
  };

  const editHabit = (id, data) => {
    if (validateData(data.title)) {
      setHabits((prevHabits) =>
        prevHabits.map((t) =>
          t.id === id
            ? {
                ...t,
                title: data.title,
                date: data.date,
                positive: Number(data.positive),
                negative: Number(data.negative),
              }
            : t
        )
      );
      setEditHabitId(null);
    }
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
        error,
        setError,
        positiveCount,
        negativeCount,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
