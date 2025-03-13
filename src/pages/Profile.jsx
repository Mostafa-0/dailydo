import { useContext, useEffect, useState, useMemo } from "react";
import AuthContext from "../context/AuthContext";
import DeleteAccount from "../components/modals/DeleteAccount";
import Button from "../components/ui/Button";
import Popup from "../components/ui/Popup";
import ChangePassword from "../components/modals/ChangePassword";
import BackLink from "../components/ui/BackLink";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const ProfileDetail = ({ label, value }) => (
  <div className="py-3 px-1 sm:px-3 border-b border-neutral-300 dark:border-neutral-700">
    <h3 className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
      {label}
    </h3>
    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 break-all">
      {value}
    </p>
  </div>
);

function Profile() {
  const { currentUser, sendEmailVerification, message, setMessage } =
    useContext(AuthContext);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { displayName, email, emailVerified, metadata } = currentUser || {};

  const joinedDate = useMemo(() => {
    return metadata?.creationTime
      ? new Date(metadata.creationTime).toDateString()
      : "N/A";
  }, [metadata]);

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

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 10000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-neutral-950 shadow-md rounded-xl border border-neutral-200 dark:border-neutral-800">
      <BackLink />

      <div className="flex items-center justify-between flex-wrap gap-5 mt-6">
        <div className="flex items-center gap-4">
          <div className="size-24 bg-neutral-300 dark:bg-neutral-800 rounded-full" />
          <h2 className="text-lg font-semibold">{displayName || "[Name]"}</h2>
        </div>
        <Button to="/edit-profile">Edit Profile</Button>
      </div>

      <div className="mt-6 grid gap-4">
        <ProfileDetail label="Name" value={displayName || "[Name]"} />
        <ProfileDetail
          label="Email"
          value={
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-2">
                {email || "mail@example.com"}
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
                  {loading ? "Sending..." : "Verify Email"}
                </button>
              )}
            </div>
          }
        />
        <ProfileDetail label="Joined" value={joinedDate} />
      </div>

      <div className="mt-8 flex justify-between flex-wrap gap-12">
        <Button variant="secondary" onClick={() => setShowPasswordModal(true)}>
          Change Password
        </Button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="text-red-600 text-sm font-medium"
        >
          Delete Account
        </button>
      </div>

      {showPasswordModal && (
        <ChangePassword setShowModal={setShowPasswordModal} />
      )}
      {showDeleteModal && <DeleteAccount setShowModal={setShowDeleteModal} />}
      {message && <Popup message={message} onClose={() => setMessage(null)} />}
    </div>
  );
}

export default Profile;
