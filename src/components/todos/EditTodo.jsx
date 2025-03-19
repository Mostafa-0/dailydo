import { useContext, useState } from "react";
import { TodosContext } from "../../context/TodosContext";
import EditTask from "../modals/EditTask";

function EditTodo({ todo, setShowModal }) {
  const { editTodo, deleteTodo } = useContext(TodosContext);
  const [data, setData] = useState({
    ...todo,
  });
  const [priority, setPriority] = useState(todo.priority || "low");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.title.trim().length < 1) {
      setError("You can't leave the title empty!");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    }
    try {
      await editTodo(todo.id, {
        ...data,
        priority,
        dueDate: data.dueDate ? data.dueDate : "",
      });
      setShowModal(false);
    } catch (error) {
      setError("An error has occurred");
    }
  };

  const handleDelete = () => deleteTodo(todo.id);

  return (
    <EditTask
      data={data}
      error={error}
      priority={priority}
      setPriority={setPriority}
      setShowModal={setShowModal}
      onChange={handleChange}
      onSubmit={handleSubmit}
      handleDelete={handleDelete}
      dueDate
    />
  );
}

export default EditTodo;
