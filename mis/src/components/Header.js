import React from "react";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
} from "@material-ui/core";

import { NotificationsNone } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    transform: "translate(0)",
    color: "#272c34",
    "& h6": {
      fontSize: "13px",
      display: "inline-block",
      paddingRight: "1.5vw",
    },
  },
  searchInput: {
    fontSize: "12px",
    padding: "0 8px",
    opacity: "0.6",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  list: {
    "& li": {
      display: "inline-block",
      listStyleType: "none",
      paddingRight: "10px",
      paddingLeft: "10px",
      marginTop: "-5px",
      fontSize: "12px",
    },
    "& a": {
      color: "#000",
      textDecoration: "none",
    },
    "& li:hover": {
      borderBottom: "1px solid #000",
    },
  },

  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
});

const Header = () => {
  const classes = useStyles();
  const isActive = {
    borderBottom: "1px solid #000",
  };
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <ul className={classes.list}>
                <li>
                  <a>Dashboard</a>
                </li>
                <li>
                  <NavLink to={"/"} activeStyle={isActive}>
                    Setings
                  </NavLink>
                </li>
                <li>
                  <a>Registration</a>
                </li>
                <li>
                  <a>Attendance</a>
                </li>
                <li>
                  <a>User Profile</a>
                </li>
                <li>
                  <NavLink to={"/examination"} activeStyle={isActive}>
                    Examination
                  </NavLink>
                </li>
                <li>
                  <a>Assignment</a>
                </li>
              </ul>
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
              <IconButton>
                <Badge badgeContent={2} color="secondary">
                  <NotificationsNone />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
