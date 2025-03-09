import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../../context/TodosContext";
import TodoForm from "../todos/TodoForm";
import ToDoItem from "../todos/TodoItem";

function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    let filtered = [...todos];

    if (statusFilter !== "all") {
      filtered = filtered.filter((todo) => todo.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((todo) => todo.priority === priorityFilter);
    }

    if (sortOption !== "none") {
      filtered = filtered.sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate) : null;
        const dateB = b.dueDate ? new Date(b.dueDate) : null;

        if (!dateA) return 1;
        if (!dateB) return -1;

        return sortOption === "earliest" ? dateA - dateB : dateB - dateA;
      });
    }

    setFilteredTodos(filtered);
  }, [todos, statusFilter, priorityFilter, sortOption]);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <section className="list-wrapper">
      <h2>To Do&apos;s</h2>

      <div className="flex flex-wrap gap-2">
        {/* Status filtering */}
        <div className="grow max-w-32">
          <label htmlFor="todos-status" className="sr-only">
            Status:{" "}
          </label>
          <select
            id="todos-status"
            defaultValue={"all"}
            onChange={handleStatusChange}
            className="dark:bg-neutral-900 p-2 rounded-lg mr-2 focus:outline-none font-medium text-sm w-full"
          >
            <option value="all" className="font-medium" disabled>
              Status:
            </option>
            <option value="all" className="font-medium">
              All
            </option>
            <option value="completed" className="font-medium">
              Completed
            </option>
            <option value="pending" className="font-medium">
              Pending
            </option>
          </select>
        </div>

        {/* Priority filtering */}
        <div className="grow max-w-32">
          <label htmlFor="todos-priority" className="sr-only">
            Priority:{" "}
          </label>
          <select
            id="todos-priority"
            defaultValue={"all"}
            onChange={handlePriorityChange}
            className="dark:bg-neutral-900 p-2 rounded-lg mr-2 focus:outline-none font-medium text-sm w-full"
          >
            <option value="all" className="font-medium" disabled>
              Priority:
            </option>
            <option value="all" className="font-medium">
              All
            </option>
            <option value="low" className="font-medium">
              Low
            </option>
            <option value="medium" className="font-medium">
              Medium
            </option>
            <option value="high" className="font-medium">
              High
            </option>
          </select>
        </div>

        {/* Due date sorting */}
        <div className="grow max-w-32">
          <label htmlFor="todos-sort" className="sr-only">
            Due Date:{" "}
          </label>
          <select
            id="todos-sort"
            defaultValue={"none"}
            onChange={handleSortChange}
            className="dark:bg-neutral-900 p-2 rounded-lg mr-2 focus:outline-none font-medium text-sm w-full"
          >
            <option value="none" className="font-medium" disabled>
              Due Date:
            </option>
            <option value="none" className="font-medium">
              None
            </option>
            <option value="earliest" className="font-medium">
              Earliest First
            </option>
            <option value="latest" className="font-medium">
              Latest First
            </option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <TodoForm />
        {todos.length === 0 && (
          <p className="w-fit m-auto mt-12 text-sm text-neutral-600 dark:text-neutral-400">
            Looks like you have no todos, start adding one!
          </p>
        )}
        {todos.length !== 0 && filteredTodos.length === 0 && (
          <p className="w-fit m-auto mt-12 text-sm text-neutral-600 dark:text-neutral-400">No matching todos.</p>
        )}
        <ul className="grid gap-4">
          {filteredTodos.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} setTodos={setTodos} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TodoList;
