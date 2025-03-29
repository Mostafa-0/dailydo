import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileContext from "../context/ProfileContext";
import Button from "../components/ui/Button";
import Tooltip from "../components/ui/Tooltip";
import Loader from "../components/ui/Loader";
import { Input } from "../components/ui/Inputs";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

function ChangePassword() {
  const { editPassword, setMessage } = useContext(ProfileContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
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
      navigate(-1);
    } catch (error) {
      setError("Update failed. Check your current password and try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4">
      <h2 className="mb-0">Change Password</h2>
      <div className="grid gap-2 max-w-sm">
        <label htmlFor="current-password" className="text-sm font-medium">
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
        <div className="flex gap-2 items-center">
          <label htmlFor="password" className="text-sm font-medium">
            New Password
          </label>
          <Tooltip text={"Password must be at least 8 characters long."}>
            <InformationCircleIcon className="size-4 text-muted-foreground" />
          </Tooltip>
        </div>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-sm"
        />
      </div>

      <div className="grid gap-2 max-w-sm">
        <label htmlFor="password-confirm" className="text-sm font-medium">
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
        <p className="flex items-center gap-1 text-destructive text-sm font-medium">
          <ExclamationCircleIcon className="size-4" />
          {error}
        </p>
      )}

      <div className="mt-auto grid grid-cols-2 w-full max-w-xs md:ml-auto gap-3">
        <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={
            loading || password.length == 0 || passwordConfirm.length == 0
          }
        >
          {loading ? <Loader size={14} /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default ChangePassword;
