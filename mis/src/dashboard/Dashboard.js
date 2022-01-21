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
    borderRadius: "20px",
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
            <Card className={classes.cardStyle}>
              <School fontSize="large" />
              <h4 className={classes.heading}>Total No. Of Teachers</h4>
              <h1 className={classes.numberHeading}>12</h1>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.cardStyle}>
              <PeopleOutline fontSize="large" />
              <h4 className={classes.heading}>Total No. Of Students</h4>
              <h1 className={classes.numberHeading}>356</h1>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.cardStyle}>
              <Face fontSize="large" />
              <h4 className={classes.heading}>Unique Visitors</h4>
              <h1 className={classes.numberHeading}>48</h1>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.cardStyle}>
              <Settings fontSize="large" />
              <h4 className={classes.heading}>Total No. Of Subjects</h4>
              <h1 className={classes.numberHeading}>154</h1>
            </Card>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <Card className={classes.cardStyle}>
              <Calendar
                localizer={localizer}
                // events={holiday && holiday.att_HRHolidayModelLst}
                // startAccessor="FromDate"
                // endAccessor="ToDate"
                // titleAccessor="HolidayName"
                views={months}
                style={{ height: "60vh" }}
              />
            </Card>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
