import React, { useEffect, memo } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";

import { Card } from "../../../components/elements";

const DeliveryOrderAdd = memo(() => {
  const pageTitle = "Tambah Delivery Order";
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
                  {/* Periode */}
                  <Form.Group className="col-sm-12 form-group">
                    <Form.Label htmlFor="periode">Periode</Form.Label>
                    <Form.Control type="month" id="periode" defaultValue="2023-05" />
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
                <Button type="submit" variant="btn btn-primary">
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

export default DeliveryOrderAdd;
