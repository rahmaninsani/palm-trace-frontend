import React, { useEffect, memo } from "react";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

import { Card } from "../../../components/elements";
import { Table } from "../../../components/partials/dashboard";

const KontrakList = memo(() => {
  const pageTitle = "Kontrak";
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  const headings = ["Nomor", "Tanggal Pembuatan", "Penerima", "Status", "Aksi"];
  const dataKontrak = [
    {
      nomor: "K0001",
      tanggal: "2021-01-01",
      penerima: "Koperasi Kalimantan Selatan",
      status: "Ditolak",
    },
    {
      nomor: "K0002",
      tanggal: "2021-01-01",
      penerima: "Koperasi Jambi",
      status: "Disetujui",
    },
    {
      nomor: "K0003",
      tanggal: "2021-01-01",
      penerima: "Koperasi Riau",
      status: "Disetujui",
    },
    {
      nomor: "K0004",
      tanggal: "2021-01-01",
      penerima: "Koperasi Nusantara",
      status: "Pending",
    },
    {
      nomor: "K0001",
      tanggal: "2021-01-01",
      penerima: "Koperasi Kalimantan Selatan",
      status: "Ditolak",
    },
    {
      nomor: "K0002",
      tanggal: "2021-01-01",
      penerima: "Koperasi Jambi",
      status: "Disetujui",
    },
    {
      nomor: "K0003",
      tanggal: "2021-01-01",
      penerima: "Koperasi Riau",
      status: "Disetujui",
    },
    {
      nomor: "K0004",
      tanggal: "2021-01-01",
      penerima: "Koperasi Nusantara",
      status: "Pending",
    },
    {
      nomor: "K0002",
      tanggal: "2021-01-01",
      penerima: "Koperasi Jambi",
      status: "Disetujui",
    },
    {
      nomor: "K0003",
      tanggal: "2021-01-01",
      penerima: "Koperasi Riau",
      status: "Disetujui",
    },
  ];

  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="header-title">
                <h4 className="card-title">Kontrak</h4>
              </div>
              <div className="card-action">
                <Button variant="primary" href={`${pathname}/tambah`}>
                  Tambah
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table headings={headings}>
                {dataKontrak?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nomor}</td>
                    <td>{item.tanggal}</td>
                    <td>{item.penerima}</td>
                    <td className={`text-${item.status === "Pending" ? "warning" : item.status === "Disetujui" ? "success" : "danger"}`}>{item.status}</td>
                    <td>
                      <Link to={`${pathname}/${item.nomor}`}>Detail</Link>
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
