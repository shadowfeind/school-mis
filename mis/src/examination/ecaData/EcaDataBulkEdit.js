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

const EcaDataBulkEdit = ({
  bulkData,
  academicSubject,
  search,
  setOpenPopup,
}) => {
  const [bulk, setBulk] = useState([]);
  const [selectSubject, setSelectSubject] = useState([]);
  const [ecaData, setEcaData] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onChangeHandler = (subject, value, name, index) => {
    setBulk((prev) => {
      const newReassoc = {
        ...subject,
        ECAValue:
          subject.ECAValue === null
            ? [{ [name]: value }]
            : [...subject.ECAValue, { [name]: value }],
      };

      let newArray = [...prev];
      newArray[index] = newReassoc;

      console.log(newArray);
      return [...newArray];
    });
  };

  // const onChangeHandler = (subject, value, name, index) => {
  //   setEcaData((prev) => {
  //     const newReassoc = {
  //       ...subject,
  //       ECAValue:
  //         subject.ECAValue === null
  //           ? [{ [name]: value }]
  //           : [...subject.ECAValue, { [name]: value }],
  //     };

  //     let newArray = [...prev];
  //     newArray[index] = newReassoc;

  //     console.log(newArray);
  //     return [...newArray];
  //   });
  // };

  const formCheckSubmitHandler = () => {
    dispatch(postBulkEditEcaAction(bulk, search, selectSubject));
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
                selectSubject.map((subject, i) => (
                  <StyledTableCell key={i}>{subject.ECAName}</StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bulk &&
              bulk.map((subject, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{subject.RollNo}</StyledTableCell>
                  <StyledTableCell>{subject.FullName}</StyledTableCell>
                  {selectSubject &&
                    selectSubject.map((s, i) => (
                      <StyledTableCell align="right" key={i}>
                        <TextField
                          defaultValue={s.ECAValue}
                          label={s.ECAName}
                          variant="outlined"
                          name={s.ECAName}
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
