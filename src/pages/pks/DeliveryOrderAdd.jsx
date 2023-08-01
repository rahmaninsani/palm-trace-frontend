import React, { useEffect, useState, memo } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Row, Form, Button, InputGroup } from "react-bootstrap";

import { Card } from "../../components/elements";
import { formatCurrency } from "../../utils";

import { deliveryOrderService } from "../../services";

const DeliveryOrderAdd = memo(() => {
  const pageTitle = "Tambah Delivery Order";
  const navigate = useNavigate();
  const { idKontrak } = useParams();
  const { setTitle } = useOutletContext();
  const [totalHarga, setTotalHarga] = useState(0);
  const [formValue, setFormValue] = useState({
    periode: "",
    kuantitas: 0,
    harga: 0,
    rendemen: 0,
  });

  useEffect(() => {
    setTitle(pageTitle);
  }, []);

  useEffect(() => {
    const kuantitas = formValue.kuantitas;
    const harga = formValue.harga;
    let calculatedTotalHarga = 0;

    if (kuantitas > 0 && harga > 0) {
      calculatedTotalHarga = kuantitas * harga;
    }

    setTotalHarga(calculatedTotalHarga);
  }, [formValue.kuantitas, formValue.harga]);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: (name === "kuantitas" && value > 0) || (name === "harga" && value > 0) || (name === "rendemen" && value > 0) ? parseFloat(value) : value,
    }));

    console.log(formValue);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await deliveryOrderService.create({
        idKontrak,
        formValue,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const currentMonth = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const defaultDate = `${currentYear}-${currentMonth}`;

    return defaultDate;
  };

  return (
    <>
      <Card>
        <Form onSubmit={onSubmit}>
          <Card.Body>
            <Row>
              {/* Periode */}
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="periode">Periode</Form.Label>
                <Form.Control type="month" id="periode" name="periode" value={formValue.periode} onChange={onInputChange} min={currentMonth()} />
              </Form.Group>

              {/* Rendemen */}
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="rendemen">Rendemen</Form.Label>
                <InputGroup>
                  <Form.Control type="number" id="rendemen" name="rendemen" value={formValue.rendemen} onChange={onInputChange} />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Kuantitas (kg) */}
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="kuantitas">Kuantitas</Form.Label>
                <InputGroup>
                  <Form.Control type="number" id="kuantitas" name="kuantitas" value={formValue.kuantitas} onChange={onInputChange} />
                  <InputGroup.Text>kg</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Harga Per kg */}
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="harga">Harga Per Kilogram</Form.Label>
                <InputGroup>
                  <InputGroup.Text>Rp</InputGroup.Text>
                  <Form.Control type="number" id="harga" name="harga" value={formValue.harga} onChange={onInputChange} />
                </InputGroup>
              </Form.Group>

              {/* Total Harga */}
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="totalHarga">Total Harga</Form.Label>
                <InputGroup>
                  <InputGroup.Text>Rp</InputGroup.Text>
                  <Form.Control type="text" id="totalHarga" name="totalHarga" value={formatCurrency(totalHarga)} disabled />
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
    </>
  );
});

export default DeliveryOrderAdd;
