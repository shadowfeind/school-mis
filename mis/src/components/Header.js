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
  activeList: {
    borderBottom: "1px solid #000",
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <ul className={classes.list}>
                <li>
                  <a href="http://103.90.86.151:85/#/">Dashboard</a>
                </li>
                <li className={classes.activeList}>
                  {" "}
                  <a href="http://103.90.86.151:85/#/settings">Setings</a>
                </li>
                <li>
                  <a href="http://103.90.86.151:85/#/registration">
                    Registration
                  </a>
                </li>
                <li>
                  <a href="http://103.90.86.151:85/#/Attendance">Attendance</a>
                </li>
                <li>
                  <a href="http://103.90.86.151:85/#/user_profile">
                    User Profile
                  </a>
                </li>
                <li>
                  <a href="http://103.90.86.151:85/#/examination">
                    Examination
                  </a>
                </li>
                <li>
                  <a href="http://103.90.86.151:85/#/assignment">Assignment</a>
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
