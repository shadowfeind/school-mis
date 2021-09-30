import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  School,
  Accessible,
  PeopleOutline,
  ChromeReaderMode,
  Face,
  Assessment,
  Settings,
  PostAdd,
  RecordVoiceOver,
} from "@material-ui/icons";

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
      display: "inline-flex",
      width: "100%",
    },
    "& h6:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      textDecoration: "none",
    },
    "& a:hover": { textDecoration: "none" },
  },
});

const SideMenu = () => {
  const classes = useStyles();
  const isActive = {
    color: "#253053",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    textDecoration: "none",
  };
  return (
    <div className={classes.sideMenu}>
      <Typography
        variant="h5"
        style={{ color: "#fff", textAlign: "center", padding: " 17px 0" }}
      >
        Dashboard
      </Typography>
      <NavLink to={"/"} exact={true} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <School fontSize="small" />
          &nbsp;&nbsp;&nbsp; School Configuration
        </Typography>
      </NavLink>
      <NavLink to={"/employee-management"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <Accessible fontSize="small" />
          &nbsp;&nbsp;&nbsp; Employee Management
        </Typography>
      </NavLink>
      <NavLink to={"/academic-configuration"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <ChromeReaderMode fontSize="small" /> &nbsp;&nbsp;&nbsp;Academic
          Configuration
        </Typography>
      </NavLink>
      <NavLink to={"/dashboard-view-header"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <PeopleOutline fontSize="small" />
          &nbsp;&nbsp;&nbsp; Teacher Mapping
        </Typography>
      </NavLink>

      <NavLink to={"/employee-view-NavLink"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <Face fontSize="small" />
          &nbsp;&nbsp;&nbsp; Student Management
        </Typography>
      </NavLink>
      <NavLink to={"/personalized-dashboard-view"} activeStyle={isActive}>
        <Typography variant="h6">
          <Assessment fontSize="small" />
          &nbsp;&nbsp;&nbsp; Attendance Configuration
        </Typography>
      </NavLink>
      <NavLink to={"/personalized-dashboard-view"} activeStyle={isActive}>
        <Typography variant="h6">
          {" "}
          <Settings fontSize="small" />
          &nbsp;&nbsp;&nbsp; Access Control
        </Typography>
      </NavLink>
      <NavLink to={"/personalized-dashboard-view"} activeStyle={isActive}>
        <Typography variant="h6">
          <PostAdd fontSize="small" />
          &nbsp;&nbsp;&nbsp; Notice
        </Typography>
      </NavLink>
      <NavLink to={"/personalized-dashboard-view"} activeStyle={isActive}>
        <Typography variant="h6">
          <RecordVoiceOver fontSize="small" />
          &nbsp;&nbsp;&nbsp; Announcement
        </Typography>
      </NavLink>
    </div>
  );
};

export default SideMenu;
