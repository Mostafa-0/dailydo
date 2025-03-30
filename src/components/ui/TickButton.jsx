const TickButton = ({ status, priority, onClick }) => {
  const borderColors = {
    low: "border-green-600",
    medium: "border-yellow-500",
    high: "border-red-600",
  };

  const fillColors = {
    low: "fill-green-600",
    medium: "fill-yellow-500",
    high: "fill-red-600",
  };

  const hoverFillColors = {
    low: "lg:group-hover/tick:fill-green-600",
    medium: "lg:group-hover/tick:fill-yellow-500",
    high: "lg:group-hover/tick:fill-red-600",
  };

  const isCompleted = status === "completed";
  const borderColor = borderColors[priority];
  const fillColor = fillColors[priority];
  const hoverFillColor = hoverFillColors[priority];

  return (
    <button
      onClick={onClick}
      className="group/tick p-4 md:p-5 z-10"
      aria-label="Mark task as completed"
    >
      <svg
        className={`size-6 border-2 ${borderColor} rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 ${
          isCompleted ? "scale-110" : ""
        }`}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={`transition-all duration-300 ease-in-out ${hoverFillColor} ${
            isCompleted ? fillColor : "fill-transparent"
          }`}
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
          strokeDashoffset={isCompleted ? 0 : 100}
        />
      </svg>
    </button>
  );
};

export default TickButton;
