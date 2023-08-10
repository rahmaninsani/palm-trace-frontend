import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import { endpointConstant, statusRantaiPasokConstant } from "../constants";
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

  const headings = ["Nomor", "Periode", "Status", "Kuantitas", "Pemenuhan", ""];

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="header-title">
          <h4 className="card-title">Daftar Delivery Order</h4>
        </div>

        {user && user.role === "pks" && (
          <div className="card-action">
            <Button variant="primary" href={`${endpointConstant.kontrak}/${idKontrak}/tambah`}>
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
                <td className={`text-${item.status === "Menunggu Konfirmasi" ? "warning" : item.status === "Disetujui" ? "success" : "danger"}`}>{item.status}</td>
                <td>{item.kuantitas} kg</td>
                <td>
                  {item.status === statusRantaiPasokConstant.penawaranDeliveryOrder.menungguKonfirmasi.string ? (
                    "-"
                  ) : (
                    <div>
                      <div className="mb-2 d-flex align-items-center">
                        <h6>{(item.kuantitasTerpenuhi / item.kuantitas) * 100}%</h6>
                      </div>
                      <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={parseFloat(((item.kuantitasTerpenuhi / item.kuantitas) * 100).toFixed(2))} minvalue={0} maxvalue={100} style={{ height: "8px" }} />
                    </div>
                  )}
                </td>
                <td>
                  <Link to={`${endpointConstant.kontrak}/${idKontrak}/${item.id}`}>Detail</Link>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <div className="text-center">
            <p className="text-muted">Belum ada delivery order</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
});

export default DeliveryOrderList;
