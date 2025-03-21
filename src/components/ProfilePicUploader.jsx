import { UserIcon } from "@heroicons/react/24/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

function ProfilePicUploader({ imageUrl, onFileSelect }) {
  return (
    <div className="relative flex items-center gap-4">
      <div className="relative">
        <label htmlFor="profilePic" className="block">
          <div className="absolute inset-0 grid place-items-center bg-primary/75 text-white rounded-full lg:opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <ArrowUpOnSquareIcon className="size-8" />
          </div>
          {imageUrl === null ? (
            <div className="size-24 rounded-full flex items-center justify-center bg-gradient-to-bl from-primary via-primary/60 to-primary/30 border-2 border-primary text-white">
              <UserIcon className="size-12" />
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="Profile Picture"
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
