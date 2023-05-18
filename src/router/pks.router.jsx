import React from "react";

import { ROLE } from "../config";
import { RequireAuth } from "../utils";

import DashboardLayout from "../layout/DashboardLayout";
import { Dashboard, PenawaranKeluarList, PenawaranKeluarAddKontrak, PenawaranKeluarAddDO, PenawaranMasukList } from "../pages/pks";

const PksRouter = [
  {
    path: "/pks",
    element: (
      <RequireAuth role={ROLE.PKS}>
        <DashboardLayout role={ROLE.PKS} />
      </RequireAuth>
    ),
    children: [
      {
        path: "/pks",
        element: <Dashboard />,
      },
      {
        path: "/pks/penawaran-keluar",
        element: <PenawaranKeluarList />,
      },
      {
        path: "/pks/penawaran-keluar/tambah-kontrak",
        element: <PenawaranKeluarAddKontrak />,
      },
      {
        path: "/pks/penawaran-keluar/tambah-do",
        element: <PenawaranKeluarAddDO />,
      },
      {
        path: "/pks/penawaran-masuk",
        element: <PenawaranMasukList />,
      },
    ],
  },
];

export default PksRouter;
