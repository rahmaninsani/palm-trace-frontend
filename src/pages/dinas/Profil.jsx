import React, { useState, useEffect, memo } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";

import { Card } from "../../components/elements";

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
            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="namaLengkap">Nama</Form.Label>
              <Form.Control type="text" id="namaLengkap" />
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
