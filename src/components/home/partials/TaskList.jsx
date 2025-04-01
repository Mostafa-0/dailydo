import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Tooltip from "@components/Tooltip";
import Select from "@components/ui/Select";
import Loader from "@components/ui/Loader";
import TaskForm from "./TaskForm";

function TaskList({
  title,
  tooltip,
  sortMethods = [],
  isLoading,
  taskFormProps,
  tasks = [],
  filteredTasks = [],
  renderTaskItem,
  className,
}) {
  return (
    <section
      className={`${className} max-h-full flex flex-col gap-6 min-h-96 bg-card border border-border rounded-lg p-4 md:p-6 my-4 shadow-sm`}
    >
      <header className="flex justify-between gap-4 pb-6 border-b border-border">
        <div className="flex gap-4 items-center">
          <h2 className="mb-0">{title}</h2>
          <Tooltip text={tooltip}>
            <InformationCircleIcon className="size-5 text-muted-foreground" />
          </Tooltip>
        </div>
        {/* Filtering Methods */}
        {sortMethods.length > 0 && (
          <Select
            label="Filters"
            groups={sortMethods}
            setValue={(groupLabel, value) => {
              const method = sortMethods.find((m) => m.label === groupLabel);
              if (method && method.setValue) {
                method.setValue(value);
              }
            }}
            className="grow max-w-40"
          />
        )}
      </header>

      {/* Task Form */}
      {taskFormProps && <TaskForm {...taskFormProps} />}

      {/* Tasks List */}
      {isLoading ? (
        <Loader size={24} className="mt-12" />
      ) : tasks.length === 0 ? (
        <p className="w-fit m-auto mt-12 text-sm text-muted-foreground">
          Looks like you have no {title}, start adding one!
        </p>
      ) : filteredTasks.length === 0 ? (
        <p className="w-fit m-auto mt-12 text-sm text-muted-foreground">
          No matching {title}.
        </p>
      ) : (
        <ul className="grid gap-4 overflow-y-auto hover-scrollbar pb-4">
          {filteredTasks.map((task, index) => (
            <li key={index}>{renderTaskItem(task)}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
