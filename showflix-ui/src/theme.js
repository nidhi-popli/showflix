import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e50914"
    },
    background: {
      default: "#121212",
      paper: "#1c1c1c"
    }
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",

    h6: {
      fontWeight: 700
    }
  }
});

export default theme;
