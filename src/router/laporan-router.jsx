import React from "react";

import { roleConstant, endpointConstant } from "../constants";
import { AuthMiddleware } from "../middlewares";
import DashboardLayout from "../layout/DashboardLayout";
import { Laporan } from "../pages";

const allowedRoles = [roleConstant.pks, roleConstant.koperasi, roleConstant.petani];
const LaporanRouter = [
  {
    path: endpointConstant.laporan,
    element: (
      <AuthMiddleware allowedRoles={allowedRoles}>
        <DashboardLayout />
      </AuthMiddleware>
    ),
    children: [
      {
        path: endpointConstant.laporan,
        element: <Laporan />,
      },
    ],
  },
];

export default LaporanRouter;
