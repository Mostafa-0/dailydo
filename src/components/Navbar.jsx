import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ThemeToggler from "./ThemeToggler";
import {
  UserCircleIcon,
  CogIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Clock from "./Clock";

const CustomNavLink = ({ to, label, Icon, onClick, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-2 items-center font-medium ${
          isActive
            ? "text-primary dark:text-white"
            : "text-neutral-600 hover:text-black dark:hover:text-white dark:text-neutral-400"
        }`
      }
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <Icon className="size-5" /> {children}
    </NavLink>
  );
};

const Navbar = () => {
  const { currentUser, loading, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  if (loading || !currentUser) return null;

  return (
    <nav className="sticky top-0 py-4 bg-neutral-50 dark:bg-neutral-950 border-b dark:border-neutral-800 flex items-center justify-between z-40">
      {/* Date and Time */}
      <Clock />

      {/* Settings button */}
      <button
        ref={menuBtnRef}
        className="text-neutral-800 hover:text-black dark:text-neutral-300 dark:hover:text-white z-40"
        onClick={toggleMenu}
        aria-label="Settings"
      >
        <CogIcon
          className={`size-9 transition ${menuOpen ? " rotate-90" : ""}`}
        />
      </button>

      {/* Settings Menu */}
      <div
        ref={menuRef}
        className={`absolute top-16 right-4 md:right-8 rounded-xl grid items-center gap-5 p-7 border dark:border-neutral-900 
          transition origin-top bg-white dark:bg-black  ${
            menuOpen ? "scale-100 visible" : "scale-0 invisible"
          }`}
      >
        <CustomNavLink
          to="/profile"
          label="Profile"
          Icon={UserCircleIcon}
          onClick={() => setMenuOpen(false)}
        >
          Profile
        </CustomNavLink>
        <button
          className="flex gap-2 items-center font-medium text-neutral-600 hover:text-black dark:hover:text-white dark:text-neutral-400"
          onClick={handleLogout}
        >
          <ArrowRightStartOnRectangleIcon className="size-5" />
          Sign Out
        </button>
        <ThemeToggler />
      </div>
    </nav>
  );
};

export default Navbar;
