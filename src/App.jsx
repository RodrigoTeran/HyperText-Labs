import React, { useState, createContext } from "react";
import Nav from "./components/Nav";
import Menu from "./components/Layout";

// Context API
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { variantsLoading, variantsColumns } from "./Variants/variantsApp";

// Pages
import CreateAccount from "./pages/CreateAccount";
import LogIn from "./pages/LogIn";
import Inicio from "./pages/Inicio";

// Hooks
import { useFetchCB } from "./hooks/useFetcher";

export const GlobalContext = createContext();

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

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
      <AnimatePresence exitBeforeEnter>
        {loading ? (
          <motion.div
            key="4"
            style={{ marginTop: "20px" }}
            className="layout__loader"
            variants={variantsLoading}
            exit="exit"
            animate="visible"
            initial="hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" />
            </svg>
          </motion.div>
        ) : (
          <motion.div
            className="layoutColumns"
            variants={variantsColumns}
            exit="exit"
            animate="visible"
            initial="hidden"
          >
            <Menu></Menu>
            <div className={`layoutColumns__content`}>
              <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.key}>
                  <Route exact path="/">
                    <Inicio></Inicio>
                  </Route>

                  <Route exact path="/crear-cuenta">
                    <CreateAccount></CreateAccount>
                  </Route>

                  <Route exact path="/iniciar-sesion">
                    <LogIn></LogIn>
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
          </motion.div>
        )}
      </AnimatePresence>
    </GlobalContext.Provider>
  );
};

export default App;
