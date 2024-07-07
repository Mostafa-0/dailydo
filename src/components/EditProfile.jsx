import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BtnDanger, BtnSecondary } from "./Buttons";
import {
  UserCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Input from "./Input";

function EditProfile() {
  const { currentUser, editUsername, editEmail, setMessage } =
    useContext(AuthContext);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordRef.current.value) {
      return setError("Please type in your password to proceed");
    }

    const promises = [];
    setLoading(true);
    setError("");
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
            "A verification email has been sent to your new email address. Please verify it to complete the update."
          );
        } else {
          setMessage("Your profile has been updated");
        }
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error.message);
        setError("Something went wrong, please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="profile">
      <form
        className="p-4 md:p-8 mt-8 tracking-wide min-h-96 max-w-3xl"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
          <div className="flex gap-2 items-center">
            <UserCircleIcon className="size-7 md:size-9" />
            <h1 className="text-2xl md:text-3xl font-semibold">Profile</h1>
          </div>
          <div className="grid grid-flow-col grid-cols-2 gap-2">
            <Link to={"/profile"}>
              <BtnDanger type={"button"}>Cancel</BtnDanger>
            </Link>
            <BtnSecondary type={"submit"} disabled={loading}>
              Save
            </BtnSecondary>
          </div>
        </div>

        <div className="font-medium grid gap-3">
          <div className="grid gap-1">
            <label htmlFor="username">Name</label>
            <Input
              id="username"
              type="text"
              defaultValue={currentUser.displayName}
              ref={usernameRef}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              defaultValue={currentUser.email}
              ref={emailRef}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              ref={passwordRef}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className="text-sm font-medium text-red-500 uppercase flex gap-1">
              <ExclamationCircleIcon className="size-5 text-red-500" />
              {error}
            </div>
          )}
        </div>
        {!currentUser.emailVerified && (
          <p className="text-sm mt-4 font-medium flex gap-1 text-gray-600 dark:text-gray-300">
            <ExclamationCircleIcon className="size-4 mt-[2px]" />
            Note: Current account is unverified.
          </p>
        )}
      </form>
    </div>
  );
}

export default EditProfile;
