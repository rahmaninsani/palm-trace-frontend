import React from "react";

import { ROLE } from "../config";

import DashboardLayout from "../layout/DashboardLayout";
import { Dashboard, KontrakList, KontrakAdd, KontrakDetail, DeliveryOrderAdd, DeliveryOrderDetail, TransaksiDetail, Laporan, Profil } from "../pages/pks";
import { HargaSawit } from "../pages/koperasi";

const PksRouter = [
  {
    path: "/pks",
    element: <DashboardLayout role={ROLE.PKS} />,
    children: [
      {
        path: "/pks",
        element: <Dashboard />,
      },
      {
        path: "/pks/kontrak",
        element: <KontrakList />,
      },
      {
        path: "/pks/kontrak/tambah",
        element: <KontrakAdd />,
      },
      {
        path: "/pks/kontrak/:nomorKontrak",
        element: <KontrakDetail />,
      },
      {
        path: "/pks/kontrak/:nomorKontrak/tambah",
        element: <DeliveryOrderAdd />,
      },
      {
        path: "/pks/kontrak/:nomorKontrak/:nomorDo",
        element: <DeliveryOrderDetail />,
      },
      {
        path: "/pks/kontrak/:nomorKontrak/:nomorDo/:nomorTransaksi",
        element: <TransaksiDetail />,
      },
      {
        path: `/pks/harga-sawit`,
        element: <HargaSawit />,
      },
      {
        path: `/pks/laporan`,
        element: <Laporan />,
      },
      {
        path: `/pks/profil`,
        element: <Profil />,
      },
    ],
  },
];

export default PksRouter;
