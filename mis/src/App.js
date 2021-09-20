import React from "react";
import "./App.css";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import {
  createTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: "#eaeff5",
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "15%",
    width: "100%",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SideMenu />
        <div className={classes.appMain}>
          <Header />
        </div>
        <CssBaseline />
      </ThemeProvider>
    </Router>
  );
};

export default App;
