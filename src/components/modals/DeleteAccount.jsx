import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ModalWrapper from "./ModalWrapper";
import Button from "../ui/Button";

function DeleteAccount({ setShowModal }) {
  const { currentUser, deleteAccount } = useContext(AuthContext);

  const handleDeleteAccount = () => {
    if (currentUser) {
      deleteAccount(currentUser)
        .then(() => alert("Account deleted"))
        .catch((error) => {
          alert("Something went wrong, please try again later.");
          console.error(error);
        });
    }
  };

  return (
    <ModalWrapper title="Delete Account" setShowModal={setShowModal}>
      <p className="text-neutral-600 dark:text-neutral-300">
        This will permanently delete your account and all of its data.
      </p>
      <p className="text-sm font-medium text-red-500 mt-8">
        <span className="font-semibold">Warning</span>: This action is not
        reversible.
      </p>
      <Button
        variant="danger"
        onClick={handleDeleteAccount}
        className="w-full mt-4"
      >
        Delete Account
      </Button>
    </ModalWrapper>
  );
}

export default DeleteAccount;
