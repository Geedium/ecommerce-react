import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const mode: PaletteMode = "dark";

import { Theme } from "@mui/material/styles";

// Create a theme instance.
const theme: Theme = createTheme({
  palette: {
    mode,
    // @ts-ignore
    ...(mode === "light"
      ? {
          primary: {
            main: "#A88358",
            contrastText: "#fff",
          },
          background: {
            default: "#181818",
            paper: "#181818",
          },
          secondary: {
            main: "#FFD29D",
            contrastText: "#fff",
          },
          text: {
            primary: "#fff",
            secondary: "#fff",
          },
        }
      : {
          primary: {
            main: "#A88358",
            contrastText: "#fff",
          },
          background: {
            default: "#181818",
            paper: "#181818",
          },
          secondary: {
            main: "#FFD29D",
            contrastText: "#fff",
          },
          text: {
            primary: "#fff",
            secondary: "#fff",
          },
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "white",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Bon Voyage';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: local('Bon Voyage'), local('Bon Voyage Regular'), url('/fonts/Bon Voyage Regular.otf') format('opentype');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
      `,
    },
  },
});

export default theme;
