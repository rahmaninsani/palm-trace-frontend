import React, { useEffect, memo } from "react";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { Card, Button, Eye } from "../../../components/elements";
import { Table } from "../../../components/partials/dashboard";

const PenawaranKeluar = memo(() => {
  const pageTitle = "Penawaran Keluar";
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  const headings = ["Nomor", "Jenis", "Tanggal", "Penerima", "Status", "Aksi"];
  const data = [
    {
      nomor: "KO001",
      jenis: "Kontrak",
      tanggal: "2021-01-01",
      penerima: "Koperasi Nusantara",
      status: "Ditolak",
    },
    {
      nomor: "KO002",
      jenis: "Kontrak",
      tanggal: "2021-01-01",
      penerima: "Koperasi Permata",
      status: "Disetujui",
    },
    {
      nomor: "DO001",
      jenis: "DO",
      tanggal: "2021-01-01",
      penerima: "Koperasi Permata",
      status: "Belum Disetujui",
    },
  ];

  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="card-title mb-0">
                  <h4 className="mb-0">Daftar {pageTitle}</h4>
                </div>
                <div className="card-action">
                  <Button variant="primary" href={`${pathname}/tambah`}>
                    Tambah
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Body>
              <Table headings={headings}>
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nomor}</td>
                    <td>
                      <span className={`badge bg-${item.jenis === "Kontrak" ? "success" : "primary"}`}>{item.jenis}</span>
                    </td>
                    <td>{item.tanggal}</td>
                    <td>{item.penerima}</td>
                    <td className={`text-${item.status === "Belum Disetujui" ? "warning" : item.status === "Disetujui" ? "success" : "danger"}`}>{item.status}</td>
                    <td>
                      <div className="flex align-items-center list-user-action">
                        <Link className="btn btn-sm btn-icon btn-success" data-toggle="tooltip" data-placement="top" title="Add" data-original-title="Add" to="#">
                          <span className="btn-inner">
                            <Eye />
                          </span>
                        </Link>{" "}
                      </div>
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

export default PenawaranKeluar;
