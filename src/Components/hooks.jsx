import { useLayoutEffect } from "react";

const getTop = (component) => {
  return parseInt(
    component.getBoundingClientRect().top + document.scrollingElement.scrollTop
  );
};

export const useAnimaciones = (listaElementos, cuando, estiloARemover) => {
  useLayoutEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const handleScroll = () => {
    try {
      for (var i = 0; i < listaElementos.length; i++) {
        const top = getTop(listaElementos[i].current);
        if (
          document.scrollingElement.scrollTop >=
          top - window.innerHeight / (cuando + 1)
        ) {
          const html = listaElementos[i].current;
          html.classList.remove(estiloARemover);
        }
      }
    } catch {}
  };
};