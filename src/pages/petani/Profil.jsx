import React, { useState, useEffect, memo } from "react";
import { useOutletContext } from "react-router-dom";
import { Row, Button, Form, Modal, InputGroup } from "react-bootstrap";
import { Card } from "../../components/elements";
import { TableKebun } from "../../components/partials/dashboard";
import { UserService } from "../../services";
import { formatTime } from "../../utils";

const Profil = memo(() => {
  const pageTitle = "Profil";
  const { setTitle } = useOutletContext();
  const [kebun, setKebun] = useState([]);

  const [showModalAddKebun, setShowModalAddKebun] = useState(false);
  const [addKebunValue, setAddKebunValue] = useState({
    alamat: "",
    latitude: "",
    longitude: "",
    luas: 0,
    nomorRspo: "",
    sertifikatRspo: "",
  });

  useEffect(() => {
    setTitle(pageTitle);
    findAllKebun();
  }, []);

  const findAllKebun = async () => {
    try {
      const response = await UserService.kebunFindAll();

      if (!response.data.data) return setKebun([]);

      setKebun(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data kebun: ", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setAddKebunValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnAddKebun = async (e) => {
    e.preventDefault();
    try {
      await UserService.kebunCreate(addKebunValue);
      setAddKebunValue({
        alamat: "",
        latitude: "",
        longitude: "",
        luas: 0,
        nomorRspo: "",
        sertifikatRspo: "",
      });
      setShowModalAddKebun(false);
      findAllKebun();
    } catch (error) {
      console.error("Gagal menambahkan kebun: ", error);
    }
  };

  const headings = ["Alamat", "Luas", "Nomor RSPO", ""];

  return (
    <>
      {/* Biodata */}
      <Card>
        <Card.Header>
          <div className="header-title">
            <h4 className="card-title">Biodata</h4>
          </div>
        </Card.Header>

        <Card.Body>
          <Row>
            {/* Nama Lengkap */}
            <Form.Group className="col-md-6 form-group">
              <Form.Label htmlFor="namaLengkap">Nama Lengkap</Form.Label>
              <Form.Control type="text" id="namaLengkap" />
            </Form.Group>

            {/* NIK */}
            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="nik">NIK</Form.Label>
              <Form.Control type="text" id="nik" />
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="alamat">Alamat</Form.Label>
              <Form.Control type="text" id="alamat" />
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="nomorTelepon">Nomor Telepon</Form.Label>
              <Form.Control type="text" id="nomorTelepon" />
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="nomorRekening">Nomor Rekening</Form.Label>
              <Form.Control type="text" id="nomorRekening" />
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label>Nama Bank</Form.Label>
              <select className="form-select mb-3 shadow-none">
                <option defaultValue>Pilih Bank</option>
                <option value={1}>Bank BRI</option>
                <option value={2}>Bank BNI</option>
                <option value={3}>Bank Mandiri</option>
                <option value={4}>Bank BCA</option>
              </select>
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" />
            </Form.Group>

            <Form.Group className="col-sm-6 form-group">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" />
            </Form.Group>

            {/* Koperasi */}
            <Form.Group className="col-sm-12 form-group">
              <Form.Label htmlFor="keanggotaanKoperasi">Keanggotaan Koperasi</Form.Label>
              <Form.Control type="text" id="keanggotaanKoperasi" value="Koperasi I" disabled />
            </Form.Group>
          </Row>
        </Card.Body>

        <Card.Footer>
          <Button variant="btn btn-primary">Simpan</Button>
        </Card.Footer>
      </Card>

      {/* Kebun */}
      <Card>
        <Card.Header>
          <div className="header-title">
            <h4 className="card-title">Kebun</h4>
          </div>
          <div className="card-action">
            <Button variant="primary mt-2" onClick={() => setShowModalAddKebun(true)}>
              Tambah
            </Button>
            <Modal scrollable={true} show={showModalAddKebun} backdrop="static" keyboard={false} onHide={() => setShowModalAddKebun(false)}>
              <Modal.Header closeButton>
                <Modal.Title as="h5">Tambah Kebun</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="luas">Luas</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" id="luas" name="luas" value={addKebunValue.luas} onChange={handleInputChange} />
                    <InputGroup.Text>Ha</InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="alamatKebun">Alamat</Form.Label>
                  <Form.Control as="textarea" rows={4} name="alamat" value={addKebunValue.alamat} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="latitude">Latitude</Form.Label>
                  <Form.Control type="text" id="latitude" name="latitude" value={addKebunValue.latitude} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="longitude">Longitude</Form.Label>
                  <Form.Control type="text" id="longitude" name="longitude" value={addKebunValue.longitude} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="nomorRspo">Nomor RSPO</Form.Label>
                  <Form.Control type="text" id="nomorRspo" name="nomorRspo" value={addKebunValue.nomorRspo} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="sertifikatRspo">Sertifikat RSPO</Form.Label>
                  <Form.Control type="text" id="sertifikatRspo" name="sertifikatRspo" value={addKebunValue.sertifikatRspo} onChange={handleInputChange} />
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <div className="mx-auto">
                  <Button variant="btn btn-primary" onClick={handleOnAddKebun}>
                    Simpan
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        </Card.Header>

        <Card.Body>
          <TableKebun headings={headings}>
            {kebun.map((item) => (
              <tr key={item.id}>
                <td>{item.alamat}</td>
                <td>{item.luas} Ha</td>
                <td>{item.nomorRspo}</td>
                <td>
                  <Button variant="link">Detail</Button>
                </td>
              </tr>
            ))}
          </TableKebun>
        </Card.Body>
      </Card>
    </>
  );
});

export default Profil;
