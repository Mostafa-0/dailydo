import { XMarkIcon } from "@heroicons/react/24/solid";

function Popup({ message, onClose }) {
  return (
    <div className="fixed inset-x-0 flex items-start justify-center z-50">
      <div className="text-white fixed top-20 text-sm max-w-[80%] py-3 px-5 pr-12 text-center font-medium bg-emerald-900 bg-opacity-90 shadow-md rounded-md">
        {message}
        <button
          onClick={onClose}
          className="absolute top-1/2 -translate-y-1/2 right-2"
        >
          <XMarkIcon className="size-5 text-white" />
        </button>
      </div>
    </div>
  );
}

export default Popup;
