import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Checkbox,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import "./AssignEcaForm.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";
import { postAssignEcaAction } from "./AssignEcaActions";


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

  const AssignEcaForm =({assignEca,idYearFacultyProgramLink,level,setOpenPopup})=>{
    const [checked, setChecked] = useState(false);
    const [assign,setAssign] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    
    useEffect(() => {
      if (assignEca) {
        setAssign(assignEca);
      }
    }, [assignEca]);

    const handleAllChecked = (checked) => {
      setChecked(checked);
      if (checked) {
        setAssign([...assignEca]);
      } else {
        setAssign([]);
      }
    };

    const handleChecked = (checked, obj) => {
      if (!checked) {
        setAssign((prev) => {
          let newCheckList = prev.filter(
            (x) => x.IDECA !== obj.IDECA
          );
          return [...newCheckList];
        });
      } else {
        setAssign((prev) => [...prev, obj]);
      }
    };

    const formCheckSubmitHandler = () => {
      dispatch(postAssignEcaAction(assign,idYearFacultyProgramLink,level));
      setOpenPopup(false);
     
    };
  
    return (
      <>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
        <TableHead>
        <TableRow>
        <StyledTableCell>ECA Name</StyledTableCell>
        <StyledTableCell>ECA Description</StyledTableCell>
        <StyledTableCell>Created_On</StyledTableCell>
        <StyledTableCell>Updated_On</StyledTableCell>
        <StyledTableCell> <label>IsActive</label><Checkbox
        style={{backgroundColor:'#fff'}}
                  checked={checked}
                  onChange={(e) => handleAllChecked(e.target.checked)}
                /></StyledTableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {assignEca &&
              assignEca.map((subject,key) => (
                <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    {subject.ECAName}
                  </StyledTableCell>
                  <StyledTableCell >
                    {subject.ECADescription}
                  </StyledTableCell>
                  <StyledTableCell >
                    {subject.Created_On?.slice(0,10)}
                  </StyledTableCell>
                  <StyledTableCell >
                    {subject.Updated_On?.slice(0,10)}
                  </StyledTableCell>
                  <StyledTableCell >
                  <Checkbox
                        checked={
                          assign.filter(
                            (x) => x.IDECA === subject.IDECA
                          ).length > 0
                            ? true
                            : false
                        }
                        onChange={(e) => handleChecked(e.target.checked, subject)}
                      />
                 </StyledTableCell>
                  </StyledTableRow>
              ))}
        </TableBody>
        <div style={{
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
    )


  }
  export default AssignEcaForm;