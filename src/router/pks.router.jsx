import React from "react";

import { ROLE } from "../config";

import DashboardLayout from "../layout/DashboardLayout";
import { Dashboard, KontrakList, KontrakAdd, KontrakDetail, DeliveryOrderAdd, DeliveryOrderDetail, TransaksiDetail, Laporan, Profil } from "../pages/pks";
import { HargaSawit } from "../pages/koperasi";
import { RequireAuth } from "../utils";

const role = ROLE.PKS;
const PksRouter = [
  {
    path: "/pks",
    element: (
      <RequireAuth role={role}>
        <DashboardLayout role={role} />
      </RequireAuth>
    ),
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
        path: "/pks/kontrak/:idKontrak",
        element: <KontrakDetail />,
      },
      {
        path: "/pks/kontrak/:idKontrak/tambah",
        element: <DeliveryOrderAdd />,
      },
      {
        path: "/pks/kontrak/:idKontrak/:idDeliveryOrder",
        element: <DeliveryOrderDetail />,
      },
      {
        path: "/pks/kontrak/:idKontrak/:idDeliveryOrder/:idTransaksi",
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
