import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Footer() {
  const { currentUser, loading } = useContext(AuthContext);
  return (
    currentUser &&
    !loading && (
      <footer className="p-6 bg-neutral-300 bg-opacity-40 dark:bg-neutral-950 dark:bg-opacity-60 text-sm tracking-wider w-full">
        <p>&#169; 2024 DailyDo. All Rights Reserved. By Mostafa Hashem</p>
      </footer>
    )
  );
}

export default Footer;
