import { useContext, useState } from "react";
import { DailiesContext } from "../../context/DailiesContext";
import TaskForm from "../TaskForm";

function DailyForm() {
  const { addDaily } = useContext(DailiesContext);
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length < 1) {
      return;
    } else {
      addDaily({
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
      Label="Add Daily Task"
      placeholder="Add a daily task.."
      name="taskTitle"
      value={title}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default DailyForm;
