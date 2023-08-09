import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { roleConstant } from "../constants";
import { setMessage } from "../features/authSlice";
import { ProfilDinas, ProfilPks, ProfilKoperasi, ProfilPetani, ProfilPetaniKebun } from "../components/partials";
import { Card, Alert } from "../components/elements";

const Profil = memo(() => {
  const pageTitle = "Profil";
  const navigate = useNavigate();
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
        autoClose: 3000,
        onClose: () => {
          dispatch(setMessage(""));

          setTimeout(() => {
            navigate(0);
          }, 3000);
        },
      });
    }
  }, [isError, message]);

  return (
    <>
      <ToastContainer />

      <Card>
        {user && !user.profilLengkap && (
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div className="col-sm-12">
              <Alert type="warning" message="Lengkapi profil terlebih dahulu" />
            </div>
          </Card.Header>
        )}

        {user && user.role === roleConstant.dinas && <ProfilDinas />}
        {user && user.role === roleConstant.pks && <ProfilPks />}
        {user && user.role === roleConstant.koperasi && <ProfilKoperasi />}
        {user && user.role === roleConstant.petani && <ProfilPetani />}
      </Card>

      {user && user.role === roleConstant.petani && user.profilLengkap && <ProfilPetaniKebun />}
    </>
  );
});

export default Profil;
