// React
import React, { useEffect, useState } from "react";

const Menu = () => {
  const [isMenu, setIsMenu] = useState(false);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseMove = (event) => {
    if (event.screenX < 100) {
      setIsMenu(true);
    } else {
      setIsMenu(false);
    }
  };

  return <div className={`menuLayout ${isMenu ? "menuOpen" : ""}`}>d</div>;
};

export default Menu;
