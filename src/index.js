import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App/App";
// import ApiContextProvider from './Contexts/ApiContext'
// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  // <ApiContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // {/* </ApiContextProvider>,  */}
  document.getElementById("root")
);

// serviceWorker.unregister();
