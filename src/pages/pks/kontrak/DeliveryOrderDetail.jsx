import React, { useState, useEffect, memo } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { Row, Col, Button, Modal, Tab, Nav } from "react-bootstrap";

import { transactions } from "../../../config";
import { DeliveryOrderTransaksi } from "../../../components/partials/dashboard";
import { Card } from "../../../components/elements";

const DeliveryOrderDetail = memo(() => {
  const pageTitle = "Detail Delivery Order";
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
            <Button variant="primary" href={`${pathname.split("/").slice(0, -1).join("/")}`}>
              ← Detail Kontrak
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

      <Card>
        <Tab.Container defaultActiveKey="perlu-konfirmasi">
          <Card.Header>
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <Nav as="ul" className="d-flex nav-pills mb-0 text-center transaksi-tab" data-toggle="slider-tab" id="transaksi-pills-tab" role="tablist">
                <Nav.Item as="li">
                  <Nav.Link eventKey="perlu-konfirmasi">Perlu Konfirmasi</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="diproses">Diproses</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="dikirim">Dikirim</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="diterima">Diterima</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="selesai">Selesai</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link eventKey="ditolak">Ditolak</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Card.Header>

          <Card.Body>
            <Tab.Content className="transaksi-content">
              {/* Perlu Konfirmasi */}
              <DeliveryOrderTransaksi tabKey="perlu-konfirmasi" transactions={transactions["perluKonfirmasi"]} />

              {/* Diproses */}
              <DeliveryOrderTransaksi tabKey="diproses" transactions={transactions["diproses"]} />

              {/* Dikirim */}
              <DeliveryOrderTransaksi tabKey="dikirim" transactions={transactions["dikirim"]} />

              {/* Diterima */}
              <DeliveryOrderTransaksi tabKey="diterima" transactions={transactions["diterima"]} />

              {/* Selesai */}
              <DeliveryOrderTransaksi tabKey="selesai" transactions={transactions["selesai"]} />

              {/* Ditolak */}
              <DeliveryOrderTransaksi tabKey="ditolak" transactions={transactions["ditolak"]} />
            </Tab.Content>
          </Card.Body>
        </Tab.Container>
      </Card>
    </>
  );
});

export default DeliveryOrderDetail;
