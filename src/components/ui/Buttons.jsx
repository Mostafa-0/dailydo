const mainStyles =
  "disabled:bg-gray-400 rounded-md px-4 py-2 text-xs uppercase font-medium flex justify-center items-center tracking-wider transition duration-200 ease-in-out focus:outline-none";

export function BtnPrimary({ children, onClick, type, disabled, className }) {
  return (
    <button
      className={`${mainStyles} ${className} bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function BtnSecondary({ children, onClick, type, disabled, className }) {
  return (
    <button
      className={`${mainStyles} ${className} bg-white hover:bg-neutral-50 active:bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-800 dark:active:bg-neutral-900 text-black dark:text-white`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function BtnDanger({ children, onClick, type, disabled, className }) {
  return (
    <button
      className={`${mainStyles} ${className} bg-red-600 hover:bg-red-700 active:bg-red-800 text-white`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function BtnCustom({ children, onClick, type, disabled, className }) {
  return (
    <button
      className={`${mainStyles} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
