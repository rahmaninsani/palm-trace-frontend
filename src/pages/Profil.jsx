import React, { useEffect, memo } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Row, Button, Form } from "react-bootstrap";

import { Card } from "../components/elements";

const Profil = memo(() => {
  const pageTitle = "Profil";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  const handleOnSubmit = () => {
    navigate(-1);
  };

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
              <Form.Label htmlFor="namaLengkap">Nama Usaha</Form.Label>
              <Form.Control type="text" id="namaLengkap" />
            </Form.Group>

            {/* NIK */}
            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="SIUP">SIUP</Form.Label>
              <Form.Control type="text" id="siup" />
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
    </>
  );
});

export default Profil;
