import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoginContext from "../../contexts/LoginContext";

const ProtectedRoute = ({ children, anonymous = false }) => {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn } = useContext(LoginContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/profile" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
