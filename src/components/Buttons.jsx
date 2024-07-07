const mainStyles =
  "disabled:bg-gray-400 rounded-md py-[8px] px-5 text-sm uppercase font-medium flex justify-center items-center transition duration-200 ease-in-out text-white focus:outline-none";

export function BtnPrimary({ children, onClick, type, disabled, style }) {
  return (
    <button
      className={`${mainStyles} ${style} bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function BtnSecondary({ children, onClick, type, disabled, style }) {
  return (
    <button
      className={`${mainStyles} ${style} bg-neutral-700 hover:bg-neutral-800 active:bg-neutral-900`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function BtnDanger({ children, onClick, type, disabled, style }) {
  return (
    <button
      className={`${mainStyles} ${style} bg-red-600 hover:bg-red-700 active:bg-red-800`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
