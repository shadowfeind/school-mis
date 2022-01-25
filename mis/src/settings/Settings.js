import React, { Suspense, lazy, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";

const SchoolSettings = lazy(() =>
  import("./schoolConfiguration/schoolSettings/SchoolSettings")
);
const Position = lazy(() => import("./schoolConfiguration/position/Position"));
const EmployeeType = lazy(() =>
  import("./schoolConfiguration/employeeType/EmployeeType")
);
const EmployeeCategoryRole = lazy(() =>
  import("./schoolConfiguration/employeeCategoryRole/EmployeeCategoryRole")
);
const Holiday = lazy(() => import("./schoolConfiguration/holiday/Holiday"));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  indicator: {
    height: "50px",
    opacity: 0.5,
  },
}));

const Settings = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/settings" });
  }, [dispatch]);

  return (
    <div>
      <AppBar position="static" style={{ background: "#253053" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          TabIndicatorProps={{ className: classes.indicator }}
        >
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="School Settings"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Position"
            {...a11yProps(1)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Employee Type"
            {...a11yProps(2)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Employee Category Role"
            {...a11yProps(3)}
          />
          <Tab
            style={{ fontSize: "11px", color: "#fff" }}
            label="Holiday"
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
      <Suspense fallback={<div></div>}>
        <TabPanel value={value} index={0}>
          <SchoolSettings />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Position />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EmployeeType />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <EmployeeCategoryRole />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Holiday />
        </TabPanel>
      </Suspense>
    </div>
  );
};

export default Settings;
