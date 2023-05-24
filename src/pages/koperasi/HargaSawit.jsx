import React, { memo, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { Card } from "../../components/elements";
import { HargaSawitTable as Table } from "../../components/partials/dashboard";

import { hargaSawit } from "../../config";
import { currencyFormat } from "../../utils";

const HargaSawit = memo(() => {
  const pageTitle = "Harga Sawit";
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle(pageTitle);
  }, [setTitle]);

  const headings = ["Tanggal Pembaruan", "Umur Tanam", "Harga"];

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="header-title">
            <h4 className="card-title">Referensi Harga Sawit</h4>
          </div>
        </Card.Header>
        <Card.Body>
          <Table headings={headings}>
            {hargaSawit?.map((item, index) => (
              <tr key={index}>
                <td>{item.tanggalPembaruan}</td>
                <td>{item.umurTanam} Tahun</td>
                <td>Rp{currencyFormat(item.harga)}</td>
              </tr>
            ))}
          </Table>
        </Card.Body>
      </Card>
    </>
  );
});

export default HargaSawit;
