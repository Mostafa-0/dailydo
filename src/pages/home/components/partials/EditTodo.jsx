import { useContext, useState } from "react";
import { TodosContext } from "@context/TodosContext";
import EditTaskModal from "./EditTaskModal";

function EditTodo({ todo, setShowModal }) {
  const { editTodo, deleteTodo } = useContext(TodosContext);
  const [data, setData] = useState({
    ...todo,
  });
  const [priority, setPriority] = useState(todo.priority || "low");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      await editTodo(todo.id, {
        ...data,
        priority,
        dueDate: data.dueDate ? data.dueDate : "",
      });
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      setError("An error has occurred, please try again later.");
    }
  };

  const handleDelete = () => deleteTodo(todo.id);

  return (
    <EditTaskModal
      data={data}
      error={error}
      priority={priority}
      setPriority={setPriority}
      setShowModal={setShowModal}
      onChange={handleChange}
      onSubmit={handleSubmit}
      handleDelete={handleDelete}
      dueDate
      loading={loading}
    />
  );
}

export default EditTodo;
