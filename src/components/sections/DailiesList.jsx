import { useContext, useEffect, useState } from "react";
import { DailiesContext } from "../../context/DailiesContext";
import DailyForm from "../dailies/DailiesForm";
import DailyItem from "../dailies/DailyItem";

function DailiesList() {
  const { dailies, setDailies } = useContext(DailiesContext);
  const [filteredDailies, setFilteredDailies] = useState(dailies);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    let filtered = [...dailies];

    if (statusFilter !== "all") {
      filtered = filtered.filter((daily) => daily.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((daily) => daily.priority === priorityFilter);
    }

    setFilteredDailies(filtered);
  }, [dailies, statusFilter, priorityFilter]);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  return (
    <section className="list-wrapper">
      <h2>Dailies</h2>

      <div className="flex flex-wrap gap-2">
        {/* Status filtering */}
        <div className="grow max-w-32">
          <label htmlFor="daily-status" className="sr-only">
            Status:{" "}
          </label>
          <select
            id="daily-status"
            defaultValue={"all"}
            onChange={handleStatusChange}
            className="dark:bg-neutral-900 p-2 rounded-lg mr-2 focus:outline-none font-medium text-sm w-full"
          >
            <option value="all" className="font-medium" disabled>
              Status
            </option>
            <option value="all" className="font-medium">
              All
            </option>
            <option value="completed" className="font-medium">
              Completed
            </option>
            <option value="pending" className="font-medium">
              Pending
            </option>
          </select>
        </div>
        {/* Priority filtering */}
        <div className="grow max-w-32">
          <label htmlFor="daily-priority" className="sr-only">
            Priority:{" "}
          </label>
          <select
            id="daily-priority"
            defaultValue={"all"}
            onChange={handlePriorityChange}
            className="dark:bg-neutral-900 p-2 rounded-lg mr-2 focus:outline-none font-medium text-sm w-full"
          >
            <option value="all" className="font-medium" disabled>
              Priority
            </option>
            <option value="all" className="font-medium">
              All
            </option>
            <option value="low" className="font-medium">
              Low
            </option>
            <option value="medium" className="font-medium">
              Medium
            </option>
            <option value="high" className="font-medium">
              High
            </option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <DailyForm />
        {dailies.length === 0 && (
          <p className="w-fit m-auto mt-12 text-sm text-neutral-600 dark:text-neutral-400">
            Looks like you have no dailies, start adding one!
          </p>
        )}
        {dailies.length !== 0 && filteredDailies.length === 0 && (
          <p className="w-fit m-auto mt-12 text-sm text-neutral-600 dark:text-neutral-400">No matching dailies.</p>
        )}
        <ul className="grid gap-4">
          {filteredDailies.map((daily) => (
            <DailyItem key={daily.id} daily={daily} setDailies={setDailies} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DailiesList;
