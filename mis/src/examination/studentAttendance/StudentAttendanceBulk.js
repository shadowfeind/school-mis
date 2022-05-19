import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TextField,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { postBulkStudentAttendanceAction } from "./StudentAttendanceActions";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#253053",
    color: theme.palette.common.white,
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

const StudentAttendanceBulk = ({
  bulkData,
  search,
  workingDayTotal,
  setOpenPopup,
}) => {
  const [bulk, setBulk] = useState([]);
  const [workingDays, setWorkingDays] = useState();
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const onChangeHandler = (subject, value, name, index) => {
    if ((value >= 0) & (value <= Number(workingDays))) {
      setBulk((prev) => {
        const newReassoc = {
          ...subject,
          [name]: Number(value),
        };

        let newArray = [...prev];
        newArray[index] = newReassoc;

        return [...newArray];
      });
    } else {
      alert(
        "Present Day must be less than or equal to working days"
      );
    }
  };

  const formCheckSubmitHandler = () => {
    if (validate()) {
      dispatch(postBulkStudentAttendanceAction(bulk, search, workingDays));
    }
  };
  useEffect(() => {
    if (bulkData) {
      setBulk(bulkData);
      setWorkingDays(workingDayTotal);
    }
  }, [bulkData]);

  useEffect(() => {
    setWorkingDays(workingDayTotal);
  }, []); //calling it just once

  const validate = () => {
    let temp = { ...errors };
    temp.workingDays = workingDays > 0 ? "" : "This feild is required";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const symbolsArr = ["e", "E", "+", "-", ".","ArrowUp","ArrowDown"];

  return (
    <>
      <div style={{ width: "300px", margin: "15px auto" }}>
      Working Total Days:
        <TextField
          type="number"
          onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          // label="WorkingDayTotal"
          variant="outlined"
          name="WorkingDayTotal"
          value={workingDays}
          onChange={(e) => setWorkingDays(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Roll No.</StyledTableCell>
              <StyledTableCell align="right">FullName</StyledTableCell>
              <StyledTableCell align="right">Present Day</StyledTableCell>
              <StyledTableCell align="right">Absent Day</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bulk &&
              bulk.map((subject, index) => (
                <StyledTableRow key={subject.IDHREmployee}>
                  <StyledTableCell component="th" scope="row">
                    {subject.RollNo}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.FullName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      id={`theory_${subject.IDHREmployee}`}
                      value={subject.PresentDay}
                      type="number"
                      label="Present Day"
                      variant="outlined"
                      name="PresentDay"
                      onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                      inputProps={{ tabIndex: "1" }}
                      onChange={(e) =>
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      disabled
                      id={`practical_${subject.IDHREmployee}`}
                      value={subject.AbsentDay}
                      type="number"
                      label="Absent Day"
                      variant="outlined"
                      name="AbsentDay"
                      onWheelCapture={e => {
  e.target.blur()
}}
                      onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                      inputProps={{ tabIndex: "2" }}
                      onChange={(e) =>
                        e.target.value >= 0 &&
                        onChangeHandler(
                          subject,
                          e.target.value,
                          e.target.name,
                          index
                        )
                      }
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
          </Table>
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
              onClick={() => setOpenPopup(false)}
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
       
      </TableContainer>
    </>
  );
};

export default StudentAttendanceBulk;
