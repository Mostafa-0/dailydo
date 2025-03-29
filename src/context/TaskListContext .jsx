import { createContext, useState } from "react";

export const TaskListContext = createContext();

export function TaskListProvider({ children }) {
  const [visibleList, setVisibleList] = useState("dailies");

  return (
    <TaskListContext.Provider value={{ visibleList, setVisibleList }}>
      {children}
    </TaskListContext.Provider>
  );
}
