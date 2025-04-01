import { useContext, useState } from "react";
import { TodosContext } from "@context/TodosContext";
import TaskItem from "./TaskItem";
import EditTaskModal from "./EditTaskModal";

function ToDoItem({ todo }) {
  const { editTodo, deleteTodo } = useContext(TodosContext);
  const [data, setData] = useState({
    ...todo,
  });
  const [status, setStatus] = useState(todo.status);
  const [priority, setPriority] = useState(todo.priority || "low");
  const [showModal, setShowModal] = useState(false);
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

  const handleCheck = async () => {
    const newStatus = status === "pending" ? "completed" : "pending";
    editTodo(todo.id, { ...todo, status: newStatus });
    setStatus(newStatus);
  };

  const handleDelete = () => deleteTodo(todo.id);

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

  return (
    <>
      <TaskItem
        title={todo.title}
        description={todo.description}
        priority={todo.priority}
        status={todo.status}
        dueDate={todo.dueDate}
        onCheck={handleCheck}
        setShowModal={() => {
          setShowModal(true);
        }}
      />
      {showModal && (
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
      )}
    </>
  );
}

export default ToDoItem;
