import React from "react";

import role from "../constants/role";
import endpoint from "../constants/endpoint";
import { RequireAuth } from "../utils";
import DashboardLayout from "../layout/DashboardLayout";
import { KontrakList, KontrakAdd, KontrakDetail, DeliveryOrderDetail, DeliveryOrderAdd, TransaksiAdd, TransaksiDetail } from "../pages";

const allowedRoles = [role.pks, role.koperasi, role.petani];
const KontrakRouter = [
  {
    path: endpoint.kontrak,
    element: (
      <RequireAuth allowedRoles={allowedRoles}>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: endpoint.kontrak,
        element: <KontrakList />,
      },
      {
        path: endpoint.kontrakTambah,
        element: <KontrakAdd />,
      },
      {
        path: endpoint.kontrakDetail,
        element: <KontrakDetail />,
      },
      {
        path: endpoint.deliveryOrderTambah,
        element: <DeliveryOrderAdd />,
      },
      {
        path: endpoint.deliveryOrderDetail,
        element: <DeliveryOrderDetail />,
      },
      {
        path: endpoint.transaksiTambah,
        element: <TransaksiAdd />,
      },
      {
        path: endpoint.transaksiDetail,
        element: <TransaksiDetail />,
      },
    ],
  },
];

export default KontrakRouter;
