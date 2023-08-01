import React from "react";

import endpoint from "../constants/endpoint";
import { CheckUser } from "../utils";
import { Register, Login } from "../pages";

const AuthRouter = [
  {
    path: endpoint.register,
    element: (
      <CheckUser>
        <Register />
      </CheckUser>
    ),
  },
  {
    path: endpoint.login,
    element: (
      <CheckUser>
        <Login />
      </CheckUser>
    ),
  },
];

export default AuthRouter;
