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
import "./BlankData.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  getBulkExamApprovalBlankDataAction,
  postBulkExamMarkApprovalAction,
} from "./ExamMarkApprovalActions";
import { useDispatch } from "react-redux";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

const ExamMarkApprovalBlankForm = ({blankData,setOpenPopup,}) => {
  const classes = useStyles();

  const classId = blankData?.ddlLevel?.filter( s => s.Key === blankData.searchFilterModel.level)
  const section = blankData?.ddlSection?.filter( s => s.Key === blankData.searchFilterModel.section)

  return (
    <>
      <div className="main-container">
        <div className="header">
          <header className="main-header">
            <div className="container">
              <Table>
                <tbody>
                  <tr>
                    <td />
                    <td>
                      <div className="header-center">
                        <b>Amar English Secondary School</b>
                        <br />
                        <b>Tokha,Kathmandu Nepal</b>
                        <br />
                        <b>-20__</b>
                        <br />
                        <b>Term Exam:</b> {blankData?.dbModelLsts.length>0 && blankData.dbModelLsts[0].EventName}
                      </div>
                    </td>
                    <td>
                      <div className="header-right">Date:20__/__/__</div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </header>
        </div>
        <br />
        <div className="info">
          <Table className="info-table">
            <tbody>
            <tr>
                <th>Subject:</th>
                <td>{blankData?.dbModelLsts.length> 0&& blankData.dbModelLsts[0].SubjectName}</td>
               <th>Subject Teacher:</th>
                <td />
              </tr>
              <tr>
                <th>Class:</th>
                <td>{classId?.length > 0 && classId[0].Value}</td>
                <th>Section:</th>
                <td>{section?.length> 0 && section[0].Value}</td>
              </tr>
            </tbody>
          </Table>
          <Table className="main-content">
            <tbody>
              <tr>
                <th width="6%">S.No.</th>
                <th width="10%">Roll No.</th>
                <th width="30%">Name Of Students</th>
                <th width="12%">blankData
                  Marks
                  <br />
                  Obtained(TH)
                </th>
                <th width="12%">
                  Marks
                  <br />
                  Obtained(PR/UT)
                </th>
                <th width="30%">Remarks</th>
              </tr>
              { blankData && blankData.dbModelLsts.map((s, i) => {
              let count = i + 1
              return  <tr key={s.$id}>
                <td>{count}</td>
                <td>{s.RollNo}</td>
                <td>{s.FullName}</td>
                <td />
                <td />
                <td />
              </tr>
            })}
             
             
            </tbody>
          </Table>
          <Table>
            <tbody>
           
            <tr>
                <td>
                  Remarks:- Please, submit the marks sheet within the 7days of
                  Examination
                </td>
                <td>Total No.of present(s): ___________</td>
                <td>Total No. of absent(s): ___________</td>
              </tr>
              <tr>
                <td>Teacher's Signature: ________________________</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
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
            // onClick={formCheckSubmitHandler}
          >
            PRINT
          </Button>
        </div>

    </>
  );
};

export default ExamMarkApprovalBlankForm;
