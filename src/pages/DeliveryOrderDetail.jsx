import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { roleConstant, messageConstant } from "../constants";
import { setMessage } from "../features/authSlice";
import { Card, Progress } from "../components/elements";
import { FormKonfirmasi } from "../components/partials";
import TransaksiList from "./TransaksiList";
import { formatTime, formatCurrency } from "../utils";
import { deliveryOrderService } from "../services";

const DeliveryOrderDetail = memo(() => {
  const pageTitle = "Detail Delivery Order";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.auth);
  const { setTitle } = useOutletContext();
  const { idKontrak, idDeliveryOrder } = useParams();
  const [deliveryOrderDetail, setDeliveryOrderDetail] = useState({});
  const [showModalPesan, setShowModalPesan] = useState(false);

  useEffect(() => {
    setTitle(pageTitle);
    findOneDeliveryOrder();
  }, []);

  const findOneDeliveryOrder = async () => {
    try {
      const response = await deliveryOrderService.findOne({ idKontrak, idDeliveryOrder });
      setDeliveryOrderDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        idKontrak,
        idDeliveryOrder,
        data,
      };

      await deliveryOrderService.confirm(payload);

      dispatch(setMessage(messageConstant.deliveryOrderConfirm));
      findOneDeliveryOrder();
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
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

  const pemenuhanPercentage = parseFloat(((deliveryOrderDetail?.kuantitasTerpenuhi / deliveryOrderDetail?.kuantitas) * 100).toFixed(2));

  return (
    <>
      <ToastContainer />

      {/* Detail Delivery Order */}
      <Card>
        <Card.Header>
          <div className="card-action">
            <Button variant="primary" size="sm" onClick={() => navigate(-1)}>
              ← Kembali
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          <Row>
            {/* Delivery Order */}
            <Col md="4">
              <div className="mt-2">
                <h6 className="mb-1">Nomor</h6>
                <p>{deliveryOrderDetail?.nomor}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Tanggal Pembuatan</h6>
                <p>{formatTime(deliveryOrderDetail?.tanggalPembuatan)}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Pembuat</h6>
                <p>{deliveryOrderDetail?.namaPks}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Periode</h6>
                <p>{formatTime(deliveryOrderDetail?.periode)}</p>
              </div>
            </Col>

            {/* Isi */}
            <Col md="4">
              <div className="mt-2">
                <h6 className="mb-1">Rendemen</h6>
                <p>{deliveryOrderDetail?.rendemen}%</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Harga Per Kg</h6>
                <p>Rp{formatCurrency(deliveryOrderDetail?.harga)}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Kuantitas</h6>
                <p>{formatCurrency(deliveryOrderDetail?.kuantitas)} kg</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Kuantitas Terpenuhi</h6>
                <p>{formatCurrency(deliveryOrderDetail?.kuantitasTerpenuhi)} kg</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Kuantitas Tersisa</h6>
                <p>{formatCurrency(deliveryOrderDetail?.kuantitasTersisa)} kg</p>
              </div>
            </Col>

            {/* Koperasi */}
            <Col md="4">
              <div className="mt-2">
                <h6 className="mb-1">Mitra</h6>
                <p>{deliveryOrderDetail?.namaKoperasi}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Status</h6>
                <p>
                  <span className={`badge ${deliveryOrderDetail?.status === "Menunggu Konfirmasi" ? "bg-warning" : deliveryOrderDetail?.status === "Disetujui" ? "bg-success" : "bg-danger"}`}>{deliveryOrderDetail?.status}</span>
                </p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Pesan</h6>
                <p>
                  {deliveryOrderDetail?.pesan !== "" ? (
                    <>
                      <Button variant="primary mt-2" size="sm" onClick={() => setShowModalPesan(true)}>
                        Lihat
                      </Button>

                      <Modal scrollable={true} show={showModalPesan} backdrop="static" keyboard={false} onHide={() => setShowModalPesan(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Pesan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>{deliveryOrderDetail?.pesan}</p>
                        </Modal.Body>
                      </Modal>
                    </>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Tanggal Konfirmasi</h6>
                <p>{deliveryOrderDetail?.tanggalKonfirmasi === undefined || deliveryOrderDetail?.tanggalKonfirmasi === "" ? "-" : formatTime(deliveryOrderDetail?.tanggalKonfirmasi)}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>

        {deliveryOrderDetail?.status === "Disetujui" && (
          <Card.Footer>
            <h6 className="mb-3">Pemenuhan {pemenuhanPercentage}%</h6>
            <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={pemenuhanPercentage} minvalue={0} maxvalue={100} style={{ height: "12px" }} />
          </Card.Footer>
        )}
      </Card>

      {/* Konfirmasi */}
      {user && user.role === roleConstant.koperasi && deliveryOrderDetail?.status === "Menunggu Konfirmasi" && <FormKonfirmasi onSubmit={onSubmit} />}

      {/* Daftar Transaksi */}
      {deliveryOrderDetail?.status === "Disetujui" && <TransaksiList />}
    </>
  );
});

export default DeliveryOrderDetail;
