import React, { useEffect, memo } from "react";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import { Row, Col, Button, Nav, Tab } from "react-bootstrap";

import { Card, Eye } from "../../../../components/elements";
import { Table } from "../../../../components/partials/dashboard";

const PenawaranKeluarList = memo(() => {
  const pageTitle = "Penawaran Keluar";
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
  ];

  const dataDO = [
    {
      nomor: "D0001",
      tanggal: "2021-01-01",
      penerima: "Koperasi Jambi",
      status: "Disetujui",
    },
    {
      nomor: "D0002",
      tanggal: "2021-01-01",
      penerima: "Koperasi Riau",
      status: "Pending",
    },
  ];

  return (
    <>
      <Tab.Container defaultActiveKey="kontrak-tab">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Body>
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                  <Nav as="ul" className="d-flex nav-pills mb-0 text-center profile-tab" data-toggle="slider-tab" id="penawaran-keluar-tab" role="tablist">
                    <Nav.Item as="li">
                      <Nav.Link eventKey="kontrak-tab">Kontrak</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link eventKey="do-tab">DO</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="12">
            <Tab.Content className="profile-content">
              {/* Tabel Kontrak */}
              <Tab.Pane eventKey="kontrak-tab" id="kontrak-content">
                <Card>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="header-title">
                      <h4 className="card-title">Kontrak</h4>
                    </div>
                    <div className="card-action">
                      <Button variant="primary" href={`${pathname}/tambah-kontrak`}>
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
              </Tab.Pane>

              {/* Tabel DO */}
              <Tab.Pane eventKey="do-tab" id="do-content">
                <Card>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="header-title">
                      <h4 className="card-title">DO</h4>
                    </div>
                    <div className="card-action">
                      <Button variant="primary" href={`${pathname}/tambah-do`}>
                        Tambah
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Table headings={headings}>
                      {dataDO?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.nomor}</td>
                          <td>{item.tanggal}</td>
                          <td>{item.penerima}</td>
                          <td className={`text-${item.status === "Pending" ? "warning" : item.status === "Disetujui" ? "success" : "danger"}`}>{item.status}</td>
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
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
});

export default PenawaranKeluarList;
