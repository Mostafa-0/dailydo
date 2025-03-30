import { useEffect, useState } from "react";
import ModalWrapper from "@components/ModalWrapper";
import Button from "@components/ui/Button";
import Loader from "@components/ui/Loader";
import { Input, Textarea } from "@components/ui/Inputs";
import ErrorMessage from "@components/ui/ErrorMessage";
import { TrashIcon } from "@heroicons/react/24/solid";

function EditTaskModal({
  data,
  error,
  priority,
  setPriority,
  setShowModal,
  onChange,
  onSubmit,
  handleDelete,
  dueDate = false,
  loading,
}) {
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete") handleDelete();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleDelete]);

  const handleTitleChange = (e) => {
    onChange(e);
    if (e.target.value.trim().length > 0) {
      setTitleError("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (data.title.trim().length < 1) {
      setTitleError("Oops, you forgot to add a title!");
      setTimeout(() => {
        setTitleError("");
      }, 4000);
      return;
    }
    onSubmit(e);
  };

  return (
    <ModalWrapper
      className="max-w-md"
      title="Edit Task"
      onClose={() => setShowModal(false)}
    >
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
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
            onChange={handleTitleChange}
            maxLength={100}
            className={titleError ? "border-2 border-destructive" : ""}
          />
          <p className="text-muted-foreground text-xs ml-auto">
            {data.title.length} / 100
          </p>
          {titleError && <ErrorMessage message={titleError} />}
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
            maxLength={300}
          />
          <p className="text-muted-foreground text-xs ml-auto">
            {data.description.length} / 300
          </p>
        </div>

        {dueDate && (
          <div className="grid gap-2">
            <div className="flex justify-between items-baseline">
              <label htmlFor="dueDate" className="font-semibold">
                Due date
              </label>
              <button
                type="button"
                className="text-xs"
                onClick={() =>
                  onChange({ target: { name: "dueDate", value: "" } })
                }
              >
                Clear
              </button>
            </div>
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
                    : "bg-opacity-35 text-card-foreground dark:bg-opacity-20 hover:text-white"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {error && <ErrorMessage message={error} />}
          <Button
            variant="danger"
            onClick={handleDelete}
            className="min-h-9 gap-1"
          >
            <TrashIcon className="size-4" /> Delete
          </Button>
          <Button variant="primary" type="submit" className="min-h-9">
            {loading ? <Loader size={16} /> : "Save"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default EditTaskModal;
