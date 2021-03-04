import React from "react";
import ListaPokemones from "./Components/ListaPokemones";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const location = useLocation();

  return (
    <>
      <div className="menu">HYPER POKEMON</div>



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
