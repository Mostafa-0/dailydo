import { useContext, useState } from "react";
import { DailiesContext } from "@context/DailiesContext";
import TaskItem from "./TaskItem";
import EditTaskModal from "./EditTaskModal";

function DailyItem({ daily }) {
  const { editDaily, deleteDaily } = useContext(DailiesContext);
  const [data, setData] = useState({
    ...daily,
  });
  const [status, setStatus] = useState(daily.status);
  const [priority, setPriority] = useState(daily.priority || "low");
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
    editDaily(daily.id, { ...daily, status: newStatus });
    setStatus(newStatus);
  };

  const handleDelete = () => deleteDaily(daily.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await editDaily(daily.id, {
        ...data,
        priority,
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
        title={daily.title}
        description={daily.description}
        priority={daily.priority}
        status={daily.status}
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
          loading={loading}
        />
      )}
    </>
  );
}

export default DailyItem;
