import { useContext, useState } from "react";
import { DailiesContext } from "@context/DailiesContext";
import TaskItem from "./TaskItem";
import EditDaily from "./EditDaily";

function DailyItem({ daily }) {
  const { editDaily } = useContext(DailiesContext);
  const [status, setStatus] = useState(daily.status);
  const [showModal, setShowModal] = useState(false);

  const handleCheck = async () => {
    const newStatus = status === "pending" ? "completed" : "pending";
    editDaily(daily.id, { ...daily, status: newStatus });
    setStatus(newStatus);
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

      {showModal && <EditDaily daily={daily} setShowModal={setShowModal} />}
    </>
  );
}

export default DailyItem;
