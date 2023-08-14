import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import AOS from "aos";
import CountUp from "react-countup";
import Chart from "react-apexcharts";

import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon, DoneIcon } from "../components/elements";
import { kontrakService, deliveryOrderService, transaksiService } from "../services";

const CardItem = ({ title, start, end, icon }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-start align-items-center">
          <div className="bg-primary text-white rounded p-3">{icon}</div>
          <div className="progress-widget">
            <div className="progress-detail">
              <p className="mb-2">{title}</p>
              <h4 className="counter">
                <CountUp start={start} end={end} duration={3} />
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransactionChart = ({ data }) => {
  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#3957E8"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "16%",
        endingShape: "rounded",
        borderRadius: 4,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
      labels: {
        minHeight: 24,
        maxHeight: 24,
        style: {
          colors: "#8A92A6",
        },
      },
    },
    yaxis: {
      title: {
        text: "",
      },
      labels: {
        minWidth: 24,
        maxWidth: 24,
        style: {
          colors: "#8A92A6",
        },
        formatter: (value) => Math.round(value),
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} transaksi`,
      },
    },
  };

  const series = [
    {
      name: "Jumlah Transaksi",
      data: [data.senin?.length, data.selasa?.length, data.rabu?.length, data.kamis?.length, data?.jumat?.length, data.sabtu?.length, data.minggu?.length] || [0, 0, 0, 0, 0, 0, 0],
    },
  ];

  return <Chart className="d-activity" options={options} series={series} type="bar" height="320px" />;
};

const Dashboard = memo(() => {
  const pageTitle = "Dashboard";
  const { setTitle } = useOutletContext();
  const { user } = useSelector((state) => state.auth);
  const [kontrak, setKontrak] = useState([]);
  const [deliveryOrder, setDeliveryOrder] = useState([]);
  const [transaksi, setTransaksi] = useState([]);
  const [transaksiThisWeek, setTransaksiThisWeek] = useState(null);

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
  });

  useEffect(() => {
    setTitle(pageTitle);
    findAllKontrak();
    findAllDeliveryOrder();
    findAllTransaksi();
    findAllTransaksiThisWeek();
  }, []);

  const findAllKontrak = async () => {
    try {
      const response = await kontrakService.findAll();
      setKontrak(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findAllDeliveryOrder = async () => {
    try {
      const response = await deliveryOrderService.findAllByUser();
      setDeliveryOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findAllTransaksi = async () => {
    try {
      const response = await transaksiService.findAllByUser();
      setTransaksi(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findAllTransaksiThisWeek = async () => {
    try {
      const response = await transaksiService.findAllByUserThisWeek();
      setTransaksiThisWeek(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row className="justify-content-center">
        {user && kontrak && (
          <Col md="12" lg="4" data-aos="fade-up" data-aos-delay="700">
            <CardItem
              title={`Kontrak ${user.role === "pks" ? "Keluar" : user.role === "koperasi" ? "Masuk" : "Disetujui"}`}
              start={0}
              end={kontrak.length}
              icon={user.role === "pks" ? <ArrowUpIcon /> : user.role === "koperasi" ? <ArrowDownIcon /> : <DoneIcon />}
            />
          </Col>
        )}

        {user && deliveryOrder && (
          <Col md="12" lg="4" data-aos="fade-up" data-aos-delay="700">
            <CardItem
              title={`Delivery Order ${user.role === "pks" ? "Keluar" : user.role === "koperasi" ? "Masuk" : "Disetujui"}`}
              start={0}
              end={deliveryOrder.length}
              icon={user.role === "pks" ? <ArrowUpIcon /> : user.role === "koperasi" ? <ArrowDownIcon /> : <DoneIcon />}
            />
          </Col>
        )}

        {user && transaksi && (
          <Col md="12" lg="4" data-aos="fade-up" data-aos-delay="700">
            <CardItem title="Transaksi Berlangsung" start={0} end={transaksi.berlangsung?.length} icon={<ArrowUpDownIcon />} />
          </Col>
        )}

        <Col md="12" xl="12">
          <div className="card" data-aos="fade-up" data-aos-delay="1000">
            <div className="flex-wrap card-header d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Transaksi Minggu Ini</h4>
              </div>
            </div>
            <div className="card-body">{transaksiThisWeek && <TransactionChart data={transaksiThisWeek} />}</div>
          </div>
        </Col>
      </Row>
    </>
  );
});

export default Dashboard;
