import { useContext, useState } from "react";
import ProfileContext from "@context/ProfileContext";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import Tooltip from "@components/Tooltip";
import ProfileSection from "./ProfileSection";
import Button from "@components/ui/Button";
import Popup from "@components/ui/Popup";

function EmailSection() {
  const { currentUser, sendEmailVerification, message, setMessage } =
    useContext(ProfileContext);
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = async () => {
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

  return (
    <ProfileSection title="Email">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <span className="font-semibold flex items-center gap-2">
          {currentUser?.email || "Email"}
          {currentUser?.emailVerified ? (
            <CheckBadgeIcon className="size-4 text-green-500" />
          ) : (
            <Tooltip text="Email not verified">
              <ExclamationCircleIcon className="size-4 text-orange-500" />
            </Tooltip>
          )}
        </span>
        {!currentUser?.emailVerified && (
          <button
            onClick={handleVerifyEmail}
            disabled={loading}
            className="text-xs font-semibold text-primary hover:underline"
          >
            {loading ? "Sending..." : "Verify Email"}
          </button>
        )}
      </div>
      <Button variant="secondary" to="email" className="max-w-44 mt-4">
        Change Email
      </Button>

      {/* Popup Message */}
      {message && <Popup message={message} onClose={() => setMessage(null)} />}
    </ProfileSection>
  );
}

export default EmailSection;
