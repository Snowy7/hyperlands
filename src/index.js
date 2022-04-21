import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    background: {
      default: "#000000cc",
      paper: "#000000cc",
    },
    primary: {
      main: "#000000b0",
      darker: "#fff",
    },
    text: {
      main: "#fff",
      darker: "#000",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    mode: "dark",
  },
  components: {
    // Use `MuiDataGrid` on both DataGrid and DataGridPro
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000cc",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
