import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { AuthProvider } from "./Context/AuthContext";
import { SiteProvider } from "./Context/SiteContext";

import CssBaseline from "@material-ui/core/CssBaseline";

import { createTheme } from "@material-ui/core/styles";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = createTheme({
  overrides: {
    MuiPickersBasePicker: {
      pickerView: { minWidth: "100%" },
    },
    MuiPickersCalendarHeader: {
      daysHeader: {
        justifyContent: "space-around",
      },
    },
    MuiPickersCalendar: {
      week: {
        justifyContent: "space-around",
      },
    },
  },
  heading: {
    fontFamily: "Montserrat, san-serif",
    // color: "#00897b",
    fontSize: "4rem",
    fontWeight: 500,
    marginBottom: 25,
    marginTop: 25,
  },
  typography: {
    fontFamily: "Montserrat, Arial",
    fontSize: 16,
  },
  palette: {
    primary: {
      main: "#616161", //gray
      dark: "#373737",
      light: "#8e8e8e",
    },
    secondary: {
      main: "#fff59d", //yellow
      dark: "#cbc26d",
      light: "ffffcf",
    },
    warning: {
      main: "#bf360c",
    },
    // error: {},
    fonts: {
      white: "#ffffff",
      black: "#000000",
    },
    accent: {
      main: "#00897b",
    },
    grayGradient: {
      // background: "rgb(97,97,97)",
      background:
        "linear-gradient(180deg, rgba(97,97,97,1) 0%, rgba(66,66,66,1) 100%)",
    },
    appBackground: "#e0e0e0",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <SiteProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </SiteProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
