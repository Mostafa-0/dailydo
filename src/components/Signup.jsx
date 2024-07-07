import { useContext, useEffect, useRef, useState } from "react";
import { BtnPrimary } from "./Buttons";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import AuthContext from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Intro from "./Intro";
import Input from "./Input";

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
    if (passwordRef.current.value.length < 6) {
      return setError("Password should be at least 6 characters");
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
      // console.error(error.message);
      setError("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
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
    <div className="auth-page lg:grid lg:grid-cols-2 gap-12 px-6 lg:px-12">
      <Intro />

      <div className="flex flex-col justify-center">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl uppercase font-bold">Sign Up</h1>
          <label htmlFor="username" className="sr-only">
            Name
          </label>
          <Input
            id="username"
            type="text"
            placeholder="Name"
            ref={nameRef}
            required
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
            Password Confirmation
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

          <BtnPrimary type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </BtnPrimary>

          {error && (
            <div className="text-sm font-medium text-red-500 uppercase flex gap-1">
              <ExclamationCircleIcon className="size-5 text-red-500" />
              {error}
            </div>
          )}
        </form>

        <div className="flex gap-2 font-medium my-4">
          Already have an account?
          <Link
            to={"/login"}
            className="text-indigo-800 hover:border-indigo-800 dark:text-indigo-500 hover:dark:border-indigo-500 border-b border-transparent hover:border-b"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
