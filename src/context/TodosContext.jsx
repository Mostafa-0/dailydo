import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [editTodoId, setEditTodoId] = useState(null);
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("TODOS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  const validateData = (title) => {
    if (title.trim().length < 1) {
      setError("Oops, you can't make an empty todo! 😐");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }
    return true;
  };

  const addTodo = (title) => {
    if (validateData(title)) {
      setTodos((prevTodos) => [
        {
          id: crypto.randomUUID(),
          title: title,
          date: new Date().toISOString().split("T")[0],
          completed: false,
        },
        ...prevTodos,
      ]);
    }
  };

  const editTodo = (id, data) => {
    if (validateData(data.title)) {
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === id ? { ...t, title: data.title, date: data.date } : t
        )
      );
      setEditTodoId(null);
    }
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        editTodoId,
        setEditTodoId,
        todos,
        setTodos,
        addTodo,
        editTodo,
        deleteTodo,
        error,
        setError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
