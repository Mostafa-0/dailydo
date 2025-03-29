import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SettingsSidebar from "../components/SettingsSidebar";
import SettingsHeader from "../components/SettingsHeader";

function Settings() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") navigate("/");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 md:p-4">
      <div className="bg-card text-card-foreground border border-border p-6 md:rounded shadow-lg w-full max-w-5xl h-svh md:h-max flex flex-col">
        {/* Header */}
        <SettingsHeader onMenuOpen={() => setIsSidebarOpen(true)} />

        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          <SettingsSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Content */}
          <div className="w-full md:h-[480px] md:px-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
