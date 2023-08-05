import React from "react";
import { useSelector } from "react-redux";
import { Row, Form, Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { penerimaanSchema } from "../../validations";
import { Card, ButtonLoading } from "../elements";

const FormPenerimaan = ({ onSubmit }) => {
  const { isLoading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(penerimaanSchema.create), mode: "all" });

  return (
    <Card>
      <Card.Header className="mx-auto">
        <h5>Penerimaan</h5>
      </Card.Header>

      <hr className="hr-horizontal" />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card.Body>
          <Row>
            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="kuantitas">Total Kuantitas</Form.Label>
              <InputGroup>
                <Form.Control type="number" min="1" id="kuantitas" isInvalid={!!errors.kuantitas} {...register("kuantitas")} />
                <InputGroup.Text>kg</InputGroup.Text>
                {errors.kuantitas && <Form.Control.Feedback type="invalid">{errors.kuantitas.message}</Form.Control.Feedback>}
              </InputGroup>
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

export default FormPenerimaan;
