import { useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function SettingsHeader({ onMenuOpen }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="p-1 rounded text-foreground hover:bg-muted focus:outline-none md:hidden"
        >
          <Bars3Icon className="size-6" />
        </button>
        <h2 className="text-2xl font-bold mb-0">Settings</h2>
      </div>
      <button
        onClick={() => navigate("/")}
        className="hover:text-destructive transition ml-2"
      >
        <XMarkIcon className="size-6" />
      </button>
    </div>
  );
}

export default SettingsHeader;
