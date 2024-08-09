import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ThemeToggler from "./ThemeToggler";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

const CustomNavLink = ({ to, label, Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `sm:p-4 ${
          isActive
            ? "text-black dark:text-white"
            : "text-neutral-600 hover:text-black dark:hover:text-white dark:text-neutral-400"
        }`
      }
      aria-label={label}
      title={label}
    >
      <Icon className="size-6" />
    </NavLink>
  );
};

const Navbar = () => {
  const { currentUser, loading, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading || !currentUser) return null;

  return (
    <nav className="backdrop-blur-sm border-b-[1px] border-black border-opacity-10 dark:border-white dark:border-opacity-5 sticky z-40 top-0 px-4 flex items-center justify-between">
      <div className="text-xl md:text-2xl font-black py-4">
        Dai<span className="text-emerald-700">ly</span>Do
      </div>

      <div
        className={`flex justify-between items-center p-2 sm:p-0 gap-6 rounded-full absolute right-3 
        sm:static sm:bg-transparent sm:dark:bg-transparent ${
          menuOpen
            ? "bg-neutral-100 bg-opacity-40 dark:bg-neutral-900 dark:bg-opacity-80"
            : ""
        }`}
      >
        <div
          className={`flex sm:translate-x-0 sm:scale-100 items-center gap-4 sm:gap-0 text-md md:text-xl sm:divide-x divide-gray-300 dark:divide-neutral-800 transition ${
            menuOpen ? "translate-x-0" : "translate-x-[80%] scale-0"
          }`}
        >
          <div className="sm:p-4">
            <ThemeToggler />
          </div>
          <CustomNavLink to="/" label="Home" Icon={HomeIcon} />
          <CustomNavLink to="/profile" label="Profile" Icon={UserCircleIcon} />
          <button
            className="text-neutral-600 hover:text-black dark:hover:text-white dark:text-neutral-400 sm:p-4 sm:pr-0"
            title="Sign Out"
            onClick={handleLogout}
          >
            <ArrowRightStartOnRectangleIcon className="size-6" />
            <span className="sr-only">Sign Out</span>
          </button>
        </div>

        <button
          className="text-neutral-800 hover:text-black dark:hover:text-white dark:text-neutral-400 sm:hidden"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <XMarkIcon className="size-6" />
          ) : (
            <Bars3Icon className="size-7" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
