import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

function ModalWrapper({ title, children, setShowModal }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowModal(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setShowModal]);

  return (
    <div className="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="modal bg-neutral-100 border dark:bg-neutral-950 dark:border-neutral-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* Modal Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold mb-0">{title}</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-neutral-900 dark:text-white hover:text-red-500 transition ml-2"
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
