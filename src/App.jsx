import React from "react";

import ListaPokemones from "./Components/ListaPokemones";
import Animaciones from "./Components/Animaciones";
import Co from "./Components/Co";

import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const location = useLocation();

  return (
    <>
      <div className="menu">HYPER POKEMON</div>
      <Animaciones></Animaciones>
      <Co></Co>


      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <ListaPokemones></ListaPokemones>
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
    </>
  );
};

export default App;
