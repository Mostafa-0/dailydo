import { useContext, useEffect, useState } from "react";
import ToDoItem from "./TodoItem";
import { DataContext } from "../../context/TodosContext";
import TodoForm from "./TodoForm";

function TodoList() {
  const { todos, setTodos } = useContext(DataContext);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const handleFilter = (value) => {
    if (value === "all") {
      setFilteredTodos(todos);
    } else if (value === "completed") {
      setFilteredTodos(todos.filter((todo) => todo.completed));
    } else if (value === "uncompleted") {
      setFilteredTodos(todos.filter((todo) => !todo.completed));
    }
  };

  return (
    <div className="p-3 md:p-6 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-widest my-4">
          To Do&apos;s
        </h2>
        <select
          name="filter"
          defaultValue={"all"}
          onChange={(e) => handleFilter(e.target.value)}
          className="dark:bg-neutral-800 p-2 rounded-lg mr-2 focus:outline-none font-medium"
        >
          <option value="all" className="font-medium">
            All
          </option>
          <option value="completed" className="font-medium">
            Completed
          </option>
          <option value="uncompleted" className="font-medium">
            Uncompleted
          </option>
        </select>
      </div>
      <div className="bg-neutral-300 bg-opacity-60 dark:bg-black dark:bg-opacity-60 p-4 rounded-lg">
        <TodoForm />
        {todos.length === 0 && (
          <p className="w-fit m-auto mt-12">
            Looks like you have no todos, start adding one!
          </p>
        )}
        <ul className="grid gap-4">
          {filteredTodos.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} setTodos={setTodos} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
