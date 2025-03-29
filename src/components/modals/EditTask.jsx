import { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Input, Textarea } from "../ui/Inputs";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

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
      <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
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
            maxLength={80}
            className={titleError ? "border-2 border-destructive" : ""}
          />
          {titleError && (
            <p className="text-sm font-medium text-destructive">{titleError}</p>
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

        <div className="grid gap-2">
          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
          <Button variant="primary" type="submit" className="min-h-9">
            {loading ? <Loader size={16} /> : "Update"}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleDelete}
            className="min-h-9"
          >
            Delete
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}

export default EditTask;
