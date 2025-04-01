import { Link } from "react-router-dom";
import ProfileSection from "./ProfileSection";

function DeleteAccountSection() {
  return (
    <ProfileSection
      title="Delete Account"
      description="Permanently remove your account and all data."
      className="border-destructive"
    >
      <Link to="delete" className="text-sm text-destructive font-semibold">
        Delete Account
      </Link>
    </ProfileSection>
  );
}

export default DeleteAccountSection;
