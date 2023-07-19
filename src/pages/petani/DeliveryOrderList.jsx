import React, { memo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { Card } from "../../components/elements";
import { Table } from "../../components/partials/dashboard";

import { formatCurrency } from "../../utils";

const DeliveryOrderList = memo(() => {
  const { pathname } = useLocation();

  const headings = ["Nomor", "Tanggal Pembuatan", "Periode", "Kuantitas (kg)", "Harga/kg", "Aksi"];
  const dataDO = [
    {
      nomor: "D0001",
      tanggal: "2023-01-01",
      periode: "Januari 2023",
      kuantitas: "1000",
      harga: "2100",
    },
  ];

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="header-title">
          <h4 className="card-title">Daftar Delivery Order</h4>
        </div>
      </Card.Header>
      <Card.Body>
        <Table headings={headings}>
          {dataDO?.map((item, index) => (
            <tr key={index}>
              <td>{item.nomor}</td>
              <td>{item.tanggal}</td>
              <td>{item.periode}</td>
              <td>{item.kuantitas}</td>
              <td>{formatCurrency(item.harga)}</td>
              <td>
                <Link to={`${pathname}/${item.nomor}`}>Detail</Link>
              </td>
            </tr>
          ))}
        </Table>
      </Card.Body>
    </Card>
  );
});

export default DeliveryOrderList;
