import React from "react";

import { ROLE } from "../config";

import DashboardLayout from "../layout/DashboardLayout";
import { Dashboard, KontrakList, KontrakDetail, DeliveryOrderDetail, TransaksiDetail, HargaSawit, Laporan, Profil } from "../pages/koperasi";
import { RequireAuth } from "../utils";

const role = ROLE.KOPERASI;
const KoperasiRouter = [
  {
    path: `/${role}`,
    element: (
      <RequireAuth role={role}>
        <DashboardLayout role={role} />
      </RequireAuth>
    ),
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

export default KoperasiRouter;
