const Tooltip = ({ text, children }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute -left-20 top-full mt-3 rounded-md bg-popover text-popover-foreground px-3 py-1 text-sm shadow-md font-medium break-words z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[64vw] max-w-max">
        {text}
        <div className="absolute left-[82px] top-0 -translate-y-full border-8 border-transparent border-b-popover"></div>
      </div>
    </div>
  );
};

export default Tooltip;
