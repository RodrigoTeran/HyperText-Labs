import React, { useState, useEffect, useRef } from "react";
// Hooks

import {
  variantsLoading,
  variantsListaPokemones,
  variantsListaPokemonesColumn,
} from "./variants";

import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const referenciaDelH1 = useRef(null);

  const [pokemones, cambiarPokemones] = useState([]);

  useEffect(() => {
    // Antes
    // https://pokeres.bastionbot.org/images/pokemon/1.png

    fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cambiarPokemones(data.results);
      });
  }, []);

  return (
    <header>
      <AnimatePresence exitBeforeEnter>
        {pokemones.length === 0 ? (
          <motion.div
            variants={variantsLoading}
            key="1"
            exit="exit" // se quita
            animate="visible" // entra
            initial="hidden" // inicial
            className="loading"
          >
            Cargando...
          </motion.div>
        ) : (
          <motion.div
            variants={variantsListaPokemones}
            animate="visible"
            initial="hidden"
            className="h1__wrapper"
          >
            <motion.h1 variants={variantsListaPokemonesColumn} ref={referenciaDelH1}>
              Pokemones
            </motion.h1>
            <button
              onClick={() => {
                const mih1 = referenciaDelH1.current;
                const style = getComputedStyle(mih1);
                console.log(style.width);
              }}
            >
              Console
            </button>
            <div className="lista-pokemones">
              {pokemones.map((pokemon, index) => {
                return (
                  <motion.div
                    variants={variantsListaPokemonesColumn}
                    className="lista-pokemones__column"
                    key={index}
                  >
                    {" "}
                    <div className="lista-pokemones__column__card">
                      <img
                        src={`https://pokeres.bastionbot.org/images/pokemon/${
                          index + 1
                        }.png`}
                        alt=""
                      />
                      <div>{pokemon.name}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default App;
