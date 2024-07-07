import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const { currentUser, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    currentUser &&
    !loading && (
      <nav className="bg-neutral-200 dark:bg-neutral-950 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm shadow-sm dark:shadow-neutral-900 sticky z-50 top-0 px-4 py-2 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-black">
          Dai<span className="text-emerald-700">ly</span>Do
        </div>

        <div className="flex items-center text-md md:text-xl sm:gap-2">
          <Link
            to={"/"}
            className={`p-2 ${
              isActive("/") ? "text-emerald-600" : "hover:text-emerald-600"
            }`}
            aria-label="Home"
            title="Home"
          >
            <HomeIcon className="size-7" />
          </Link>
          <Link
            to={"/profile"}
            className={`p-2 ${
              isActive("/profile")
                ? "text-emerald-600"
                : "hover:text-emerald-600"
            }`}
            aria-label="Profile"
            title="Profile"
          >
            <UserCircleIcon className="size-7" />
          </Link>
          <button
            className="hover:text-emerald-600 p-2"
            title="Sign Out"
            onClick={handleLogout}
          >
            <ArrowRightStartOnRectangleIcon className="size-7" />
            <span className="sr-only">Sign Out</span>
          </button>
        </div>
      </nav>
    )
  );
};

export default Navbar;
