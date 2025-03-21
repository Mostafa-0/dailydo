import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Input } from "./ui/Inputs";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function ProfileForm({ usernameRef, emailRef, passwordRef, error, setError }) {
  const { currentUser } = useContext(AuthContext);
  const [emailChanged, setEmailChanged] = useState(false);

  const handleEmailChange = (e) => {
    setError(null);
    setEmailChanged(e.target.value !== currentUser.email);
  };

  return (
    <>
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
          ref={usernameRef}
          defaultValue={currentUser.displayName}
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
          ref={emailRef}
          defaultValue={currentUser.email}
          onChange={handleEmailChange}
        />
        {emailChanged && (
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            A verification email will be sent to your new address for the change
            to take effect.
          </p>
        )}
      </div>

      {emailChanged && (
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
      )}

      {error && (
        <p className="text-red-500 text-sm font-medium flex items-center gap-1">
          <ExclamationCircleIcon className="size-4" /> {error}
        </p>
      )}
    </>
  );
}

export default ProfileForm;
