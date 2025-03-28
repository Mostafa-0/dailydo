import { useContext } from "react";
import DailiesList from "../components/sections/DailiesList";
import TodoList from "../components/sections/TodoList";
import { TaskListContext } from "../context/TaskListContext ";
import TaskSegmentedControl from "../components/TaskSegmentedControl";

function Home() {
  const { visibleList } = useContext(TaskListContext);

  return (
    <>
      <div className="grid items-start lg:grid-cols-2 gap-8">
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
