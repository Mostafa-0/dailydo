import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Input } from "../components/ui/Inputs";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

function DeleteAccount() {
  const { deleteAccount } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await deleteAccount(password);
      setLoading(false);
      alert("Account deleted successfully.");
    } catch (err) {
      setError("Incorrect password or an error occurred. Try again.");
      setLoading(false);
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
    <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4">
      <h2 className="mb-0">Delete Account</h2>
      <p className="text-secondary-foreground">
        Deleting your account is permanent. All your data will be wiped out
        immediately and you won&apos;t be able to get it back.
      </p>
      <p className="text-sm font-semibold text-destructive">
        Warning: This action is irreversible.
      </p>

      <div className="grid gap-2 max-w-sm">
        <label htmlFor="password" className="text-sm font-medium">
          Please Enter Your Password:
        </label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-sm"
        />
      </div>

      {error && (
        <p className="flex items-center gap-1 text-destructive text-sm font-medium">
          <ExclamationCircleIcon className="size-4" />
          {error}
        </p>
      )}

      <div className="mt-auto grid grid-cols-2 max-w-xs md:ml-auto gap-3">
        <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button variant="danger" type="submit" disabled={loading}>
          {loading ? <Loader size={14} /> : "Delete Account"}
        </Button>
      </div>
    </form>
  );
}

export default DeleteAccount;
