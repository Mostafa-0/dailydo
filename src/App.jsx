import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import PrivateRoute from "./pages/PrivateRoute";
import Providers from "./context/Providers";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import ChangePassword from "./pages/ChangePassword";
import ChangeEmail from "./pages/ChangeEmail";
import Sidebar from "./components/Sidebar";
import DeleteAccount from "./pages/DeleteAccount";
import ThemeSettings from "./pages/ThemeSettings";

const Layout = () => {
  const location = useLocation();
  const noAuthPaths = ["/login", "/signup", "/passwordReset"];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (only visible when user is authenticated) */}
      {!noAuthPaths.includes(location.pathname) && <Sidebar />}

      {/* Main content area */}
      <main
        className={`flex-1 overflow-y-auto ${
          !noAuthPaths.includes(location.pathname) && "mt-12"
        }`}
      >
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
          <Route path="account" element={<Account />}>
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
