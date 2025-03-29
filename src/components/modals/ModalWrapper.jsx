import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

function ModalWrapper({ title, children, onClose, className }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-2 md:p-4">
      <div
        className={`modal bg-popover border border-border p-6 rounded-lg shadow-lg w-full ${className}`}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold mb-0">{title}</h2>
          <button
            onClick={onClose}
            className="hover:text-destructive transition ml-2"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;
