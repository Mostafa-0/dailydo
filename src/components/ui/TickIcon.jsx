const TickIcon = ({ status, priority }) => {
  let priorityColor = "";
  switch (priority) {
    case "low":
      priorityColor = "#16a34a";
      break;
    case "medium":
      priorityColor = "#eab308";
      break;
    case "high":
      priorityColor = "#dc2626";
      break;
    default:
      priorityColor = "";
      break;
  }
  return (
    <svg
      className={`size-5 md:size-6 border-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
        status == "completed" ? "transform scale-110" : ""
      }`}
      style={{ borderColor: priorityColor }}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={`transition-all duration-300 ease-in-out ${
          priority == "high"
            ? "hover:fill-red-600"
            : priority == "medium"
            ? "hover:fill-yellow-500"
            : "hover:fill-green-600"
        }`}
        style={{ fill: status == "completed" ? priorityColor : "transparent" }}
        cx="50"
        cy="50"
        r="40"
      />
      <path
        className="transition-all duration-300 ease-in-out"
        d="M30 50 L45 65 L70 40"
        fill="none"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="100"
        strokeDashoffset={status == "completed" ? "0" : "100"}
      />
    </svg>
  );
};

export default TickIcon;
