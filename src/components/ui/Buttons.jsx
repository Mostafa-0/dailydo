const mainStyles =
  "disabled:bg-opacity-80 rounded-md px-4 py-2 text-sm font-medium flex justify-center items-center transition duration-200 ease-in-out";

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
      className={`${mainStyles} ${className} bg-neutral-100 border border-neutral-300 hover:bg-neutral-200 active:bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-900 dark:text-white`}
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
