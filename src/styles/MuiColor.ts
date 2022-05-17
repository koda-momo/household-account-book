import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    mbg: PaletteOptions["primary"];
  }
  interface PaletteOptions {
    mpink: PaletteOptions["primary"];
  }
  interface PaletteOptions {
    myellow: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    error: {
      main: "#F6416C",
      contrastText: "#fff",
    },
    primary: {
      main: "#00B8A9",
      contrastText: "#fff",
    },
    mbg: {
      main: "#F8F3D4",
    },
    mpink: {
      main: "#F6416C",
      contrastText: "#fff",
    },
    myellow: {
      main: "#FFDE7D",
      contrastText: "#fff",
    },
  },
});
