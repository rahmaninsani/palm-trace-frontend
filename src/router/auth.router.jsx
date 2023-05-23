import React from "react";
import { CheckUser } from "../utils";

import { Register, Login } from "../pages/others";

const AuthRouter = [
  {
    path: "/register",
    element: (
      <CheckUser>
        <Register />
      </CheckUser>
    ),
  },
  {
    path: "/login",
    element: (
      <CheckUser>
        <Login />
      </CheckUser>
    ),
  },
];

export default AuthRouter;
