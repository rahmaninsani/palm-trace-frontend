import React from "react";

import { roleConstant, endpointConstant } from "../constants";
import AuthMiddleware from "../middlewares/AuthMiddleware"; // Perubahan di sini
import DashboardLayout from "../layout/DashboardLayout";
import { Dashboard } from "../pages";

const allowedRoles = [roleConstant.pks, roleConstant.koperasi, roleConstant.petani];
const DashboardRouter = [
  {
    path: endpointConstant.dashboard,
    element: (
      <AuthMiddleware allowedRoles={allowedRoles}>
        <DashboardLayout />
      </AuthMiddleware>
    ),
    children: [
      {
        path: endpointConstant.dashboard,
        element: <Dashboard />,
      },
    ],
  },
];

export default DashboardRouter;
