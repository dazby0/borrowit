import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1e71d8",
      light: "#2e8cf2",
      dark: "#155aaa",
      contrastText: "#f0f3f7",
    },
    secondary: {
      main: "#14c8c5",
      light: "#5ed1ff",
      dark: "#0d9ba3",
    },
    background: {
      default: "#1a1d21",
      paper: "#23272f",
    },
    text: {
      primary: "#f0f3f7",
      secondary: "#b3bbc7",
    },
    divider: "#2f333a",
    error: {
      main: "#ff4f5e",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "0.85rem",
      fontWeight: 500,
      color: "#b3bbc7",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.9rem",
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
});

export default theme;
