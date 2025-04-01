import { Outlet, useLocation } from "react-router-dom";
import ProfilePictureSection from "@components/accountSettings/ProfilePictureSection";
import UsernameSection from "@components/accountSettings/UsernameSection";
import EmailSection from "@components/accountSettings/EmailSection";
import JoinedDateSection from "@components/accountSettings/JoinedDateSection";
import PasswordSection from "@components/accountSettings/PasswordSection";
import DeleteAccountSection from "@components/accountSettings/DeleteAccountSection";

function AccountSettings() {
  const location = useLocation();
  const isAccountPage = location.pathname.endsWith("account");

  if (isAccountPage) {
    return (
      <>
        <h1 className="text-xl font-semibold mb-4">Account</h1>
        <ProfilePictureSection />
        <UsernameSection />
        <EmailSection />
        <JoinedDateSection />
        <PasswordSection />
        <DeleteAccountSection />
      </>
    );
  } else return <Outlet />;
}

export default AccountSettings;
