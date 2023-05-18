import React from "react";
import { RouterProvider } from "react-router-dom";

//scss
import "./assets/scss/hope-ui.scss";

import router from "./router";

const App = () => {
  return (
    // <Provider store={store}>
    <RouterProvider router={router} />
    // </Provider>
  );
};

export default App;
