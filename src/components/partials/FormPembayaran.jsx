import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { pembayaranSchema } from "../../validations";
import { Card } from "../elements";

const FormPembayaran = ({ onSubmit, data }) => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(pembayaranSchema.create), mode: "all" });

  useEffect(() => {
    setValue("jumlahPembayaran", user.role === "pks" ? data.totalHargaDeliveryOrder : data.totalHarga);
    setValue("namaPengirim", user.role === "pks" ? data.pks.nama : data.koperasi.nama);
    setValue("namaBankPengirim", user.role === "pks" ? data.pks.namaBank : data.koperasi.namaBank);
    setValue("nomorRekeningPengirim", user.role === "pks" ? data.pks.nomorRekening : data.koperasi.nomorRekening);
    setValue("namaPenerima", user.role === "pks" ? data.koperasi.nama : data.petani.nama);
    setValue("namaBankPenerima", user.role === "pks" ? data.koperasi.namaBank : data.petani.namaBank);
    setValue("nomorRekeningPenerima", user.role === "pks" ? data.koperasi.nomorRekening : data.petani.nomorRekening);
  }, []);

  return (
    <Card>
      <Card.Header className="mx-auto">
        <h5>Pembayaran</h5>
      </Card.Header>

      <hr className="hr-horizontal" />

      <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Card.Body>
          <Row>
            <Col md="4">
              <div>
                <h6 className="mb-1">Pengirim</h6>
                <p>{getValues("namaPengirim")}</p>
              </div>
            </Col>

            <Col md="4">
              <div>
                <h6 className="mb-1">Nama Bank</h6>
                <p>{getValues("namaBankPengirim")}</p>
              </div>
            </Col>

            <Col md="4">
              <div>
                <h6 className="mb-1">Nomor Rekening</h6>
                <p>{getValues("nomorRekeningPengirim")}</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="4">
              <div>
                <h6 className="mb-1">Penerima</h6>
                <p>{getValues("namaPenerima")}</p>
              </div>
            </Col>

            <Col md="4">
              <div>
                <h6 className="mb-1">Nama Bank</h6>
                <p>{getValues("namaBankPenerima")}</p>
              </div>
            </Col>

            <Col md="4">
              <div>
                <h6 className="mb-1">Nomor Rekening</h6>
                <p>{getValues("nomorRekeningPenerima")}</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="jumlahPembayaran">Jumlah Pembayaran</Form.Label>
              <InputGroup>
                <InputGroup.Text>Rp</InputGroup.Text>
                <Form.Control type="number" id="jumlahPembayaran" name="jumlahPembayaran" isInvalid={!!errors.jumlahPembayaran} {...register("jumlahPembayaran")} readOnly disabled />
                {errors.jumlahPembayaran && <Form.Control.Feedback type="invalid">{errors.jumlahPembayaran.message}</Form.Control.Feedback>}
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="buktiPembayaran" className="custom-file-input">
                Bukti Pembayaran
              </Form.Label>
              <Form.Control type="file" id="buktiPembayaran" name="buktiPembayaran" isInvalid={!!errors.buktiPembayaran} {...register("buktiPembayaran")} />
              {errors.buktiPembayaran && <Form.Control.Feedback type="invalid">{errors.buktiPembayaran.message}</Form.Control.Feedback>}
            </Form.Group>
          </Row>
        </Card.Body>

        <Card.Footer className="text-center">
          <Button type="submit" variant="btn btn-primary" disabled={!isValid}>
            Simpan
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default FormPembayaran;
