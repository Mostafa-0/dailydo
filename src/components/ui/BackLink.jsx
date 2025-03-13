import { NavLink } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

function BackLink({ to = "/", className = "" }) {
  return (
    <NavLink
      to={to}
      className={`w-fit p-2 rounded-md flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white transition ${className}`}
    >
      <ArrowLeftCircleIcon className="size-5" /> Back
    </NavLink>
  );
}

export default BackLink;
