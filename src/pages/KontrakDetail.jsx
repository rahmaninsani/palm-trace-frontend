import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";

import { Card, Progress } from "../components/elements";
import DeliveryOrderList from "./DeliveryOrderList";

import endpoint from "../constants/endpoint";
import role from "../constants/role";
import { formatTime, formatCurrency } from "../utils";
import { kontrakService } from "../services";

const KontrakDetail = memo(() => {
  const pageTitle = "Detail Kontrak";
  const navigate = useNavigate();
  const { setTitle } = useOutletContext();
  const { user, isError } = useSelector((state) => state.auth);
  const { idKontrak } = useParams();
  const [kontrakDetail, setKontrakDetail] = useState({});
  const [showModalPesan, setShowModalPesan] = useState(false);
  const [formValue, setFormValue] = useState({
    status: -1,
    pesan: "",
  });

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

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: name === "status" && value > 0 ? parseFloat(value) : value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await kontrakService.confirm({ idKontrak, formValue });
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const pemenuhanPercentage = (kontrakDetail?.kuantitasTerpenuhi / kontrakDetail?.kuantitas) * 100;

  return (
    <>
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
                      <Button variant="primary mt-2" size="sm" onClick={() => setShowModalPesan(true)}>
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
            <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={pemenuhanPercentage} minvalue={0} maxvalue={100} style={{ height: "6px" }} />
          </Card.Footer>
        )}
      </Card>

      {/* Konfirmasi */}
      {user && user.role === role.koperasi && kontrakDetail?.status === "Menunggu Konfirmasi" && (
        <Card>
          <Card.Header className="mx-auto">
            <h5>Konfirmasi</h5>
          </Card.Header>

          <hr className="hr-horizontal" />

          <Form onSubmit={onSubmit}>
            <Card.Body>
              <Row>
                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="status">Status</Form.Label>
                  <select className="form-select mb-3 shadow-none" id="status" name="status" value={formValue.status} onChange={onInputChange}>
                    <option defaultValue>Pilih Status</option>
                    <option value={1}>Setuju</option>
                    <option value={2}>Tolak</option>
                  </select>
                </Form.Group>

                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="pesan">Pesan</Form.Label>
                  <Form.Control as="textarea" rows={4} id="pesan" name="pesan" value={formValue.pesan} onChange={onInputChange} />
                </Form.Group>
              </Row>
            </Card.Body>

            <Card.Footer className="text-center">
              <Button type="submit" variant="btn btn-primary">
                Simpan
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      )}

      {/* Daftar Delivery Order */}
      {kontrakDetail?.status === "Disetujui" && <DeliveryOrderList />}
    </>
  );
});

export default KontrakDetail;
