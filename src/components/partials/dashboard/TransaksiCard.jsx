import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Tab } from "react-bootstrap";

import { Card } from "../../elements";
import { currencyFormat } from "../../../utils";

const TransaksiCard = memo(({ tabKey, transactions }) => {
  const { pathname } = useLocation();

  return (
    <Tab.Pane eventKey={tabKey} id={`transaksi-${tabKey}`}>
      {transactions.map((transaction, index) => (
        <Card key={index} className="shadow-sm">
          <Card.Body className="border">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="h6">{transaction.nomor}</span>
                <span className="ms-2 fs-6">{transaction.tanggal}</span>
              </div>
              <h6 className={`text-${transaction.status === "Ditolak" ? "danger" : transaction.status === "Selesai" ? "success" : "info"}`}>{transaction.status}</h6>
            </div>

            <hr className="hr-vertical" />

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6>Petani</h6>
                <p>{transaction.petani}</p>
              </div>
            </div>

            <hr className="hr-vertical" />

            <Row className="justify-content-between align-items-center">
              <Col md="6">
                <Row>
                  <Col sm="6">
                    <h6>Kuantitas</h6>
                  </Col>
                  <Col sm="6">
                    <p>{transaction.kuantitas} kg</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>Harga Per Kg</h6>
                  </Col>
                  <Col sm="6">
                    <p>Rp{currencyFormat(transaction.harga)}</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>Total Harga</h6>
                  </Col>
                  <Col sm="6">
                    <p>Rp{currencyFormat(transaction.totalHarga)}</p>
                  </Col>
                </Row>
              </Col>

              <Col md="6" className="text-end">
                <Link to={`${pathname}/${transaction.nomor}`}>Lihat Detail Transaksi</Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Tab.Pane>
  );
});

export default TransaksiCard;
