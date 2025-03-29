import { useContext, useMemo, useState } from "react";
import { TodosContext } from "../../context/TodosContext";
import ToDoItem from "../todos/TodoItem";
import TaskList from "../TaskList";

function TodoList({ className }) {
  const { todos, loadingTodos, addTodo } = useContext(TodosContext);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dueDateFilter, setDueDateFilter] = useState("none");

  const [taskTitle, setTaskTitle] = useState("");

  const filteredTodos = useMemo(() => {
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

    return filtered;
  }, [todos, statusFilter, priorityFilter, dueDateFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim().length < 1) {
      return;
    } else {
      addTodo({
        title: taskTitle,
        description: "",
        priority: "low",
        dueDate: "",
        status: "pending",
      });
      setTaskTitle("");
    }
  };

  return (
    <TaskList
      className={className}
      title="To-dos"
      tooltip="Todos are one-time tasks you can complete anytime."
      sortMethods={[
        {
          label: "Status",
          options: [
            { label: "All", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Pending", value: "pending" },
          ],
          setValue: setStatusFilter,
        },
        {
          label: "Priority",
          options: [
            { label: "All", value: "all" },
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ],
          setValue: setPriorityFilter,
        },
        {
          label: "Due Date",
          options: [
            { label: "None", value: "none" },
            { label: "Earliest First", value: "earliest" },
            { label: "Latest First", value: "latest" },
          ],
          setValue: setDueDateFilter,
        },
      ]}
      taskFormProps={{
        label: "Add a To-do",
        placeholder: "Add a To-do",
        name: "todoTitle",
        value: taskTitle,
        onChange: (e) => setTaskTitle(e.target.value),
        onSubmit: handleSubmit,
      }}
      isLoading={loadingTodos}
      tasks={todos}
      filteredTasks={filteredTodos}
      renderTaskItem={(todo) => <ToDoItem key={todo.id} todo={todo} />}
    />
  );
}

export default TodoList;
