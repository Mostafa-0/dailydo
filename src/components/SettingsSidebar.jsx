import { NavLink } from "react-router-dom";
import { UserIcon, PaintBrushIcon, XMarkIcon } from "@heroicons/react/24/solid";

const SETTINGS = [
  {
    id: "account",
    label: "Account",
    path: "/settings/account",
    icon: UserIcon,
  },
  {
    id: "theme",
    label: "Theme",
    path: "/settings/theme",
    icon: PaintBrushIcon,
  },
];

function SettingsSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-1/4 min-w-[180px] pr-6 border-r border-border">
        <div className="space-y-2">
          {SETTINGS.map(({ id, label, path, icon: Icon }) => (
            <NavLink
              key={id}
              to={path}
              className={({ isActive }) =>
                `w-full text-sm text-left font-medium px-3 py-2 rounded flex items-center gap-2 transition-all
                ${
                  isActive
                    ? "bg-primary/15 text-foreground"
                    : "text-muted-foreground hover:bg-primary/15 hover:text-foreground"
                }`
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <>
        <aside
          className={`fixed inset-y-0 left-0 w-2/3 max-w-xs bg-card border-r border-border p-6 z-50 shadow-lg
            transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded text-foreground hover:bg-muted focus:outline-none"
          >
            <XMarkIcon className="size-6" />
          </button>

          <div className="space-y-2 mt-8">
            {SETTINGS.map(({ id, label, path, icon: Icon }) => (
              <NavLink
                key={id}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `w-full text-sm text-left font-medium px-3 py-2 rounded flex items-center gap-2 transition-all
                    ${
                      isActive
                        ? "bg-primary/15 text-foreground"
                        : "text-muted-foreground hover:bg-primary/15 hover:text-foreground"
                    }`
                }
              >
                <Icon className="size-5" />
                {label}
              </NavLink>
            ))}
          </div>
        </aside>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 ${
            isOpen ? "" : "hidden"
          }`}
          onClick={onClose}
        />
      </>
    </>
  );
}

export default SettingsSidebar;
