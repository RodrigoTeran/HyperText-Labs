import React, { useContext } from "react";

import { GlobalContext } from "../App";

const Inicio = () => {
  const data = useContext(GlobalContext);
  return (
    <div className="home">
      <h1>HyperText</h1>
      <span>{data.globalData?.auth ? data.globalData?.user.username : "NEL"}</span>
    </div>
  );
};
export default Inicio;
