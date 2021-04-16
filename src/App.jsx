import React, { useState, useEffect, createContext } from "react";
import Nav from "./components/Nav";
import Menu from "./components/Layout";

// Context API

import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import CreateAccount from "./pages/CreateAccount";
import Inicio from "./pages/Inicio";

// Hooks
import { useFetchCB } from "./hooks/useFetcher";

export const GlobalContext = createContext();

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  // Nuevo
  const [globalData, setGlobalData] = useState(undefined);
  const [conditionalFetch, setConditionalFetch] = useState(true);

  // GET POST PUT DELETE
  useFetchCB(
    process.env.REACT_APP_API_URL,
    "GET",
    conditionalFetch,
    (data) => {
      handleFetch(data);
    },
    setLoading
  );

  const handleFetch = (data) => {
    setConditionalFetch(false);
    setGlobalData(data);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseMove = (event) => {
    if (event.screenX < 100) {
      setIsMenu(true);
    } else {
      setIsMenu(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        globalData: globalData,
        reFetchGlobalData: () => {
          setConditionalFetch(true);
        },
        isLoading: loading,
      }}
    >
      <Nav></Nav>
      {loading ? <div>cargando...</div> : null}
      <div className="layoutComlumns">
        <Menu></Menu>
        <div className={`layoutComlumns__content ${isMenu ? "menuOpen" : ""}`}>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route exact path="/">
                <Inicio></Inicio>
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
    </GlobalContext.Provider>
  );
};

export default App;
