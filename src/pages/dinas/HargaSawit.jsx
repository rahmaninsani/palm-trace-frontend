import React, { useState, useEffect, memo } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { Card } from "../../components/elements";
import { HargaSawitTable as Table } from "../../components/partials/dashboard";
import { formatCurrency, formatTime } from "../../utils";
import { referensiHarga } from "../../services";
import { Copy } from "../../components/elements";
import { ToastContainer, toast } from "react-toastify";

const HargaSawit = memo(() => {
  const pageTitle = "Harga Sawit";
  const { setTitle } = useOutletContext();
  const [showModal, setShowModal] = useState(false);
  const [showModalRiwayat, setShowModalRiwayat] = useState(false);
  const [riwayatHarga, setRiwayatHarga] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [updateValue, setUpdateValue] = useState({ umurTanam: 0, harga: 0 });
  const [palmPrices, setPalmPrices] = useState([]);

  useEffect(() => {
    setTitle(pageTitle);
    getPalmPrices();
  }, []);

  const getPalmPrices = async () => {
    try {
      const response = await referensiHarga.getAll();
      setPalmPrices(response.data);
    } catch (error) {
      console.error("Gagal mengambil data harga sawit: ", error);
    }
  };

  useEffect(() => {
    if (showModalRiwayat) {
      getRiwayatHarga();
    }
  }, [showModalRiwayat]);

  const getRiwayatHarga = async () => {
    try {
      if (selectedId) {
        const response = await referensiHarga.getHistoryById(selectedId);
        setRiwayatHarga(response.data);
      }
    } catch (error) {
      console.error("Gagal mengambil riwayat harga sawit: ", error);
    }
  };

  const handleShowModalRiwayat = (id) => {
    setSelectedId(id);
    setShowModalRiwayat(true);
  };

  const handleCloseModalRiwayat = () => {
    setSelectedId(null);
    setShowModalRiwayat(false);
  };

  const handleCopyToClipboard = async () => {
    if (selectedTransactionId) {
      try {
        await navigator.clipboard.writeText(selectedTransactionId);
        setSelectedTransactionId(null);
        toast.success("Hash berhasil disalin!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.error("Gagal menyalin: ", error);
      }
    }
  };

  useEffect(() => {
    handleCopyToClipboard();
  }, [selectedTransactionId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "umurTanam") {
      const selectedPalmPrice = palmPrices.find((price) => price.umurTanam === parseInt(value));
      setSelectedId(selectedPalmPrice?.id || "");
    }

    setUpdateValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await referensiHarga.update(selectedId, updateValue);
      setSelectedId(null);
      setUpdateValue({ umurTanam: 0, harga: 0 });
      setShowModal(false);
      getPalmPrices();
    } catch (error) {
      console.error("Gagal melakukan pembaruan harga: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Main */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="header-title">
            <h4 className="card-title">Referensi Harga Sawit</h4>
          </div>
          <div className="card-action">
            <Button variant="primary mt-2" onClick={() => setShowModal(true)}>
              Ubah
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table headings={["Tanggal Pembaruan", "Umur Tanam", "Harga", ""]}>
            {palmPrices.map((palmPrice) => (
              <tr key={palmPrice.id}>
                <td>{formatTime(palmPrice.tanggalPembaruan)}</td>
                <td>{palmPrice.umurTanam} Tahun</td>
                <td>Rp{formatCurrency(palmPrice.harga)}</td>
                <td>
                  <Button variant="link" onClick={() => handleShowModalRiwayat(palmPrice.id)}>
                    Riwayat
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </Card.Body>
      </Card>

      {/* Modal Update */}
      <Modal scrollable={true} show={showModal} backdrop="static" keyboard={false} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title as="h5">Ubah Harga Sawit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="col-sm-12 form-group">
            <Form.Label>Umur Tanam</Form.Label>
            <select className="form-select mb-3 shadow-none" name="umurTanam" value={updateValue.umurTanam} onChange={handleInputChange}>
              <option defaultValue>Pilih Umur Tanam</option>
              {palmPrices.map((palmPrice) => (
                <option key={palmPrice.id} value={palmPrice.umurTanam}>
                  {palmPrice.umurTanam} Tahun
                </option>
              ))}
            </select>
          </Form.Group>

          <Form.Group className="col-sm-12 form-group">
            <Form.Label htmlFor="harga">Harga Per Kilogram</Form.Label>
            <InputGroup>
              <InputGroup.Text>Rp</InputGroup.Text>
              <Form.Control type="number" name="harga" value={updateValue.harga} onChange={handleInputChange} placeholder="Harga" />
            </InputGroup>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <div className="mx-auto">
            <Button variant="btn btn-primary" onClick={handleOnSubmit}>
              Simpan
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Modal Riwayat */}
      <Modal size="lg" scrollable={true} show={showModalRiwayat} backdrop="static" keyboard={false} onHide={handleCloseModalRiwayat}>
        <Modal.Header closeButton>
          <div className="ms-auto text-center">
            <Modal.Title as="h5">Riwayat Harga Sawit</Modal.Title>
            <p>Umur Tanam {riwayatHarga.length > 0 && riwayatHarga[0].umurTanam} Tahun</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          {riwayatHarga.length > 0 && (
            <Table headings={["Tanggal Pembaruan", "Harga", "Hash"]}>
              {riwayatHarga.map((riwayat) => (
                <tr key={riwayat.idTransaksiBlockchain}>
                  <td>{formatTime(riwayat.tanggalPembaruan)}</td>
                  <td>Rp{formatCurrency(riwayat.harga)}</td>
                  <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <span onClick={() => setSelectedTransactionId(riwayat.idTransaksiBlockchain)}>
                      <Copy />
                    </span>{" "}
                    {riwayat.idTransaksiBlockchain}
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
});

export default HargaSawit;
