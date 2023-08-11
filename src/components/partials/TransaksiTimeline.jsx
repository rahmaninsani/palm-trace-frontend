import React, { memo, useState } from "react";
import { Card, Row, Col, Modal } from "react-bootstrap";
import { Worker, Viewer } from "@react-pdf-viewer/core";

import { statusRantaiPasokConstant } from "../../constants";
import { formatTime, generateIpfsUrl } from "../../utils";

const ModalBodyPengiriman = ({ data }) => {
  return (
    <Row>
      <Col md="6">
        <h6 className="mb-1">Nomor</h6>
        <p>{data.nomor}</p>
      </Col>
      <Col md="6">
        <h6 className="mb-1">Tanggal</h6>
        <p>{formatTime(data.tanggal)}</p>
      </Col>
      <Col md="6">
        <h6 className="mb-1">Nama Sopir</h6>
        <p>{data.namaSopir}</p>
      </Col>
      <Col md="6">
        <h6 className="mb-1">Nomor Telepon</h6>
        <p>{data.nomorTeleponSopir}</p>
      </Col>
      <Col md="6">
        <h6 className="mb-1">Kendaraan</h6>
        <p>{data.namaKendaraan}</p>
      </Col>
      <Col md="6">
        <h6 className="mb-1">Nomor Polisi</h6>
        <p>{data.nomorPolisiKendaraan}</p>
      </Col>
    </Row>
  );
};

const ModalBodyPenerimaan = ({ data }) => {
  return (
    <Row>
      <Col md="6">
        <h6 className="mb-1">Nomor</h6>
        <p>{data.nomor}</p>
      </Col>
      <Col md="6">
        <h6 className="mb-1">Tanggal</h6>
        <p>{formatTime(data.tanggal)}</p>
      </Col>
      <Col md="6">
        <h6 className="mb-1">Total Kuantitas</h6>
        <p>{data.kuantitas} kg</p>
      </Col>
    </Row>
  );
};

const ModalBodyPembayaran = ({ data }) => {
  return (
    <div>
      <Row>
        <Col md="6">
          <h6 className="mb-1">Nomor</h6>
          <p>{data.nomor}</p>
        </Col>
        <Col md="6">
          <h6 className="mb-1">Tanggal</h6>
          <p>{formatTime(data.tanggal)}</p>
        </Col>
      </Row>

      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js">
        <Viewer fileUrl={generateIpfsUrl(data.cidBuktiPembayaran)} />
      </Worker>
    </div>
  );
};

const TimelineComponent = ({ label, datetime, info, isModal, data }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <li>
      {label === "Transaksi Selesai" ? (
        <>
          <div className={`timeline-dots1 border-${label === "Transaksi Selesai" ? "success" : "danger"} text-${label === "Transaksi Selesai" ? "success" : "danger"}`}>
            {label === "Transaksi" ? (
              <svg width="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
              </svg>
            ) : (
              <svg width="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
              </svg>
            )}
          </div>
          <h6 className="float-left mb-1 text-success">{label}</h6>
          <p className="text-gray mt-1">Transaksi ini telah selesai</p>
        </>
      ) : (
        <>
          <div className="timeline-dots timeline-dot1 border-gray text-gray">
            {label === "Transaksi Selesai" && (
              <svg width="24" fill="currentColor" viewBox="0 0 16 16">
                // <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                //{" "}
              </svg>
            )}
          </div>
          <h6 className={`float-left mb-1 ${label.includes("Ditolak") && "text-danger"}`}>{label}</h6>
          <small className="float-right">{formatTime(datetime)}</small>
          <div className="d-inline-block w-100 mt-1">
            {isModal ? (
              <>
                <p className="text-primary" onClick={() => setShowModal(true)}>
                  Lihat {info}
                </p>

                <Modal size="lg" scrollable={true} show={showModal} backdrop="static" keyboard={false} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title as="h5">{info}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {label === "Dikirim Petani" && <ModalBodyPengiriman data={data} />}
                    {label === "Dikirim Koperasi" && <ModalBodyPengiriman data={data} />}
                    {label === "Diterima Koperasi" && <ModalBodyPenerimaan data={data} />}
                    {label === "Diterima PKS" && <ModalBodyPenerimaan data={data} />}
                    {label === "PKS Membayar Koperasi" && <ModalBodyPembayaran data={data} />}
                    {label === "Koperasi Membayar Petani" && <ModalBodyPembayaran data={data} />}
                    {typeof data === "string" && <p>{data}</p>}
                  </Modal.Body>
                </Modal>
              </>
            ) : (
              <p className="text-gray">{info}</p>
            )}
          </div>
        </>
      )}
    </li>
  );
};

const getTimelineItems = (data) => {
  const timelineComponents = [
    <TimelineComponent label="Transaksi Dibuat" datetime={data?.tanggalPembuatan} info="Petani menawarkan TBS" isModal={false} />,
    <TimelineComponent label="Disetujui Koperasi" datetime={data?.tanggalKonfirmasiKoperasi} info="Pesan" isModal={true} data={data?.pesanKoperasi} />,
    <TimelineComponent label="Disetujui PKS" datetime={data?.tanggalKonfirmasiPks} info="Pesan" isModal={true} data={data?.pesanPks} />,
    <TimelineComponent
      label="Dikirim Petani"
      datetime={data.pengiriman && data.pengiriman.length > 0 && data.pengiriman.find((p) => p.jenisUser.toLowerCase() === "petani")?.tanggal}
      info="Info Pengiriman"
      isModal={true}
      data={data.pengiriman && data.pengiriman.length > 0 && data.pengiriman.find((p) => p.jenisUser.toLowerCase() === "petani")}
    />,
    <TimelineComponent
      label="Diterima Koperasi"
      datetime={data.penerimaan && data.penerimaan.length > 0 && data.penerimaan.find((p) => p.jenisUser.toLowerCase() === "koperasi")?.tanggal}
      info="Info Penerimaan"
      isModal={true}
      data={data.penerimaan && data.penerimaan.length > 0 && data.penerimaan.find((p) => p.jenisUser.toLowerCase() === "koperasi")}
    />,
    <TimelineComponent
      label="Dikirim Koperasi"
      datetime={data.pengiriman && data.pengiriman.length > 0 && data.pengiriman.find((p) => p.jenisUser.toLowerCase() === "koperasi")?.tanggal}
      info="Info Pengiriman"
      isModal={true}
      data={data.pengiriman && data.pengiriman.length > 0 && data.pengiriman.find((p) => p.jenisUser.toLowerCase() === "koperasi")}
    />,
    <TimelineComponent
      label="Diterima PKS"
      datetime={data.penerimaan && data.penerimaan.length > 0 && data.penerimaan.find((p) => p.jenisUser.toLowerCase() === "pabrik_kelapa_sawit")?.tanggal}
      info="Info Penerimaan"
      isModal={true}
      data={data.penerimaan && data.penerimaan.length > 0 && data.penerimaan.find((p) => p.jenisUser.toLowerCase() === "pabrik_kelapa_sawit")}
    />,
    <TimelineComponent
      label="PKS Membayar Koperasi"
      datetime={data.pembayaran && data.pembayaran.length > 0 && data.pembayaran.find((p) => p.jenisUser.toLowerCase() === "pabrik_kelapa_sawit")?.tanggal}
      info="Info Pembayaran"
      isModal={true}
      data={data.pembayaran && data.pembayaran.length > 0 && data.pembayaran.find((p) => p.jenisUser.toLowerCase() === "pabrik_kelapa_sawit")}
    />,
    <TimelineComponent
      label="Koperasi Membayar Petani"
      datetime={data.pembayaran && data.pembayaran.length > 0 && data.pembayaran.find((p) => p.jenisUser.toLowerCase() === "koperasi")?.tanggal}
      info="Info Pembayaran"
      isModal={true}
      data={data.pembayaran && data.pembayaran.length > 0 && data.pembayaran.find((p) => p.jenisUser.toLowerCase() === "koperasi")}
    />,
    <TimelineComponent label="Transaksi Selesai" datetime={data?.updatedAt} />,
    <TimelineComponent label="Ditolak Koperasi" datetime={data?.tanggalKonfirmasiKoperasi} info="Pesan" isModal={true} data={data?.pesanKoperasi} />,
    <TimelineComponent label="Ditolak PKS" datetime={data?.tanggalKonfirmasiPks} info="Pesan" isModal={true} data={data?.pesanPks} />,
  ];

  const timelineItems = [];
  switch (data.status) {
    case statusRantaiPasokConstant.transaksi.menungguKonfirmasiKoperasi.string:
      timelineItems.push(...timelineComponents.slice(0, 1));
      break;
    case statusRantaiPasokConstant.transaksi.menungguKonfirmasiPks.string:
      timelineItems.push(...timelineComponents.slice(0, 2));
      break;
    case statusRantaiPasokConstant.transaksi.menungguDikirimPetani.string:
      timelineItems.push(...timelineComponents.slice(0, 3));
      break;
    case statusRantaiPasokConstant.transaksi.dikirimPetani.string:
      timelineItems.push(...timelineComponents.slice(0, 4));
      break;
    case statusRantaiPasokConstant.transaksi.diterimaKoperasi.string:
      timelineItems.push(...timelineComponents.slice(0, 5));
      break;
    case statusRantaiPasokConstant.transaksi.dikirimKoperasi.string:
      timelineItems.push(...timelineComponents.slice(0, 6));
      break;
    case statusRantaiPasokConstant.transaksi.diterimaPks.string:
      timelineItems.push(...timelineComponents.slice(0, 7));
      break;
    case statusRantaiPasokConstant.transaksi.dibayarPks.string:
      timelineItems.push(...timelineComponents.slice(0, 8));
      break;
    case statusRantaiPasokConstant.transaksi.dibayarKoperasi.string:
      timelineItems.push(...timelineComponents.slice(0, 9));
      break;
    case statusRantaiPasokConstant.transaksi.selesai.string:
      timelineItems.push(...timelineComponents.slice(0, 10));
      break;
    case statusRantaiPasokConstant.transaksi.ditolakKoperasi.string:
      timelineItems.push(timelineComponents[0]);
      timelineItems.push(timelineComponents[10]);
      timelineItems.push(timelineComponents[9]);
      break;
    case statusRantaiPasokConstant.transaksi.ditolakPks.string:
      timelineItems.push(timelineComponents[0]);
      timelineItems.push(timelineComponents[1]);
      timelineItems.push(timelineComponents[11]);
      timelineItems.push(timelineComponents[9]);
      break;
    default:
      break;
  }

  return timelineItems;
};

const TransaksiTimeline = memo(({ data }) => {
  const timelineItems = getTimelineItems(data);
  const reversedTimeLineItems = timelineItems.length > 0 && timelineItems.reverse();

  return (
    <Card>
      <Card.Header className="mx-auto my-4">
        <h5>Timeline Transaksi</h5>
      </Card.Header>
      <Card.Body>
        <div className="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
          {reversedTimeLineItems.length > 0 && <ul className="list-inline p-0 m-0">{reversedTimeLineItems.map((timelineItem) => timelineItem)}</ul>}
        </div>
      </Card.Body>
    </Card>
  );
});

export default TransaksiTimeline;
