import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { BtnDanger } from "./Buttons";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

function Modal({ setShowModal }) {
  const { currentUser, deleteAccount } = useContext(AuthContext);

  const handleDeleteAccount = () => {
    if (currentUser) {
      deleteAccount(currentUser)
        .then(() => {
          alert("Account deleted");
        })
        .catch((error) => {
          alert("Something went wrong, please try again later.");
          console.error(error);
        });
    }
  };

  return (
    <div className="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="modal bg-neutral-100 dark:bg-neutral-900 p-6 rounded-lg shadow-lg max-w-xl w-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl capitalize font-semibold">
            Delete Account Confirmation
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-neutral-900 dark:text-white hover:text-red-500 transition ml-2"
          >
            <XMarkIcon className="size-6" />
          </button>
        </div>
        <p className="mb-8">Are you sure you want to delete your account?</p>
        {/* <p>This will permanently delete your account and all of its data!</p> */}
        <p className="text-red-500 font-medium flex items-center gap-1">
          <ExclamationCircleIcon className="size-5" />
          This action is irreversible
        </p>
        <BtnDanger onClick={handleDeleteAccount} style={"mt-2 w-full"}>
          Delete Account
        </BtnDanger>
      </div>
    </div>
  );
}

export default Modal;
