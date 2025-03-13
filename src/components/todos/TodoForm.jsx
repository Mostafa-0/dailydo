import { useContext, useState } from "react";
import { TodosContext } from "../../context/TodosContext";
import TaskForm from "../TaskForm";

function TodoForm() {
  const { addTodo } = useContext(TodosContext);
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length < 1) {
      return;
    } else {
      addTodo({
        id: crypto.randomUUID(),
        title: title,
        description: "",
        priority: "low",
        dueDate: "",
        status: "pending",
      });
      setTitle("");
    }
  };

  return (
    <TaskForm
      Label="Add To-do"
      placeholder="Add a To-do.."
      name="todoTitle"
      value={title}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default TodoForm;
