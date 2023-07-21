import React from "react";
import { RouterProvider } from "react-router-dom";

//scss
import "./assets/scss/hope-ui.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/customizer.scss";

// CSS
import "react-toastify/dist/ReactToastify.css";

import router from "./router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
