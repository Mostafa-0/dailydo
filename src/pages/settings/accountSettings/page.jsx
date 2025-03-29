import { Outlet, useLocation } from "react-router-dom";
import ProfilePictureSection from "./components/ProfilePictureSection";
import UsernameSection from "./components/UsernameSection";
import EmailSection from "./components/EmailSection";
import JoinedDateSection from "./components/JoinedDateSection";
import PasswordSection from "./components/PasswordSection";
import DeleteAccountSection from "./components/DeleteAccountSection";

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
