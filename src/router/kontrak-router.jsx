import React from "react";

import role from "../constants/role";
import endpoint from "../constants/endpoint";
import { RequireAuth } from "../utils";
import DashboardLayout from "../layout/DashboardLayout";
import { KontrakList, KontrakAdd, KontrakDetail, DeliveryOrderDetail, DeliveryOrderAdd } from "../pages";

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
        path: "/kontrak/tambah",
        element: <KontrakAdd />,
      },
      {
        path: "/kontrak/:idKontrak",
        element: <KontrakDetail />,
      },
      {
        path: "/kontrak/:idKontrak/tambah",
        element: <DeliveryOrderAdd />,
      },
      {
        path: "/kontrak/:idKontrak/:idDeliveryOrder",
        element: <DeliveryOrderDetail />,
      },
    ],
  },
];

export default KontrakRouter;
