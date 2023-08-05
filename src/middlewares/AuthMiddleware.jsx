import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { endpointConstant } from "../constants";
import { GetMe } from "../features/authSlice";

const AuthMiddleware = ({ allowedRoles = [], children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate(endpointConstant.login, { replace: true });
    }

    if (user) {
      if (!allowedRoles.includes(user.role)) {
        navigate(endpointConstant.tidakDitemukan, { replace: true });
      }

      if (user.profilLengkap === false) {
        navigate(endpointConstant.profil, { replace: true });
      }
    }
  }, [isError, user, navigate]);

  return children;
};

export default AuthMiddleware;
