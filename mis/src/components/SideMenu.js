import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
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
      color: "#253053",
      backgroundColor: "#fff",
      textDecoration: "none",
    },
    "& a:hover": { textDecoration: "none" },
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
        <Typography variant="h6">
          {" "}
          <School fontSize="small" />
          &nbsp;&nbsp;&nbsp; School Configuration
        </Typography>
      </Link>
      <Link to={"/quick-links"}>
        <Typography variant="h6">
          {" "}
          <Accessible fontSize="small" />
          &nbsp;&nbsp;&nbsp; Employee Management
        </Typography>
      </Link>
      <Link to={"/dashboard-view-header"}>
        <Typography variant="h6">
          {" "}
          <PeopleOutline fontSize="small" />
          &nbsp;&nbsp;&nbsp; Teacher Mapping
        </Typography>
      </Link>
      <Link to={"/role-view-link"}>
        <Typography variant="h6">
          {" "}
          <ChromeReaderMode fontSize="small" /> &nbsp;&nbsp;&nbsp;Academic
          Configuration
        </Typography>
      </Link>
      <Link to={"/employee-view-link"}>
        <Typography variant="h6">
          {" "}
          <Face fontSize="small" />
          &nbsp;&nbsp;&nbsp; Student Management
        </Typography>
      </Link>
      <Link to={"/personalized-dashboard-view"}>
        <Typography variant="h6">
          <Assessment fontSize="small" />
          &nbsp;&nbsp;&nbsp; Attendance Configuration
        </Typography>
      </Link>
      <Link to={"/personalized-dashboard-view"}>
        <Typography variant="h6">
          {" "}
          <Settings fontSize="small" />
          &nbsp;&nbsp;&nbsp; Access Control
        </Typography>
      </Link>
      <Link to={"/personalized-dashboard-view"}>
        <Typography variant="h6">
          <PostAdd fontSize="small" />
          &nbsp;&nbsp;&nbsp; Notice
        </Typography>
      </Link>
      <Link to={"/personalized-dashboard-view"}>
        <Typography variant="h6">
          <RecordVoiceOver fontSize="small" />
          &nbsp;&nbsp;&nbsp; Announcement
        </Typography>
      </Link>
    </div>
  );
};

export default SideMenu;
