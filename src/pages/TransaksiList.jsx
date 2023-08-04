import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Nav, Tab, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { endpointConstant } from "../constants";
import { setMessage } from "../features/authSlice";
import { TransaksiCard } from "../components/partials/dashboard";
import { Card } from "../components/elements";
import { transaksiService } from "../services";

const TransaksiList = memo(() => {
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.auth);
  const { idKontrak, idDeliveryOrder } = useParams();
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    findAllTransaksi();
  }, []);

  const findAllTransaksi = async () => {
    try {
      const response = await transaksiService.findAll({ idKontrak, idDeliveryOrder });
      setTransaksi(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

      <Card>
        <Tab.Container defaultActiveKey="berlangsung">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <h6 className="me-3">Status</h6>
              <Nav as="ul" className="d-flex nav-pills mb-0 text-center transaksi-tab" data-toggle="slider-tab" id="transaksi-pills-tab" role="tablist">
                <Nav.Item as="li">
                  <Nav.Link eventKey="berlangsung">Berlangsung</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="berhasil">Berhasil</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="tidakBerhasil">Tidak Berhasil</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            {user && user.role === "petani" && (
              <div className="card-action">
                <Button variant="primary" href={`${endpointConstant.kontrak}/${idKontrak}/${idDeliveryOrder}/tambah`}>
                  Tambah
                </Button>
              </div>
            )}
          </Card.Header>

          <Card.Body>
            {transaksi ? (
              <Tab.Content className="transaksi-content">
                {transaksi.berlangsung && <TransaksiCard tabKey="berlangsung" transactions={transaksi.berlangsung} user={user} />}
                {transaksi.berhasil && <TransaksiCard tabKey="berhasil" transactions={transaksi.berhasil} user={user} />}
                {transaksi.tidakBerhasil && <TransaksiCard tabKey="tidakBerhasil" transactions={transaksi.tidakBerhasil} user={user} />}
              </Tab.Content>
            ) : (
              <div className="text-center">
                <p className="text-muted">Belum ada transaksi</p>
              </div>
            )}
          </Card.Body>
        </Tab.Container>
      </Card>
    </>
  );
});

export default TransaksiList;
