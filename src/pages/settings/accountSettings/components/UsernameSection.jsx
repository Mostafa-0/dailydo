import { useState, useContext } from "react";
import ProfileContext from "@context/ProfileContext";
import { Input } from "@components/ui/Inputs";
import Button from "@components/ui/Button";
import ProfileSection from "./ProfileSection";
import ErrorMessage from "@components/ui/ErrorMessage";
import Loader from "@components/ui/Loader";

function UsernameSection() {
  const { currentUser, editUsername } = useContext(ProfileContext);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(currentUser.displayName || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (newUsername.length < 4) {
      setError("Username must be at least 4 characters.");
      return;
    }
    setLoading(true);
    await editUsername(newUsername);
    setLoading(false);
    setEditing(false);
  };

  return (
    <ProfileSection title="Name">
      {editing ? (
        <form className="grid gap-3" onSubmit={(e) => handleSave(e)}>
          <Input
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value);
              setError("");
            }}
            className="w-full max-w-sm"
          />
          {error && <ErrorMessage message={error} />}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setEditing(false)}
              className="w-20"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-20">
              {loading ? <Loader size={16} /> : "Save"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <span className="font-semibold">
            {currentUser?.displayName || "User Name"}
          </span>
          <Button
            variant="secondary"
            onClick={() => setEditing(true)}
            className="max-w-44"
          >
            Edit
          </Button>
        </div>
      )}
    </ProfileSection>
  );
}

export default UsernameSection;
