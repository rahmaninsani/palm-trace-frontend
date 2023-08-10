import React, { memo, useState, useEffect } from "react";
import { Modal, Form, InputGroup, Row, Col, Accordion } from "react-bootstrap";
import { Worker, Viewer } from "@react-pdf-viewer/core";

import { generateIpfsUrl } from "../../utils";
import { Card } from "../elements";
import { kebunService } from "../../services";

import KebunDetailMap from "./KebunDetailMap";

const KebunDetailModal = memo(({ selectedKebunId, showModal, handleCloseModal }) => {
  const [kebunDetail, setKebunDetail] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  useEffect(() => {
    if (kebunDetail && kebunDetail.latitude && kebunDetail.longitude) {
      setDestinationLocation({ lat: kebunDetail.latitude, lng: kebunDetail.longitude });
    }
  }, [kebunDetail]);

  useEffect(() => {
    if (showModal) {
      getKebunDetail();

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [showModal]);

  const getKebunDetail = async () => {
    try {
      if (selectedKebunId) {
        const payload = {
          idKebun: selectedKebunId,
        };
        const response = await kebunService.findOne(payload);
        setKebunDetail(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="xl" scrollable={true} show={showModal} backdrop="static" keyboard={false} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <div className="ms-auto text-center">
          <Modal.Title as="h5">Detail Kebun</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        {kebunDetail && currentLocation && destinationLocation && (
          <Card>
            <Card.Header>
              <KebunDetailMap origin={currentLocation} destination={destinationLocation} />
            </Card.Header>
            <Card.Body>
              <Row>
                <Form.Group className="col-md-6 form-group">
                  <Form.Label htmlFor="latitude">Latitude</Form.Label>
                  <Form.Control type="text" id="latitude" value={kebunDetail.latitude} readOnly />
                </Form.Group>

                <Form.Group className="col-md-6 form-group">
                  <Form.Label htmlFor="longitude">Longitude</Form.Label>
                  <Form.Control type="text" id="longitude" value={kebunDetail.longitude} readOnly />
                </Form.Group>

                <Form.Group className="col-sm-12 form-group">
                  <Form.Label htmlFor="alamat">Alamat Lengkap</Form.Label>
                  <Form.Control as="textarea" rows={4} id="alamat" value={kebunDetail.alamat} readOnly />
                </Form.Group>

                <Form.Group className="col-md-6 form-group">
                  <Form.Label htmlFor="luas">Luas</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" id="luas" value={kebunDetail.luas} readOnly />
                    <InputGroup.Text>Ha</InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="col-md-6 form-group">
                  <Form.Label htmlFor="kemampuanProduksiHarian">Kemampuan Produksi Harian</Form.Label>
                  <InputGroup>
                    <Form.Control type="number" id="kemampuanProduksiHarian" value={kebunDetail.kemampuanProduksiHarian} readOnly />
                    <InputGroup.Text>kg</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row>
                <Col sm={12}>
                  <h6 className="mt-4 mb-2">Dokumen Legalitas Lahan</h6>
                  <Accordion>
                    <Accordion.Item eventKey="suratKeteranganLurah">
                      <Accordion.Header>Surat Keterangan Lurah</Accordion.Header>
                      <Accordion.Body style={{ height: "500px" }}>
                        <p className="form-text">Nomor Surat: {kebunDetail.nomorSuratKeteranganLurah}</p>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">{kebunDetail.cidSuratKeteranganLurah && <Viewer fileUrl={generateIpfsUrl(kebunDetail.cidSuratKeteranganLurah)} />}</Worker>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="suratKeteranganGantiRugi">
                      <Accordion.Header>Surat Keterangan Ganti Rugi</Accordion.Header>
                      <Accordion.Body style={{ height: "500px" }}>
                        <p className="form-text">Nomor Surat: {kebunDetail.nomorSuratKeteranganGantiRugi}</p>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">{kebunDetail.cidSuratKeteranganGantiRugi && <Viewer fileUrl={generateIpfsUrl(kebunDetail.cidSuratKeteranganGantiRugi)} />}</Worker>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="sertifikatHakMilik">
                      <Accordion.Header>Sertifikat Hak Milik </Accordion.Header>
                      <Accordion.Body style={{ height: "500px" }}>
                        <p className="form-text">Nomor Sertifikat: {kebunDetail.nomorSertifikatHakMilik}</p>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">{kebunDetail.cidSertifikatHakMilik && <Viewer fileUrl={generateIpfsUrl(kebunDetail.cidSertifikatHakMilik)} />}</Worker>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="suratTandaBudidaya">
                      <Accordion.Header>Surat Tanda Budidaya</Accordion.Header>
                      <Accordion.Body style={{ height: "500px" }}>
                        <p className="form-text">Nomor Surat: {kebunDetail.nomorSuratTandaBudidaya}</p>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">{kebunDetail.cidSuratTandaBudidaya && <Viewer fileUrl={generateIpfsUrl(kebunDetail.cidSuratTandaBudidaya)} />}</Worker>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>

                <Col sm={12}>
                  <h6 className="mt-4 mb-2">Dokumen Sertifikasi</h6>
                  <Accordion>
                    <Accordion.Item eventKey="sertifikatRspo">
                      <Accordion.Header>Sertifikat RSPO</Accordion.Header>
                      <Accordion.Body style={{ height: "500px" }}>
                        <p className="form-text">Nomor Sertifikat: {kebunDetail.nomorSertifikatRspo}</p>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">{kebunDetail.cidSertifikatRspo && <Viewer fileUrl={generateIpfsUrl(kebunDetail.cidSertifikatRspo)} />}</Worker>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="sertifikatIspo">
                      <Accordion.Header>Sertifikat ISPO</Accordion.Header>
                      <Accordion.Body style={{ height: "500px" }}>
                        <p className="form-text">Nomor Sertifikat: {kebunDetail.nomorSertifikatIspo}</p>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">{kebunDetail.cidSertifikatIspo && <Viewer fileUrl={generateIpfsUrl(kebunDetail.cidSertifikatIspo)} />}</Worker>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="sertifikatIscc">
                      <Accordion.Header>Sertifikat ISCC</Accordion.Header>
                      <Accordion.Body style={{ height: "500px" }}>
                        <p className="form-text">Nomor Sertifikat: {kebunDetail.nomorSertifikatIscc}</p>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">{kebunDetail.cidSertifikatIscc && <Viewer fileUrl={generateIpfsUrl(kebunDetail.cidSertifikatIscc)} />}</Worker>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </Modal.Body>
    </Modal>
  );
});

export default KebunDetailModal;
