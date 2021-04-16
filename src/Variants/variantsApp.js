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
      delay: .3
    },
  },
};

export const variantsColumns = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
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