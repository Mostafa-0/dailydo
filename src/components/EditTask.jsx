import { useEffect } from "react";
import { BtnCustom, BtnDanger, BtnPrimary } from "./ui/Buttons";
import { Input, Textarea } from "./ui/Inputs";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setShowModal, onSubmit]);

  return (
    // Overlay
    <div className="overlay fixed inset-0 h-svh bg-black bg-opacity-50 grid place-items-center z-50 p-2 md:p-4">
      {/* Modal */}
      <div className="bg-neutral-100 dark:bg-neutral-950 border dark:border-neutral-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Edit Task</h3>
          <button
            onClick={() => setShowModal(null)}
            className="text-neutral-900 dark:text-white hover:text-red-500 transition ml-2"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>

        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              name="title"
              id="title"
              value={data.title}
              placeholder="Your task goes here.."
              onChange={onChange}
              maxLength={60}
            />
            {error && (
              <div className="text-sm font-medium text-orange-500">{error}</div>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="description">Description</label>
            <Textarea
              type="text"
              name="description"
              id="description"
              value={data.description}
              placeholder="Describe your task.."
              onChange={onChange}
              maxLength={140}
            ></Textarea>
          </div>

          {dueDate && (
            <div className="grid gap-2">
              <label htmlFor="dueDate">Due date</label>
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
            <h4>Priority</h4>
            <div className="flex flex-wrap gap-2 text-white">
              <BtnCustom
                type={"button"}
                onClick={() => setPriority("low")}
                className={`grow bg-green-600 active:bg-green-700 dark:bg-green-600 dark:active:bg-opacity-60 hover:bg-green-600 ${
                  priority == "low"
                    ? "bg-opacity-100 dark:bg-opacity-100"
                    : "bg-opacity-75 dark:bg-opacity-20"
                }`}
              >
                Low
              </BtnCustom>
              <BtnCustom
                type={"button"}
                onClick={() => setPriority("medium")}
                className={`grow bg-yellow-500 active:bg-yellow-600 dark:bg-yellow-600 dark:active:bg-opacity-60 hover:bg-yellow-500 ${
                  priority == "medium"
                    ? "bg-opacity-100 dark:bg-opacity-100"
                    : "bg-opacity-75 dark:bg-opacity-20"
                }`}
              >
                Medium
              </BtnCustom>
              <BtnCustom
                type={"button"}
                onClick={() => setPriority("high")}
                className={`grow bg-red-600 active:bg-red-700 dark:bg-red-600 dark:active:bg-opacity-60 hover:bg-red-600 ${
                  priority == "high"
                    ? "bg-opacity-100 dark:bg-opacity-100"
                    : "bg-opacity-75 dark:bg-opacity-20"
                }`}
              >
                High
              </BtnCustom>
            </div>
          </div>

          <div className="grid gap-2">
            <BtnPrimary type="submit">Update</BtnPrimary>
            <BtnDanger type="button" onClick={handleDelete}>
              Delete
            </BtnDanger>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
