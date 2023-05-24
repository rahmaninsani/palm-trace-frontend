import React, { memo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { Card } from "../../components/elements";
import { Table } from "../../components/partials/dashboard";

const DeliveryOrderList = memo(() => {
  const { pathname } = useLocation();

  const headings = ["Nomor", "Tanggal Pembuatan", "Periode", "Status", "Aksi"];
  const dataDO = [
    {
      nomor: "D0001",
      tanggal: "2023-01-01",
      periode: "Januari 2023",
      status: "Disetujui",
    },
    {
      nomor: "D0002",
      tanggal: "2023-01-01",
      periode: "Februari 2023",
      status: "Pending",
    },
    {
      nomor: "D0003",
      tanggal: "2023-01-01",
      periode: "Maret 2023",
      status: "Ditolak",
    },
    {
      nomor: "D0001",
      tanggal: "2023-01-01",
      periode: "April 2023",
      status: "Disetujui",
    },
    {
      nomor: "D0002",
      tanggal: "2023-01-01",
      periode: "Mei 2023",
      status: "Pending",
    },
    {
      nomor: "D0003",
      tanggal: "2023-01-01",
      periode: "Juni 2023",
      status: "Ditolak",
    },
    {
      nomor: "D0001",
      tanggal: "2023-01-01",
      periode: "Juli 2023",
      status: "Disetujui",
    },
    {
      nomor: "D0002",
      tanggal: "2023-01-01",
      periode: "Agustus 2023",
      status: "Pending",
    },
    {
      nomor: "D0003",
      tanggal: "2023-01-01",
      periode: "September 2023",
      status: "Ditolak",
    },
    {
      nomor: "D0001",
      tanggal: "2023-01-01",
      periode: "Oktober 2023",
      status: "Disetujui",
    },
  ];

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="header-title">
          <h4 className="card-title">Daftar Delivery Order</h4>
        </div>
        <div className="card-action">
          <Button variant="primary" href={`${pathname}/tambah`}>
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
              <td>{item.periode}</td>
              <td className={`text-${item.status === "Pending" ? "warning" : item.status === "Disetujui" ? "success" : "danger"}`}>{item.status}</td>
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
