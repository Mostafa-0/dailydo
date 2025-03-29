import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Loader from "@components/ui/Loader";

function PrivateRoute({ children }) {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) return <Loader size={24} />;
  if (!currentUser) return <Navigate to="/login" replace />;

  return children;
}

export default PrivateRoute;
