import React, { useState } from "react";
import {
  Button,
  TableRow,
  TableCell,
  makeStyles,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const EmployeeTableCollapse = ({
  item,
  updateCollegeHandler,
  deleteCollegeHandler,
}) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{item.FullName}</TableCell>
        <TableCell>{item.BranchName}</TableCell>
        <TableCell>{item.DepartmentName}</TableCell>
        <TableCell>{item.PositionHead}</TableCell>
        <TableCell>{item.MobileNumber}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateCollegeHandler(item.IDHREmployee)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => deleteCollegeHandler(item.IDHREmployee)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpen(!open)}
            className={classes.button}
          >
            {" "}
            {open ? (
              <KeyboardArrowUpIcon style={{ fontSize: 12 }} />
            ) : (
              <KeyboardArrowDownIcon style={{ fontSize: 12 }} />
            )}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow key={item.$id * 0.001}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="p" gutterBottom component="div">
                Details
              </Typography>
              <Grid container>
                <Grid item md={6}>
                  <List key={item.$id * 0.002}>
                    <ListItem>
                      <strong>LoginID</strong>: {item.LoginIDHREmployee}
                    </ListItem>
                    <ListItem>
                      <strong>BranchName</strong>: {item.BranchName}
                    </ListItem>
                    <ListItem>
                      <strong>Department Name</strong>: {item.DepartmentName}
                    </ListItem>
                    <ListItem>
                      <strong>PositionHead</strong>: {item.PositionHead}
                    </ListItem>
                    <ListItem>
                      <strong>EmployeeTypeName</strong>: {item.EmployeeTypeName}
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={6} style={{}}>
                  <List>
                    <ListItem>
                      <strong>Email ID</strong>: {item.EmailID}
                    </ListItem>
                    <ListItem>
                      <strong>PhoneNo</strong>: {item.PhoneNo}
                    </ListItem>
                    <ListItem>
                      <strong>MobileNumber</strong>: {item.MobileNumber}
                    </ListItem>

                    <ListItem>
                      <strong>IsActive</strong>:{" "}
                      {item.IsActive ? "Active" : "InActive"}
                    </ListItem>

                    <ListItem>
                      <strong>Updated_On</strong>: {item.Updated_On}
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EmployeeTableCollapse;
