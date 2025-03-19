import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ModalWrapper from "./ModalWrapper";
import Button from "../ui/Button";
import { Input } from "../ui/Inputs";

function DeleteAccount({ setShowModal }) {
  const { deleteAccount } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await deleteAccount(password);
      alert("Account deleted successfully.");
    } catch (err) {
      setError("Incorrect password or an error occurred. Try again.");
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <ModalWrapper title="Delete Account" setShowModal={setShowModal}>
      <p className="text-neutral-600 dark:text-neutral-300">
        This will permanently delete your account and all of its data.
      </p>
      <p className="text-sm font-medium text-red-500 my-4">
        <span className="font-semibold">Warning</span>: This action is not
        reversible.
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <Button variant="danger" type="submit" className="w-full mt-4">
          Delete Account
        </Button>
      </form>
    </ModalWrapper>
  );
}

export default DeleteAccount;
