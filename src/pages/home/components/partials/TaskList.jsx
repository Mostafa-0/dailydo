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
      className={`${className} flex flex-col gap-6 min-h-96 bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm`}
    >
      <header className="flex justify-between items-center pb-4 border-b border-border">
        <div className="flex gap-4 items-center">
          <h2 className="mb-0">{title}</h2>
          <Tooltip text={tooltip}>
            <InformationCircleIcon className="size-5 text-muted-foreground" />
          </Tooltip>
        </div>
      </header>

      {/* Filtering Methods */}
      {sortMethods.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {sortMethods.map(({ label, options, setValue }) => (
            <Select
              key={label}
              label={label}
              options={options}
              setValue={setValue}
              className="grow sm:max-w-36"
            />
          ))}
        </div>
      )}

      {/* Task Form */}
      {taskFormProps && <TaskForm {...taskFormProps} />}

      {/* Tasks List */}
      <ul>
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
          <ul className="grid gap-4">
            {filteredTasks.map((task, index) => (
              <li key={index}>{renderTaskItem(task)}</li>
            ))}
          </ul>
        )}
      </ul>
    </section>
  );
}

export default TaskList;
