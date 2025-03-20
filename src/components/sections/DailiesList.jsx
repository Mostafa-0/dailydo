import { useContext, useMemo, useState } from "react";
import { DailiesContext } from "../../context/DailiesContext";
import DailyForm from "../dailies/DailiesForm";
import DailyItem from "../dailies/DailyItem";
import Select from "../ui/Select";
import Tooltip from "../ui/Tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

function DailiesList({ className }) {
  const { dailies } = useContext(DailiesContext);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredDailies = useMemo(() => {
    let filtered = [...dailies];

    if (statusFilter !== "all") {
      filtered = filtered.filter((daily) => daily.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((daily) => daily.priority === priorityFilter);
    }

    return filtered
  }, [dailies, statusFilter, priorityFilter]);

  return (
    <section className={`${className} list-section`}>
      <div className="flex gap-4 items-center">
        <h2>Dailies</h2>
        <Tooltip text="Dailies are tasks you complete every day.">
          <InformationCircleIcon className="size-5 mb-4" />
        </Tooltip>
      </div>
      <div className="flex flex-wrap gap-4">
        <Select
          label="Status"
          options={[
            { label: "All", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "Pending", value: "pending" },
          ]}
          setValue={setStatusFilter}
          className="grow max-w-36"
        />
        <Select
          label="Priority"
          options={[
            { label: "All", value: "all" },
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ]}
          setValue={setPriorityFilter}
          className="grow max-w-36"
        />
      </div>

      <div className="mt-4">
        <DailyForm />
        {dailies.length === 0 && (
          <p className="w-fit m-auto mt-12 text-sm text-neutral-600 dark:text-neutral-400">
            Looks like you have no dailies, start adding one!
          </p>
        )}
        {dailies.length !== 0 && filteredDailies.length === 0 && (
          <p className="w-fit m-auto mt-12 text-sm text-neutral-600 dark:text-neutral-400">
            No matching dailies.
          </p>
        )}
        <ul className="grid gap-4">
          {filteredDailies.map((daily) => (
            <DailyItem key={daily.id} daily={daily} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DailiesList;
