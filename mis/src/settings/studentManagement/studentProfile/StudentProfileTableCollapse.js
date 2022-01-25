import React from "react";
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
import {
  getSingleStudentProfileDetailsAction,
  getSingleStudentProfilePasswordresetDataAction,
} from "./StudentProfileActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const StudentProfileTableCollapse = ({
  item,
  updateFormHandler,
  index,
  selectedIndex,
  setSelectedIndex,
  year,
  program,
  section,
  classId,
  shift,
  studentDetails,
  setOpenResetPopup,
  //   deleteCollegeHandler,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClick = (index, id) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
      dispatch(
        getSingleStudentProfileDetailsAction(
          id,
          year,
          program,
          classId,
          shift,
          section
        )
      );
    }
  };

  const handleReset = (id) => {
    dispatch(
      getSingleStudentProfilePasswordresetDataAction(
        id,
        year,
        program,
        classId,
        shift,
        section
      )
    );
    setOpenResetPopup(true);
  };

  return (
    <>
      <TableRow>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{item.PUNumber}</TableCell>
        <TableCell>{item.StudentName}</TableCell>
        <TableCell>{item.AcademicProgramName}</TableCell>
        <TableCell>{item.Email}</TableCell>
        <TableCell>{item.MobileNo}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateFormHandler(item.IDHREmployee)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            //   onClick={() => deleteCollegeHandler(item.IDAcademicSubject)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            onClick={() => handleClick(index, item.IDHREmployee)}
            className={classes.button}
          >
            {" "}
            {selectedIndex ? (
              <KeyboardArrowUpIcon style={{ fontSize: 12 }} />
            ) : (
              <KeyboardArrowDownIcon style={{ fontSize: 12 }} />
            )}
          </Button>
        </TableCell>
      </TableRow>
      {studentDetails && (
        <TableRow key={item.$id * 0.001}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="p" gutterBottom component="div">
                  Details
                </Typography>
                <Grid container>
                  <Grid item md={6}>
                    <List key={item.$id * 0.002}>
                      <ListItem>
                        <strong>Email</strong>: {studentDetails.EmailID}
                      </ListItem>
                      <ListItem>
                        <strong>Alternate EmailID</strong>:{" "}
                        {studentDetails.AlternateEmailID}
                      </ListItem>
                      <ListItem>
                        <strong>Mobile Number</strong>:{" "}
                        {studentDetails.MobileNumber}
                      </ListItem>
                      <ListItem>
                        <strong>PositionHead</strong>:{" "}
                        {studentDetails.PositionHead}
                      </ListItem>
                      <ListItem>
                        <strong>Sex</strong>: {studentDetails.Sex}
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item md={6} style={{}}>
                    <List>
                      <ListItem>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          onClick={() =>
                            handleReset(studentDetails.IDHREmployee)
                          }
                        >
                          Reset Password
                        </Button>
                      </ListItem>
                      <ListItem>
                        <strong>Married</strong>: {studentDetails.Married}
                      </ListItem>
                      <ListItem>
                        <strong>DOB</strong>: {studentDetails.DOB.slice(0, 10)}
                      </ListItem>
                      <ListItem>
                        <strong>BloodGroup</strong>: {studentDetails.BloodGroup}
                      </ListItem>

                      <ListItem>
                        <strong>Status</strong>:{" "}
                        {studentDetails.Status ? "Active" : "InActive"}
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default StudentProfileTableCollapse;
