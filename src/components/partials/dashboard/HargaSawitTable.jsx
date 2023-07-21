import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";

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
        </BootstrapTable>
      </div>
    </>
  );
};

export default HargaSawitTable;
