import React, { useState, useEffect, memo } from "react";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import { Row, Col, Button, Modal } from "react-bootstrap";

import { Card } from "../../../components/elements";
import { Table } from "../../../components/partials/dashboard";

const KontrakDetail = memo(() => {
  const pageTitle = "Detail Kontrak";
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  const headings = ["Nomor", "Tanggal Pembuatan", "Periode", "Status", "Aksi"];

  const dataDO = [
    {
      nomor: "D0001",
      tanggal: "2023-01-01",
      periode: "Januari 2023",
      status: "Disetujui",
    },
    {
      nomor: "D0002",
      tanggal: "2023-01-01",
      periode: "Februari 2023",
      status: "Pending",
    },
    {
      nomor: "D0003",
      tanggal: "2023-01-01",
      periode: "Maret 2023",
      status: "Ditolak",
    },
    {
      nomor: "D0001",
      tanggal: "2023-01-01",
      periode: "April 2023",
      status: "Disetujui",
    },
    {
      nomor: "D0002",
      tanggal: "2023-01-01",
      periode: "Mei 2023",
      status: "Pending",
    },
    {
      nomor: "D0003",
      tanggal: "2023-01-01",
      periode: "Juni 2023",
      status: "Ditolak",
    },
    {
      nomor: "D0001",
      tanggal: "2023-01-01",
      periode: "Juli 2023",
      status: "Disetujui",
    },
    {
      nomor: "D0002",
      tanggal: "2023-01-01",
      periode: "Agustus 2023",
      status: "Pending",
    },
    {
      nomor: "D0003",
      tanggal: "2023-01-01",
      periode: "September 2023",
      status: "Ditolak",
    },
    {
      nomor: "D0001",
      tanggal: "2023-01-01",
      periode: "Oktober 2023",
      status: "Disetujui",
    },
  ];

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
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div className="header-title">
                  <h4 className="card-title">Daftar Delivery Order</h4>
                </div>
                <div className="card-action">
                  <Button variant="primary" href={`${pathname}/tambah`}>
                    Tambah
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Table headings={headings}>
                  {dataDO?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nomor}</td>
                      <td>{item.tanggal}</td>
                      <td>{item.periode}</td>
                      <td className={`text-${item.status === "Pending" ? "warning" : item.status === "Disetujui" ? "success" : "danger"}`}>{item.status}</td>
                      <td>
                        <Link to={`${pathname}/${item.nomor}`}>Detail</Link>
                      </td>
                    </tr>
                  ))}
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
});

export default KontrakDetail;
