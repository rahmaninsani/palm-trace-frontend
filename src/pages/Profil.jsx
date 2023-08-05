import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { roleConstant } from "../constants";
import { setMessage } from "../features/authSlice";
import { ProfilPks } from "../components/partials";

const Profil = memo(() => {
  const pageTitle = "Profil";
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.auth);
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        toastId: "error",
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => dispatch(setMessage("")),
      });
    }

    if (!isError && message) {
      toast.success(message, {
        toastId: "success",
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => dispatch(setMessage("")),
      });
    }
  }, [isError, message]);

  return (
    <>
      <ToastContainer />

      {user && user.role === roleConstant.pks && <ProfilPks />}
    </>
  );
});

export default Profil;
