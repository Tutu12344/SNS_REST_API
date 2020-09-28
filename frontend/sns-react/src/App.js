import React from "react";
import "./App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import Navbar from "./components/Navbar";
import ApiContextProvider from "./context/ApiContext";
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: "Comic Neue",
  },
});

function App() {
  return (
    <ApiContextProvider>
      <MuiThemeProvider theme={theme}>
        <Navbar />
      </MuiThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
