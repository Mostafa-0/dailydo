import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "@context/AuthContext";
import ProfileContext from "@context/ProfileContext";
import Button from "@components/ui/Button";
import { Input } from "@components/ui/Inputs";
import Popup from "@components/ui/Popup";
import Loader from "@components/ui/Loader";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

function PasswordReset() {
  const emailRef = useRef();
  const { currentUser } = useContext(ProfileContext);
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
          <h1 className="text-xl sm:text-2xl font-bold">Reset Password</h1>
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
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Loader size={16} /> : "Reset"}
          </Button>

          {error && (
            <div className="text-sm font-medium text-red-500 flex items-baseline gap-1">
              <ExclamationCircleIcon className="size-3 text-red-500" />
              {error}
            </div>
          )}
        </form>

        {!currentUser && (
          <div className="flex gap-2 justify-between items-center flex-wrap my-4 font-medium">
            <Link to={"/login"} className="auth-link">
              Login
            </Link>

            <div className="flex gap-2">
              <p>Don&apos;t have an account ? </p>
              <Link to={"/signup"} className="auth-link">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>

      {message && <Popup message={message} onClose={() => setMessage("")} />}
    </div>
  );
}

export default PasswordReset;
