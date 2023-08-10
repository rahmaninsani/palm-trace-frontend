import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Container, Row } from "react-bootstrap";

import MapRoutingControl from "./MapRoutingControl";

const KebunDetailMap = ({ origin, destination }) => {
  return (
    <Container>
      <Row>
        <MapContainer
          center={[origin.lat, origin.lng]}
          zoom={13}
          scrollWheelZoom={false}
          style={{
            height: "500px",
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapRoutingControl origin={[origin.lat, origin.lng]} destination={[destination.lat, destination.lng]} />
        </MapContainer>
      </Row>
    </Container>
  );
};

export default KebunDetailMap;
