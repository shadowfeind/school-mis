import React, { useRef } from "react";
import { Table, TableRow, TableCell, Button } from "@material-ui/core";
import "./BlankData.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useReactToPrint } from "react-to-print";

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

const ExamMarkApprovalBlankForm = ({
  blankData,
  schoolValue,
  year,
  yearDdl,
  address,
  setOpenPopup,
}) => {
  const componentRef = useRef();
  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });
  const classes = useStyles();

  const classId = blankData?.ddlLevel?.filter(
    (s) => s.Key === blankData.searchFilterModel.level
  );
  const sections = blankData?.ddlSection?.filter(
    (s) => s.Key == blankData.searchFilterModel.section
  );

  const yearShow = yearDdl?.filter((s) => s.Key === year);

  return (
    <>
      <div className="main-container" ref={componentRef}>
        <div className="header">
          <header className="main-header">
            <div className="container">
              <Table>
                <tbody>
                  <tr>
                    <td />
                    <td>
                      <div className="header-center">
                        <b>{schoolValue}</b>
                        <br />
                        <b>{address}</b>
                        <br />
                        <b>-{yearShow?.length > 0 && yearShow[0].Value}</b>
                        <br />
                        <b>Term Exam:</b>
                        {blankData?.dbModelLsts.length > 0 &&
                          blankData.dbModelLsts[0].EventName}
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
                <td>
                  {blankData?.dbModelLsts.length > 0 &&
                    blankData.dbModelLsts[0].SubjectName}
                </td>
                <th>Subject Teacher:</th>
                <td />
              </tr>
              <tr>
                <th>Class:</th>
                <td>{classId?.length > 0 && classId[0].Value}</td>
                <th>Section:</th>
                <td>{sections?.length > 0 && sections[0].Value}</td>
              </tr>
            </tbody>
          </Table>
          <Table className="main-content">
            <tbody>
              <tr>
                <th width="6%">S.No.</th>
                <th width="10%">Roll No.</th>
                <th width="30%">Name Of Students</th>
                <th width="12%">
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
              {blankData &&
                blankData.dbModelLsts.map((s, i) => {
                  let count = i + 1;
                  return (
                    <tr key={s.$id}>
                      <td>{count}</td>
                      <td align="center">{s.RollNo}</td>
                      <td>{s.FullName}</td>
                      <td />
                      <td />
                      <td />
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <br />
          <Table>
            <tbody>
              <tr>
                <td>
                  &nbsp;<b>Remarks</b>:- Please, submit the marks sheet within the 7 days of Examination
                </td>
              </tr>

              <br />
              <tr>
                <td width="14%">Total Present(s): _______</td>
                <td width="12%">Total Absent(s): _______</td>
                <td width="23%">Teacher's Signature: _______________________</td>
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
          className="print-button-hide"
          style={{ margin: "10px 0 0 10px" }}
          onClick={printPdf}
        >
          PRINT
        </Button>
      </div>
    </>
  );
};

export default ExamMarkApprovalBlankForm;
