import React from "react";
import ReactDOM from "react-dom";



import "./index.scss";



import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App></App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root2")
);

serviceWorkerRegistration.register();
reportWebVitals();
