import role from "../constants/role";
import endpoint from "../constants/endpoint";
import { Navigate, useLocation } from "react-router-dom";

const CheckUser = ({ children }) => {
  const location = useLocation();

  const userRole = localStorage.getItem("role");
  const userHasRequiredRole = Object.values(role).includes(userRole);

  if (!userRole || !userHasRequiredRole) {
    return children;
  }

  switch (userRole) {
    case role.dinas:
      return <Navigate to={endpoint.dashboard} state={{ from: location }} replace />;
    default:
      return <Navigate to={endpoint.dashboard} state={{ from: location }} replace />;
  }
};

export default CheckUser;
