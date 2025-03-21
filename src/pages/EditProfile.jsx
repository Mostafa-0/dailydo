import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import ProfilePicUploader from "../components/ProfilePicUploader";
import { useUploadImage } from "../hooks/useUploadImage";
import ProfileForm from "../components/ProfileForm";
import ProfileContext from "../context/ProfileContext";

function EditProfile() {
  const {
    currentUser,
    profilePicture,
    updateProfilePicture,
    editUsername,
    editEmail,
    setMessage,
  } = useContext(ProfileContext);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(profilePicture);
  const { uploadImage, uploading } = useUploadImage();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailChanged = emailRef.current.value !== currentUser.email;

    if (isEmailChanged && !passwordRef.current.value) {
      return setError("Please verify your password to proceed.");
    }

    setLoading(true);
    setError(null);

    let newImageUrl = imageUrl;

    // Upload Image if changed
    if (selectedFile) {
      newImageUrl = await uploadImage(selectedFile);
      if (!newImageUrl) {
        setError("Failed to upload image.");
        setLoading(false);
        return;
      }
    }

    const promises = [];

    if (usernameRef.current.value !== currentUser.displayName) {
      promises.push(editUsername(usernameRef.current.value));
    }

    if (isEmailChanged) {
      promises.push(
        editEmail(emailRef.current.value, passwordRef.current.value)
      );
    }

    if (newImageUrl !== currentUser.photoURL) {
      promises.push(updateProfilePicture(newImageUrl));
    }

    try {
      await Promise.all(promises);
      setMessage("Your profile has been updated.");
      navigate("/profile");
    } catch {
      setError(
        "Something went wrong, please check your password and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-neutral-950 shadow-md rounded-xl border border-neutral-200 dark:border-neutral-800">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="flex items-center gap-4 my-3">
          <ProfilePicUploader
            imageUrl={imageUrl}
            onFileSelect={handleFileChange}
          />
          <h2 className="text-lg font-semibold">
            {currentUser.displayName || "[Name]"}
          </h2>
        </div>

        <ProfileForm
          usernameRef={usernameRef}
          emailRef={emailRef}
          passwordRef={passwordRef}
          error={error}
          setError={setError}
        />

        <div className="mt-8 flex justify-between">
          <Button
            variant="secondary"
            onClick={() => navigate("/profile")}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading || uploading}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
