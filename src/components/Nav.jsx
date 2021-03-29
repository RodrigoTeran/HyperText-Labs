import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav__column">
        <Link to="/" className="nav__column__link__left">HyperText</Link>
      </div>
      <div className="nav__column">
        <Link to="/" className="nav__column__link__right">Iniciar Sesión</Link>
        <Link to="/crear-cuenta" className="nav__column__link__right">Crear Cuenta</Link>
      </div>
    </nav>
  );
};
export default Nav;
