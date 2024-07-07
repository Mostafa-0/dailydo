import TodoList from "./todos/TodoList";
import HabitList from "./habits/HabitList";

function Home() {
  return (
    <div className="home">
      <div className="lg:flex lg:mt-10 mb-12">
        <TodoList />
        <HabitList />
      </div>
    </div>
  );
}

export default Home;
