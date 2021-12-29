import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ExaminationRoute } from "../routesConfig/ExaminationRoute";
import { RegistrationRoute } from "../routesConfig/RegistrationRoute";
import { SettingsRoute } from "../routesConfig/SettingsRoute";

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
      padding: "13px 13px 13px 30px",
      color: "#fff",
      display: "inline-flex",
      width: "100%",
      position: "relative",
    },
    "& h6:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      textDecoration: "none",
    },
    "& svg": {
      color: "#fff",
      position: "absolute",
      marginTop: "12px",
      marginLeft: "15px",
    },
    "& a": { textDecoration: "none" },
    "& a:hover": { textDecoration: "none" },
  },
});

const SideMenu = () => {
  const [routeLinks, setRouteLinks] = useState([]);
  const [routeCheck, setRouteCheck] = useState("");
  const classes = useStyles();
  const isActive = {
    color: "#253053",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    textDecoration: "none",
  };
  const { navLink } = useSelector((state) => state.navLink);

  if (navLink === "/") {
    if (routeCheck !== "/") {
      setRouteCheck("/");
      setRouteLinks(SettingsRoute);
    }
  }
  if (navLink === "examination") {
    if (routeCheck !== "examination") {
      setRouteCheck("examination");
      setRouteLinks(ExaminationRoute);
    }
  }
  if (navLink === "registration") {
    if (routeCheck !== "registration") {
      setRouteCheck("registration");
      setRouteLinks(RegistrationRoute);
    }
  }
  return (
    <div className={classes.sideMenu}>
      <Typography
        variant="h5"
        style={{ color: "#fff", textAlign: "center", padding: " 17px 0" }}
      >
        Dashboard
      </Typography>
      {routeLinks &&
        routeLinks.map((r) => (
          <NavLink
            to={r.route}
            exact={r.exact}
            activeStyle={isActive}
            key={r.name}
          >
            {" "}
            <r.icon fontSize="small" />
            <Typography variant="h6"> &nbsp;&nbsp;&nbsp; {r.name}</Typography>
          </NavLink>
        ))}
    </div>
  );
};

export default SideMenu;
