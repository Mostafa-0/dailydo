import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../../context/TodosContext";
import TodoForm from "../todos/TodoForm";
import ToDoItem from "../todos/TodoItem";
import Select from "../ui/Select";
import Tooltip from "../ui/Tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

function TodoList({ className }) {
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
    <section className={`${className} list-section`}>
      <div className="flex gap-4 items-center">
        <h2>To-dos</h2>
        <Tooltip text="Todos are one-time tasks you can complete anytime.">
          <InformationCircleIcon className="size-5 mb-4" />
        </Tooltip>
      </div>

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
            Looks like you have no To-dos, start adding one!
          </p>
        )}
        {todos.length !== 0 && filteredTodos.length === 0 && (
          <p className="w-fit m-auto mt-12 text-sm text-neutral-600 dark:text-neutral-400">
            No matching To-dos.
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
