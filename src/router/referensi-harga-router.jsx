import React from "react";

import { roleConstant, endpointConstant } from "../constants";
import { AuthMiddleware } from "../middlewares";
import DashboardLayout from "../layout/DashboardLayout";
import { ReferensiHarga } from "../pages";

const allowedRoles = [roleConstant.dinas, roleConstant.pks, roleConstant.koperasi, roleConstant.petani];
const ReferensiHargaRouter = [
  {
    path: endpointConstant.referensiHarga,
    element: (
      <AuthMiddleware allowedRoles={allowedRoles}>
        <DashboardLayout />
      </AuthMiddleware>
    ),
    children: [
      {
        path: endpointConstant.referensiHarga,
        element: <ReferensiHarga />,
      },
    ],
  },
];

export default ReferensiHargaRouter;
