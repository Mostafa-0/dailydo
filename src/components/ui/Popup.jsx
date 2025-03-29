import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

function Popup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-x-0 flex items-start justify-center z-50">
      <div className="fixed bottom-8 max-w-[80%] px-5 py-3 pr-12 text-sm font-medium text-primary-foreground bg-primary/90 shadow-md rounded-lg">
        {message}
        <button
          onClick={onClose}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-primary-foreground hover:opacity-75 transition"
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}

export default Popup;
