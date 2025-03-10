import { useContext, useState } from "react";
import { TodosContext } from "../../context/TodosContext";
import TaskItem from "../TaskItem";
import EditTodo from "./EditTodo";

function ToDoItem({ todo }) {
  const { editTodo } = useContext(TodosContext);
  const [status, setStatus] = useState(todo.status);
  const [showModal, setShowModal] = useState(false);

  const handleCheck = async () => {
    const newStatus = status === "pending" ? "completed" : "pending";
    editTodo(todo.id, { ...todo, status: newStatus });
    setStatus(newStatus);
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
      {showModal && <EditTodo todo={todo} setShowModal={setShowModal} />}
    </>
  );
}

export default ToDoItem;
