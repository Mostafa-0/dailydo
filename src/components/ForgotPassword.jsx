import { useContext, useEffect, useRef, useState } from "react";
import { BtnPrimary } from "./Buttons";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import Input from "./Input";
import Popup from "./Popup";

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword, message, setMessage } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage(
        "Password reset email has been sent, check your inbox for further instructions."
      );
    } catch (error) {
      setError("Something went wrong, please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="auth-page min-h-svh grid place-items-center p-4 relative">
      <div className="w-full max-w-lg">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <h1 className="text-xl sm:text-2xl uppercase font-semibold">
            Password Reset
          </h1>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            required
          />
          <BtnPrimary type="submit" disabled={loading}>
            {loading ? "Loading..." : "Reset"}
          </BtnPrimary>

          {error && (
            <div className="text-sm font-medium text-red-500 uppercase flex gap-1">
              <ExclamationCircleIcon className="size-5 text-red-500" />
              {error}
            </div>
          )}
        </form>

        <div className="flex gap-2 justify-between flex-col items-center sm:flex-row-reverse my-4 font-medium">
          <Link
            to={"/login"}
            className="w-fit text-indigo-800 hover:border-indigo-800 dark:text-indigo-500 hover:dark:border-indigo-500 border-b border-transparent hover:border-b"
          >
            Login
          </Link>

          <div className="flex gap-2">
            <p>Don&apos;t have an account ? </p>
            <Link
              to={"/signup"}
              className="text-indigo-800 hover:border-indigo-800 dark:text-indigo-500 hover:dark:border-indigo-500 border-b border-transparent hover:border-b"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {message && <Popup message={message} onClose={() => setMessage("")} />}
    </div>
  );
}

export default ForgotPassword;
