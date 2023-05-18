import React from "react";

import { Register, Login } from "../pages/others";

const AuthRouter = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default AuthRouter;
