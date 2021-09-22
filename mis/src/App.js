import React, { Suspense, lazy } from "react";
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

const Settings = lazy(() => import("./settings/Settings"));
const EmployeeManagement = lazy(() =>
  import("./settings/employeeManagement/EmployeeManagement")
);

const theme = createTheme({
  palette: {
    background: {
      default: "#eaeff5",
    },
  },
  MuiButtonRoot: {
    minWidth: "10px",
    fontSize: "12px",
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
    <Suspense fallback={<div></div>}>
      <Router>
        <ThemeProvider theme={theme}>
          <SideMenu />
          <div className={classes.appMain}>
            <Header />
            <Route
              path={"/employee-management"}
              component={EmployeeManagement}
            />
            <Route exact path={"/"} component={Settings} />
          </div>
          <CssBaseline />
        </ThemeProvider>
      </Router>
    </Suspense>
  );
};

export default App;
