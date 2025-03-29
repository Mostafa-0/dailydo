import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileContext from "@context/ProfileContext";
import Button from "@components/ui/Button";
import Loader from "@components/ui/Loader";
import { Input } from "@components/ui/Inputs";
import ErrorMessage from "@components/ui/ErrorMessage";

function ChangeEmail() {
  const { currentUser, editEmail, setMessage } = useContext(ProfileContext);
  const [email, setEmail] = useState(currentUser.email);
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await editEmail(email, passwordRef.current.value);
      setMessage(
        "Verification email sent to your new address. Check your inbox and follow the instructions to confirm."
      );
      navigate(-1);
    } catch (error) {
      setError("Update failed. Check your current password and try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Change Email</h1>
      <div className="grid gap-2 max-w-sm">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-xs text-muted-foreground font-medium">
          A verification email will be sent to your new address for the change
          to take effect.
        </p>
      </div>

      <div className="grid gap-2 max-w-96">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          ref={passwordRef}
          onChange={() => setError(null)}
        />
        <Link className="auth-link text-xs" to="/passwordReset" target="_blank">
          Forgot Password?
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="mt-auto w-full max-w-xs grid grid-cols-2 md:ml-auto gap-3">
        <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={loading || email === currentUser.email}
        >
          {loading ? <Loader size={14} /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default ChangeEmail;
