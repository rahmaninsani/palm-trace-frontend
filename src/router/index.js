import { createBrowserRouter } from "react-router-dom";

import AuthRouter from "./auth.router";
import PetaniRouter from "./petani.router";
import KoperasiRouter from "./koperasi.router";
import PksRouter from "./pks.router";
import DinasRouter from "./dinas.router";

import OtherRouter from "./other.router";

const routes = [...AuthRouter, ...PetaniRouter, ...KoperasiRouter, ...PksRouter, ...DinasRouter, ...OtherRouter];
const router = createBrowserRouter(routes, { basename: "/" });

export default router;
