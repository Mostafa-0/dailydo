import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Input } from "./ui/Inputs";

function TaskForm({ label, placeholder, name, value, onChange, onSubmit }) {
  let id = crypto.randomUUID();
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="relative">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <Input
          type="text"
          id={id}
          maxLength={80}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-3"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-3 hover:brightness-110 active:scale-110"
        >
          <span className="sr-only">{label}</span>
          <PlusCircleIcon className="size-8 text-primary" />
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
