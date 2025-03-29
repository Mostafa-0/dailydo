import { CheckIcon } from "@heroicons/react/24/solid";

const CheckItem = ({ label, checked, onChange }) => {
  return (
    <label
      className="flex items-center justify-between cursor-pointer px-3 py-2 rounded hover:bg-muted/40 transition"
      onClick={onChange}
    >
      <span className="text-foreground">{label}</span>
      {checked && <CheckIcon className="size-5 text-primary" />}
    </label>
  );
};

export default CheckItem;
