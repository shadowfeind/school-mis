import React from "react";
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
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
      paddingRight: "20px",
      fontSize: "12px",
    },
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
                <li>Dashboard</li>
                <li>Schools</li>
                <li>Settings</li>
                <li>Dashboard</li>
                <li>Dashboard</li>
                <li>Dashboard</li>
                <li>Dashboard</li>
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
