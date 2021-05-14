module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: (theme) => ({
        hero: "35rem",
        featured: "37rem",
      }),

      zIndex: {
        "-1": "-1",
      },

      fontFamily: {
        body: ["Montserrat"],
        heading: ["Poppins"],
      },
    },

    container: {
      padding: {
        DEFAULT: "1rem",
      },

      center: true,

      screens: {
        xl: "1800px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
