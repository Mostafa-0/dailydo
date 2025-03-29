import { Outlet, useLocation } from "react-router-dom";
import AccountDetails from "./components/AccountDetails";

function AccountSettings() {
  const location = useLocation();
  const isAccountPage = location.pathname.endsWith("account");

  if (isAccountPage) {
    return <AccountDetails />;
  } else return <Outlet />;
}

export default AccountSettings;
