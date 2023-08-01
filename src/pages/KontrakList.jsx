import React, { useEffect, memo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

import { Card, Progress } from "../components/elements";
import { Table } from "../components/partials/dashboard";

import endpoint from "../constants/endpoint";
import { kontrakService } from "../services";

const KontrakList = memo(() => {
  const pageTitle = "Kontrak";
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();
  const { user, isError } = useSelector((state) => state.auth);
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
      console.error("Gagal mengambil data kontrak: ", error);
    }
  };

  const headings = ["Nomor", "Mitra", "Status", "Kuantitas", "Pemenuhan", ""];

  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="header-title">
                <h4 className="card-title">Daftar Kontrak</h4>
              </div>
              {user && user.role === "pks" && (
                <div className="card-action">
                  <Button variant="primary" href={endpoint.kontrakTambah}>
                    Tambah
                  </Button>
                </div>
              )}
            </Card.Header>
            <Card.Body>
              <Table headings={headings}>
                {kontrak?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nomor}</td>
                    <td>{item.namaKoperasi}</td>
                    <td className={`text-${item.status === "Menunggu Konfirmasi" ? "warning" : item.status === "Disetujui" ? "success" : "danger"}`}>{item.status}</td>
                    <td>{item.kuantitas} kg</td>
                    <td>
                      <div className="mb-2 d-flex align-items-center">
                        <h6>{(item.kuantitasTerpenuhi / item.kuantitas) * 100}%</h6>
                      </div>
                      <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={(item.kuantitasTerpenuhi / item.kuantitas) * 100} minvalue={0} maxvalue={100} style={{ height: "4px" }} />
                    </td>
                    <td>
                      <Link to={`${pathname}/${item.id}`}>Detail</Link>
                    </td>
                  </tr>
                ))}
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

export default KontrakList;
