import React, { useEffect, memo } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Row, Button, Form } from "react-bootstrap";

import { Card } from "../components/elements";

const Laporan = memo(() => {
  const pageTitle = "Laporan Transaksi";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  return (
    <>
      <Card>
        <Card.Body>
          <Row className="justify-content-center align-items-center">
            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="periode">Periode</Form.Label>
              <Form.Control type="month" id="periode" defaultValue="2023-06" />
            </Form.Group>
          </Row>
        </Card.Body>

        <Card.Footer className="text-center">
          <Button variant="btn btn-primary">Lihat</Button>
        </Card.Footer>
      </Card>
    </>
  );
});

export default Laporan;
