import { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import Intro from "../components/sections/Intro";
import { Input } from "../components/ui/Inputs";
import Loader from "../components/ui/Loader";

function Login() {
  const { currentUser, login } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleChange = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page min-h-svh grid lg:grid-cols-2 gap-y-2 gap-x-12 p-6 lg:p-12">
      <Intro />

      <div className="flex flex-col justify-center">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <h2 className="mb-0">Log In</h2>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <Input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            autoFocus
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <Input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Loader size={16} /> : "Log In"}
          </Button>

          {error && (
            <div className="text-sm font-medium text-red-500 flex items-baseline gap-1">
              <ExclamationCircleIcon className="size-3 text-red-500" />
              {error}
            </div>
          )}
        </form>

        <div className="flex gap-2 justify-between items-center flex-wrap my-4 font-medium">
          <Link to="/passwordReset" className="auth-link">
            Forgot Password?
          </Link>

          <div className="flex gap-2">
            <p>Don&apos;t have an account?</p>
            <Link to={"/signup"} className="auth-link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
