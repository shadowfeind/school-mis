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
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SelectControl from "../../../components/controls/SelectControl";

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

const ReassociateStudentLevelUp = ({
  dbModelLst,
  ddlSection,
  ddlLevelStatus,
  setOpenPopup,
  setFormCheck,
  formCheckSubmitHandler,
}) => {
  const classes = useStyles();

  const handleChange = (subject) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDStudentFacultyLevel === subject.IDStudentFacultyLevel
      );
      if (exists) {
        let newArr = prev.filter(
          (u) => u.IDStudentFacultyLevel !== subject.IDStudentFacultyLevel
        );
        return [...newArr];
      }
      let newSection = document.getElementById(
        `section_${subject.IDStudentFacultyLevel}`
      ).value;
      let newStatus = document.getElementById(
        `status_${subject.IDStudentFacultyLevel}`
      ).value;

      const newReassoc = {
        ...subject,
        Section: newSection,
        LevelStatus: newStatus,
      };
      console.log(newReassoc);
      return [...prev, newReassoc];
    });
  };

  const sectionHandler = (value, subject) => {
    document.getElementById(`section_${subject.IDStudentFacultyLevel}`).value =
      value;

    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDStudentFacultyLevel === subject.IDStudentFacultyLevel
      );
      if (exists) {
        const newReassoc = { ...subject, Section: value };
        // console.log(newReassoc);
        let newArr = [...prev];
        prev.map((data, index) => {
          newArr[index].Section = value;
        });
        return [...newArr];
      }
      return [...prev];
    });
    // console.log(value);
  };

  const statusHandler = (value, subject) => {
    document.getElementById(`status_${subject.IDStudentFacultyLevel}`).value =
      value;
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDStudentFacultyLevel === subject.IDStudentFacultyLevel
      );
      if (exists) {
        const newReassoc = { ...subject, LevelStatus: value };
        console.log(newReassoc);
        let newArr = [...prev];
        prev.map((data, index) => {
          newArr[index].LevelStatus = value;
        });
        return [...newArr];
      }
      return [...prev];
    });
    console.log(value);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>StudentName </StyledTableCell>
              <StyledTableCell align="center" style={{ width: 180 }}>
                Batch
              </StyledTableCell>
              <StyledTableCell align="center">Program/Faculty</StyledTableCell>
              <StyledTableCell align="center">Class</StyledTableCell>
              <StyledTableCell align="center" style={{ width: 150 }}>
                Section
              </StyledTableCell>
              <StyledTableCell align="center" style={{ width: 150 }}>
                Status
              </StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dbModelLst &&
              dbModelLst.map((subject) => (
                <StyledTableRow key={subject.IDStudentFacultyLevel}>
                  <StyledTableCell component="th" scope="row">
                    {subject.StudentName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.AcademicYear}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.FacultyPath ? "True" : "False"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {subject.IDLevel ? "True" : "False"}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="filled-age-native-simple">
                        Section
                      </InputLabel>
                      <Select
                        native
                        defaultValue={subject.Section}
                        id={`section_${subject.IDStudentFacultyLevel}`}
                        onChange={(e) =>
                          sectionHandler(e.target.value, subject)
                        }
                      >
                        {ddlSection.map((section) => (
                          <option value={section.Key}>{section.Value}</option>
                        ))}
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <FormControl
                      variant="filled"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="Status">Status</InputLabel>
                      <Select
                        native
                        defaultValue={subject.Section}
                        id={`status_${subject.IDStudentFacultyLevel}`}
                        onChange={(e) => statusHandler(e.target.value, subject)}
                      >
                        {ddlLevelStatus.map((section) => (
                          <option value={section.Key}>{section.Value}</option>
                        ))}
                      </Select>
                    </FormControl>
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
        </Table>
      </TableContainer>
    </>
  );
};

export default ReassociateStudentLevelUp;
