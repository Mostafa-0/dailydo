import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import Popup from "../components/ui/Popup";
import {
  ArrowLeftCircleIcon,
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

function Profile() {
  const { currentUser, sendEmailVerification, message, setMessage } =
    useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleVerifyEmail = () => {
    if (currentUser) {
      sendEmailVerification(currentUser)
        .then(() => {
          setMessage(
            "Email verification has been sent, please check your inbox."
          );
        })
        .catch((error) => {
          setMessage("Error sending verification email.");
          console.error(error);
        });
    } else {
      setMessage("User is not authenticated.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  // if (!currentUser) {
  //   return (
  //     <div className="min-h-[80svh] grid place-items-center text-neutral-600 dark:text-neutral-400">
  //       Please log in to view this page.
  //     </div>
  //   );
  // }

  return (
    <>
      <NavLink
        to={"/"}
        className="w-fit py-2 px-3 mb-4 rounded-lg flex items-center gap-2 bg-white border hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-800"
      >
        <ArrowLeftCircleIcon className="size-5" />
        Back
      </NavLink>

      <div className="w-full max-w-4xl bg-neutral-50 dark:bg-neutral-950 border dark:border-neutral-800 p-4 md:p-8 rounded-lg">
        <h1 className="sr-only">Account Details</h1>

        <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
          <div className="flex gap-5 items-center">
            <div className="bg-gradient-to-br from-neutral-300 via-neutral-100 to-neutral-300 dark:from-black dark:via-neutral-900 dark:to-black size-24 rounded-full">
              {/* {<img src="" alt="Profile Photo" />} */}
            </div>
            <h2 className="mb-0">
              {currentUser ? currentUser.displayName : "[Name]"}
            </h2>
          </div>

          <Link
            to={"/edit-profile"}
            className="rounded-md px-4 py-2 text-sm font-medium flex justify-center items-center transition duration-200 ease-in-out bg-neutral-100 border border-neutral-300 hover:bg-neutral-200 active:bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-900 dark:text-white"
          >
            Edit Profile
          </Link>
        </div>

        <div className="font-medium grid gap-5">
          <div className="font-medium p-2 border-b-[1px] border-black border-opacity-20 dark:border-white dark:border-opacity-10">
            <h3 className="text-neutral-500 dark:text-neutral-300">Name</h3>
            {currentUser ? (
              <p className="sm:text-lg">{currentUser.displayName}</p>
            ) : (
              "[Name]"
            )}
          </div>

          <div className="font-medium p-2 border-b-[1px] border-black border-opacity-20 dark:border-white dark:border-opacity-10">
            <h3 className="text-neutral-500 dark:text-neutral-300">Email</h3>

            {currentUser ? (
              <div className="sm:text-lg flex justify-between items-center flex-wrap gap-x-2">
                {currentUser.email}{" "}
                <div className="text-sm opacity-90">
                  {currentUser.emailVerified ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckBadgeIcon className="size-4" /> Verified
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-orange-500 dark:text-orange-400">
                      <ExclamationCircleIcon className="size-4" /> Not Verified
                    </div>
                  )}
                </div>
              </div>
            ) : (
              "mail@example.com"
            )}
          </div>

          <div className="font-medium p-2 border-b-[1px] border-black border-opacity-20 dark:border-white dark:border-opacity-10">
            <h3 className="text-neutral-500 dark:text-neutral-300">
              Joined in
            </h3>
            {currentUser ? (
              <p className="sm:text-lg">
                {new Date(currentUser.metadata.creationTime).toDateString()}
              </p>
            ) : (
              "1 Jan 2022"
            )}
          </div>

          {currentUser && !currentUser.emailVerified && (
            <button
              onClick={handleVerifyEmail}
              className="mt-4 ml-2 w-fit text-sm font-semibold border-b rounded-sm text-emerald-500 border-emerald-500"
            >
              Verify Email
            </button>
          )}

          {/* Make the password update open in a modal instead of a seperate page */}
          <div className="flex justify-between flex-wrap gap-4 mt-8">
            <Link
              to={"/update-password"}
              className="rounded-md px-4 py-2 text-sm font-medium flex justify-center items-center transition duration-200 ease-in-out bg-neutral-100 border border-neutral-300 hover:bg-neutral-200 active:bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-900 dark:text-white"
            >
              Change Password
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="text-red-600 text-sm"
            >
              Delete Account
            </button>
          </div>
        </div>

        {message && (
          <Popup message={message} onClose={() => setMessage(null)} />
        )}

        {showModal && <DeleteConfirmationModal setShowModal={setShowModal} />}
      </div>
    </>
  );
}

export default Profile;
