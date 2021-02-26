import React from "react";
import ListaPokemones from "./Components/ListaPokemones";
import { Switch, Route, Link, useLocation } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const location = useLocation();

  return (
    <>
      <div>menu</div>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <ListaPokemones></ListaPokemones>
          </Route>

          <Route>
            <motion.div
              exit={{
                opacity: 0,
                scale: 0.5,
                transition: {
                  duration: 1,
                  delay: 1,
                },
              }}
            >
              <Link to="/">
                <a>Ir a inicio</a>
              </Link>
            </motion.div>
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
};

export default App;
