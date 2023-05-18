import { createBrowserRouter } from "react-router-dom";

import AuthRouter from "./auth.router";
import PksRouter from "./pks.router";

import OtherRouter from "./other.router";

const routes = [...AuthRouter, ...PksRouter, ...OtherRouter];
const router = createBrowserRouter(routes, { basename: "/" });

export default router;
