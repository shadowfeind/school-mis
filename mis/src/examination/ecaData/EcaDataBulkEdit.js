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
import { postBulkEditEcaAction } from "./EcaDataActions";

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

const EcaDataBulkEdit = ({ bulkData, academicSubject, setOpenPopup }) => {
  const [bulk, setBulk] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onChangeHandler = (subject, value, name, index) => {
    setBulk((prev) => {
      const newReassoc = {
        ...subject,
        [name]: value,
      };

      let newArray = [...prev];
      newArray[index] = newReassoc;

      return [...newArray];
    });
  };

  const formCheckSubmitHandler = () => {
    dispatch(postBulkEditEcaAction(bulk, selectSubject));
  };
  useEffect(() => {
    if (bulkData) {
      setBulk(bulkData);
    }
  }, [bulkData]);

  useEffect(() => {
    if (academicSubject) {
      setSelectSubject(academicSubject);
    }
  }, [academicSubject]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Roll No.</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              {selectSubject &&
                selectSubject.map((subject, index) => (
                  <StyledTableCell>{subject.ECAName}</StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bulk &&
              bulk.map((subject, index) => (
                <StyledTableRow>
                  <StyledTableCell>{subject.RollNo}</StyledTableCell>
                  <StyledTableCell>{subject.FullName}</StyledTableCell>
                  {selectSubject &&
                    selectSubject.map((subject, index) => (
                      <StyledTableCell align="right">
                        <TextField
                          defaultValue={subject.ECAValue}
                          label={subject.ECAName}
                          variant="outlined"
                          name={subject.ECAName}
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
                    ))}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </>
  );
};

export default EcaDataBulkEdit;
