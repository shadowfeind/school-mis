import React, { useState, useEffect } from "react";

import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  makeStyles,
  Popper,
  Toolbar,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getHeaderContentAction } from "../dashboard/DashboardActions";
import Notification from "./Notification";
import { GET_HEADER_CONTENT_RESET } from "../dashboard/DashboardConstants";
import { API_URL } from "../constants";
import { UPLOADPHOTO_RESET } from "../userProfile/uploadPhoto/UploadPhotoConstants";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    position: "fixed",

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
  },
  paper: {
    border: "1px solid",
    backgroundColor: "#fff",
    padding: "5px 15px",
  },

  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
});

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const isActive = {
    borderBottom: "1px solid #000",
  };
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const dispatch = useDispatch();
  const { headerContent, error: headerContentError } = useSelector(
    (state) => state.getHeaderContent
  );
  const { success: uploadPhotoSuccess } = useSelector(
    (state) => state.uploadPhoto
  );
  if (uploadPhotoSuccess) {
    dispatch({ type: UPLOADPHOTO_RESET });
    dispatch(getHeaderContentAction());
  }
  useEffect(() => {
    if (!headerContent) {
      dispatch(getHeaderContentAction());
    }
  }, [headerContent, dispatch]);
  if (headerContentError) {
    dispatch({ type: GET_HEADER_CONTENT_RESET });
    setNotify({
      isOpen: true,
      message: headerContentError,
      type: "error",
    });
  }

  return (
    <>
      <div>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item style={{ width: "12%" }}>
                {headerContent && (
                  <img
                    src={`${API_URL}${headerContent.FullPath}`}
                    height="50px"
                  />
                )}
              </Grid>
              <Grid item>
                <ul className={classes.list}>
                  <li>
                    <NavLink exact to={"/"} activeStyle={isActive}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/settings"} activeStyle={isActive}>
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/registration"} activeStyle={isActive}>
                      Registration
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/attendance"}>Attendance</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/user-profile"}>User Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/examination"} activeStyle={isActive}>
                      Examination
                    </NavLink>
                  </li>
                  {/* <li>
                    <a>Assignment</a>
                  </li> */}
                </ul>
              </Grid>
              <Grid item sm></Grid>
              <Grid item>
                <IconButton onClick={handleClick}>
                  <Badge badgeContent={2} color="secondary">
                    {headerContent && (
                      <img
                        src={`${API_URL}${headerContent.FullPath}`}
                        height="30px"
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                  </Badge>
                </IconButton>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                  <div className={classes.paper}>Profile</div>
                  <div className={classes.paper}>Logout</div>
                </Popper>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ padding: "32px 0" }}></div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Header;
