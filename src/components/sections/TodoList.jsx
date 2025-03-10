import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../../context/TodosContext";
import TodoForm from "../todos/TodoForm";
import ToDoItem from "../todos/TodoItem";
import Select from "../ui/Select";

function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dueDateFilter, setDueDateFilter] = useState("none");

  useEffect(() => {
    let filtered = [...todos];

    if (statusFilter !== "all") {
      filtered = filtered.filter((todo) => todo.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((todo) => todo.priority === priorityFilter);
    }

    if (dueDateFilter !== "none") {
      filtered = filtered.sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate) : null;
        const dateB = b.dueDate ? new Date(b.dueDate) : null;

        if (!dateA) return 1;
        if (!dateB) return -1;

        return dueDateFilter === "earliest" ? dateA - dateB : dateB - dateA;
      });
    }

    setFilteredTodos(filtered);
  }, [todos, statusFilter, priorityFilter, dueDateFilter]);

  return (
    <section className="list-section">
      <h2>To Do&apos;s</h2>

      <div className="flex flex-wrap gap-4">
        <Select
          label="Status"
          options={[
            { label: "All", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Pending", value: "pending" },
          ]}
          setValue={setStatusFilter}
          className="grow sm:max-w-36"
        />
        <Select
          label="Priority"
          options={[
            { label: "All", value: "all" },
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ]}
          setValue={setPriorityFilter}
          className="grow sm:max-w-36"
        />
        <Select
          label="Due Date"
          options={[
            { label: "none", value: "none" },
            { label: "Earliest First", value: "earliest" },
            { label: "Latest First", value: "latest" },
          ]}
          setValue={setDueDateFilter}
          className="grow sm:max-w-36"
        />
      </div>

      <div className="mt-4">
        <TodoForm />
        {todos.length === 0 && (
          <p className="w-fit m-auto mt-12 text-sm text-neutral-600 dark:text-neutral-400">
            Looks like you have no To Do&apos;s, start adding one!
          </p>
        )}
        {todos.length !== 0 && filteredTodos.length === 0 && (
          <p className="w-fit m-auto mt-12 text-sm text-neutral-600 dark:text-neutral-400">
            No matching todos.
          </p>
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
