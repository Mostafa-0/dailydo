import { createContext, useEffect, useState } from "react";

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [editTodoId, setEditTodoId] = useState(null);
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("TODOS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [todo, ...prevTodos]);
  };

  const editTodo = (id, data) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id
          ? {
              ...t,
              title: data.title,
              description: data.description,
              dueDate: data.dueDate,
              priority: data.priority,
              status: data.status,
            }
          : t
      )
    );
    setEditTodoId(null);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{
        editTodoId,
        setEditTodoId,
        todos,
        setTodos,
        addTodo,
        editTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
