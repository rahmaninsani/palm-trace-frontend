import React, { memo } from "react";
import { Nav, Tab } from "react-bootstrap";

import { transactions } from "../../config";
import { TransaksiCard } from "../../components/partials/dashboard";
import { Card } from "../../components/elements";

const TransaksiList = memo(() => {
  return (
    <Card>
      <Tab.Container defaultActiveKey="perlu-konfirmasi">
        <Card.Header>
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <Nav as="ul" className="d-flex nav-pills mb-0 text-center transaksi-tab" data-toggle="slider-tab" id="transaksi-pills-tab" role="tablist">
              <Nav.Item as="li">
                <Nav.Link eventKey="perlu-konfirmasi">Perlu Konfirmasi</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="diproses">Diproses</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="dikirim">Dikirim</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="diterima">Diterima</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="selesai">Selesai</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="ditolak">Ditolak</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Card.Header>

        <Card.Body>
          <Tab.Content className="transaksi-content">
            {/* Perlu Konfirmasi */}
            <TransaksiCard tabKey="perlu-konfirmasi" transactions={transactions["perluKonfirmasi"]} />

            {/* Diproses */}
            <TransaksiCard tabKey="diproses" transactions={transactions["diproses"]} />

            {/* Dikirim */}
            <TransaksiCard tabKey="dikirim" transactions={transactions["dikirim"]} />

            {/* Diterima */}
            <TransaksiCard tabKey="diterima" transactions={transactions["diterima"]} />

            {/* Selesai */}
            <TransaksiCard tabKey="selesai" transactions={transactions["selesai"]} />

            {/* Ditolak */}
            <TransaksiCard tabKey="ditolak" transactions={transactions["ditolak"]} />
          </Tab.Content>
        </Card.Body>
      </Tab.Container>
    </Card>
  );
});

export default TransaksiList;
