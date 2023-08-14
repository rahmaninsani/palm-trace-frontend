import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Row, Form, Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { endpointConstant, messageConstant } from "../constants";
import { deliveryOrderSchema } from "../validations";
import { setMessage } from "../features/authSlice";
import { Card, ButtonLoading } from "../components/elements";
import { formatCurrency } from "../utils";
import { deliveryOrderService } from "../services";

const DeliveryOrderAdd = memo(() => {
  const pageTitle = "Tambah Delivery Order";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { setTitle } = useOutletContext();
  const { idKontrak } = useParams();

  useEffect(() => {
    setTitle(pageTitle);
  }, []);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(deliveryOrderSchema.create), mode: "all" });

  const onSubmit = async (data) => {
    try {
      const payload = {
        idKontrak: idKontrak,
        data: {
          periode: data.periode,
          kuantitas: data.kuantitas,
          harga: data.harga,
          rendemen: data.rendemen,
        },
      };

      await deliveryOrderService.create(payload);

      dispatch(setMessage(messageConstant.deliveryOrderSuccess));
      navigate(`${endpointConstant.kontrak}/${idKontrak}`, { replace: true });
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
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
    <Card>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card.Body>
          <Row>
            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="periode">Periode</Form.Label>
              <Form.Control type="month" id="periode" isInvalid={!!errors.periode} {...register("periode")} min={currentMonth()} />
              {errors.periode && <Form.Control.Feedback type="invalid">{errors.periode.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="rendemen">Rendemen</Form.Label>
              <InputGroup>
                <Form.Control type="number" min="1" max="100" id="rendemen" isInvalid={!!errors.rendemen} {...register("rendemen")} />
                <InputGroup.Text>%</InputGroup.Text>
                {errors.rendemen && <Form.Control.Feedback type="invalid">{errors.rendemen.message}</Form.Control.Feedback>}
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="kuantitas">Kuantitas</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  min="1"
                  id="kuantitas"
                  isInvalid={!!errors.kuantitas}
                  {...register("kuantitas", {
                    onChange: (event) => {
                      const [harga] = getValues(["harga"]);
                      if (event.target.value > 0 && harga > 0) {
                        const totalHarga = parseFloat(event.target.value) * parseFloat(harga);
                        setValue("totalHarga", formatCurrency(totalHarga));
                      }
                    },
                  })}
                />
                <InputGroup.Text>kg</InputGroup.Text>
                {errors.kuantitas && <Form.Control.Feedback type="invalid">{errors.kuantitas.message}</Form.Control.Feedback>}
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="harga">Harga Per Kilogram</Form.Label>
              <InputGroup>
                <InputGroup.Text>Rp</InputGroup.Text>
                <Form.Control
                  type="number"
                  min="1"
                  id="harga"
                  isInvalid={!!errors.harga}
                  {...register("harga", {
                    onChange: (event) => {
                      const [kuantitas] = getValues(["kuantitas"]);
                      if (event.target.value > 0 && kuantitas > 0) {
                        const totalHarga = parseFloat(event.target.value) * parseFloat(kuantitas);
                        setValue("totalHarga", formatCurrency(totalHarga));
                      }
                    },
                  })}
                />
                {errors.harga && <Form.Control.Feedback type="invalid">{errors.harga.message}</Form.Control.Feedback>}
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="totalHarga">Total Harga</Form.Label>
              <InputGroup>
                <InputGroup.Text>Rp</InputGroup.Text>
                <Form.Control type="text" id="totalHarga" {...register("totalHarga")} disabled />
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
});

export default DeliveryOrderAdd;
