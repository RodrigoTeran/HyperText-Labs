import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App></App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
reportWebVitals();

// 1
// create-react-app nombreDeLaApp --template cra-template-pwa

// flags   git commit -m 

// 2
// npm install node-sass@4.14.1 react-router-dom react-helmet framer-motion
