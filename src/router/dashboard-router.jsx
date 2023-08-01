import React from "react";

import role from "../constants/role";
import endpoint from "../constants/endpoint";
import { RequireAuth } from "../utils";
import DashboardLayout from "../layout/DashboardLayout";
import { Dashboard } from "../pages";

const allowedRoles = [role.pks, role.koperasi, role.petani];
const DashboardRouter = [
  {
    path: endpoint.dashboard,
    element: (
      <RequireAuth allowedRoles={allowedRoles}>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: endpoint.dashboard,
        element: <Dashboard />,
      },
    ],
  },
];

export default DashboardRouter;
