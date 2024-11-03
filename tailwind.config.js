module.exports = {
  theme: {
    extend: {
      colors: {
        textDark: "#e8e6e3",
        bg: "#B1A6A4",
        bgDark: "#181a1b",
      },
      typography: (theme) => ({
        lg: {
          css: {
            ul: {
              marginLeft: "1.25rem",
              paddingLeft: "1.25rem",
            },
            li: {
              marginTop: "0",
              marginBottom: "0",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "selector",
};
