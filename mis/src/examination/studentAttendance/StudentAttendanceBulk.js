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
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { postBulkStudentAttendanceAction } from "./StudentAttendanceActions";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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

const StudentAttendanceBulk = ({ bulkData, search, workingDayTotal }) => {
  const [bulk, setBulk] = useState([]);
  const [workingDays, setWorkingDays] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onChangeHandler = (subject, value, name, index) => {
    setBulk((prev) => {
      const newReassoc = {
        ...subject,
        [name]: Number(value),
      };

      let newArray = [...prev];
      newArray[index] = newReassoc;

      return [...newArray];
    });
  };

  const formCheckSubmitHandler = () => {
    dispatch(postBulkStudentAttendanceAction(bulk, search, workingDays));
  };
  useEffect(() => {
    if (bulkData) {
      setBulk(bulkData);
      setWorkingDays(workingDayTotal);
    }
  }, [bulkData]);
  return (
    <>
      <div style={{ width: "300px", margin: "15px auto" }}>
        <TextField
          type="number"
          label="WorkingDayTotal"
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
                      defaultValue={subject.PresentDay}
                      type="number"
                      label="Present Day"
                      variant="outlined"
                      name="PresentDay"
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
                      id={`practical_${subject.IDHREmployee}`}
                      defaultValue={subject.AbsentDay}
                      type="number"
                      label="Absent Day"
                      variant="outlined"
                      name="AbsentDay"
                      inputProps={{ tabIndex: "2" }}
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
              // onClick={() => setOpenPopup(false)}
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

export default StudentAttendanceBulk;