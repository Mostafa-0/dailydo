import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Inputs";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function EditProfile() {
  const { currentUser, editUsername, editEmail, setMessage } =
    useContext(AuthContext);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordRef.current.value) {
      return setError("Please verify your password to proceed.");
    }

    const promises = [];
    setLoading(true);
    setError(null);

    if (usernameRef.current.value !== currentUser.displayName) {
      promises.push(editUsername(usernameRef.current.value));
    }
    if (emailRef.current.value !== currentUser.email) {
      promises.push(
        editEmail(emailRef.current.value, passwordRef.current.value)
      );
    }

    Promise.all(promises)
      .then(() => {
        if (emailRef.current.value !== currentUser.email) {
          setMessage(
            "A verification email has been sent to your new email address."
          );
        } else {
          setMessage("Your profile has been updated.");
        }
        navigate("/profile");
      })
      .catch(() => setError("Something went wrong, please try again."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-neutral-950 shadow-md rounded-xl border border-neutral-200 dark:border-neutral-800">
      <h2 className="mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="flex items-center gap-4">
          <div className="size-24 bg-neutral-300 dark:bg-neutral-800 rounded-full" />
          <h2 className="text-lg font-semibold">
            {currentUser.displayName || "[Name]"}
          </h2>
        </div>

        <div className="grid gap-2 max-w-96">
          <label
            htmlFor="username"
            className="text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Name
          </label>
          <Input
            id="username"
            type="text"
            defaultValue={currentUser.displayName}
            ref={usernameRef}
          />
        </div>

        <div className="grid gap-2 max-w-96">
          <label
            htmlFor="email"
            className="text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            defaultValue={currentUser.email}
            ref={emailRef}
          />
        </div>

        <div className="grid gap-2 max-w-96">
          <label
            htmlFor="password"
            className="text-sm font-medium text-neutral-600 dark:text-neutral-300"
          >
            Verify Password
          </label>
          <Input
            id="password"
            type="password"
            ref={passwordRef}
            onChange={() => setError(null)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium flex items-center gap-1">
            <ExclamationCircleIcon className="size-4" /> {error}
          </p>
        )}

        <div className="mt-8 flex justify-between">
          <Button
            variant="secondary"
            onClick={() => navigate("/profile")}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
