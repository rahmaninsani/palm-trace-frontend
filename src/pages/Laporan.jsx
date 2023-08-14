import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { Row, Button, Form, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { laporanSchema } from "../validations";
import { Card } from "../components/elements";
import { formatTime, formatCurrency } from "../utils";
import { transaksiService } from "../services";

const Laporan = memo(() => {
  const pageTitle = "Laporan Transaksi";
  const { setTitle } = useOutletContext();
  const { user } = useSelector((state) => state.auth);
  const [transaksi, setTransaksi] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTitle(pageTitle);
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(laporanSchema.create), mode: "all" });

  const onSubmit = async (data) => {
    try {
      const payload = {
        data: {
          periode: data.periode,
        },
      };

      const result = await transaksiService.findAllByUserLaporan(payload);
      setTransaksi(result.data);
      setShow(true);
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card.Body>
            <Row className="justify-content-center align-items-center">
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="periode">Periode</Form.Label>
                <Form.Control type="month" id="periode" isInvalid={!!errors.periode} {...register("periode")} min={currentMonth()} />
                {errors.periode && <Form.Control.Feedback type="invalid">{errors.periode.message}</Form.Control.Feedback>}
              </Form.Group>
            </Row>
          </Card.Body>

          <Card.Footer className="text-center">
            <Button type="submit" variant="btn btn-primary" disabled={!isValid}>
              Lihat
            </Button>
          </Card.Footer>
        </Form>
      </Card>

      {show && (
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <div className="header-title">
              <h4 className="card-title">{`Transaksi ${formatTime(getValues("periode"))}`}</h4>
            </div>
          </Card.Header>
          <Card.Body>
            {transaksi.length > 0 ? (
              <div className="table-responsive border-bottom my-3">
                <Table responsive striped id="datatable" data-toggle="data-table">
                  <thead>
                    <tr>
                      <th>Nomor</th>
                      <th>Tanggal Selesai</th>
                      <th>Mitra</th>
                      {user.role !== "petani" && <th>Petani</th>}
                      <th className="text-end">Total Kuantitas</th>
                      <th className="text-end">Total Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaksi?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.nomor}</td>
                        <td>{formatTime(item.updatedAt)}</td>
                        <td>{user.role === "pks" ? item.koperasi.nama : item.pks.nama}</td>
                        {user.role !== "petani" && <td>{item.petani.nama}</td>}
                        <td className="text-end">{item.totalKuantitas} kg</td>
                        <td className="text-end">Rp{user.role === "petani" ? formatCurrency(item.totalHarga) : formatCurrency(item.totalHargaDeliveryOrder)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr></tr>
                  </tfoot>
                </Table>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-muted">Tidak ada transaksi</p>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
});

export default Laporan;
