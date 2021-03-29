import React from "react";

const Inicio = ({ texto }) => {
  return (
    <div className="home">
      <h1>HyperText</h1>
      <span>{texto.auth ? texto.user.username : ""}</span>
    </div>
  );
};
export default Inicio;
