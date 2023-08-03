import React from "react";

import { endpointConstant } from "../constants";
import { IsLoggedInMiddleware } from "../middlewares";
import { Register, Login } from "../pages";

const AuthRouter = [
  {
    path: endpointConstant.register,
    element: (
      <IsLoggedInMiddleware>
        <Register />
      </IsLoggedInMiddleware>
    ),
  },
  {
    path: endpointConstant.login,
    element: (
      <IsLoggedInMiddleware>
        <Login />
      </IsLoggedInMiddleware>
    ),
  },
];

export default AuthRouter;
