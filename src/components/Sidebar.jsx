import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Clock from "./Clock";
import {
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  const { currentUser, loading, logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768 // Close only on mobile (md breakpoint)
      ) {
        setCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function collapseSidebar() {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading || !currentUser) return null;

  return (
    <aside
      ref={sidebarRef}
      className={`h-screen fixed md:static border-r transition-all duration-300 flex flex-col gap-4 z-40 ${
        collapsed
          ? "w-16 border-transparent -mr-16"
          : "w-64 bg-card shadow-sm border-border"
      }`}
    >
      {/* Sidebar Header */}
      <header className="px-3 py-4">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <Clock className="flex-shrink-0 whitespace-nowrap overflow-hidden" />
          )}
          <button
            className="fill-muted-foreground hover:fill-foreground bg-secondary hover:bg-muted rounded transition p-2 ml-1 sm:ml-3 md:ml-4"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle Sidebar"
          >
            <svg
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M 7.7148 49.5742 L 48.2852 49.5742 C 53.1836 49.5742 55.6446 47.1367 55.6446 42.3086 L 55.6446 13.6914 C 55.6446 8.8633 53.1836 6.4258 48.2852 6.4258 L 7.7148 6.4258 C 2.8398 6.4258 .3554 8.8398 .3554 13.6914 L .3554 42.3086 C .3554 47.1602 2.8398 49.5742 7.7148 49.5742 Z M 7.7851 45.8008 C 5.4413 45.8008 4.1288 44.5586 4.1288 42.1211 L 4.1288 13.8789 C 4.1288 11.4414 5.4413 10.1992 7.7851 10.1992 L 18.2148 10.1992 L 18.2148 45.8008 Z M 48.2147 10.1992 C 50.5350 10.1992 51.8708 11.4414 51.8708 13.8789 L 51.8708 42.1211 C 51.8708 44.5586 50.5350 45.8008 48.2147 45.8008 L 21.8944 45.8008 L 21.8944 10.1992 Z M 13.7148 18.8945 C 14.4179 18.8945 15.0507 18.2617 15.0507 17.5820 C 15.0507 16.8789 14.4179 16.2696 13.7148 16.2696 L 8.6757 16.2696 C 7.9726 16.2696 7.3632 16.8789 7.3632 17.5820 C 7.3632 18.2617 7.9726 18.8945 8.6757 18.8945 Z M 13.7148 24.9649 C 14.4179 24.9649 15.0507 24.3320 15.0507 23.6289 C 15.0507 22.9258 14.4179 22.3398 13.7148 22.3398 L 8.6757 22.3398 C 7.9726 22.3398 7.3632 22.9258 7.3632 23.6289 C 7.3632 24.3320 7.9726 24.9649 8.6757 24.9649 Z M 13.7148 31.0118 C 14.4179 31.0118 15.0507 30.4258 15.0507 29.7227 C 15.0507 29.0196 14.4179 28.4102 13.7148 28.4102 L 8.6757 28.4102 C 7.9726 28.4102 7.3632 29.0196 7.3632 29.7227 C 7.3632 30.4258 7.9726 31.0118 8.6757 31.0118 Z"></path>
              </g>
            </svg>
          </button>
        </div>
      </header>

      {/* Settings Section */}
      {!collapsed && (
        <div className="text-sm flex flex-col gap-2 p-2">
          <NavLink
            to="/"
            onClick={collapseSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium px-3 py-2 hover:bg-primary/15 rounded transition ${
                isActive
                  ? "text-foreground bg-primary/15"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <HomeIcon className="size-5" /> Home
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 font-medium px-3 py-2 hover:bg-primary/15 rounded transition ${
                isActive
                  ? "text-foreground bg-primary/15"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <Cog6ToothIcon className="size-5" /> Settings
          </NavLink>

          <button
            className="w-full flex items-center gap-3 font-medium px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-primary/15 rounded transition"
            onClick={handleLogout}
          >
            <ArrowRightStartOnRectangleIcon className="size-5" /> Sign Out
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
