// Framer-motion variants

// Mobile nav container, slides in from right
export const navVariants = {
  initial: {
    x: "100%",
  },
  enter: {
    x: 0,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.25 },
  },
};

// Underlay (when nav / search box are opened)
export const underlayVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.7,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

// Searchbox
export const searchboxVariants = {
  initial: {
    y: -50,
    x: "-50%",
    opacity: 0,
  },
  enter: {
    y: 0,
    x: "-50%",
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

// Featured content
export const featuredVariants = {
  initialFirst: {
    y: 50,
    opacity: 0,
  },
  enterFirst: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
    },
  },

  enterSecond: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      delay: 0.2,
    },
  },
};

// Article cards
export const cardVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },

  heroInitial: {
    opacity: 0.7,
  },

  heroEnter: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
