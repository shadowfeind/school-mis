import { Grid, makeStyles, Card } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { School, PeopleOutline, Face, Settings } from "@material-ui/icons";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment, { months } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    padding: "20px 40px",
  },
  cardStyle: {
    margin: "20px",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "5px 5px 5px #d4d4d4",
  },
  heading: {
    margin: "0",
  },
  numberHeading: {
    fontSize: "60px",
    fontWeight: "bold",
    margin: "0",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
  }, [dispatch]);
  const localizer = momentLocalizer(moment);

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid container>
          <Grid item xs={3}>
            <Card
              className={classes.cardStyle}
              style={{ borderBottom: "5px solid #d66a6a", color: " #d66a6a" }}
            >
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={8}>
                  <h4 className={classes.heading}>Total No. Of Teachers</h4>
                  <h1 className={classes.numberHeading}>12</h1>
                </Grid>
                <Grid item xs={4}>
                  {" "}
                  <School style={{ fontSize: "60px", color: "#d66a6a" }} />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card
              className={classes.cardStyle}
              style={{ borderBottom: "5px solid #647acb", color: " #647acb" }}
            >
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={8}>
                  <h4 className={classes.heading}>Total No. Of Students</h4>
                  <h1 className={classes.numberHeading}>316</h1>
                </Grid>
                <Grid item xs={4}>
                  {" "}
                  <PeopleOutline
                    style={{ fontSize: "60px", color: "#647acb" }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card
              className={classes.cardStyle}
              style={{ borderBottom: "5px solid #e9b949", color: " #e9b949" }}
            >
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={8}>
                  <h4 className={classes.heading}>Total No. Of Staffs</h4>
                  <h1 className={classes.numberHeading}>24</h1>
                </Grid>
                <Grid item xs={4}>
                  {" "}
                  <Face style={{ fontSize: "60px", color: "#e9b949" }} />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card
              className={classes.cardStyle}
              style={{ borderBottom: "5px solid #2cb1bc", color: " #2cb1bc" }}
            >
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={8}>
                  <h4 className={classes.heading}>Total No. Of Logins</h4>
                  <h1 className={classes.numberHeading}>59</h1>
                </Grid>
                <Grid item xs={4}>
                  {" "}
                  <Settings style={{ fontSize: "60px", color: "#2cb1bc" }} />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        {/* <Grid container>
          <Grid item xs={6}>
            <Card className={classes.cardStyle}>
              <Calendar
                localizer={localizer}
               
                views={months}
                style={{ height: "60vh" }}
              />
            </Card>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid> */}
      </div>
    </>
  );
};

export default Dashboard;
