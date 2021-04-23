import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { GlobalContext } from "../App";
import { motion, AnimatePresence } from "framer-motion";
import { useFetchCB } from "../hooks/useFetcher";
import { variantsLoading, variantsColumns } from "../Variants/variantsApp";

const Nav = () => {
  const data = useContext(GlobalContext);
  const [conditionalFetching, setConditionalFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  const [isNav, setNav] = useState(false);

  useFetchCB(
    `${process.env.REACT_APP_API_URL}/logout`,
    "PUT",
    conditionalFetching,
    (data) => {
      handleLogout(data);
    },
    setIsLoading
  );

  const handleLogout = (_data) => {
    setConditionalFetching(false);
    localStorage.removeItem("token");
    data.reFetchGlobalData();
    setIsRedirect(true);
  };

  return (
    <nav className="nav">
      {isRedirect ? <Redirect to="/"></Redirect> : null}
      <div className="nav__column">
        <Link to="/" className="nav__column__link__left">
          HyperText
        </Link>
      </div>
      <div
        className="nav__column__dropdown"
        onClick={() => {
          console.log("xd")
          setNav(!isNav);
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`nav__column ${isNav ? "open" : ""}`}>
        <AnimatePresence exitBeforeEnter>
          {data.isLoading || isLoading ? (
            <motion.div
              key="4"
              className="nav__column__loader"
              variants={variantsLoading}
              exit="exit"
              animate="visible"
              initial="hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" />
              </svg>
            </motion.div>
          ) : data.globalData?.auth ? (
            <>
              <motion.span
                onClick={() => {
                  setNav(false);
                  setConditionalFetching(true);
                }}
                className="nav__column__link__right"
                variants={variantsColumns}
                exit="exit"
                animate="visible"
                initial="hidden"
              >
                Cerrar Sesión
              </motion.span>
              <motion.span
                variants={variantsColumns}
                exit="exit"
                animate="visible"
                initial="hidden"
                style={{ marginLeft: "20px", color: "var(--white)" }}
              >
                {data.globalData?.user.username}
              </motion.span>
              <motion.div
                className="nav__column__image"
                variants={variantsColumns}
                exit="exit"
                animate="visible"
                initial="hidden"
              >
                <img src="user.png" alt="" />
              </motion.div>
            </>
          ) : (
            <>
              <motion.span
                variants={variantsColumns}
                exit="exit"
                animate="visible"
                initial="hidden"
              >
                <Link to="/iniciar-sesion" className="nav__column__link__right">
                  Iniciar Sesión
                </Link>
              </motion.span>
              <motion.span
                variants={variantsColumns}
                exit="exit"
                animate="visible"
                initial="hidden"
              >
                <Link to="/crear-cuenta" className="nav__column__link__right">
                  Crear Cuenta
                </Link>
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
export default Nav;
