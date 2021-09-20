import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0",
    height: "100%",
    width: "15%",
    backgroundColor: "#253053",
    position: "fixed",
    "& h6": {
      fontSize: "13px",
      padding: "13px 13px 13px 20px",
      color: "#fff",
      borderBottom: "1px solid #b5b6ad",
    },
    "& h6:hover": {
      color: "#253053",
      backgroundColor: "#fff",
      textDecoration: "none",
    },
  },
});

const SideMenu = () => {
  const classes = useStyles();
  return (
    <div className={classes.sideMenu}>
      <Typography
        variant="h5"
        style={{ color: "#fff", textAlign: "center", padding: " 17px 0" }}
      >
        Dashboard
      </Typography>
      <Link to={"/"}>
        <Typography variant="h6">Colleges</Typography>
      </Link>
      <Link to={"/quick-links"}>
        <Typography variant="h6">Staff Management</Typography>
      </Link>
      <Link to={"/dashboard-view-header"}>
        <Typography variant="h6">Teacher Mapping</Typography>
      </Link>
      <Link to={"/role-view-link"}>
        <Typography variant="h6">Academic Setup</Typography>
      </Link>
      <Link to={"/employee-view-link"}>
        <Typography variant="h6">Student Management</Typography>
      </Link>
      <Link to={"/personalized-dashboard-view"}>
        <Typography variant="h6">Attendance Management</Typography>
      </Link>
      <Link to={"/personalized-dashboard-view"}>
        <Typography variant="h6">Security</Typography>
      </Link>
    </div>
  );
};

export default SideMenu;
