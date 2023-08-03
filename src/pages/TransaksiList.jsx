import React, { memo } from "react";
import { Nav, Tab, Button } from "react-bootstrap";
import { useLocation, useParams, Link } from "react-router-dom";

import { endpointConstant } from "../constants";
import { TransaksiCard } from "../components/partials/dashboard";
import { Card } from "../components/elements";
import { formatTime } from "../utils";
import { transaksiService } from "../services";

const TransaksiList = memo(() => {
  const { pathname } = useLocation();
  const { idKontrak, idDeliveryOrder } = useParams();
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    findAllTransaksi();
  }, []);

  const findAllTransaksi = async () => {
    try {
      const response = await transaksiService.findAll({ idKontrak, idDeliveryOrder });
      setTransaksi(response.data);
    } catch (error) {
      console.error("Gagal mengambil data transaksi: ", error);
    }
  };

  return (
    <Card>
      <Tab.Container defaultActiveKey="perlu-konfirmasi">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <Nav as="ul" className="d-flex nav-pills mb-0 text-center transaksi-tab" data-toggle="slider-tab" id="transaksi-pills-tab" role="tablist">
              <Nav.Item as="li">
                <Nav.Link eventKey="perlu-konfirmasi">Menunggu Konfirmasi</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="diproses">Perlu Diproses</Nav.Link>
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
          <div className="card-action">
            <Button variant="primary" href={`${pathname}/tambah`}>
              Tambah
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          <Tab.Content className="transaksi-content">
            {/* Perlu Konfirmasi */}
            {/* <TransaksiCard tabKey="perlu-konfirmasi" transactions={transactions["perluKonfirmasi"]} /> */}
          </Tab.Content>
        </Card.Body>
      </Tab.Container>
    </Card>
  );
});

export default TransaksiList;
