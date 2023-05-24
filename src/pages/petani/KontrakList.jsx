import React, { useEffect, memo } from "react";
import { useLocation, useOutletContext, Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

import { Card } from "../../components/elements";
import { Table } from "../../components/partials/dashboard";

import { contracts } from "../../config";

const KontrakList = memo(() => {
  const pageTitle = "Kontrak";
  const { pathname } = useLocation();
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  const headings = ["Nomor", "Tanggal Pembuatan", "Pabrik Kelapa Sawit", "Koperasi", "Aksi"];

  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="header-title">
                <h4 className="card-title">Kontrak</h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Table headings={headings}>
                {contracts?.map(
                  (item, index) =>
                    item.status === "Disetujui" && (
                      <tr key={index}>
                        <td>{item.nomor}</td>
                        <td>{item.tanggalPembuatan}</td>
                        <td>{item.mitraPembuat}</td>
                        <td>{item.mitraPenerima}</td>
                        <td>
                          <Link to={`${pathname}/${item.nomor}`}>Detail</Link>
                        </td>
                      </tr>
                    )
                )}
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});

export default KontrakList;
