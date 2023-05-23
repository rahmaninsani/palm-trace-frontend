import React from "react";

import { ROLE } from "../config";
import { RequireAuth } from "../utils";

import DashboardLayout from "../layout/DashboardLayout";
import { Dashboard } from "../pages/koperasi";

const KoperasiRouter = [
  {
    path: `/${ROLE.KOPERASI}`,
    element: (
      <RequireAuth role={ROLE.KOPERASI}>
        <DashboardLayout role={ROLE.KOPERASI} />
      </RequireAuth>
    ),
    children: [
      {
        path: `/${ROLE.KOPERASI}`,
        element: <Dashboard />,
      },
    ],
  },
];

export default KoperasiRouter;
