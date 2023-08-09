import React from "react";

import { roleConstant, endpointConstant } from "../constants";
import { AuthMiddleware } from "../middlewares";
import DashboardLayout from "../layout/DashboardLayout";
import { Profil, KebunAdd } from "../pages";

const allowedRoles = [roleConstant.dinas, roleConstant.pks, roleConstant.koperasi, roleConstant.petani];
const LaporanRouter = [
  {
    path: endpointConstant.profil,
    element: (
      <AuthMiddleware allowedRoles={allowedRoles}>
        <DashboardLayout />
      </AuthMiddleware>
    ),
    children: [
      {
        path: endpointConstant.profil,
        element: <Profil />,
      },
      {
        path: endpointConstant.kebunTambah,
        element: (
          <AuthMiddleware allowedRoles={[roleConstant.petani]}>
            <KebunAdd />
          </AuthMiddleware>
        ),
      },
    ],
  },
];

export default LaporanRouter;
