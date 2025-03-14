import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ModalWrapper from "./ModalWrapper";
import Button from "../ui/Button";
import { Input } from "../ui/Inputs";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function ChangePassword({ setShowModal }) {
  const { editPassword, setMessage } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validateForm = () => {
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (password !== passwordConfirm) return "Passwords do not match.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    try {
      setLoading(true);
      await editPassword(currentPassword, password);
      setMessage("Password updated successfully!");
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirm("");
      setShowModal(false);
    } catch (error) {
      setError("Update failed. Check your current password and try again.");
    }
    setLoading(false);
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
    <ModalWrapper title="Change Password" setShowModal={setShowModal}>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="current-password" className="font-medium">
            Current Password
          </label>
          <Input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="font-medium">
            New Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Password must be at least 6 characters long.
        </p>
        <div className="grid gap-2">
          <label htmlFor="password-confirm" className="font-medium">
            Confirm New Password
          </label>
          <Input
            type="password"
            id="password-confirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        {error && (
          <div className="flex gap-1 text-red-500 text-sm font-medium">
            <ExclamationCircleIcon className="size-4 mt-[2px]" />
            {error}
          </div>
        )}

        <Button variant="primary" type="submit" className="mt-4">
          {loading ? "Updating..." : "Save"}
        </Button>
      </form>
    </ModalWrapper>
  );
}

export default ChangePassword;
