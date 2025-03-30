import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Home from "@pages/home/page";
import Login from "@pages/login/page";
import Signup from "@pages/signup/page";
import PasswordReset from "@pages/passwordReset/page";
import Providers from "@context/Providers";
import Settings from "@pages/settings/page";
import ThemeSettings from "@pages/settings/themeSettings/page";
import AccountSettings from "@pages/settings/accountSettings/page";
import ChangeEmail from "@pages/settings/accountSettings/changeEmail/page";
import ChangePassword from "@pages/settings/accountSettings/changePassword/page";
import DeleteAccount from "@pages/settings/accountSettings/deleteAccount/page";
import Sidebar from "@components/Sidebar";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

const Layout = () => {
  const location = useLocation();
  const noAuthPaths = ["/login", "/signup", "/passwordReset"];

  return (
    <div className="flex max-h-svh">
      {/* Sidebar (only visible when user is authenticated) */}
      {!noAuthPaths.includes(location.pathname) && <Sidebar />}
      {/* Main content area */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* Authentication */}
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="passwordReset" element={<PasswordReset />} />
        {/* Home */}
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* Settings */}
        <Route
          path="settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="account" replace />} />
          <Route path="account" element={<AccountSettings />}>
            <Route path="email" element={<ChangeEmail />} />
            <Route path="password" element={<ChangePassword />} />
            <Route path="delete" element={<DeleteAccount />} />
          </Route>
          <Route path="theme" element={<ThemeSettings />} />
        </Route>
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
