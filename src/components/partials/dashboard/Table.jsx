import React from "react";
import { Row, Col, Table as BootstrapTable } from "react-bootstrap";
import { Link } from "react-router-dom";

const Table = ({ headings = ["No"], children = {} }) => {
  return (
    <>
      <div className="table-responsive border-bottom my-3">
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
        <Row className="align-items-center">
          <Col md="6">
            <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">
              Menampilkan 1 sampai 10 dari 40 entri
            </div>
          </Col>
          <Col md="6">
            <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
              <ul className="pagination">
                <li className="paginate_button page-item previous disabled" id="datatable_previous">
                  <Link to="#" aria-controls="datatable" aria-disabled="true" data-dt-idx="previous" tabIndex="0" className="page-link">
                    Previous
                  </Link>
                </li>
                <li className="paginate_button page-item active">
                  <Link to="#" aria-controls="datatable" aria-current="page" data-dt-idx="0" tabIndex="0" className="page-link">
                    1
                  </Link>
                </li>
                <li className="paginate_button page-item ">
                  <Link to="#" aria-controls="datatable" data-dt-idx="1" tabIndex="0" className="page-link">
                    2
                  </Link>
                </li>
                <li className="paginate_button page-item ">
                  <Link to="#" aria-controls="datatable" data-dt-idx="2" tabIndex="0" className="page-link">
                    3
                  </Link>
                </li>
                <li className="paginate_button page-item ">
                  <Link to="#" aria-controls="datatable" data-dt-idx="3" tabIndex="0" className="page-link">
                    4
                  </Link>
                </li>
                <li className="paginate_button page-item next" id="datatable_next">
                  <Link to="#" aria-controls="datatable" data-dt-idx="next" tabIndex="0" className="page-link">
                    Next
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Table;
