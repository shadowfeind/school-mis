import React, { useEffect, useState } from "react";
import { Grid,Button, makeStyles, Card } from "@material-ui/core";
import { useDispatch } from "react-redux";

import Holiday from "../settings/schoolConfiguration/holiday/Holiday";
import DashboardHeader from "./DashboardHeader";
import DashboardLeaveApprove from "./DashboardLeaveApprove";
import DashboardNoticeBoard from "./DashboardNoticeBoard";
import DashboardLeaveRequest from "./DashboardLeaveRequest";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    padding: "30px",
  },
  button: {
    float:"right",
    display: "inline-block",
    padding: "5px 10px",
    margin: "0",
    color:"#253053",
    border: "2px solid #253053",
    borderRadius: "10px",
    fontSize: "12px",
    cursor: "pointer",
  },
  cardStyle: {
    margin: "10px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #d4d4d4",
  },
  leaveHeading: {
    display: "inline-block",
    padding: "5px 10px",
    margin: "0",
    border: "2px solid #253053",
    borderRadius: "10px",
    fontSize: "12px",
    cursor: "pointer",
  },
}));

const Dashboard = () => {
  const [leave, setLeave] = useState("approve");
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
            <Card className={classes.cardStyle}>
              <div>
                <h4
                  className={classes.leaveHeading}
                  onClick={() => setLeave("approve")}
                  style={{
                    backgroundColor: leave === "approve" ? "#253053" : "#fff",
                    color: leave === "approve" ? "#fff" : "#253053",
                  }}
                >
                  Leave Approve
                </h4>{" "}
                <h4
                  className={classes.leaveHeading}
                  style={{
                    backgroundColor: leave === "request" ? "#253053" : "#fff",
                    color: leave === "request" ? "#fff" : "#253053",
                  }}
                  onClick={() => setLeave("request")}
                >
                  Leave Requests
                </h4>{" "}
                {/* <div align="right"> */}
                <Button
                  className={classes.button}
                  // onClick={() => setLeave("request")}
                >
                  Create
                </Button>
                {/* </div> */}
              </div>
             
              {leave === "approve" ? (
                <DashboardLeaveApprove />
              ) : (
                <DashboardLeaveRequest />
              )}
            </Card>
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
