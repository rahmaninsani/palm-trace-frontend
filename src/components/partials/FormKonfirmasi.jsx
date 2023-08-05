import React from "react";
import { useSelector } from "react-redux";
import { Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { Card, ButtonLoading } from "../../components/elements";

const FormKonfirmasi = ({ onSubmit, schema }) => {
  const { isLoading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(schema), mode: "all" });

  return (
    <Card>
      <Card.Header className="mx-auto">
        <h5>Konfirmasi</h5>
      </Card.Header>

      <hr className="hr-horizontal" />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card.Body>
          <Row>
            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="status">Status</Form.Label>
              <Form.Control as="select" type="select" className="form-select mb-3 shadow-none" id="status" isInvalid={!!errors.status} {...register("status")}>
                <option defaultValue>Pilih Status</option>
                <option value={1}>Setuju</option>
                <option value={2}>Tolak</option>
              </Form.Control>
              {errors.status && <Form.Control.Feedback type="invalid">{errors.status.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="pesan">Pesan</Form.Label>
              <Form.Control as="textarea" rows={4} id="pesan" isInvalid={!!errors.pesan} {...register("pesan")} />
              {errors.pesan && <Form.Control.Feedback type="invalid">{errors.pesan.message}</Form.Control.Feedback>}
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

export default FormKonfirmasi;
