import React from "react";

import { ROLE } from "../config";

import DashboardLayout from "../layout/DashboardLayout";
import { Dashboard, KontrakList, KontrakDetail, DeliveryOrderDetail, TransaksiDetail, TransaksiAdd, Laporan, Profil } from "../pages/petani";
import { HargaSawit } from "../pages/koperasi";

const role = ROLE.PETANI;
const PetaniRouter = [
  {
    path: `/${role}`,
    element: <DashboardLayout role={role} />,
    children: [
      {
        path: `/${role}`,
        element: <Dashboard />,
      },
      {
        path: `/${role}/kontrak`,
        element: <KontrakList />,
      },
      {
        path: `/${role}/kontrak/:nomorKontrak`,
        element: <KontrakDetail />,
      },
      {
        path: `/${role}/kontrak/:nomorKontrak/:nomorDo`,
        element: <DeliveryOrderDetail />,
      },
      {
        path: `/${role}/kontrak/:nomorKontrak/:nomorDo/tambah`,
        element: <TransaksiAdd />,
      },
      {
        path: `/${role}/kontrak/:nomorKontrak/:nomorDo/:nomorTransaksi`,
        element: <TransaksiDetail />,
      },
      {
        path: `/${role}/harga-sawit`,
        element: <HargaSawit />,
      },
      {
        path: `/${role}/laporan`,
        element: <Laporan />,
      },
      {
        path: `/${role}/profil`,
        element: <Profil />,
      },
    ],
  },
];

export default PetaniRouter;
