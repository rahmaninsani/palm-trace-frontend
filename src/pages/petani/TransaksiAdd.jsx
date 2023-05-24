import React, { useEffect, memo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Row, Form, Button, InputGroup } from "react-bootstrap";

import { Card } from "../../components/elements";

const TransaksiAdd = memo(() => {
  const pageTitle = "Tambah Transaksi";
  const navigate = useNavigate();
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  const handleOnSubmit = () => {
    navigate(-1);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            {/* Kebun */}
            <Form.Group className="col-md-6 form-group">
              <Form.Label>Kebun</Form.Label>
              <select className="form-select mb-3 shadow-none">
                <option defaultValue>Pilih Kebun</option>
                <option value={1}>2 Ha - Jl Kebun Sawit I</option>
                <option value={2}>4 Ha - Jl Kebun Sawit II</option>
              </select>
            </Form.Group>

            {/* Umur Tanam */}
            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="umurTanam">Umur Tanam</Form.Label>
              <InputGroup>
                <Form.Control type="number" id="umurTanam" />
                <InputGroup.Text>Tahun</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Kuantitas (kg) */}
            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="kuantitas">Kuantitas</Form.Label>
              <InputGroup>
                <Form.Control type="number" id="kuantitas" />
                <InputGroup.Text>kg</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Harga Per kg */}
            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="harga">Harga Per Kilogram</Form.Label>
              <InputGroup>
                <InputGroup.Text>Rp</InputGroup.Text>
                <Form.Control type="number" id="harga" />
              </InputGroup>
            </Form.Group>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button variant="btn btn-primary" onClick={handleOnSubmit}>
            Simpan
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
});

export default TransaksiAdd;
