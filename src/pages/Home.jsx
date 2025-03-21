import { useState } from "react";
import DailiesList from "../components/sections/DailiesList";
import TodoList from "../components/sections/TodoList";
import TaskSegmentedControl from "../components/TaskSegmentedControl";

function Home() {
  const [displayedList, setDisplayedList] = useState("dailies");

  return (
    <>
      <div className="grid items-start lg:grid-cols-2 gap-8">
        <DailiesList
          className={displayedList == "dailies" ? "" : "hidden lg:block"}
        />
        <TodoList
          className={displayedList == "todos" ? "" : "hidden lg:block"}
        />
      </div>
      <TaskSegmentedControl handleSelection={setDisplayedList} />
    </>
  );
}

export default Home;
