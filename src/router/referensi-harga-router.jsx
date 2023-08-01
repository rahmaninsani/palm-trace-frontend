import React from "react";

import role from "../constants/role";
import endpoint from "../constants/endpoint";
import { RequireAuth } from "../utils";
import DashboardLayout from "../layout/DashboardLayout";
import { ReferensiHarga } from "../pages";

const allowedRoles = [role.pks, role.koperasi, role.petani];
const ReferensiHargaRouter = [
  {
    path: endpoint.referensiHarga,
    element: (
      <RequireAuth allowedRoles={allowedRoles}>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: endpoint.referensiHarga,
        element: <ReferensiHarga />,
      },
    ],
  },
];

export default ReferensiHargaRouter;
