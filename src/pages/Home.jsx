import DailiesList from "../components/sections/DailiesList";
import TodoList from "../components/sections/TodoList";

function Home() {
  return (
    <div className="grid items-start lg:grid-cols-2 gap-8">
      <DailiesList />
      <TodoList />
    </div>
  );
}

export default Home;
