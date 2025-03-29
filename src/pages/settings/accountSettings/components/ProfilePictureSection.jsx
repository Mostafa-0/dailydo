import { useState, useEffect, useContext } from "react";
import ProfileContext from "@context/ProfileContext";
import { useUploadImage } from "@hooks/useUploadImage";
import ProfilePicUploader from "./ProfilePicUploader";
import Button from "@components/ui/Button";

function ProfilePictureSection() {
  const { profilePicture, updateProfilePicture, removeProfilePicture } =
    useContext(ProfileContext);

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

  const handleSaveChanges = async () => {
    if (!selectedFile) return;
    const newImageUrl = await uploadImage(selectedFile);
    if (newImageUrl) await updateProfilePicture(newImageUrl);
    setSelectedFile(null);
  };

  return (
    <div className="flex gap-6 items-center">
      <ProfilePicUploader imageUrl={imageUrl} onFileSelect={handleFileChange} uploading={uploading} />

      <div className="flex flex-wrap items-end gap-3 w-full">
        <Button variant="secondary" className="text-xs w-32" onClick={() => document.getElementById("profilePic").click()}>
          Change Photo
        </Button>
        <Button variant="danger" className="text-xs w-32" onClick={removeProfilePicture}>
          Remove Photo
        </Button>
        {selectedFile && (
          <Button variant="primary" className="text-xs w-32 lg:ml-auto" onClick={handleSaveChanges} disabled={uploading}>
            {uploading ? "Uploading..." : "Save"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProfilePictureSection;
