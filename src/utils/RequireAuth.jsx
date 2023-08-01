import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GetMe } from "../features/authSlice";

const RequireAuth = ({ allowedRoles, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch, isError, navigate]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }

    if (user && !allowedRoles.includes(user.role)) {
      navigate(`/`);
    }
  }, [isError, navigate, user, allowedRoles]);

  return children;
};

export default RequireAuth;
