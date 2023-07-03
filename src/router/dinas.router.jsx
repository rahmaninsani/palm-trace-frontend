import React from "react";
import { Navigate } from "react-router-dom";

import { ROLE } from "../config";

import DashboardLayout from "../layout/DashboardLayout";
import { HargaSawit, Profil } from "../pages/dinas";

const role = ROLE.DINAS;
const DinasRouter = [
  {
    path: `/${role}`,
    element: <DashboardLayout role={role} />,
    children: [
      {
        path: `/${role}`,
        element: <Navigate to={`/${role}/harga-sawit`} replace />,
      },
      {
        path: `/${role}/harga-sawit`,
        element: <HargaSawit />,
      },
      {
        path: `/${role}/profil`,
        element: <Profil />,
      },
    ],
  },
];

export default DinasRouter;
