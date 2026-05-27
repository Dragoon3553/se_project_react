import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Context Export
import LoginContext from "../../contexts/LoginContext";

import Spinner from "../Spinner/Spinner";

const ProtectedRoute = ({ children, anonymous = false, isLoading }) => {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn } = useContext(LoginContext);

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return children;
};

export default ProtectedRoute;
