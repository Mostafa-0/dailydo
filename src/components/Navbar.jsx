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

const CustomNavLink = ({ to, label, Icon, children }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `sm:p-4 md:px-5 flex gap-2 items-center ${
            isActive
              ? "text-primary dark:text-white"
              : "text-neutral-600 hover:text-black dark:hover:text-white dark:text-neutral-400"
          }`
        }
        aria-label={label}
        title={label}
      >
        <Icon className="size-5" /> {children}
      </NavLink>
    </li>
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
    <nav className="sticky top-0 bg-neutral-50 dark:bg-neutral-950 border-b dark:border-neutral-800 flex items-center justify-between z-40">
      <div className="text-xl md:text-2xl font-black py-4">
        Dai<span className="text-primary">ly</span>Do
      </div>

      <button
        className="text-neutral-800 hover:text-black dark:hover:text-white dark:text-neutral-400 sm:hidden z-40"
        onClick={toggleMenu}
      >
        {menuOpen ? (
          <XMarkIcon className="size-6" />
        ) : (
          <Bars3Icon className="size-7" />
        )}
      </button>

      <ul
        className={`absolute sm:static top-14 right-3 rounded-xl grid items-center sm:flex gap-5 p-7 border dark:border-neutral-900 
          transition origin-top bg-white dark:bg-black sm:bg-transparent sm:dark:bg-transparent sm:border-none sm:p-0 sm:gap-0  ${
            menuOpen ? "scale-100" : "scale-0 sm:scale-100"
          }`}
      >
        <CustomNavLink to="/" label="Home" Icon={HomeIcon}>
          Home
        </CustomNavLink>
        <CustomNavLink to="/profile" label="Profile" Icon={UserCircleIcon}>
          Profile
        </CustomNavLink>
        <button
          className="flex gap-2 items-center text-neutral-600 hover:text-black dark:hover:text-white dark:text-neutral-400 sm:p-4 sm:pr-0"
          onClick={handleLogout}
        >
          <ArrowRightStartOnRectangleIcon className="size-5" />
          Sign Out
        </button>
        <li className="sm:px-4 md:px-5 mx-auto sm:-order-2 sm:border-r sm:dark:border-neutral-800">
          <ThemeToggler />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
