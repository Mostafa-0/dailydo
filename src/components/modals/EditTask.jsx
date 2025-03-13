import ModalWrapper from "./ModalWrapper";
import { Input, Textarea } from "../ui/Inputs";
import Button from "../ui/Button";

function EditTask({
  data,
  error,
  priority,
  setPriority,
  setShowModal,
  onChange,
  onSubmit,
  handleDelete,
  dueDate = false,
}) {
  return (
    <ModalWrapper title="Edit Task" setShowModal={setShowModal}>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <div className="grid gap-2">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <Input
            type="text"
            name="title"
            id="title"
            value={data.title}
            placeholder="Your task goes here.."
            onChange={onChange}
            maxLength={80}
          />
          {error && (
            <div className="text-sm font-medium text-orange-500">{error}</div>
          )}
        </div>

        <div className="grid gap-2">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <Textarea
            name="description"
            id="description"
            value={data.description}
            placeholder="Describe your task.."
            onChange={onChange}
            maxLength={140}
          />
        </div>

        {dueDate && (
          <div className="grid gap-2">
            <label htmlFor="dueDate" className="font-semibold">
              Due date
            </label>
            <Input
              type="date"
              name="dueDate"
              id="dueDate"
              value={data.dueDate}
              onChange={onChange}
            />
          </div>
        )}

        <div className="grid gap-2">
          <h3 className="font-semibold">Priority</h3>
          <div className="flex flex-wrap gap-2 text-white">
            {["low", "medium", "high"].map((level) => (
              <Button
                key={level}
                variant="custom"
                type="button"
                onClick={() => setPriority(level)}
                className={`grow ${
                  level === "low"
                    ? "bg-green-600 dark:bg-green-600 hover:bg-green-600"
                    : level === "medium"
                    ? "bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-500"
                    : "bg-red-600 dark:bg-red-600 hover:bg-red-600"
                } ${
                  priority === level
                    ? "bg-opacity-100 dark:bg-opacity-100"
                    : "bg-opacity-25 text-black dark:text-white dark:bg-opacity-20"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Button variant="primary" type="submit">
            Update
          </Button>
          <Button variant="danger" type="button" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default EditTask;
