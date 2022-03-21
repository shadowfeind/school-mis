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
  TextField,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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

const ClassSubjectCreateForm = ({
  subjectOptions,
  assignFacSubGenerate,
  setFormCheck,
  formCheckSubmitHandler,
}) => {
  const classes = useStyles();
  const inputHandler = (subject, value) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDAcademicSubject === subject.IDAcademicSubject
      );
      if (exists) {
        const newSubject = { ...subject, CreditHour: Number(value) };
        // console.log(newSubject);
        let newArr = [...prev];
        prev.map((data, index) => {
          newArr[index].CreditHour = Number(value);
        });
        return [...newArr];
      }
      return [...prev];
    });
  };

  const handleChange = (subject) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDAcademicSubject === subject.IDAcademicSubject
      );
      if (exists) {
        let newArr = prev.filter(
          (u) => u.IDAcademicSubject !== subject.IDAcademicSubject
        );
        return [...newArr];
      }
      let newCreditHour = Number(
        document.getElementById(`subject_${subject.IDAcademicSubject}`).value
      );
      const newSubject = { ...subject, CreditHour: newCreditHour };
      // console.log(newSubject);
      return [...prev, newSubject];
    });
  };

  const symbolsArr = ["e", "E", "+", "-", "."];

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Subject Name </StyledTableCell>
              <StyledTableCell align="right">Subject Code</StyledTableCell>
              <StyledTableCell align="right">Compulsory</StyledTableCell>
              <StyledTableCell align="right">Optional</StyledTableCell>
              <StyledTableCell align="right">Practical</StyledTableCell>
              <StyledTableCell align="right">Theoritical</StyledTableCell>
              <StyledTableCell align="right">Credit Hour</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectOptions &&
              subjectOptions.map((subject) => (
                <StyledTableRow key={subject.IDAcademicSubject}>
                  <StyledTableCell component="th" scope="row">
                    {subject.SubjectName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.SubjectCode}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.IsCompulsory ? "True" : "False"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.IsOptional ? "True" : "False"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.IsPractical ? "True" : "False"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.IsTheoritical ? "True" : "False"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      id={`subject_${subject.IDAcademicSubject}`}
                      defaultValue={subject.CreditHour}
                      type="number"
                      label="Credit Hours"
                      onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
                      variant="outlined"
                      onChange={(e) => inputHandler(subject, e.target.value)}
                      inputProps={{ tabIndex: "1" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    <Checkbox
                      // checked={state.checkedB}
                      onChange={() => handleChange(subject)}
                      name="checkedB"
                      color="primary"
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

export default ClassSubjectCreateForm;
