import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Row, Form, Button, InputGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { endpointConstant, messageConstant } from "../constants";
import { kontrakSchema } from "../validations";
import { setMessage } from "../features/authSlice";
import { Card, ButtonLoading } from "../components/elements";
import { formatCurrency } from "../utils";
import { userService, kontrakService } from "../services";

const KontrakAdd = memo(() => {
  const pageTitle = "Tambah Kontrak";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { setTitle } = useOutletContext();
  const [koperasi, setKoperasi] = useState([]);
  const [selectedKoperasi, setSelectedKoperasi] = useState("");

  useEffect(() => {
    setTitle(pageTitle);
    findAllKoperasi();
  }, []);

  const findAllKoperasi = async () => {
    try {
      const response = await userService.findAll({ userType: "koperasi" });
      setKoperasi(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(kontrakSchema.create), mode: "all" });

  const onSubmit = async (data) => {
    try {
      const payload = {
        idKoperasi: data.idKoperasi,
        tanggalMulai: data.tanggalMulai,
        tanggalSelesai: data.tanggalSelesai,
        harga: data.harga,
        kuantitas: data.kuantitas,
      };

      await kontrakService.create(payload);

      dispatch(setMessage(messageConstant.kontrakSuccess));
      navigate(endpointConstant.kontrak, { replace: true });
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card.Body>
          <Row>
            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="idKoperasi">Mitra</Form.Label>
              <Controller
                name="idKoperasi"
                control={control}
                render={({ field }) => (
                  <Typeahead
                    {...field}
                    id="idKoperasi"
                    options={koperasi.map((item) => ({
                      id: item.idAkun,
                      label: `${item.nama} - ${item.alamat}`,
                    }))}
                    labelKey="label"
                    selected={selectedKoperasi ? [selectedKoperasi] : []}
                    onChange={(selected) => {
                      setSelectedKoperasi(selected[0]);
                      field.onChange(selected[0] ? selected[0].id : "");
                    }}
                    placeholder="Pilih mitra..."
                    allowNew={false}
                  />
                )}
              />
              {errors.idKoperasi && <Form.Control.Feedback type="invalid">{errors.idKoperasi.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="tanggalMulai">Tanggal Mulai</Form.Label>
              <Form.Control type="date" id="tanggalMulai" isInvalid={!!errors.tanggalMulai} {...register("tanggalMulai")} min={new Date().toISOString().split("T")[0]} />
              {errors.tanggalMulai && <Form.Control.Feedback type="invalid">{errors.tanggalMulai.message}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="tanggalSelesai">Tanggal Selesai</Form.Label>
              <Form.Control type="date" id="tanggalSelesai" isInvalid={!!errors.tanggalSelesai} {...register("tanggalSelesai")} min={new Date().toISOString().split("T")[0]} />
              {errors.tanggalSelesai && <Form.Control.Feedback type="invalid">{errors.tanggalSelesai.message}</Form.Control.Feedback>}
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

export default KontrakAdd;
