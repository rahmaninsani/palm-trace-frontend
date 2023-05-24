import React, { useState, useEffect, memo } from "react";
import { useOutletContext } from "react-router-dom";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";

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
                  <h6 className="mb-1">Pabrik Kelapa Sawit</h6>
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
                  <h6 className="mb-1">Koperasi</h6>
                  <p>KUD Sawit</p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Status</h6>
                  <span className={`badge ${"Tertunda" === "Tertunda" ? "bg-warning" : "Disetujui" === "Disetujui" ? "bg-success" : "bg-danger"}`}>Tetunda</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Daftar Delivery Order */}
          <Col xl="9" lg="8">
            <Card>
              <Card.Header className="mx-auto">
                <h5>Konfirmasi</h5>
              </Card.Header>

              <hr className="hr-horizontal" />

              <Card.Body>
                <Row>
                  <Form.Group className="col-sm-12 form-group">
                    <Form.Label>Status</Form.Label>
                    <select className="form-select mb-3 shadow-none">
                      <option defaultValue>Pilih Status</option>
                      <option value={1}>Setuju</option>
                      <option value={2}>Tolak</option>
                    </select>
                  </Form.Group>

                  <Form.Group className="col-sm-12 form-group">
                    <Form.Label htmlFor="pesan">Pesan</Form.Label>
                    <Form.Control as="textarea" rows={4} id="pesan" />
                  </Form.Group>
                </Row>
              </Card.Body>

              <Card.Footer className="text-center">
                <Button type="submit" variant="btn btn-primary">
                  Simpan
                </Button>
              </Card.Footer>
            </Card>

            <DeliveryOrderList />
          </Col>
        </Row>
      </div>
    </>
  );
});

export default KontrakDetail;
