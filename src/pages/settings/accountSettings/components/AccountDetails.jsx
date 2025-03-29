import { useContext, useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileContext from "@context/ProfileContext";
import { useUploadImage } from "@hooks/useUploadImage";
import ProfilePicUploader from "./ProfilePicUploader";
import Button from "@components/ui/Button";
import Popup from "@components/ui/Popup";
import { Input } from "@components/ui/Inputs";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

function ProfileSection({ title, description, children, className = "" }) {
  return (
    <div className={`border border-border rounded-lg p-4 my-4 ${className}`}>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function AccountDetails() {
  const {
    currentUser,
    profilePicture,
    updateProfilePicture,
    removeProfilePicture,
    sendEmailVerification,
    editUsername,
    message,
    setMessage,
  } = useContext(ProfileContext);

  const [loading, setLoading] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(profilePicture);
  const { uploadImage, uploading } = useUploadImage();

  const { displayName, email, emailVerified, metadata } = currentUser || {};
  const joinedDate = useMemo(
    () =>
      metadata?.creationTime
        ? new Date(metadata.creationTime).toDateString()
        : "N/A",
    [metadata]
  );

  useEffect(() => {
    setImageUrl(profilePicture);
  }, [profilePicture]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleVerifyEmail = async () => {
    if (!currentUser) return setMessage("User is not authenticated.");
    setLoading(true);
    try {
      await sendEmailVerification(currentUser);
      setMessage("Verification email sent. Check your inbox.");
    } catch (error) {
      setMessage("Error sending verification email.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (editingUsername && newUsername.length < 4) {
      setUsernameError("Username must be at least 4 characters.");
      return;
    }

    setLoading(true);
    let newImageUrl = imageUrl;

    try {
      if (selectedFile) {
        newImageUrl = await uploadImage(selectedFile);
        if (!newImageUrl) {
          setMessage("Failed to upload image.");
          setLoading(false);
          return;
        }
      }

      if (editingUsername && newUsername !== displayName) {
        await editUsername(newUsername);
      }

      if (selectedFile) {
        await updateProfilePicture(newImageUrl);
      }

      setMessage("Profile updated successfully.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setEditingUsername(false);
      setSelectedFile(null);
    }
  };

  return (
    <>
      {/* Profile Picture Section */}
      <div className="flex gap-6 items-center">
        <ProfilePicUploader
          imageUrl={imageUrl}
          onFileSelect={handleFileChange}
          uploading={uploading}
        />

        <div className="flex flex-wrap items-end gap-3 w-full">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="text-xs w-32"
              onClick={() => document.getElementById("profilePic").click()}
            >
              Change Photo
            </Button>
            <Button
              variant="danger"
              className="text-xs w-32"
              onClick={removeProfilePicture}
            >
              Remove Photo
            </Button>
          </div>
          {selectedFile && (
            <Button
              variant="primary"
              className="text-xs w-32 lg:ml-auto"
              onClick={(e) => {
                if (!loading && !uploading) handleSaveChanges(e);
              }}
              disabled={uploading || loading}
            >
              {uploading ? "Uploading..." : "Save Changes"}
            </Button>
          )}
        </div>
      </div>

      {/* Name Section */}
      <ProfileSection title="Name">
        {editingUsername ? (
          <form onSubmit={handleSaveChanges}>
            <Input
              value={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
                setUsernameError("");
              }}
            />
            {usernameError && (
              <p className="text-xs font-medium text-destructive mt-2">
                {usernameError}
              </p>
            )}
            <div className="mt-3 flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setEditingUsername(false);
                  setNewUsername(displayName || "");
                  setUsernameError("");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex justify-between items-center">
            <span className="font-semibold">{displayName || "User Name"}</span>
            <button
              onClick={() => {
                setEditingUsername(true);
                setNewUsername(displayName || "");
              }}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Edit
            </button>
          </div>
        )}
      </ProfileSection>

      {/* Email Section */}
      <ProfileSection title="Email">
        <div className="flex justify-between items-center">
          <span className="font-semibold flex items-center gap-2">
            {email || "Email"}
            {emailVerified ? (
              <CheckBadgeIcon className="size-4 text-green-500" />
            ) : (
              <ExclamationCircleIcon
                className="size-4 text-orange-600 dark:text-orange-400"
                title="Email not verified"
              />
            )}
          </span>
          {!emailVerified && (
            <button
              onClick={handleVerifyEmail}
              className="text-xs font-semibold text-primary hover:underline"
              disabled={loading}
            >
              Verify Email
            </button>
          )}
        </div>
        <Button variant="secondary" to="email" className="max-w-44 mt-4">
          Change Email
        </Button>
      </ProfileSection>

      {/* Joined Date Section */}
      <ProfileSection title="Joined">
        <p className="text-sm font-semibold">{joinedDate}</p>
      </ProfileSection>

      {/* Password Section */}
      <ProfileSection title="Password">
        <Button variant="secondary" to="password" className="max-w-44">
          Change Password
        </Button>
      </ProfileSection>

      {/* Delete Account Section */}
      <ProfileSection
        title="Delete Account"
        description="Permanently remove your account and all data."
        className="border-destructive"
      >
        <Link
          variant=""
          to="delete"
          className="text-sm text-destructive font-semibold"
        >
          Delete Account
        </Link>
      </ProfileSection>

      {/* Popup Message */}
      {message && <Popup message={message} onClose={() => setMessage(null)} />}
    </>
  );
}

export default AccountDetails;
