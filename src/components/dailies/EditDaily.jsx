import { useContext, useState } from "react";
import { DailiesContext } from "../../context/DailiesContext";
import EditTask from "../modals/EditTask";

function EditDaily({ daily, setShowModal }) {
  const { editDaily, deleteDaily } = useContext(DailiesContext);
  const [data, setData] = useState({
    ...daily,
  });
  const [priority, setPriority] = useState(daily.priority || "low");
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
      await editDaily(daily.id, {
        ...data,
        priority,
      });
      setShowModal(false);
    } catch (error) {
      setError("An error has occurred");
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
    />
  );
}

export default EditDaily;
