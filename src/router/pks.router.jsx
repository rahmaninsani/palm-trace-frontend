import React from "react";

import { ROLE } from "../config";
import { RequireAuth } from "../utils";

import DashboardLayout from "../layout/DashboardLayout";
import { Dashboard, KontrakList, KontrakAdd, KontrakDetail, DeliveryOrderAdd, DeliveryOrderDetail, TransaksiDetail } from "../pages/pks";

const PksRouter = [
  {
    path: "/pks",
    element: (
      <RequireAuth role={ROLE.PKS}>
        <DashboardLayout role={ROLE.PKS} />
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
    ],
  },
];

export default PksRouter;
