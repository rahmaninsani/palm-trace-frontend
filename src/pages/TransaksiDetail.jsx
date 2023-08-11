import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Row, Col, Button, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { roleConstant, messageConstant } from "../constants";
import { setMessage } from "../features/authSlice";
import { transaksiSchema } from "../validations";
import { Card } from "../components/elements";
import { TransaksiTimeline, FormKonfirmasi, FormPengiriman, FormPenerimaan, FormPembayaran, KebunDetailModal } from "../components/partials";
import { formatCurrency } from "../utils";
import { transaksiService, pengirimanService, penerimaanService, pembayaranService } from "../services";

const TransaksiDetail = memo(() => {
  const pageTitle = "Detail Transaksi";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.auth);
  const { setTitle } = useOutletContext();
  const { idKontrak, idDeliveryOrder, idTransaksi } = useParams();
  const [transaksiDetail, setTransaksiDetail] = useState({});
  const [showModalKebunDetail, setShowModalKebunDetail] = useState(false);
  const [selectedKebunId, setSelectedKebunId] = useState(null);

  useEffect(() => {
    setTitle(pageTitle);
    findOneTransaksi();
  }, []);

  const findOneTransaksi = async () => {
    try {
      const response = await transaksiService.findOne({ idKontrak, idDeliveryOrder, idTransaksi });
      setTransaksiDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModalKebunDetail = (id) => {
    setSelectedKebunId(id);
    setShowModalKebunDetail(true);
  };

  const handleCloseModalKebunDetail = () => {
    setSelectedKebunId(null);
    setShowModalKebunDetail(false);
  };

  const onSubmitKonfirmasi = async (data) => {
    try {
      const payload = {
        idKontrak,
        idDeliveryOrder,
        idTransaksi,
        data,
      };

      await transaksiService.confirm(payload);

      dispatch(setMessage(messageConstant.transaksiConfirm));
      findOneTransaksi();
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  const onSubmitPengiriman = async (data) => {
    try {
      const payload = {
        idKontrak,
        idDeliveryOrder,
        idTransaksi,
        data,
      };

      await pengirimanService.create(payload);

      dispatch(setMessage(messageConstant.pengirimanSuccess));
      findOneTransaksi();
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  const onSubmitPenerimaan = async (data) => {
    try {
      const payload = {
        idKontrak,
        idDeliveryOrder,
        idTransaksi,
        data,
      };

      await penerimaanService.create(payload);

      dispatch(setMessage(messageConstant.penerimaanSuccess));
      findOneTransaksi();
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  const onSubmitPembayaran = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key] instanceof FileList) {
            formData.append(key, data[key][0]);
          } else {
            formData.append(key, data[key]);
          }
        }
      }

      const payload = {
        idKontrak,
        idDeliveryOrder,
        idTransaksi,
        data: formData,
      };
      await pembayaranService.create(payload);

      dispatch(setMessage(messageConstant.pembayaranSuccess));
      findOneTransaksi();
    } catch (error) {
      dispatch(setMessage(error.response.data.message));
    }
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        toastId: "error",
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => dispatch(setMessage("")),
      });
    }

    if (!isError && message) {
      toast.success(message, {
        toastId: "success",
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => dispatch(setMessage("")),
      });
    }
  }, [isError, message]);

  return (
    <>
      <ToastContainer />

      <Row>
        <Col xl="4" lg="4">
          <TransaksiTimeline data={transaksiDetail} />
        </Col>

        <Col xl="8" lg="8">
          <Card>
            <Card.Header>
              <div className="card-action">
                <Button variant="primary" size="sm" onClick={() => navigate(-1)}>
                  ← Kembali
                </Button>
              </div>
            </Card.Header>

            <Card.Body>
              {transaksiDetail && (
                <>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Nomor</h6>
                      <p>{transaksiDetail.nomor}</p>
                    </div>
                    <div>
                      <h6 className="mb-1">Nama Petani</h6>
                      <p>{transaksiDetail.petani?.nama}</p>
                    </div>
                    <div>
                      <h6 className="mb-1">Nomor Telepon</h6>
                      <p>{transaksiDetail.petani?.nomorTelepon}</p>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <Table responsive striped id="datatable" data-toggle="data-table">
                      <thead>
                        <tr>
                          <th>Kebun</th>
                          <th className="text-end">Umur Tanam</th>
                          <th className="text-end">Kuantitas</th>
                          <th className="text-end">Harga</th>
                          <th className="text-end">Subtotal</th>
                        </tr>
                      </thead>

                      <tbody>
                        {transaksiDetail.transaksiItems?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p className="text-primary" style={{ cursor: "pointer" }} onClick={() => handleShowModalKebunDetail(item.idKebun)}>
                                Lihat
                              </p>
                            </td>
                            <td className="text-end">{item.umurTanam} Tahun</td>
                            <td className="text-end">{formatCurrency(item.kuantitas)} kg</td>
                            <td className="text-end">Rp{formatCurrency(item.harga)}</td>
                            <td className="text-end">Rp{formatCurrency(item.kuantitas * item.harga)}</td>
                          </tr>
                        ))}
                      </tbody>

                      <tfoot>
                        <tr className="text-end">
                          <td colSpan="4">
                            <h6>Total Kuantitas</h6>
                          </td>
                          <td>{formatCurrency(transaksiDetail.totalKuantitas)} kg</td>
                        </tr>
                        <tr className="text-end">
                          <td colSpan="4">
                            <h6>Total Harga</h6>
                          </td>
                          <td>Rp{formatCurrency(transaksiDetail.totalHarga)}</td>
                        </tr>
                        <tr className="text-end">
                          <td colSpan="4">
                            <h6>Harga Per Kg Delivery Order</h6>
                          </td>
                          <td>Rp{formatCurrency(transaksiDetail.hargaDeliveryOrder)}</td>
                        </tr>
                        <tr className="text-end">
                          <td colSpan="4">
                            <h6>Total Harga Delivery Order</h6>
                          </td>
                          <td>Rp{formatCurrency(transaksiDetail.totalHargaDeliveryOrder)}</td>
                        </tr>
                      </tfoot>
                    </Table>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>

          {/* Konfirmasi Koperasi */}
          {user && user.role === roleConstant.koperasi && transaksiDetail.status === "Menunggu Konfirmasi Koperasi" && <FormKonfirmasi onSubmit={onSubmitKonfirmasi} schema={transaksiSchema.confirm} />}

          {/* Konfirmasi Pabrik Kelapa Sawit */}
          {user && user.role === roleConstant.pks && transaksiDetail.status === "Menunggu Konfirmasi Pabrik Kelapa Sawit" && <FormKonfirmasi onSubmit={onSubmitKonfirmasi} schema={transaksiSchema.confirm} />}

          {/* Pengiriman Petani */}
          {user && user.role === roleConstant.petani && transaksiDetail.status === "Menunggu Dikirim Petani" && <FormPengiriman onSubmit={onSubmitPengiriman} />}

          {/* Pengiriman Koperasi */}
          {user && user.role === roleConstant.koperasi && transaksiDetail.status === "Diterima Koperasi" && <FormPengiriman onSubmit={onSubmitPengiriman} />}

          {/* Penerimaan Koperasi */}
          {user && user.role === roleConstant.koperasi && transaksiDetail.status === "Dikirim Petani" && <FormPenerimaan onSubmit={onSubmitPenerimaan} />}

          {/* Penerimaan Pabrik Kelapa Sawit */}
          {user && user.role === roleConstant.pks && transaksiDetail.status === "Dikirim Koperasi" && <FormPenerimaan onSubmit={onSubmitPenerimaan} />}

          {/* Pembayaran Pabrik Kelapa Sawit */}
          {user && user.role === roleConstant.pks && transaksiDetail.status === "Diterima Pabrik Kelapa Sawit" && <FormPembayaran onSubmit={onSubmitPembayaran} data={transaksiDetail} />}

          {/* Pembayaran Koperasi */}
          {user && user.role === roleConstant.koperasi && transaksiDetail.status === "Dibayar Pabrik Kelapa Sawit" && <FormPembayaran onSubmit={onSubmitPembayaran} data={transaksiDetail} />}
        </Col>
      </Row>

      <KebunDetailModal selectedKebunId={selectedKebunId} showModal={showModalKebunDetail} handleCloseModal={handleCloseModalKebunDetail} />
    </>
  );
});

export default TransaksiDetail;
