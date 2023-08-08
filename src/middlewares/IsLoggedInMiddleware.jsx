import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { roleConstant, endpointConstant } from "../constants";
import { GetMe } from "../features/authSlice";

const IsLoggedInMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      if (pathname === endpointConstant.login) {
        navigate(endpointConstant.login, { replace: true });
      } else if (pathname === endpointConstant.register) {
        navigate(endpointConstant.register, { replace: true });
      } else {
        navigate(endpointConstant.tidakDitemukan, { replace: true });
      }
    }

    if (user) {
      if (user.role === roleConstant.dinas) {
        navigate(endpointConstant.referensiHarga, { replace: true });
      } else {
        navigate(endpointConstant.dashboard, { replace: true });
      }
    }
  }, [isLoading, user, navigate]);

  return children;
};

export default IsLoggedInMiddleware;
