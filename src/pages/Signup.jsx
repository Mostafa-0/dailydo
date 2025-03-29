import { useContext, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import AuthContext from "../context/AuthContext";
import Button from "../components/ui/Button";
import Intro from "../components/sections/Intro";
import { Input } from "../components/ui/Inputs";
import Loader from "../components/ui/Loader";

function Signup() {
  const { currentUser, signup } = useContext(AuthContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
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
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (passwordRef.current.value.length < 8) {
      return setError("Password should be at least 8 characters");
    }

    try {
      setLoading(true);
      setError(null);
      await signup(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/");
    } catch (error) {
      setError("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page min-h-svh grid lg:grid-cols-2 gap-12 p-6 lg:p-12">
      <Intro />

      <div className="flex flex-col justify-center">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <h2 className="mb-0">Sign Up</h2>
          <label htmlFor="username" className="sr-only">
            Name
          </label>
          <Input
            id="username"
            type="text"
            placeholder="Name"
            ref={nameRef}
            required
            autoFocus
          />
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
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <Input
            ref={passwordRef}
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={handleChange}
          />

          <label htmlFor="password-confirm" className="sr-only">
            Confirm Password
          </label>
          <Input
            ref={passwordConfirmRef}
            id="password-confirm"
            type="password"
            placeholder="Confirm Password"
            name="Confirmpassword"
            required
            onChange={handleChange}
          />

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Loader size={16} /> : "Sign Up"}
          </Button>

          {error && (
            <div className="text-sm font-medium text-red-500 flex items-baseline gap-1">
              <ExclamationCircleIcon className="size-3 text-red-500" />
              {error}
            </div>
          )}
        </form>

        <div className="flex gap-2 font-medium my-4">
          Already have an account?
          <Link to={"/login"} className="auth-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
