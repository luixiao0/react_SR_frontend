module.exports = {
  purge: [],
  darkMode: 'media', // or 'media' or 
  theme: {
    extend: {
      blur: {
        xs: '1.5px',
      },
      // spacing: {
      //   '1': '8px',
      //   '2': '12px',
      //   '3': '16px',
      //   '4': '24px',
      //   '5': '32px',
      //   '6': '48px',
      // },
      width: {
        '3/8': '37.5%',
        '5/8': '62.5%',
        '5/16': '31.25%',
      },
      minWidth: {
        '3/8': '37.5%',
        '5/8': '62.5%',
        '5/16': '31.25%'
      },

      screens: {
        'xs': '320px',
        light: { raw: "(prefers-color-scheme: light)" },
        dark: { raw: "(prefers-color-scheme: dark)" }
      }
    }
  },
  plugins: [
    function ({ addBase, config }) {
      addBase({
        body: {
          color: config("theme.colors.black"),
          backgroundColor: config("theme.colors.white")
        },
        "@screen dark": {
          body: {
            color: config("theme.colors.white"),
            backgroundColor: config("theme.colors.black")
          }
        }
      });
    }
  ],
}
