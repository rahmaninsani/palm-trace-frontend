import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { endpointConstant } from "../constants";
import { Card, Progress } from "../components/elements";
import { Table } from "../components/partials/dashboard";
import { formatTime } from "../utils";
import { deliveryOrderService } from "../services";

const DeliveryOrderList = memo(() => {
  const { user } = useSelector((state) => state.auth);
  const { idKontrak } = useParams();
  const [deliveryOrder, setDeliveryOrder] = useState([]);

  useEffect(() => {
    findAllDeliveryOrder();
  }, []);

  const findAllDeliveryOrder = async () => {
    try {
      const response = await deliveryOrderService.findAll({ idKontrak });
      setDeliveryOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const headings = ["Nomor", "Periode", "Mitra", "Status", "Kuantitas", "Pemenuhan", ""];

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="header-title">
          <h4 className="card-title">Daftar Delivery Order</h4>
        </div>

        {user && user.role === "pks" && (
          <div className="card-action">
            <Button variant="primary" href={endpointConstant.deliveryOrderTambah}>
              Tambah
            </Button>
          </div>
        )}
      </Card.Header>
      <Card.Body>
        {deliveryOrder.length > 0 ? (
          <Table headings={headings}>
            {deliveryOrder?.map((item) => (
              <tr key={item.id}>
                <td>{item.nomor}</td>
                <td>{formatTime(item.periode)}</td>
                <td>{item.namaKoperasi}</td>
                <td className={`text-${item.status === "Menunggu Konfirmasi" ? "warning" : item.status === "Disetujui" ? "success" : "danger"}`}>{item.status}</td>
                <td>{item.kuantitas} kg</td>
                <td>
                  <div className="mb-2 d-flex align-items-center">
                    <h6>{(item.kuantitasTerpenuhi / item.kuantitas) * 100}%</h6>
                  </div>
                  <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={(item.kuantitasTerpenuhi / item.kuantitas) * 100} minvalue={0} maxvalue={100} style={{ height: "4px" }} />
                </td>
                <td>
                  <Link to={`${endpointConstant.kontrak}/${idKontrak}/${item.id}`}>Detail</Link>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <p className="text-center">Tida ada delivery order</p>
        )}
      </Card.Body>
    </Card>
  );
});

export default DeliveryOrderList;
