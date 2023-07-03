import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GetMe } from "../features/authSlice";

const RequireAuth = ({ role, children }) => {
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

    if (user && user.role !== role) {
      navigate(`/${user.role}`);
    }
  }, [isError, navigate, user, role]);

  return children;
};

export default RequireAuth;
