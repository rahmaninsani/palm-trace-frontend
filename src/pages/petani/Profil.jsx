import React, { useState, useEffect, memo } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Row, Col, Button, Form, Modal, InputGroup } from "react-bootstrap";

import { Card } from "../../components/elements";
import { TableKebun } from "../../components/partials/dashboard";

const Profil = memo(() => {
  const pageTitle = "Profil";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleOnSimpan = () => {
    handleCloseModal();
  };

  const handleOnSubmit = () => {
    navigate(-1);
  };

  const headings = ["Alamat Kebun", "Luas Kebun", "Umur Tanam", "Aksi"];

  return (
    <>
      {/* Biodata */}
      <Card>
        <Card.Header>
          <div className="header-title">
            <h4 className="card-title">Biodata</h4>
          </div>
        </Card.Header>

        <Card.Body>
          <Row>
            {/* Nama Lengkap */}
            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="namaLengkap">Nama Lengkap</Form.Label>
              <Form.Control type="text" id="namaLengkap" />
            </Form.Group>

            {/* NIK */}
            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="nik">NIK</Form.Label>
              <Form.Control type="text" id="nik" />
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="alamat">Alamat</Form.Label>
              <Form.Control type="text" id="alamat" />
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="nomorTelepon">Nomor Telepon</Form.Label>
              <Form.Control type="text" id="nomorTelepon" />
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="nomorRekening">Nomor Rekening</Form.Label>
              <Form.Control type="text" id="nomorRekening" />
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label>Nama Bank</Form.Label>
              <select className="form-select mb-3 shadow-none">
                <option defaultValue>Pilih Bank</option>
                <option value={1}>Bank BRI</option>
                <option value={2}>Bank BNI</option>
                <option value={3}>Bank Mandiri</option>
                <option value={4}>Bank BCA</option>
              </select>
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" />
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" />
            </Form.Group>
          </Row>
        </Card.Body>

        <Card.Footer>
          <Button variant="btn btn-primary" onClick={handleOnSubmit}>
            Simpan
          </Button>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Header>
          <div className="header-title">
            <h4 className="card-title">Kebun</h4>
          </div>
          <div className="card-action">
            <Button variant="primary mt-2" onClick={handleShowModal}>
              Tambah
            </Button>
            <Modal scrollable={true} show={showModal} backdrop="static" keyboard={false} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title as="h5">Tambah Kebun</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="luasKebun">Luas Kebun</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" id="luasKebun" />
                    <InputGroup.Text>Ha</InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="umurTanam">Umur Tanam</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" id="umurTanam" />
                    <InputGroup.Text>Tahun</InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="alamatKebun">Alamat Kebun</Form.Label>
                  <Form.Control as="textarea" rows={4} id="alamatKebun" />
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <div className="mx-auto">
                  <Button variant="btn btn-primary" onClick={handleOnSimpan}>
                    Simpan
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        </Card.Header>

        <Card.Body>
          <TableKebun headings={headings}>
            <tr>
              <td>Jl Sawit I</td>
              <td>4 Ha</td>
              <td>2 Tahun</td>
              <td>
                <Button variant="link" onClick={handleShowModal}>
                  Ubah
                </Button>
              </td>
            </tr>
            <tr>
              <td>Jl Sawit II</td>
              <td>2 Ha</td>
              <td>10 Tahun</td>
              <td>
                <Button variant="link" onClick={handleShowModal}>
                  Ubah
                </Button>
              </td>
            </tr>
          </TableKebun>
        </Card.Body>

        <Card.Footer></Card.Footer>
      </Card>
    </>
  );
});

export default Profil;
