import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../App";

const Nav = () => {
  const data = useContext(GlobalContext);
  return (
    <nav className="nav">
      <div className="nav__column">
        <Link to="/" className="nav__column__link__left">
          HyperText
        </Link>
      </div>

      <div className="nav__column">
        {data.isLoading ? (
          "Cargando..."
        ) : data.globalData?.auth ? (

          <>
            <Link to="/" className="nav__column__link__right">
              Cerrar Sesión
            </Link>
            <img src="user.png" alt=""/>
          </>
        ) : (
          <>
            <Link to="/" className="nav__column__link__right">
              Iniciar Sesión
            </Link>
            <Link to="/crear-cuenta" className="nav__column__link__right">
              Crear Cuenta
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;
