import { useContext, useMemo, useState } from "react";
import { DailiesContext } from "@context/DailiesContext";
import TaskList from "../partials/TaskList";
import DailyItem from "../partials/DailyItem";

function DailiesList({ className }) {
  const { dailies, loadingDailies, addDaily } = useContext(DailiesContext);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dailyTitle, setDailyTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dailyTitle.trim().length < 1) {
      return;
    } else {
      addDaily({
        title: dailyTitle,
        description: "",
        priority: "low",
        status: "pending",
      });
      setDailyTitle("");
    }
  };

  const filteredDailies = useMemo(() => {
    let filtered = [...dailies];

    if (statusFilter !== "all") {
      filtered = filtered.filter((daily) => daily.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((daily) => daily.priority === priorityFilter);
    }

    return filtered;
  }, [dailies, statusFilter, priorityFilter]);

  return (
    <TaskList
      className={className}
      title="Dailies"
      tooltip="Dailies are tasks you complete every day."
      sortMethods={[
        {
          label: "Status",
          options: [
            { label: "All", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Pending", value: "pending" },
          ],
          setValue: setStatusFilter,
        },
        {
          label: "Priority",
          options: [
            { label: "All", value: "all" },
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ],
          setValue: setPriorityFilter,
        },
      ]}
      taskFormProps={{
        label: "Add a Daily",
        placeholder: "Add a Daily",
        name: "dailyTitle",
        value: dailyTitle,
        onChange: (e) => setDailyTitle(e.target.value),
        onSubmit: handleSubmit,
      }}
      isLoading={loadingDailies}
      tasks={dailies}
      filteredTasks={filteredDailies}
      renderTaskItem={(daily) => <DailyItem key={daily.id} daily={daily} />}
    />
  );
}

export default DailiesList;
