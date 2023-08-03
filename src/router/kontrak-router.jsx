import React from "react";

import { roleConstant, endpointConstant } from "../constants";
import { AuthMiddleware } from "../middlewares";
import DashboardLayout from "../layout/DashboardLayout";
import { KontrakList, KontrakAdd, KontrakDetail, DeliveryOrderDetail, DeliveryOrderAdd, TransaksiAdd, TransaksiDetail } from "../pages";

const allowedRoles = [roleConstant.pks, roleConstant.koperasi, roleConstant.petani];
const KontrakRouter = [
  {
    path: endpointConstant.kontrak,
    element: (
      <AuthMiddleware allowedRoles={allowedRoles}>
        <DashboardLayout />
      </AuthMiddleware>
    ),
    children: [
      {
        path: endpointConstant.kontrak,
        element: <KontrakList />,
      },
      {
        path: endpointConstant.kontrakTambah,
        element: <KontrakAdd />,
      },
      {
        path: endpointConstant.kontrakDetail,
        element: <KontrakDetail />,
      },
      {
        path: endpointConstant.deliveryOrderTambah,
        element: <DeliveryOrderAdd />,
      },
      {
        path: endpointConstant.deliveryOrderDetail,
        element: <DeliveryOrderDetail />,
      },
      {
        path: endpointConstant.transaksiTambah,
        element: <TransaksiAdd />,
      },
      {
        path: endpointConstant.transaksiDetail,
        element: <TransaksiDetail />,
      },
    ],
  },
];

export default KontrakRouter;
