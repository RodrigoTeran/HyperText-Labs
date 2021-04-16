import React, { useState, useRef, useContext } from "react";
import FormInput from "../components/Forms/FormInput";
import { GlobalContext } from "../App";
import { Redirect } from "react-router-dom";

// Hook
import { useFetchCB } from "../hooks/useFetcher";

const CreateAccount = () => {
  const [valueEmail, setEmail] = useState("");
  const [valuePassword, setPassword] = useState("");
  const [valueUsername, setUsername] = useState("");

  const globalData = useContext(GlobalContext);
  const [isRedirect, setIsRedirect] = useState(false);

  // Fetching
  const [loading, setLoading] = useState(false);

  const bodyFetch = useRef({
    username: "",
    password: "",
    email: "",
  });

  const [conditionalFetch, setConditionalFetch] = useState(false);

  useFetchCB(
    `${process.env.REACT_APP_API_URL}/signup`,
    "POST",
    conditionalFetch,
    (data) => {
      handleSubmitCB(data);
    },
    setLoading,
    bodyFetch.current
  );

  const handleSubmitCB = (data) => {
    setConditionalFetch(false);
    console.log(data);
    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      globalData.reFetchGlobalData();
      setIsRedirect(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bodyFetch.current = {
      username: valueUsername,
      password: valuePassword,
      email: valueEmail,
    };

    setConditionalFetch(true);
  };
  return (
    <div className="createAccount">
      {isRedirect ? <Redirect to="/"></Redirect> : null}
      <h1>Crear Cuenta</h1>
      <div className="createAccount__formContainer">
        <form action="" onSubmit={handleSubmit}>
          <FormInput
            id="createAccountInput__username"
            text="Nombre de usuario"
            inputValue={valueUsername}
            setInputValue={setUsername}
            type="text"
          ></FormInput>
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
      {loading ? <div>Cargando</div> : null}
    </div>
  );
};
export default CreateAccount;
