import React from "react";
import { useSelector } from "react-redux";
import { Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { pengirimanSchema } from "../../validations";
import { Card, ButtonLoading } from "../elements";

const FormPengiriman = ({ onSubmit }) => {
  const { isLoading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(pengirimanSchema.create), mode: "all" });

  return (
    <Card>
      <Card.Header className="mx-auto">
        <h5>Pengiriman</h5>
      </Card.Header>

      <hr className="hr-horizontal" />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card.Body>
          <Row>
            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="namaSopir">Nama Sopir</Form.Label>
              <Form.Control id="namaSopir" isInvalid={!!errors.namaSopir} {...register("namaSopir")} />
              {errors.namaSopir && <Form.Control.Feedback type="invalid">{errors.namaSopir.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="nomorTeleponSopir">Nomor Telepon Sopir</Form.Label>
              <Form.Control id="nomorTeleponSopir" isInvalid={!!errors.nomorTeleponSopir} {...register("nomorTeleponSopir")} />
              {errors.nomorTeleponSopir && <Form.Control.Feedback type="invalid">{errors.nomorTeleponSopir.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="namaKendaraan">Nama Kendaraan</Form.Label>
              <Form.Control id="namaKendaraan" isInvalid={!!errors.namaKendaraan} {...register("namaKendaraan")} />
              {errors.namaKendaraan && <Form.Control.Feedback type="invalid">{errors.namaKendaraan.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="nomorPolisiKendaraan">Nomor Polisi Kendaraan</Form.Label>
              <Form.Control id="nomorPolisiKendaraan" isInvalid={!!errors.nomorPolisiKendaraan} {...register("nomorPolisiKendaraan")} />
              {errors.nomorPolisiKendaraan && <Form.Control.Feedback type="invalid">{errors.nomorPolisiKendaraan.message}</Form.Control.Feedback>}
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

export default FormPengiriman;
