const TickIcon = ({isChecked}) => {

  return (
    <div>
      <svg
        className={`size-7 md:size-8 cursor-pointer transition-all duration-300 ease-in-out ${
          isChecked ? "transform scale-110" : ""
        }`}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={`transition-all duration-300 ease-in-out hover:fill-green-600 ${
            isChecked ? "fill-green-600" : "fill-green-500"
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
          strokeDashoffset={isChecked ? "0" : "100"}
        />
      </svg>
    </div>
  );
};

export default TickIcon;
