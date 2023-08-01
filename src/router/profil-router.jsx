import React from "react";

import role from "../constants/role";
import endpoint from "../constants/endpoint";
import { RequireAuth } from "../utils";
import DashboardLayout from "../layout/DashboardLayout";
import { Profil } from "../pages";

const allowedRoles = [role.pks, role.koperasi, role.petani];
const LaporanRouter = [
  {
    path: endpoint.profil,
    element: (
      <RequireAuth allowedRoles={allowedRoles}>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: endpoint.profil,
        element: <Profil />,
      },
    ],
  },
];

export default LaporanRouter;
