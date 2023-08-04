import React, { memo } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Tab } from "react-bootstrap";

import { endpointConstant } from "../../../constants";
import { formatCurrency } from "../../../utils";
import { Card } from "../../elements";

const TransaksiCard = memo(({ tabKey, transactions, user }) => {
  const { idKontrak, idDeliveryOrder } = useParams();

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
              <h6 className={`text-${transaction.status.toLowerCase().includes("ditolak") ? "danger" : transaction.status === "Selesai" ? "success" : transaction.status.toLowerCase().includes(user.role) ? "warning" : "info"}`}>
                {transaction.status}
              </h6>
            </div>

            <hr className="hr-vertical" />

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6>Petani</h6>
                <p>{transaction.namaPetani}</p>
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
                    <p>{transaction.totalKuantitas} kg</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <h6>Total Harga</h6>
                  </Col>
                  <Col sm="6">
                    <p>Rp{formatCurrency(transaction.totalHarga)}</p>
                  </Col>
                </Row>
              </Col>

              <Col md="6" className="text-end">
                <Link to={`${endpointConstant.kontrak}/${idKontrak}/${idDeliveryOrder}/${transaction.id}`}>Lihat Detail Transaksi</Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Tab.Pane>
  );
});

export default TransaksiCard;
