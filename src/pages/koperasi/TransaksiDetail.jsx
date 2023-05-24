import React, { useState, useEffect, memo } from "react";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import { Row, Col, Button, Modal, Form, Image, InputGroup } from "react-bootstrap";

import { Card } from "../../components/elements";
import { DetailTransaksiTable } from "../../components/partials/dashboard";

import buktiBayar1 from "../../assets/images/buktibayar1.jpg";
import buktiBayar2 from "../../assets/images/buktibayar2.jpg";

const TransaksiDetail = memo(() => {
  const pageTitle = "Detail Transaksi";
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();

  const headings = ["Alamat Kebun", "Luas Kebun", "Umur Tanam", "Kuantitas"];
  const products = [
    {
      alamat: "Jl Kebun Sawit I",
      luas: "2",
      umur: "10",
      kuantitas: "250",
    },
    {
      alamat: "Jl Kebun Sawit II",
      luas: "4",
      umur: "10",
      kuantitas: "750",
    },
  ];

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
  }, [setTitle]);

  return (
    <>
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
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">Nomor</h6>
                  <p>TRX0001</p>
                </div>
                <div>
                  <h6 className="mb-1">Nama Petani</h6>
                  <p>Bob</p>
                </div>
                <div>
                  <h6 className="mb-1">Nomor Telepon</h6>
                  <p>+628123456789</p>
                </div>
              </div>
              <DetailTransaksiTable headings={headings}>
                {products?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.alamat}</td>
                    <td>{item.luas} Ha</td>
                    <td>{item.umur} Tahun</td>
                    <td>{item.kuantitas} kg</td>
                  </tr>
                ))}
              </DetailTransaksiTable>
            </Card.Body>
          </Card>

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

          <Card>
            <Card.Header className="mx-auto">
              <h5>Pengiriman</h5>
            </Card.Header>

            <hr className="hr-horizontal" />

            <Form>
              <Card.Body>
                <Row>
                  <Form.Group className="col-md-6 form-group">
                    <Form.Label htmlFor="namaSopir">Nama Sopir</Form.Label>
                    <Form.Control type="text" id="namaSopir" />
                  </Form.Group>

                  <Form.Group className="col-md-6 form-group">
                    <Form.Label htmlFor="nomorTeleponSupir">Nomor Telepon</Form.Label>
                    <Form.Control type="text" id="nomorTeleponSupir" />
                  </Form.Group>

                  <Form.Group className="col-md-6 form-group">
                    <Form.Label htmlFor="kendaraan">Kendaraan</Form.Label>
                    <Form.Control type="text" id="kendaraan" />
                  </Form.Group>

                  <Form.Group className="col-md-6 form-group">
                    <Form.Label htmlFor="nomorPolisi">Nomor Polisi</Form.Label>
                    <Form.Control type="text" id="nomorPolisi" />
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

          <Card>
            <Card.Header className="mx-auto">
              <h5>Penerimaan</h5>
            </Card.Header>

            <hr className="hr-horizontal" />

            <Form>
              <Card.Body>
                <Row>
                  <Form.Group className="col-sm-12 form-group">
                    <Form.Label htmlFor="totalKuantitas">Total Kuantitas</Form.Label>
                    <InputGroup>
                      <Form.Control type="number" id="totalKuantitas" placeholder="Total Kuantitas" />
                      <InputGroup.Text>kg</InputGroup.Text>
                    </InputGroup>
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

          <Card>
            <Card.Header className="mx-auto">
              <h5>Pembayaran</h5>
            </Card.Header>

            <hr className="hr-horizontal" />

            <Form>
              <Card.Body>
                <Row>
                  <Col md="4">
                    <div>
                      <h6 className="mb-1">Koperasi</h6>
                      <p>KUD Sawit</p>
                    </div>
                  </Col>

                  <Col md="4">
                    <div>
                      <h6 className="mb-1">Nama Bank</h6>
                      <p>BRI</p>
                    </div>
                  </Col>

                  <Col md="4">
                    <div>
                      <h6 className="mb-1">Nomor Rekening</h6>
                      <p>00000001</p>
                    </div>
                  </Col>

                  <Form.Group className="col-sm-12 form-group">
                    <Form.Label htmlFor="jumlahBayar">Jumlah Bayar</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>Rp</InputGroup.Text>
                      <Form.Control type="number" id="jumlahBayar" placeholder="Jumlah Bayar" />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="col-sm-12 form-group">
                    <Form.Label htmlFor="buktiBayar" className="custom-file-input">
                      Bukti Pembayaran
                    </Form.Label>
                    <Form.Control type="file" id="buktiBayar" />
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
        </Col>
      </Row>
    </>
  );
});

export default TransaksiDetail;
