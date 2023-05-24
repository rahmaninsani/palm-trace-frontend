import React, { useState, useEffect, memo } from "react";
import { useLocation, useOutletContext, useNavigate } from "react-router-dom";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";

import TransaksiList from "./TransaksiList";
import { Card } from "../../components/elements";

const DeliveryOrderDetail = memo(() => {
  const pageTitle = "Detail Delivery Order";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  return (
    <>
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
                <p>D0001</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Tanggal Pembuatan</h6>
                <p>2023-05-01</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Nama Pembuat</h6>
                <p>PT Pabrik Sawit</p>
              </div>
            </Col>

            {/* Isi */}
            <Col md="4">
              <div className="mt-2">
                <h6 className="mb-1">Periode</h6>
                <p>Mei 2023</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Kuantitas</h6>
                <p>1000 kg</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Harga Per Kg</h6>
                <p>Rp2.100</p>
              </div>
            </Col>

            {/* Koperasi */}
            <Col md="4">
              <div className="mt-2">
                <h6 className="mb-1">Nama Penerima</h6>
                <p>KUD Sawit</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Tanggal Konfirmasi</h6>
                <p>2023-05-02</p>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Status</h6>
                <span className={`badge ${"Disetujui" === "Pending" ? "bg-warning" : "Disetujui" === "Disetujui" ? "bg-success" : "bg-danger"}`}>Disetujui</span>
              </div>
              <div className="mt-2">
                <h6 className="mb-1">Pesan</h6>
                <Button variant="primary mt-2" size="sm" onClick={handleShowModal}>
                  Lihat
                </Button>
                <Modal scrollable={true} show={showModal} backdrop="static" keyboard={false} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title as="h5">Pesan</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Baik, kami setuju. Mohon kerjasamanya.</p>
                  </Modal.Body>
                </Modal>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <TransaksiList />
    </>
  );
});

export default DeliveryOrderDetail;
