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
import { useDispatch } from "react-redux";
import { postStudentPresentListAction } from "./StudentMonthlyPresentSheetActions";

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
  const [checked, setChecked] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (students) {
      setStuAttendance([
        ...students.dbStudentClassAttendanceModelAttendanceLst,
      ]);
    }
  }, [students]);

  const handleAllSelectChange = (e) => {
    if (e.target.checked) {
      let tempAttendance = stuAttendance.map((x) => {
        return { ...x, IsPresent: true };
      });
      setStuAttendance(tempAttendance);
      setChecked(!checked);
    } else {
      let tempAttendance = stuAttendance.map((x) => {
        return { ...x, IsPresent: false };
      });
      setStuAttendance(tempAttendance);
      setChecked(!checked);
    }
  };

  const handleChange = (checked, id) => {
    let tempAttendance = stuAttendance.map((x) =>
      x.IDHREmployee === id ? { ...x, IsPresent: checked } : x
    );
    setStuAttendance(tempAttendance);
  };

  const formCheckSubmitHandler = () => {
    dispatch(
      postStudentPresentListAction(stuAttendance, students.searchFilterModel)
    );
  };

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
                <label>Select All</label>
                <Checkbox checked={checked} onChange={handleAllSelectChange} />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stuAttendance &&
              stuAttendance
                .sort((a, b) => a.RollNo - b.RollNo)
                .map((s) => (
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
                      <Checkbox
                        checked={s?.IsPresent || false}
                        name="IsPresent"
                        onChange={(e) =>
                          handleChange(e.target.checked, s.IDHREmployee)
                        }
                      />
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
              onClick={formCheckSubmitHandler}
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
