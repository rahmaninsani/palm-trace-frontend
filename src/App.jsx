import React from "react";
import { RouterProvider } from "react-router-dom";

//scss
import "./assets/scss/hope-ui.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/customizer.scss";

// CSS
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

import router from "./router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
