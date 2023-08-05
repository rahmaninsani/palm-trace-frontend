import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { roleConstant, endpointConstant } from "../constants";
import { GetMe } from "../features/authSlice";

const IsLoggedInMiddleware = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      navigate(endpointConstant.login, { replace: true });
      return;
    }

    let home = endpointConstant.dashboard;
    if (user.role === roleConstant.dinas) {
      home = endpointConstant.referensiHarga;
    }

    navigate(home, { replace: true });
  }, [isLoading, user, navigate]);

  return children;
};

export default IsLoggedInMiddleware;
