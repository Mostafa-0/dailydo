import { useContext, useMemo, useState } from "react";
import { TodosContext } from "@context/TodosContext";
import ToDoItem from "../partials/TodoItem";
import TaskList from "../partials/TaskList";

function TodoList({ className }) {
  const { todos, loadingTodos, addTodo } = useContext(TodosContext);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dueDateFilter, setDueDateFilter] = useState("none");
  const [taskTitle, setTaskTitle] = useState("");

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      // Move completed tasks to the bottom
      if (a.status === "completed" && b.status !== "completed") return 1;
      if (b.status === "completed" && a.status !== "completed") return -1;

      // Sort by createdAt (newest first)
      return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    });
  }, [todos]);

  const filteredTodos = useMemo(() => {
    let filtered = [...sortedTodos];

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
  }, [sortedTodos, statusFilter, priorityFilter, dueDateFilter]);

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
