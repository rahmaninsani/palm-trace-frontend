import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { endpointConstant, statusRantaiPasokConstant } from "../constants";
import { setMessage } from "../features/authSlice";
import { Card, Progress } from "../components/elements";
import { Table } from "../components/partials/dashboard";
import { kontrakService } from "../services";

const KontrakList = memo(() => {
  const pageTitle = "Kontrak";
  const dispatch = useDispatch();
  const { setTitle } = useOutletContext();
  const { user, isError, message } = useSelector((state) => state.auth);
  const [kontrak, setKontrak] = useState([]);

  useEffect(() => {
    setTitle(pageTitle);
    findAllKontrak();
  }, []);

  const findAllKontrak = async () => {
    try {
      const response = await kontrakService.findAll();
      setKontrak(response.data);
    } catch (error) {
      console.log(error);
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

  const headings = ["Nomor", "Mitra", "Status", "Kuantitas", "Pemenuhan", ""];

  return (
    <>
      <ToastContainer />
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="header-title">
                <h4 className="card-title">Daftar Kontrak</h4>
              </div>
              {user && user.role === "pks" && (
                <div className="card-action">
                  <Button variant="primary" href={endpointConstant.kontrakTambah}>
                    Tambah
                  </Button>
                </div>
              )}
            </Card.Header>
            <Card.Body>
              {kontrak.length > 0 ? (
                <Table headings={headings}>
                  {kontrak?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nomor}</td>
                      <td>{item.namaKoperasi}</td>
                      <td className={`text-${item.status === "Menunggu Konfirmasi" ? "warning" : item.status === "Disetujui" ? "success" : "danger"}`}>{item.status}</td>
                      <td>{item.kuantitas} kg</td>
                      <td>
                        {item.status === statusRantaiPasokConstant.penawaranKontrak.menungguKonfirmasi.string ? (
                          "-"
                        ) : (
                          <div>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>{(item.kuantitasTerpenuhi / item.kuantitas) * 100}%</h6>
                            </div>
                            <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={(item.kuantitasTerpenuhi / item.kuantitas) * 100} minvalue={0} maxvalue={100} style={{ height: "4px" }} />
                          </div>
                        )}
                      </td>
                      <td>
                        <Link to={`${endpointConstant.kontrak}/${item.id}`}>Detail</Link>
                      </td>
                    </tr>
                  ))}
                </Table>
              ) : (
                <div className="text-center">
                  <p className="text-muted">Belum ada kontrak</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

export default KontrakList;
