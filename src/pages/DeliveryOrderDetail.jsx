import React, { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";

import { roleConstant } from "../constants";
import TransaksiList from "./TransaksiList";
import { Card, Progress } from "../components/elements";
import { formatTime, formatCurrency } from "../utils";
import { deliveryOrderService } from "../services";

const DeliveryOrderDetail = memo(() => {
  const pageTitle = "Detail Delivery Order";
  const navigate = useNavigate();
  const { setTitle } = useOutletContext();
  const { user, isError } = useSelector((state) => state.auth);
  const { idKontrak, idDeliveryOrder } = useParams();
  const [deliveryOrderDetail, setDeliveryOrderDetail] = useState({});
  const [showModalPesan, setShowModalPesan] = useState(false);
  const [formValue, setFormValue] = useState({
    status: -1,
    pesan: "",
  });

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
      await deliveryOrderService.confirm({ idKontrak, idDeliveryOrder, formValue });
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const pemenuhanPercentage = (deliveryOrderDetail?.kuantitasTerpenuhi / deliveryOrderDetail?.kuantitas) * 100;

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
            <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={pemenuhanPercentage} minvalue={0} maxvalue={100} style={{ height: "6px" }} />
          </Card.Footer>
        )}
      </Card>

      {/* Konfirmasi */}
      {user && user.role === roleConstant.koperasi && deliveryOrderDetail?.status === "Menunggu Konfirmasi" && (
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

      {/* Daftar Transaksi */}
      {deliveryOrderDetail?.status === "Disetujui" && <TransaksiList />}
    </>
  );
});

export default DeliveryOrderDetail;
