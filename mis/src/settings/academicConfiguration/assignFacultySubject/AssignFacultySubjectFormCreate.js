import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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

const AssignFacultySubjectFormCreate = ({
  subjectOptions,
  setFormCheck,
  formCheckSubmitHandler,
}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    setFormCheck((pre) => [...pre, e.target.value]);
  };
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
                    {subject.CreditHour}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    <Checkbox
                      // checked={state.checkedB}
                      onChange={(e) => handleChange(e)}
                      value={subject}
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

export default AssignFacultySubjectFormCreate;
