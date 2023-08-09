import React, { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Button, Form, Modal, InputGroup } from "react-bootstrap";

import { endpointConstant, messageConstant, bankConstant } from "../../constants";
import { Card } from "../elements";
import { TableKebun } from "./dashboard";
import { kebunService } from "../../services";
import { formatTime } from "../../utils";

const ProfilPetaniKebun = memo(() => {
  const dispatch = useDispatch();
  const [kebun, setKebun] = useState([]);

  useEffect(() => {
    findAllKebun();
  }, []);

  const findAllKebun = async () => {
    try {
      const response = await kebunService.findAll();

      if (!response.data) return setKebun([]);

      setKebun(response.data);
    } catch (error) {
      console.error("Gagal mengambil data kebun: ", error);
    }
  };

  const headings = ["Alamat", "Luas", "Nomor RSPO", ""];

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="header-title">
          <h4 className="card-title">Kebun</h4>
        </div>

        <div className="card-action">
          <Button variant="primary" href={endpointConstant.kebunTambah}>
            Tambah
          </Button>
        </div>
      </Card.Header>

      <Card.Body>
        <TableKebun headings={headings}>
          {kebun &&
            kebun.map((item) => (
              <tr key={item.id}>
                <td>{item.alamat}</td>
                <td>{item.luas} Ha</td>
                <td>{item.nomorRspo}</td>
                <td>
                  <Button variant="link">Detail</Button>
                </td>
              </tr>
            ))}
        </TableKebun>
      </Card.Body>
    </Card>
  );
});

export default ProfilPetaniKebun;
