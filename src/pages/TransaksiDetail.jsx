import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Row, Col, Image, Modal, Button, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { roleConstant, messageConstant } from "../constants";
import { setMessage } from "../features/authSlice";
import { transaksiSchema } from "../validations";
import { Card } from "../components/elements";
import { FormKonfirmasi, FormPengiriman, FormPenerimaan, FormPembayaran } from "../components/partials";
import { formatCurrency } from "../utils";
import { transaksiService, pengirimanService, penerimaanService, pembayaranService } from "../services";

import buktiBayar1 from "../assets/images/buktibayar1.jpg";
import buktiBayar2 from "../assets/images/buktibayar2.jpg";

const TransaksiDetail = memo(() => {
  const pageTitle = "Detail Transaksi";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.auth);
  const { setTitle } = useOutletContext();
  const { idKontrak, idDeliveryOrder, idTransaksi } = useParams();
  const [transaksiDetail, setTransaksiDetail] = useState({});

  const [showModalTransaksiDibuat, setShowModalTransaksiDibuat] = useState(false);
  const handleShowModalTransaksiDibuat = () => setShowModalTransaksiDibuat(true);
  const handleCloseModalTransaksiDibuat = () => setShowModalTransaksiDibuat(false);

  const [showModalDisetujuiKoperasi, setShowModalDisetujuiKoperasi] = useState(false);
  const handleShowModalDisetujuiKoperasi = () => setShowModalDisetujuiKoperasi(true);
  const handleCloseModalDisetujuiKoperasi = () => setShowModalDisetujuiKoperasi(false);

  const [showModalDisetujuiPKS, setShowModalDisetujuiPKS] = useState(false);
  const handleShowModalDisetujuiPKS = () => setShowModalDisetujuiPKS(true);
  const handleCloseModalDisetujuiPKS = () => setShowModalDisetujuiPKS(false);

  const [showModalDikirimPetani, setShowModalDikirimPetani] = useState(false);
  const handleShowModalDikirimPetani = () => setShowModalDikirimPetani(true);
  const handleCloseModalDikirimPetani = () => setShowModalDikirimPetani(false);

  const [showModalDikirimKoperasi, setShowModalDikirimKoperasi] = useState(false);
  const handleShowModalDikirimKoperasi = () => setShowModalDikirimKoperasi(true);
  const handleCloseModalDikirimKoperasi = () => setShowModalDikirimKoperasi(false);

  const [showModalPembayaranPKS, setShowModalPembayaranPKS] = useState(false);
  const handleShowModalPembayaranPKS = () => setShowModalPembayaranPKS(true);
  const handleCloseModalPembayaranPKS = () => setShowModalPembayaranPKS(false);

  const [showModalPembayaranKoperasi, setShowModalPembayaranKoperasi] = useState(false);
  const handleShowModalPembayaranKoperasi = () => setShowModalPembayaranKoperasi(true);
  const handleCloseModalPembayaranKoperasi = () => setShowModalPembayaranKoperasi(false);

  useEffect(() => {
    setTitle(pageTitle);
    findOneTransaksi();
  }, []);

  const findOneTransaksi = async () => {
    try {
      const response = await transaksiService.findOne({ idKontrak, idDeliveryOrder, idTransaksi });
      setTransaksiDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitKonfirmasi = async (data) => {
    try {
      const payload = {
        idKontrak,
        idDeliveryOrder,
        idTransaksi,
        data,
      };

      await transaksiService.confirm(payload);

      dispatch(setMessage(messageConstant.transaksiConfirm));
      findOneTransaksi();
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  const onSubmitPengiriman = async (data) => {
    try {
      const payload = {
        idKontrak,
        idDeliveryOrder,
        idTransaksi,
        data,
      };

      await pengirimanService.create(payload);

      dispatch(setMessage(messageConstant.pengirimanSuccess));
      findOneTransaksi();
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  const onSubmitPenerimaan = async (data) => {
    try {
      const payload = {
        idKontrak,
        idDeliveryOrder,
        idTransaksi,
        data,
      };

      await penerimaanService.create(payload);

      dispatch(setMessage(messageConstant.penerimaanSuccess));
      findOneTransaksi();
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  const onSubmitPembayaran = async (data) => {
    try {
      const payload = {
        idKontrak,
        idDeliveryOrder,
        idTransaksi,
        data,
      };

      await pembayaranService.create(payload);

      dispatch(setMessage(messageConstant.pembayaranSuccess));
      findOneTransaksi();
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

  return (
    <>
      <ToastContainer />

      <Row>
        <Col xl="4" lg="4">
          <Card>
            <Card.Body>
              <div className="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                <ul className="list-inline p-0 m-0">
                  <li>
                    <div className="timeline-dots1 border-success text-success">
                      <svg width="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                      </svg>
                    </div>
                    <h6 className="float-left mb-1">Transaksi Selesai</h6>
                    <small className="float-right mt-1">19 Mei 2023 14:00 WIB</small>
                    <div className="d-inline-block w-100"></div>
                  </li>

                  <li>
                    <div className="timeline-dots timeline-dot1 border-gray text-gray"></div>
                    <h6 className="float-left mb-1">Koperasi Membayar Petani</h6>
                    <small className="float-right mt-1">19 Mei 2023 14:00 WIB</small>
                    <div className="d-inline-block w-100">
                      <p className="text-primary" onClick={handleShowModalPembayaranKoperasi}>
                        Lihat Info Pembayaran
                      </p>
                      <Modal scrollable={true} show={showModalPembayaranKoperasi} backdrop="static" keyboard={false} onHide={handleCloseModalPembayaranKoperasi}>
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Info Pembayaran</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Image src={buktiBayar2} className="img img-fluid rounded" />
                        </Modal.Body>
                      </Modal>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-dots timeline-dot1 border-gray text-gray"></div>
                    <h6 className="float-left mb-1">PKS Membayar Koperasi</h6>
                    <small className="float-right mt-1">19 Mei 2023 13:00 WIB</small>
                    <div className="d-inline-block w-100">
                      <p className="text-primary" onClick={handleShowModalPembayaranPKS}>
                        Lihat Info Pembayaran
                      </p>
                      <Modal scrollable={true} show={showModalPembayaranPKS} backdrop="static" keyboard={false} onHide={handleCloseModalPembayaranPKS}>
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Info Pembayaran</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Image src={buktiBayar1} className="img img-fluid rounded" />
                        </Modal.Body>
                      </Modal>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-dots timeline-dot1 border-gray text-gray"></div>
                    <h6 className="float-left mb-1">Diterima PKS</h6>
                    <small className="float-right mt-1">19 Mei 2023 12:00 WIB</small>
                    <div className="d-inline-block w-100">
                      <p>PKS menerima TBS</p>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-dots timeline-dot1 border-gray text-gray"></div>
                    <h6 className="float-left mb-1">Dikirim Koperasi</h6>
                    <small className="float-right mt-1">19 Mei 2023 10:15 WIB</small>
                    <div className="d-inline-block w-100">
                      <p className="text-primary" onClick={handleShowModalDikirimKoperasi}>
                        Lihat Info Pengiriman
                      </p>
                      <Modal scrollable={true} show={showModalDikirimKoperasi} backdrop="static" keyboard={false} onHide={handleCloseModalDikirimKoperasi}>
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Info Pengiriman</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Row>
                            <Col md="6">
                              <h6 className="mb-1">Nama Sopir</h6>
                              <p>David</p>
                            </Col>
                            <Col md="6">
                              <h6 className="mb-1">Nomor Telepon</h6>
                              <p>+628123456789</p>
                            </Col>
                            <Col md="6">
                              <h6 className="mb-1">Kendaraan</h6>
                              <p>Truk Daihatsu F8</p>
                            </Col>
                            <Col md="6">
                              <h6 className="mb-1">Nomor Polisi</h6>
                              <p>D 4592 ZBD</p>
                            </Col>
                          </Row>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-dots timeline-dot1 border-gray text-gray"></div>
                    <h6 className="float-left mb-1">Diterima Koperasi</h6>
                    <small className="float-right mt-1">19 Mei 2023 10:00 WIB</small>
                    <div className="d-inline-block w-100">
                      <p>Koperasi menerima TBS</p>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-dots timeline-dot1 border-gray text-gray"></div>
                    <h6 className="float-left mb-1">Dikirim Petani</h6>
                    <small className="float-right mt-1">19 Mei 2023 09:15 WIB</small>
                    <div className="d-inline-block w-100">
                      <p className="text-primary" onClick={handleShowModalDikirimPetani}>
                        Lihat Info Pengiriman
                      </p>
                      <Modal scrollable={true} show={showModalDikirimPetani} backdrop="static" keyboard={false} onHide={handleCloseModalDikirimPetani}>
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Info Pengiriman</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Row>
                            <Col md="6">
                              <h6 className="mb-1">Nama Sopir</h6>
                              <p>Charlie</p>
                            </Col>
                            <Col md="6">
                              <h6 className="mb-1">Nomor Telepon</h6>
                              <p>+628123456789</p>
                            </Col>
                            <Col md="6">
                              <h6 className="mb-1">Kendaraan</h6>
                              <p>Truk Hino A24</p>
                            </Col>
                            <Col md="6">
                              <h6 className="mb-1">Nomor Polisi</h6>
                              <p>D 6290 ZBA</p>
                            </Col>
                          </Row>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-dots timeline-dot1 border-gray text-gray"></div>
                    <h6 className="float-left mb-1">Disetujui PKS</h6>
                    <small className="float-right mt-1">19 Mei 2023 09:00 WIB</small>
                    <div className="d-inline-block w-100">
                      <p className="text-primary" onClick={handleShowModalDisetujuiPKS}>
                        Lihat Pesan
                      </p>
                      <Modal scrollable={true} show={showModalDisetujuiPKS} backdrop="static" keyboard={false} onHide={handleCloseModalDisetujuiPKS}>
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Pesan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>Ok deal.</p>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-dots timeline-dot1 border-gray text-gray"></div>
                    <h6 className="float-left mb-1">Disetujui Koperasi</h6>
                    <small className="float-right mt-1">19 Mei 2023 08:00 WIB</small>
                    <div className="d-inline-block w-100">
                      <p className="text-primary" onClick={handleShowModalDisetujuiKoperasi}>
                        Lihat Pesan
                      </p>
                      <Modal scrollable={true} show={showModalDisetujuiKoperasi} backdrop="static" keyboard={false} onHide={handleCloseModalDisetujuiKoperasi}>
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Pesan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>Oke Pak Bob. Segera kirim ya.</p>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-dots timeline-dot1 border-gray text-gray"></div>
                    <h6 className="float-left mb-1">Transaksi Dibuat</h6>
                    <small className="float-right mt-1">19 Mei 2023 07:00 WIB</small>
                    <div className="d-inline-block w-100">
                      <p className="text-primary" onClick={handleShowModalTransaksiDibuat}>
                        Lihat Info Harga
                      </p>
                      <Modal scrollable={true} show={showModalTransaksiDibuat} backdrop="static" keyboard={false} onHide={handleCloseModalTransaksiDibuat}>
                        <Modal.Header closeButton>
                          <Modal.Title as="h5">Info Harga</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>
                            Petani menawarkan TBS kepada koperasi dengan harga <span className="h6">Rp2.000/kg</span>
                          </p>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xl="8" lg="8">
          <Card>
            <Card.Header>
              <div className="card-action">
                <Button variant="primary" size="sm" onClick={() => navigate(-1)}>
                  ← Kembali
                </Button>
              </div>
            </Card.Header>

            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Nomor</h6>
                  <p>{transaksiDetail.nomor}</p>
                </div>
                <div>
                  <h6 className="mb-1">Nama Petani</h6>
                  <p>{transaksiDetail.namaPetani}</p>
                </div>
                <div>
                  <h6 className="mb-1">Nomor Telepon</h6>
                  <p>{transaksiDetail.nomorTeleponPetani}</p>
                </div>
              </div>

              <div className="table-responsive">
                <Table responsive striped id="datatable" data-toggle="data-table">
                  <thead>
                    <tr>
                      <th>Kebun</th>
                      <th className="text-end">Umur Tanam</th>
                      <th className="text-end">Kuantitas</th>
                      <th className="text-end">Harga</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transaksiDetail.transaksiItems?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <p className="text-primary" style={{ cursor: "pointer" }} onClick={() => console.log("OK")}>
                            Lihat
                          </p>
                        </td>
                        <td className="text-end">{item.umurTanam} Tahun</td>
                        <td className="text-end">{formatCurrency(item.kuantitas)} kg</td>
                        <td className="text-end">Rp{formatCurrency(item.harga)}</td>
                        <td className="text-end">Rp{formatCurrency(item.kuantitas * item.harga)}</td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr className="text-end">
                      <td colSpan="4">
                        <h6>Total Kuantitas</h6>
                      </td>
                      <td>{formatCurrency(transaksiDetail.totalKuantitas)} kg</td>
                    </tr>
                    <tr className="text-end">
                      <td colSpan="4">
                        <h6>Total Harga</h6>
                      </td>
                      <td>Rp{formatCurrency(transaksiDetail.totalHarga)}</td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            </Card.Body>
          </Card>

          {/* Konfirmasi Koperasi */}
          {user && user.role === roleConstant.koperasi && transaksiDetail.status === "Menunggu Konfirmasi Koperasi" && <FormKonfirmasi onSubmit={onSubmitKonfirmasi} schema={transaksiSchema.confirm} />}

          {/* Konfirmasi Pabrik Kelapa Sawit */}
          {user && user.role === roleConstant.pks && transaksiDetail.status === "Menunggu Konfirmasi Pabrik Kelapa Sawit" && <FormKonfirmasi onSubmit={onSubmitKonfirmasi} schema={transaksiSchema.confirm} />}

          {/* Pengiriman Petani */}
          {user && user.role === roleConstant.petani && transaksiDetail.status === "Menunggu Dikirim Petani" && <FormPengiriman onSubmit={onSubmitPengiriman} />}

          {/* Pengiriman Koperasi */}
          {user && user.role === roleConstant.koperasi && transaksiDetail.status === "Diterima Koperasi" && <FormPengiriman onSubmit={onSubmitPengiriman} />}

          {/* Penerimaan Koperasi */}
          {user && user.role === roleConstant.koperasi && transaksiDetail.status === "Dikirim Petani" && <FormPenerimaan onSubmit={onSubmitPenerimaan} />}

          {/* Penerimaan Pabrik Kelapa Sawit */}
          {user && user.role === roleConstant.pks && transaksiDetail.status === "Dikirim Koperasi" && <FormPenerimaan onSubmit={onSubmitPenerimaan} />}

          {/* Pembayaran Pabrik Kelapa Sawit */}
          {user && user.role === roleConstant.pks && transaksiDetail.status === "Diterima Pabrik Kelapa Sawit" && <FormPembayaran onSubmit={onSubmitPembayaran} />}

          {/* Pembayaran Koperasi */}
          {user && user.role === roleConstant.koperasi && transaksiDetail.status === "Dibayar Pabrik Kelapa Sawit" && <FormPembayaran onSubmit={onSubmitPembayaran} />}
        </Col>
      </Row>
    </>
  );
});

export default TransaksiDetail;
