import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

import { endpointConstant } from "../../constants";
import { Card } from "../elements";
import { kebunService } from "../../services";

const ProfilPetaniKebun = memo(() => {
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
        {kebun && kebun.length > 0 ? (
          <div className="table-responsive border-bottom my-3">
            <Table responsive striped id="datatable" data-toggle="data-table">
              <thead>
                <tr>
                  <th>Alamat</th>
                  <th>Luas</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {kebun.map((item) => (
                  <tr key={item.id}>
                    <td>{item.alamat}</td>
                    <td>{item.luas} Ha</td>
                    <td>
                      <Link to={`${endpointConstant.kebun}/${item.id}`}>Detail</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </Table>
          </div>
        ) : (
          <div className="text-center">Belum ada data kebun</div>
        )}
      </Card.Body>
    </Card>
  );
});

export default ProfilPetaniKebun;
