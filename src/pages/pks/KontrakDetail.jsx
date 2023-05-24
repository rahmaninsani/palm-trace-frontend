import React, { useState, useEffect, memo } from "react";
import { useOutletContext } from "react-router-dom";
import { Row, Col, Button, Modal } from "react-bootstrap";

import { Card } from "../../components/elements";
import DeliveryOrderList from "./DeliveryOrderList";

const KontrakDetail = memo(() => {
  const pageTitle = "Detail Kontrak";
  const { setTitle } = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  return (
    <>
      <div>
        <Row>
          {/* Detail Kontrak */}
          <Col xl="3" lg="4">
            <Card>
              <Card.Body>
                <div className="mt-2">
                  <h6 className="mb-1">Nomor</h6>
                  <p>K0001</p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Tanggal Pembuatan</h6>
                  <p>2022-12-01</p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Nama Pembuat</h6>
                  <p>PT Pabrik Sawit</p>
                </div>

                <hr className="hr-horizontal" />

                <div className="mt-2">
                  <h6 className="mb-1">Tanggal Mulai</h6>
                  <p>2023-01-01</p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Tanggal Berakhir</h6>
                  <p>2023-12-31</p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Kuantitas</h6>
                  <p>50.000 kg</p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Harga Per Kg</h6>
                  <p>Rp2.100</p>
                </div>

                <hr className="hr-horizontal" />

                <div className="mt-2">
                  <h6 className="mb-1">Nama Penerima</h6>
                  <p>KUD Sawit</p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Tanggal Konfirmasi</h6>
                  <p>2022-12-10</p>
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
              </Card.Body>
            </Card>
          </Col>

          {/* Daftar Delivery Order */}
          <Col xl="9" lg="8">
            <DeliveryOrderList />
          </Col>
        </Row>
      </div>
    </>
  );
});

export default KontrakDetail;
