import React, { useEffect, memo } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";

//flatpicker
import Flatpickr from "react-flatpickr";
import "../../../../assets/css/flatpickr.min.css";
import rangePlugin from "../../../../utils/rangePlugin";

import { Card } from "../../../../components/elements";

const PenawaranKeluarAddKontrak = memo(() => {
  const pageTitle = "Tambah Kontrak";
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  return (
    <>
      <Row>
        <Col>
          <Card>
            <form>
              <Card.Body>
                <Row>
                  {/* Select Supplier */}
                  <Form.Group className="col-sm-12 form-group">
                    <Form.Label>Supplier</Form.Label>
                    <select className="form-select mb-3 shadow-none">
                      <option defaultValue>Pilih Supplier</option>
                      <option value={1}>Koperasi Kalimantan Selatan</option>
                      <option value={2}>Koperasi Jambi</option>
                      <option value={3}>Koperasi Riau</option>
                      <option value={4}>Koperasi Nusantara</option>
                    </select>
                  </Form.Group>

                  {/* Tanggal Mulai */}
                  <Form.Group className="col-md-6 form-group">
                    <Form.Label htmlFor="tanggalMulai">Tanggal Mulai</Form.Label>
                    <Flatpickr
                      id="tanggalMulai"
                      className="form-control range_flatpicker"
                      placeholder="Tanggal Mulai"
                      options={{
                        mode: "range",
                        minDate: "today",
                        plugins: [new rangePlugin({ input: "#tanggalBerakhir" })],
                        dateFormat: "d-m-Y",
                      }}
                    />
                  </Form.Group>

                  {/* Tanggal Berakhir */}
                  <Form.Group className="col-md-6 form-group">
                    <Form.Label htmlFor="tanggalBerakhir">Tanggal Berakhir</Form.Label>
                    <Form.Control type="text" id="tanggalBerakhir" placeholder="Tanggal Berakhir" />
                  </Form.Group>

                  {/* Kuantitas (kg) */}
                  <Form.Group className="col-md-6 form-group">
                    <Form.Label htmlFor="kuantitas">Kuantitas</Form.Label>
                    <InputGroup>
                      <Form.Control type="number" id="kuantitas" placeholder="Kuantitas" />
                      <InputGroup.Text>kg</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  {/* Harga Per kg */}
                  <Form.Group className="col-md-6 form-group">
                    <Form.Label htmlFor="harga">Harga Per Kilogram</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>Rp</InputGroup.Text>
                      <Form.Control type="number" id="harga" placeholder="Harga" />
                    </InputGroup>
                  </Form.Group>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button type="submit" href={"/pks/penawaran-keluar"} variant="btn btn-primary">
                  Simpan
                </Button>
              </Card.Footer>
            </form>
          </Card>
        </Col>
      </Row>
    </>
  );
});

export default PenawaranKeluarAddKontrak;
