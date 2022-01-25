import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import {
  ClipLoader,
  BarLoader,
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClimbingBoxLoader,
} from "react-spinners";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "635%",
  },
}));

const LoadingComp = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <CircleLoader />
      <ClimbingBoxLoader />
      <BounceLoader />
      <BeatLoader />
      <BarLoader width={100} />
      <ClipLoader /> */}
      {/* <CircularProgress color="secondary" /> */}
      <LinearProgress color="secondary" />
    </div>
  );
};

export default LoadingComp;
