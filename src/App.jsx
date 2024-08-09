import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import PrivateRoute from "./pages/PrivateRoute";
import Providers from "./context/Providers";
import UpdatePassword from "./pages/UpdatePassword";
import ThemeToggler from "./components/ThemeToggler";
import NotFound from "./pages/NotFound";

const Layout = () => {
  const location = useLocation();
  const noAuthPaths = ["/login", "/signup", "/forgot-password"];

  return (
    <>
      <div>
        {!noAuthPaths.includes(location.pathname) && <Navbar />}
        <Outlet />
      </div>
      <Footer />
      {noAuthPaths.includes(location.pathname) && (
        <ThemeToggler style={"fixed bottom-3 right-4"} />
      )}
    </>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="edit-Profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="update-password"
          element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
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
