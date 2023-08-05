import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { roleConstant, messageConstant } from "../constants";
import { setMessage } from "../features/authSlice";
import { kontrakSchema } from "../validations";
import { Card, Progress } from "../components/elements";
import { FormKonfirmasi } from "../components/partials";
import DeliveryOrderList from "./DeliveryOrderList";
import { formatTime, formatCurrency } from "../utils";
import { kontrakService } from "../services";

const KontrakDetail = memo(() => {
  const pageTitle = "Detail Kontrak";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.auth);
  const { setTitle } = useOutletContext();
  const { idKontrak } = useParams();
  const [kontrakDetail, setKontrakDetail] = useState({});
  const [showModalPesan, setShowModalPesan] = useState(false);

  useEffect(() => {
    setTitle(pageTitle);
    findOneKontrak();
  }, []);

  const findOneKontrak = async () => {
    try {
      const response = await kontrakService.findOne(idKontrak);
      setKontrakDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        idKontrak,
        data,
      };

      await kontrakService.confirm(payload);

      dispatch(setMessage(messageConstant.kontrakConfirm));
      findOneKontrak();
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

  const pemenuhanPercentage = parseFloat(((kontrakDetail?.kuantitasTerpenuhi / kontrakDetail?.kuantitas) * 100).toFixed(2));

  return (
    <>
      <ToastContainer />

      {/* Detail Kontrak */}
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
            {/* Kontrak */}
            <Col md="4">
              <div className="mt-2">
                <h6 className="mb-1">Nomor</h6>
                <p>{kontrakDetail?.nomor}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Tanggal Pembuatan</h6>
                <p>{formatTime(kontrakDetail?.tanggalPembuatan)}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Pembuat</h6>
                <p>{kontrakDetail?.namaPks}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Tanggal Mulai</h6>
                <p>{formatTime(kontrakDetail?.tanggalMulai)}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Tanggal Selesai</h6>
                <p>{formatTime(kontrakDetail?.tanggalSelesai)}</p>
              </div>
            </Col>

            {/* Isi */}
            <Col md="4">
              <div className="mt-2">
                <h6 className="mb-1">Harga Per Kg</h6>
                <p>Rp{formatCurrency(kontrakDetail?.harga)}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Kuantitas</h6>
                <p>{formatCurrency(kontrakDetail?.kuantitas)} kg</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Kuantitas Terpenuhi</h6>
                <p>{formatCurrency(kontrakDetail?.kuantitasTerpenuhi)} kg</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Kuantitas Tersisa</h6>
                <p>{formatCurrency(kontrakDetail?.kuantitasTersisa)} kg</p>
              </div>
            </Col>

            {/* Koperasi */}
            <Col md="4">
              <div className="mt-2">
                <h6 className="mb-1">Mitra</h6>
                <p>{kontrakDetail?.namaKoperasi}</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Status</h6>
                <p>
                  <span className={`badge ${kontrakDetail?.status === "Menunggu Konfirmasi" ? "bg-warning" : kontrakDetail?.status === "Disetujui" ? "bg-success" : "bg-danger"}`}>{kontrakDetail?.status}</span>
                </p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Pesan</h6>
                <p>
                  {kontrakDetail?.pesan !== "" ? (
                    <>
                      <Button variant="primary" size="sm" onClick={() => setShowModalPesan(true)}>
                        Lihat
                      </Button>

                      <Modal scrollable={true} show={showModalPesan} backdrop="static" keyboard={false} onHide={() => setShowModalPesan(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Pesan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>{kontrakDetail?.pesan}</p>
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
                <p>{kontrakDetail?.tanggalKonfirmasi === undefined || kontrakDetail?.tanggalKonfirmasi === "" ? "-" : formatTime(kontrakDetail?.tanggalKonfirmasi)}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>

        {kontrakDetail?.status === "Disetujui" && (
          <Card.Footer>
            <h6 className="mb-3">Pemenuhan {pemenuhanPercentage}%</h6>
            <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={pemenuhanPercentage} minvalue={0} maxvalue={100} style={{ height: "12px" }} />
          </Card.Footer>
        )}
      </Card>

      {/* Konfirmasi */}
      {user && user.role === roleConstant.koperasi && kontrakDetail?.status === "Menunggu Konfirmasi" && <FormKonfirmasi onSubmit={onSubmit} schema={kontrakSchema.confirm} />}

      {/* Daftar Delivery Order */}
      {kontrakDetail?.status === "Disetujui" && <DeliveryOrderList />}
    </>
  );
});

export default KontrakDetail;
