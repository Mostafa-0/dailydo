const Tooltip = ({ text, children }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute left-0 top-full -translate-x-[30px] rounded-md bg-black dark:bg-neutral-50 px-3 py-1 text-sm text-white dark:text-black shadow-sm font-medium break-words z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[64vw] max-w-max">
        {text}
        <div className="absolute left-8 top-0 -translate-y-full border-8 border-transparent border-b-black dark:border-b-neutral-50"></div>
      </div>
    </div>
  );
};

export default Tooltip;
