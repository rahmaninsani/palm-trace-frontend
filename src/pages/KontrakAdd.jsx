import React, { useEffect, useState, memo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Row, Form, Button, InputGroup } from "react-bootstrap";

import { Card } from "../components/elements";
import { formatCurrency } from "../utils";

import { userService, kontrakService } from "../services";

const KontrakAdd = memo(() => {
  const pageTitle = "Tambah Kontrak";
  const navigate = useNavigate();
  const { setTitle } = useOutletContext();
  const [koperasi, setKoperasi] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [formValue, setFormValue] = useState({
    idKoperasi: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    kuantitas: 0,
    harga: 0,
  });

  useEffect(() => {
    const kuantitas = formValue.kuantitas;
    const harga = formValue.harga;
    let calculatedTotalHarga = 0;

    if (kuantitas > 0 && harga > 0) {
      calculatedTotalHarga = kuantitas * harga;
    }

    setTotalHarga(calculatedTotalHarga);
  }, [formValue.kuantitas, formValue.harga]);

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

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setFormValue((prevState) => ({
      ...prevState,
      [name]: (name === "kuantitas" && value > 0) || (name === "harga" && value > 0) ? parseFloat(value) : value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await kontrakService.create(formValue);
      navigate("/pks/kontrak");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <Form onSubmit={onSubmit}>
          <Card.Body>
            <Row>
              {/* Select Mitra */}
              <Form.Group className="col-sm-12 form-group">
                <Form.Label htmlFor="idKoperasi"> Mitra</Form.Label>
                <select className="form-select mb-3 shadow-none" id="idKoperasi" name="idKoperasi" value={formValue.idKoperasi} onChange={onInputChange}>
                  <option defaultValue>Pilih Mitra</option>
                  {koperasi &&
                    koperasi.map((item) => (
                      <option value={item.idAkun} key={item.idAkun}>
                        {item.nama} - {item.alamat}
                      </option>
                    ))}
                </select>
              </Form.Group>

              {/* Tanggal Mulai */}
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="tanggalMulai">Tanggal Mulai</Form.Label>
                <Form.Control type="date" id="tanggalMulai" name="tanggalMulai" value={formValue.tanggalMulai} onChange={onInputChange} min={new Date().toISOString().split("T")[0]} />
              </Form.Group>

              {/* Tanggal Selesai */}
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="tanggalSelesai">Tanggal Selesai</Form.Label>
                <Form.Control type="date" id="tanggalSelesai" name="tanggalSelesai" value={formValue.tanggalSelesai} onChange={onInputChange} min={new Date().toISOString().split("T")[0]} />
              </Form.Group>

              {/* Kuantitas (kg) */}
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="kuantitas">Kuantitas</Form.Label>
                <InputGroup>
                  <Form.Control type="number" id="kuantitas" name="kuantitas" value={formValue.kuantitas} onChange={onInputChange} placeholder="Kuantitas" />
                  <InputGroup.Text>kg</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Harga Per kg */}
              <Form.Group className="col-md-6 form-group">
                <Form.Label htmlFor="harga">Harga Per Kilogram</Form.Label>
                <InputGroup>
                  <InputGroup.Text>Rp</InputGroup.Text>
                  <Form.Control type="number" id="harga" name="harga" value={formValue.harga} onChange={onInputChange} placeholder="Harga" />
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

export default KontrakAdd;
