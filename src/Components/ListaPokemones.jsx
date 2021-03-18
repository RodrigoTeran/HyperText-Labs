import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
// Hooks

import {
  variantsLoading,
  variantsListaPokemones,
  variantsListaPokemonesColumn,
} from "./variants";

import { motion, AnimatePresence } from "framer-motion";


const App = () => {
  const referenciaDelH1 = useRef(null);

  const [value, setValue] = useState(0);

  const [pokemones, cambiarPokemones] = useState([]);

  const miFuncion = () => {
    console.log("hola")
  };

  useEffect(() => {
    // casi siempre
    // Antes
    // https://pokeres.bastionbot.org/images/pokemon/1.png

    fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cambiarPokemones(data.results)
      });
  }, []);

  useLayoutEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);

  return (
    <header>
      <div onClick={() => setValue(0)}>value: {value}</div>
      <div onClick={miFuncion}>click</div>

      {/* <h4 style={{
        backgroundColor: "yellow"
      }} className="h4" id="h4" atributonsnisfo="h4">
        hola que tal
      </h4> */}

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
            id="h1_wrapper"
          >
            <motion.h1
              variants={variantsListaPokemonesColumn}
              ref={referenciaDelH1}
            >
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
