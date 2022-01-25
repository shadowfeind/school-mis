import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.grey,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StudentMonthlyPresentSheetUpdateForm = ({ students }) => {
  const [stuAttendance, setStuAttendance] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (students) {
      setStuAttendance([...students.dbStudentClassAttendanceModelLst]);
    }
  }, [students]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Roll No. </StyledTableCell>
              <StyledTableCell>Student Name</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>

              <StyledTableCell>
                <Checkbox />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stuAttendance &&
              stuAttendance.map((s) => (
                <StyledTableRow key={s.IDHREmployee}>
                  <StyledTableCell component="th" scope="row">
                    {s.RollNo}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {s.FullName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {s.MobileNumber}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {s.EmailID}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <Checkbox />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingTop: "10px",
              marginTop: "10px",
              borderTop: "1px solid #f3f3f3",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              //   onClick={() => setOpenPopup(false)}
              style={{ margin: "10px 0 0 10px" }}
            >
              CANCEL
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ margin: "10px 0 0 10px" }}
              //   onClick={formCheckSubmitHandler}
            >
              SUBMIT
            </Button>
          </div>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentMonthlyPresentSheetUpdateForm;
