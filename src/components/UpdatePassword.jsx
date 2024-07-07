import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BtnDanger, BtnSecondary } from "./Buttons";
import {
  ExclamationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Input from "./Input";

function UpdatePassword() {
  const { editPassword, setMessage } = useContext(AuthContext);
  const currentPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    if (passwordRef.current.value.length < 6) {
      return setError("Password should be at least 6 characters");
    }

    try {
      setError("");
      setLoading(true);
      await editPassword(
        currentPasswordRef.current.value,
        passwordRef.current.value
      );
      setMessage("Password updated");
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      setError("Something went wrong, please try again later");
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
            <label htmlFor="current-password">Current Password</label>
            <Input
              type="password"
              id="current-password"
              onChange={handleChange}
              required
              ref={currentPasswordRef}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">New Password</label>
            <Input
              type="password"
              id="password"
              onChange={handleChange}
              ref={passwordRef}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password-confirm">Confirm Password</label>
            <Input
              type="password"
              id="password-confirm"
              onChange={handleChange}
              ref={passwordConfirmRef}
            />
          </div>
          <p className="text-sm font-medium flex gap-1 items-center text-gray-600 dark:text-gray-300">
            <ExclamationCircleIcon className="size-4" />
            Note: Password should be at least 6 characters
          </p>
          {error && (
            <div className="text-sm font-medium text-red-500 uppercase flex gap-1">
              <ExclamationCircleIcon className="size-5 text-red-500" />
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;
