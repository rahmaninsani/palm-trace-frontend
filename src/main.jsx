import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import axios from "axios";

import { store } from "./app/store";
import App from "./App";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
