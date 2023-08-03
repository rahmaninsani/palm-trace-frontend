import React from "react";
import { Navigate } from "react-router-dom";

import { endpointConstant } from "../constants";
import { NotFound } from "../pages";

const OtherRouter = [
  {
    path: "/",
    element: <Navigate to={endpointConstant.login} replace />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default OtherRouter;
