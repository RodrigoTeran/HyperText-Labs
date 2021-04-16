import React, { useState, useRef, useContext } from "react";
import FormInput from "../components/Forms/FormInput";
import { GlobalContext } from "../App";
import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import { variantsPages } from "../Variants/variantsPages";

// Hook
import { useFetchCB } from "../hooks/useFetcher";

const LogIn = () => {
  const [valueEmail, setEmail] = useState("");
  const [valuePassword, setPassword] = useState("");

  const globalData = useContext(GlobalContext);
  const [isRedirect, setIsRedirect] = useState(false);

  const [APIMessage, setAPIMessage] = useState("");

  // Fetching
  const [loading, setLoading] = useState(false);

  const bodyFetch = useRef({
    password: "",
    email: "",
  });

  const [conditionalFetch, setConditionalFetch] = useState(false);

  useFetchCB(
    `${process.env.REACT_APP_API_URL}/login`,
    "PUT",
    conditionalFetch,
    (data) => {
      handleSubmitCB(data);
    },
    setLoading,
    bodyFetch.current
  );

  const handleSubmitCB = (data) => {
    setConditionalFetch(false);
    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      globalData.reFetchGlobalData();
      setIsRedirect(true);
    } else {
      setAPIMessage(data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bodyFetch.current = {
      password: valuePassword,
      email: valueEmail,
    };

    setConditionalFetch(true);
  };
  return (
    <motion.div
      className="createAccount"
      variants={variantsPages}
      exit="exit"
      animate="visible"
      initial="hidden"
    >
      {isRedirect ? <Redirect to="/"></Redirect> : null}
      <h1>Iniciar Sesión</h1>
      <div className="createAccount__formContainer">
        <form action="" onSubmit={handleSubmit}>
          <FormInput
            id="createAccountInput__email"
            text="Correo"
            inputValue={valueEmail}
            setInputValue={setEmail}
            type="email"
          ></FormInput>
          <FormInput
            id="createAccountInput__password"
            text="Contraseña"
            inputValue={valuePassword}
            setInputValue={setPassword}
            type="password"
          ></FormInput>
          <input type="submit" value="Crear" />
        </form>
      </div>
      {loading ? (
        <div style={{ marginTop: "20px" }} className="layout__loader">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" />
          </svg>
        </div>
      ) : null}
      {APIMessage}
    </motion.div>
  );
};
export default LogIn;
