import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { pembayaranSchema } from "../../validations";
import { Card, ButtonLoading } from "../elements";

const FormPembayaran = ({ onSubmit, penerima }) => {
  const { isLoading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(pembayaranSchema.create), mode: "all" });

  return (
    <Card>
      <Card.Header className="mx-auto">
        <h5>Pembayaran</h5>
      </Card.Header>

      <hr className="hr-horizontal" />

      <Form onSubmit={handleSubmit(onSubmit)}>
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
          </Row>

          <Row>
            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="jumlahBayar">Jumlah Bayar</Form.Label>
              <InputGroup>
                <InputGroup.Text>Rp</InputGroup.Text>
                <Form.Control type="number" min="1" id="jumlahBayar" isInvalid={!!errors.jumlahBayar} {...register("jumlahBayar")} />
                {errors.jumlahBayar && <Form.Control.Feedback type="invalid">{errors.jumlahBayar.message}</Form.Control.Feedback>}
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="buktiBayar" className="custom-file-input">
                Bukti Pembayaran
              </Form.Label>
              <Form.Control type="file" id="buktiBayar" isInvalid={!!errors.buktiBayar} {...register("buktiBayar")} />
              {errors.buktiBayar && <Form.Control.Feedback type="invalid">{errors.buktiBayar.message}</Form.Control.Feedback>}
            </Form.Group>
          </Row>
        </Card.Body>

        <Card.Footer className="text-center">
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" variant="btn btn-primary" disabled={!isValid}>
              Simpan
            </Button>
          )}
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default FormPembayaran;
