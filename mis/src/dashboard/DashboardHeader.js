import React from "react";
import { Grid, makeStyles, Card } from "@material-ui/core";
import { School, PeopleOutline, Face, Settings } from "@material-ui/icons";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    margin: "10px",
    padding: "20px 20px 10px",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #d4d4d4",
  },
  heading: {
    margin: "0",
    color: "#7e7f7a",
  },
  numberHeading: {
    fontSize: "50px",
    fontWeight: "bold",
    margin: "0",
  },
  smallHeading: {
    color: "#65748B",
    fontSize: "12px",
    paddingLeft: "3%",
  },
}));

const DashboardHeader = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={3}>
        <Card className={classes.cardStyle}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={9}>
              <h4 className={classes.heading}>Total No. Of Teachers</h4>
              <h1 className={classes.numberHeading}>12</h1>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                backgroundColor: "#d14343",
                padding: "12px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {" "}
              <School style={{ fontSize: "30px", color: "#fff" }} />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <ArrowUpwardIcon style={{ fontSize: "25px", color: "#d14343" }} />
            </Grid>
            <Grid item xs={11}>
              <p className={classes.smallHeading}>5% Increase</p>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card
          className={classes.cardStyle}
          // style={{ borderBottom: "3px solid #647acb" }}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={9}>
              <h4 className={classes.heading}>Total No. Of Students</h4>
              <h1 className={classes.numberHeading}>316</h1>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                backgroundColor: "#647acb",
                padding: "12px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {" "}
              <PeopleOutline style={{ fontSize: "30px", color: "#fff" }} />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <ArrowUpwardIcon style={{ fontSize: "25px", color: "#647acb" }} />
            </Grid>
            <Grid item xs={11}>
              <p className={classes.smallHeading}>10% Increase</p>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card
          className={classes.cardStyle}
          // style={{ borderBottom: "3px solid #e9b949" }}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={9}>
              <h4 className={classes.heading}>Total No. Of Staffs</h4>
              <h1 className={classes.numberHeading}>24</h1>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                backgroundColor: "#e9b949",
                padding: "12px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {" "}
              <Face style={{ fontSize: "30px", color: "#fff" }} />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <ArrowUpwardIcon style={{ fontSize: "25px", color: "#e9b949" }} />
            </Grid>
            <Grid item xs={11}>
              <p className={classes.smallHeading}>2% Increase</p>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card
          className={classes.cardStyle}
          // style={{ borderBottom: "3px solid #2cb1bc" }}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={9}>
              <h4 className={classes.heading}>Total No. Of Logins</h4>
              <h1 className={classes.numberHeading}>59</h1>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                backgroundColor: "#2cb1bc",
                padding: "12px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {" "}
              <Settings style={{ fontSize: "30px", color: "#fff" }} />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <ArrowUpwardIcon style={{ fontSize: "25px", color: "#2cb1bc" }} />
            </Grid>
            <Grid item xs={11}>
              <p className={classes.smallHeading}>4% Increase</p>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardHeader;
