import { ROLE } from "../config";
import { Navigate, useLocation } from "react-router-dom";

const CheckUser = ({ children }) => {
  const location = useLocation();

  const userRole = localStorage.getItem("role");
  const userHasRequiredRole = Object.values(ROLE).includes(userRole);

  if (!userRole || !userHasRequiredRole) {
    return children;
  }

  switch (userRole) {
    case ROLE.PETANI:
      return <Navigate to={`/${ROLE.PETANI}`} state={{ from: location }} replace />;
    case ROLE.KOPERASI:
      return <Navigate to={`/${ROLE.KOPERASI}`} state={{ from: location }} replace />;
    case ROLE.PKS:
      return <Navigate to={`/${ROLE.PKS}`} state={{ from: location }} replace />;
  }
};

export default CheckUser;
