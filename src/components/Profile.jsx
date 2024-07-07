import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BtnDanger, BtnPrimary, BtnSecondary } from "./Buttons";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Popup from "./Popup";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";

function Profile() {
  const { currentUser, sendEmailVerification, message, setMessage } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  const verifyEmail = () => {
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
  }, [message]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="p-4 md:p-8 mt-8 tracking-wide min-h-96 max-w-3xl">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
          <div className="flex gap-2 items-center">
            <UserCircleIcon className="size-7 md:size-9" />
            <h1 className="text-2xl md:text-3xl font-semibold">Profile</h1>
          </div>
          <Link to={"/edit-profile"}>
            <BtnPrimary>Edit Profile</BtnPrimary>
          </Link>
        </div>
        <div className="font-medium grid gap-5">
          <div className="p-2 border-b-2 border-emerald-600 dark:border-emerald-500">
            <h3 className="text-emerald-600 dark:text-emerald-500 ">Name</h3>
            <p className="sm:text-lg">{currentUser.displayName}</p>
          </div>
          <div className="p-2 border-b-2 border-emerald-600 dark:border-emerald-500">
            <h3 className="text-emerald-600 dark:text-emerald-500">Email</h3>
            <div className="sm:text-lg flex justify-between items-center flex-wrap gap-x-2">
              {currentUser.email}{" "}
              <div className="text-sm opacity-90">
                {currentUser.emailVerified ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckBadgeIcon className="size-4" /> Verified
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-orange-600">
                    <ExclamationCircleIcon className="size-4" /> Not Verified
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="p-2 border-b-2 border-emerald-600 dark:border-emerald-500">
            <h3 className="text-emerald-600 dark:text-emerald-500">
              Joined in
            </h3>
            <p className="sm:text-lg">
              {new Date(currentUser.metadata.creationTime).toDateString()}
            </p>
          </div>
        </div>
        {!currentUser.emailVerified && (
          <button
            onClick={verifyEmail}
            className="mt-6 text-sm font-semibold border-b rounded-sm text-indigo-500 border-indigo-500"
          >
            Verify Email
          </button>
        )}
        {message && (
          <Popup message={message} onClose={() => setMessage(null)} />
        )}
        <div className="mt-6 flex justify-between flex-wrap gap-4">
          <Link to={"/update-password"}>
            <BtnSecondary>Change Password</BtnSecondary>
          </Link>
          <BtnDanger onClick={() => setShowModal(true)}>
            Delete Account
          </BtnDanger>
        </div>
      </div>
      {showModal && <DeleteConfirmationModal setShowModal={setShowModal} />}
    </div>
  );
}

export default Profile;
