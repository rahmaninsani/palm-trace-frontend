import React from "react";
import { Navigate } from "react-router-dom";

import { NotFound } from "../pages/others";

const OtherRouter = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default OtherRouter;
