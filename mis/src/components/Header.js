import React, { useState, useEffect } from "react";

import {
  AppBar,
  Badge,
  ClickAwayListener,
  Fade,
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
import { useHistory } from "react-router-dom";

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
  popUp: {
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "5px 5px 5px #d3d3d3",

    "& h4": {
      borderBottom: "1px solid #d3d3d3",
      margin: "0",
      padding: "10px",
      fontWeight: "300",
      fontSize: "14px",
      cursor: "pointer",
    },
    "& h4:hover": {
      backgroundColor: "#f4f4f4",
    },
  },
});

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const isActive = {
    borderBottom: "1px solid #000",
  };
  const history = useHistory();
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleProfileClick = () => {
    history.push("/user-profile");
    setOpen(false);
  };

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
                    src={`${API_URL}${headerContent.FullPathSchoolLogo}`}
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
                      Student Registration
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/attendance"} activeStyle={isActive}>
                      Attendance
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/user-profile"} activeStyle={isActive}>
                      User Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/examination"} activeStyle={isActive}>
                      Examination
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/notification"} activeStyle={isActive}>
                      Push Notification
                    </NavLink>
                  </li>
                  {/* <li>
                    <a>Assignment</a>
                  </li> */}
                </ul>
              </Grid>
              <Grid item sm></Grid>
              <Grid item>
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <IconButton>
                    {headerContent && (
                      <div>
                        <span style={{ fontSize: "12px" }}>Welcome</span>{" "}
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            paddingRight: "10px",
                          }}
                        >
                          {headerContent.FullName}
                        </span>
                      </div>
                    )}
                    <Badge color="secondary" onClick={handleClick("top-end")}>
                      {headerContent && (
                        <img
                          src={`${API_URL}${headerContent.FullPath}`}
                          height="30px"
                          style={{ borderRadius: "50%" }}
                        />
                      )}
                    </Badge>
                  </IconButton>
                </ClickAwayListener>
                <Popper
                  open={open}
                  anchorEl={anchorEl}
                  placement={placement}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <div className={classes.popUp}>
                        {headerContent && (
                          <div>
                            <div
                              style={{
                                padding: "40px 40px 0px 40px",
                                borderBottom: "1px solid #d3d3d3",
                              }}
                            >
                              <img
                                src={`${API_URL}${headerContent.FullPath}`}
                                width="70px"
                                height="70px"
                                style={{ borderRadius: "50%" }}
                              />
                              <h3
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  paddingRight: "10px",
                                }}
                              >
                                {headerContent.FullName}
                              </h3>
                            </div>
                            <h4 onClick={handleProfileClick}>Profile</h4>
                            <h4>Logout</h4>
                          </div>
                        )}
                      </div>
                    </Fade>
                  )}
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
