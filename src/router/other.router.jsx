import React from "react";

import { Login, NotFound } from "../pages/others";

const OtherRouter = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default OtherRouter;
