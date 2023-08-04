import React, { memo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Form, Modal, Button, InputGroup, Table } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import { messageConstant } from "../constants";
import { transaksiSchema } from "../validations";
import { setMessage } from "../features/authSlice";
import { Card, ButtonLoading, EditIcon, DeleteIcon } from "../components/elements";
import { formatCurrency } from "../utils";
import { transaksiService } from "../services";

const TransaksiAdd = memo(() => {
  const pageTitle = "Tambah Transaksi";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTitle } = useOutletContext();
  const { idKontrak, idDeliveryOrder } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [transaksiItems, setTransaksiItems] = useState([]);
  const [totalKuantitas, setTotalKuantitas] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  const {
    control,
    handleSubmit,
    setValue,
    reset: resetForm,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(transaksiSchema.create),
    mode: "all",
    defaultValues: {
      idKebun: "",
      umurTanam: "",
      kuantitas: "",
      harga: "",
    },
  });

  const handleShowModal = (data) => {
    if (data) {
      setValue("idKebun", data.idKebun);
      setValue("umurTanam", data.umurTanam);
      setValue("kuantitas", data.kuantitas);
      setValue("harga", data.harga);
    } else {
      resetForm();
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  const handleAddItem = (data) => {
    const newItem = {
      id: new Date().getTime(),
      ...data,
    };
    setTransaksiItems([...transaksiItems, newItem]);
  };

  const handleEditItem = (id, data) => {
    const editedItem = { ...data, id };
    setTransaksiItems(transaksiItems.map((item) => (item.id === id ? editedItem : item)));
  };

  const handleDeleteItem = (id) => {
    setTransaksiItems(transaksiItems.filter((item) => item.id !== id));
  };

  const handleTambahUbah = (data) => {
    if (selectedItem) {
      handleEditItem(selectedItem.id, data);
    } else {
      handleAddItem(data);
    }

    resetForm();
    handleCloseModal();
  };

  useEffect(() => {
    if (selectedItem) {
      setValue("idKebun", selectedItem.idKebun);
      setValue("umurTanam", selectedItem.umurTanam);
      setValue("kuantitas", selectedItem.kuantitas);
      setValue("harga", selectedItem.harga);

      setShowModal(true);
    }
  }, [selectedItem, setValue]);

  useEffect(() => {
    const calculateTotals = () => {
      let totalKuantitas = 0;
      let totalHarga = 0;

      transaksiItems.map((transaksiItem) => {
        totalKuantitas += transaksiItem.kuantitas;
        totalHarga += transaksiItem.kuantitas * transaksiItem.harga;
      });

      setTotalKuantitas(totalKuantitas);
      setTotalHarga(totalHarga);
    };

    calculateTotals();
  }, [transaksiItems]);

  const handleSimpan = async () => {
    try {
      const newTransaksiItems = transaksiItems.map((item) => {
        const { id, ...rest } = item;
        return rest;
      });

      const payload = {
        idKontrak: idKontrak,
        idDeliveryOrder: idDeliveryOrder,
        data: {
          transaksiItems: newTransaksiItems,
        },
      };

      await transaksiService.create(payload);

      dispatch(setMessage(messageConstant.transaksiSuccess));
      navigate(-1, { replace: true });
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-transaksiItems-center">
          <div className="header-title">
            <h4 className="card-title">Item Transaksi</h4>
          </div>

          <div className="card-action">
            <Button variant="primary" size="sm" onClick={handleShowModal}>
              Tambah Item
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          {transaksiItems.length > 0 ? (
            <div className="table-responsive">
              <Table responsive striped id="datatable" data-toggle="data-table">
                <thead>
                  <tr>
                    <th>Kebun</th>
                    <th className="text-end">Umur Tanam</th>
                    <th className="text-end">Kuantitas</th>
                    <th className="text-end">Harga</th>
                    <th className="text-end">Subtotal</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>

                <tbody>
                  {transaksiItems?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <p className="text-primary" style={{ cursor: "pointer" }} onClick={() => console.log("OK")}>
                          Lihat
                        </p>
                      </td>
                      <td className="text-end">{item.umurTanam} Tahun</td>
                      <td className="text-end">{formatCurrency(item.kuantitas)} kg</td>
                      <td className="text-end">Rp{formatCurrency(item.harga)}</td>
                      <td className="text-end">Rp{formatCurrency(item.kuantitas * item.harga)}</td>
                      <td className="text-center">
                        <div className="flex align-transaksiItems-center list-user-action">
                          <Button variant="warning" size="sm" className="btn-icon" onClick={() => setSelectedItem(item)}>
                            <EditIcon />
                          </Button>{" "}
                          <Button variant="danger" size="sm" className="btn-icon" onClick={() => handleDeleteItem(item.id)}>
                            <DeleteIcon />
                          </Button>{" "}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="text-end">
                    <td colSpan="5">
                      <h6>Total Kuantitas</h6>
                    </td>
                    <td>{formatCurrency(totalKuantitas)} kg</td>
                  </tr>
                  <tr className="text-end">
                    <td colSpan="5">
                      <h6>Total Harga</h6>
                    </td>
                    <td>Rp{formatCurrency(totalHarga)}</td>
                  </tr>
                </tfoot>
              </Table>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted">Belum ada item transaksi</p>
            </div>
          )}
        </Card.Body>

        {transaksiItems.length > 0 && (
          <Card.Footer className="text-center">
            <Button variant="btn btn-primary" onClick={handleSimpan}>
              Simpan
            </Button>
          </Card.Footer>
        )}
      </Card>

      {/* Modal */}
      <Modal scrollable={true} show={showModal} backdrop="static" keyboard={false} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title as="h5">{selectedItem ? "Ubah" : "Tambah"} Item Transaksi</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(handleTambahUbah)}>
          <Modal.Body>
            <Form.Group className="col-sm-12 form-group" controlId="idKebun">
              <Form.Label>Kebun</Form.Label>
              <Controller
                id="idKebun"
                name="idKebun"
                control={control}
                render={({ field }) => (
                  <>
                    <Form.Control {...field} type="text" isInvalid={!!errors.idKebun} />
                    {errors.idKebun && <Form.Control.Feedback type="invalid">{errors.idKebun.message}</Form.Control.Feedback>}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group className="col-sm-12 form-group" controlId="umurTanam">
              <Form.Label>Umur Tanam</Form.Label>
              <Controller
                id="umurTanam"
                name="umurTanam"
                control={control}
                render={({ field }) => (
                  <InputGroup>
                    <Form.Control {...field} type="number" min="1" isInvalid={!!errors.umurTanam} />
                    <InputGroup.Text>Tahun</InputGroup.Text>
                    {errors.umurTanam && <Form.Control.Feedback type="invalid">{errors.umurTanam.message}</Form.Control.Feedback>}
                  </InputGroup>
                )}
              />
            </Form.Group>

            <Form.Group className="col-sm-12 form-group" controlId="kuantitas">
              <Form.Label>Kuantitas</Form.Label>
              <Controller
                id="kuantitas"
                name="kuantitas"
                control={control}
                render={({ field }) => (
                  <InputGroup>
                    <Form.Control {...field} type="number" min={1} isInvalid={!!errors.kuantitas} />
                    <InputGroup.Text>kg</InputGroup.Text>
                    {errors.kuantitas && <Form.Control.Feedback type="invalid">{errors.kuantitas.message}</Form.Control.Feedback>}
                  </InputGroup>
                )}
              />
            </Form.Group>

            <Form.Group className="col-sm-12 form-group" controlId="harga">
              <Form.Label>Harga</Form.Label>
              <Controller
                id="harga"
                name="harga"
                control={control}
                render={({ field }) => (
                  <InputGroup>
                    <InputGroup.Text>Rp</InputGroup.Text>
                    <Form.Control {...field} type="number" min={1} isInvalid={!!errors.harga} />
                    {errors.harga && <Form.Control.Feedback type="invalid">{errors.harga.message}</Form.Control.Feedback>}
                  </InputGroup>
                )}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <div className="mx-auto">
              <Button type="submit" variant="btn btn-primary" disabled={!isValid}>
                {selectedItem ? "Simpan Perubahan" : "Tambah"}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
});

export default TransaksiAdd;
