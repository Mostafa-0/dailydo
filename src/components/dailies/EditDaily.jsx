import { useContext, useState } from "react";
import { DailiesContext } from "../../context/DailiesContext";
import EditTask from "../modals/EditTask";

function EditDaily({ daily, setShowModal }) {
  const { editDaily, deleteDaily } = useContext(DailiesContext);
  const [data, setData] = useState({
    ...daily,
  });
  const [priority, setPriority] = useState(daily.priority || "low");
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

  const handleDelete = () => deleteDaily(daily.id);

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
      loading={loading}
    />
  );
}

export default EditDaily;
