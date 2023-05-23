// import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ role, children }) => {
  const location = useLocation();

  // const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isAuthenticated = true;
  const userRole = localStorage.getItem("role");

  // const userHasRequiredRole = roles && roles.includes(role) ? true : false;
  const userHasRequiredRole = userRole === role ? true : false;

  if (!isAuthenticated || !userHasRequiredRole) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
