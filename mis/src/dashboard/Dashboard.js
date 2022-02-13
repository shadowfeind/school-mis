import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Holiday from "../settings/schoolConfiguration/holiday/Holiday";
import DashboardHeader from "./DashboardHeader";
import DashboardNoticeBoard from "./DashboardNoticeBoard";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    padding: "20px 40px",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
  }, [dispatch]);

  return (
    <>
      <div className={classes.dashboardContainer}>
        <DashboardHeader />
        <Grid container>
          <Grid item xs={6}>
            <DashboardNoticeBoard />
          </Grid>
          <Grid item xs={6}>
            <Holiday />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
