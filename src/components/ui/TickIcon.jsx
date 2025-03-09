const TickIcon = ({ status }) => {
  return (
    <svg
      className={`size-6 border-2 border-green-600 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
        status == "completed" ? "transform scale-110" : ""
      }`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={`transition-all duration-300 ease-in-out hover:fill-green-600 ${
          status == "completed" ? "fill-green-600" : "fill-transparent"
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
        strokeDashoffset={status == "completed" ? "0" : "100"}
      />
    </svg>
  );
};

export default TickIcon;
