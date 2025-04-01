import { UserIcon } from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import Loader from "@components/ui/Loader";

function ProfilePicUploader({ imageUrl, onFileSelect, uploading }) {
  return (
    <div className="relative flex items-center gap-4 shrink-0">
      <div className="relative">
        <label htmlFor="profilePic" className="block">
          <div
            className={`absolute inset-0 grid place-items-center bg-primary/75 text-white rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer ${
              uploading ? "lg:opacity-100 bg-transparent" : ""
            }`}
          >
            {uploading ? (
              <Loader size={16} />
            ) : (
              <ArrowUpOnSquareIcon className="size-8" />
            )}
          </div>
          {imageUrl === null ? (
            <div className="size-24 rounded-full flex items-center justify-center bg-gradient-to-bl from-primary via-primary/60 to-primary/30 border-2 border-primary text-white">
              <UserIcon className="size-12" />
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="User profile"
              className="size-24 rounded-full object-cover bg-gradient-to-bl from-primary via-primary/60 to-primary/30 border-2 border-primary"
            />
          )}
        </label>
        <input
          type="file"
          id="profilePic"
          className="hidden"
          accept="image/*"
          onChange={onFileSelect}
        />
      </div>
    </div>
  );
}

export default ProfilePicUploader;
