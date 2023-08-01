import { createBrowserRouter } from "react-router-dom";

import AuthRouter from "./auth-router";
import DashboardRouter from "./dashboard-router";
import ReferensiHarga from "./referensi-harga-router";
import Kontrak from "./kontrak-router";
import Laporan from "./laporan-router";
import Profil from "./profil-router";
import OtherRouter from "./other-router";

const routes = [...AuthRouter, ...DashboardRouter, ...ReferensiHarga, ...Kontrak, ...Laporan, ...Profil, ...OtherRouter];
const router = createBrowserRouter(routes, { basename: "/" });

export default router;
