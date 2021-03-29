import React, { useState } from "react";
import Nav from "./components/Nav";
import Menu from "./components/Layout";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import CreateAccount from "./pages/CreateAccount";
import Inicio from "./pages/Inicio";

// Hooks
import { useFetch } from "./hooks/useFetcher";

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // GET POST PUT DELETE
  const data = useFetch(process.env.REACT_APP_API_URL, "GET", setLoading);
  return (
    <>
      <Nav></Nav>
      <div className="layoutComlumns">
        <Menu></Menu>
        <div className="layoutComlumns__content">
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route exact path="/">
                <Inicio
                  texto={data}
                ></Inicio>
              </Route>

              <Route exact path="/crear-cuenta">
                <CreateAccount></CreateAccount>
              </Route>
              <Route>
                <motion.div
                  exit={{
                    opacity: 0,
                  }}
                >
                  <Redirect to="/"></Redirect>
                </motion.div>
              </Route>
            </Switch>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default App;
