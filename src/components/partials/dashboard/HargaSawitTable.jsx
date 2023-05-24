import React from "react";
import { Row, Col, Table as BootstrapTable } from "react-bootstrap";
import { Link } from "react-router-dom";

const HargaSawitTable = ({ headings = ["No"], children = {} }) => {
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
              {headings?.map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </tfoot>
        </BootstrapTable>
      </div>
    </>
  );
};

export default HargaSawitTable;
