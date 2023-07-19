import React, { memo, useEffect, useState } from "react";
import { useOutletContext, useLocation, Link } from "react-router-dom";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

import { Card } from "../../components/elements";
import { HargaSawitTable as Table } from "../../components/partials/dashboard";

import { formatCurrency, formatTime } from "../../utils";
import { ReferensiHarga } from "../../services";

const HargaSawit = memo(() => {
  const pageTitle = "Harga Sawit";
  const { setTitle } = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showModalRiwayat, setShowModalRiwayat] = useState(false);

  const [riwayatHarga, setRiwayatHarga] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  const headings = ["Tanggal Pembaruan", "Umur Tanam", "Harga", ""];
  const handleOnSubmit = () => {
    handleCloseModal();
  };

  const [palmPrices, sePalmPrices] = useState([]);
  useEffect(() => {
    getPalmPrices();
  }, []);

  const getPalmPrices = async () => {
    const palmPrices = await ReferensiHarga.getAll();
    sePalmPrices(palmPrices.data.data);
  };

  useEffect(() => {
    if (showModalRiwayat) {
      getRiwayatHarga();
    }
  }, [showModalRiwayat]);

  const getRiwayatHarga = async () => {
    if (selectedId) {
      const palmPriceHistory = await ReferensiHarga.getHistoryById(selectedId);
      setRiwayatHarga(palmPriceHistory.data.data);
    }
  };

  const handleShowModalRiwayat = (id) => {
    setSelectedId(id);
    setShowModalRiwayat(true);
  };

  const handleCloseModalRiwayat = (id) => {
    setSelectedId(null);
    setShowModalRiwayat(false);
  };

  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const handleCopyToClipboard = async () => {
    if (selectedTransactionId) {
      try {
        await navigator.clipboard.writeText(selectedTransactionId);
        alert("Berhasil menyalin ID Transaksi Blockchain!");
      } catch (error) {
        console.error("Gagal menyalin: ", error);
      }
    }
  };

  useEffect(() => {
    handleCopyToClipboard();
  }, [selectedTransactionId]);

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="header-title">
            <h4 className="card-title">Referensi Harga Sawit</h4>
          </div>
          <div className="card-action">
            <Button variant="primary mt-2" onClick={handleShowModal}>
              Ubah
            </Button>
            <Modal scrollable={true} show={showModal} backdrop="static" keyboard={false} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title as="h5">Ubah Harga Sawit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="col-sm-12 form-group">
                  <Form.Label>Umur Tanam</Form.Label>
                  <select className="form-select mb-3 shadow-none">
                    <option defaultValue>Pilih Umur Tanam</option>
                    {palmPrices?.map((palmPrice) => (
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
                    <Form.Control type="number" id="harga" placeholder="Harga" />
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
          </div>
        </Card.Header>
        <Card.Body>
          <Table headings={headings}>
            {palmPrices?.map((palmPrice) => (
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
          <Modal size="lg" scrollable={true} show={showModalRiwayat} backdrop="static" keyboard={false} onHide={handleCloseModalRiwayat}>
            <Modal.Header closeButton>
              <Modal.Title as="h5">Riwayat Harga Sawit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {riwayatHarga.length > 0 && (
                <Table headings={["Tanggal Pembaruan", "Umur Tanam", "Harga", ""]}>
                  {riwayatHarga?.map((riwayat) => (
                    <tr key={riwayat.idTransaksiBlockchain}>
                      <td>{formatTime(riwayat.tanggalPembaruan)}</td>
                      <td>{riwayat.umurTanam} Tahun</td>
                      <td>Rp{formatCurrency(riwayat.harga)}</td>
                      <td>
                        <Button size="sm" variant="primary mt-2" onClick={() => setSelectedTransactionId(riwayat.idTransaksiBlockchain)}>
                          Salin ID Transaksi
                        </Button>
                      </td>
                    </tr>
                  ))}
                </Table>
              )}
            </Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
});

export default HargaSawit;
