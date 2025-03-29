import { useContext } from "react";
import { TaskListContext } from "@context/TaskListContext ";
import DailiesList from "./components/sections/DailiesList";
import TodoList from "./components/sections/TodoList";
import TaskSegmentedControl from "./components/partials/TaskSegmentedControl";

function Home() {
  const { visibleList } = useContext(TaskListContext);

  return (
    <>
      <h1 className="sr-only">Home</h1>
      <div className="grid items-start xl:grid-cols-2 gap-8">
        <DailiesList
          className={visibleList == "dailies" ? "flex" : "hidden lg:flex"}
        />
        <TodoList
          className={visibleList == "todos" ? "flex" : "hidden lg:flex"}
        />
      </div>

      <TaskSegmentedControl />
    </>
  );
}

export default Home;
