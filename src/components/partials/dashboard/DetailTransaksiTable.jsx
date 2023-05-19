import React from "react";
import { Row, Col, Table as BootstrapTable } from "react-bootstrap";
import { Link } from "react-router-dom";

const DetailTransaksiTable = ({ headings = ["No"], children = {} }) => {
  return (
    <>
      <div className="table-responsive">
        <BootstrapTable responsive striped id="datatable" className="" data-toggle="data-table">
          <thead>
            <tr>
              {headings?.map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-end">
                <h6>Total Kuantitas</h6>
              </td>
              <td>1000 kg</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-end">
                <h6>Harga Per Kg</h6>
              </td>
              <td>Rp2.100</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-end">
                <h6>Total Harga</h6>
              </td>
              <td>Rp1.000.000</td>
            </tr>
          </tfoot>
        </BootstrapTable>
      </div>
    </>
  );
};

export default DetailTransaksiTable;
