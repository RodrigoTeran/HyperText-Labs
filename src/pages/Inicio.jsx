import React, { useContext } from "react";

import { GlobalContext } from "../App";
import { motion } from "framer-motion";
import { variantsPages } from "../Variants/variantsPages";

const Inicio = () => {
  const data = useContext(GlobalContext);
  return (
    <motion.div
      className="home"
      variants={variantsPages}
      exit="exit"
      animate="visible"
      initial="hidden"
    >
      <h1>HyperText</h1>
      <span>
        {data.globalData?.auth ? (
          <div style={{ textAlign: "center" }}>
            Bienvenid@, {data.globalData?.user.username}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            Inicia sesión para usar HyperText
          </div>
        )}
      </span>
    </motion.div>
  );
};
export default Inicio;
