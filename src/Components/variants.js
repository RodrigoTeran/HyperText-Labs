export const variantsLoading = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: .5,
    transition: {
      duration: 1,
      delay: 1
    },
  },
};
export const variantsListaPokemones = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      staggerChildren: .05,
      when: "beforeChildren",
    },
  },
};
export const variantsListaPokemonesColumn = {
  hidden: {
    y: 10,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 200 },
  },
};
