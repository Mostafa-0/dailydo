import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center gap-2 text-destructive text-sm font-medium">
      <ExclamationCircleIcon className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
