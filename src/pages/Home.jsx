import TodoList from "../components/todos/TodoList";
import HabitList from "../components/habits/HabitList";

function Home() {
  return (
    <div className="home">
      <div className="lg:flex mb-6">
        <TodoList />
        <HabitList />
      </div>
    </div>
  );
}

export default Home;
