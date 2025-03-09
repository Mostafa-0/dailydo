import DailiesList from "../components/sections/DailiesList";
import TodoList from "../components/sections/TodoList";

function Home() {
  return (
    <div className="home h-full grid items-start md:grid-cols-2 gap-8">
      <DailiesList />
      <TodoList />
    </div>
  );
}

export default Home;
