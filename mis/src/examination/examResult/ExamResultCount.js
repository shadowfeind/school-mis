import React, { useRef } from "react";
import { Grid } from "@material-ui/core";
import "./examResult.css";
import { gradeCalc } from "./Helpers";
import { useReactToPrint } from "react-to-print";
import { Button } from "@material-ui/core";

const ExamResultCount = ({ result }) => {
  const componentRef = useRef();
  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });
  let classSection =
    result && result.ddlSection.filter((x) => x.Key === result.classSection);
  let event =
    result &&
    result.ddlAcademicYearCalendar.filter(
      (x) => x.Key === result.idAcademicYearCalendar
    );
  let resultYear =
    result &&
    result.ddlAcademicYear.filter((x) => x.Key === result.idAcademicYear);
  let classId =
    result &&
    result.ddlLevel.filter((x) => x.Key === result.searchFilterModel.level);
  let shift =
    result &&
    result.searchFilterModel.ddlAcademicShift.filter(
      (x) => x.Key === result.searchFilterModel.idShift
    );

  return (
    <div className="resultContainer" id="result-count" ref={componentRef}>
      <img src="https://i.ibb.co/sQM6QZ3/Creation-Header.png" width="740px" />
      <div className="subjectTable">
        <h1>PROGRESS REPORT</h1>
        <Grid container>
          <Grid item xs={6}>
            <h5>
              Class&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">{classId && classId[0].Value}</span>
            </h5>
            <h5>
              Section&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">
                {classSection && classSection[0].Value}
              </span>
            </h5>
          </Grid>
          <Grid item xs={6}>
            <h5>
              Shift&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">{shift && shift[0].Value}</span>
            </h5>
          </Grid>
        </Grid>
        <h2>
          {event && event[0].Value} : {resultYear && resultYear[0].Value}
        </h2>
        <div className="uppderTableResult">
          <table style={{ margin: "15px 0" }}>
            <thead>
              <tr>
                <th>SN</th>
                <th style={{ width: "40%" }}>Subjects</th>
                <th style={{ textAlign: "center" }}>A+</th>
                <th style={{ textAlign: "center" }}>A</th>
                <th style={{ textAlign: "center" }}>B+</th>
                <th style={{ textAlign: "center" }}>B</th>
                <th style={{ textAlign: "center" }}>C+</th>
                <th style={{ textAlign: "center" }}>C</th>
                <th style={{ textAlign: "center" }}>D+</th>
                <th style={{ textAlign: "center" }}>D</th>
                <th style={{ textAlign: "center" }}>E</th>
                <th style={{ textAlign: "center" }}>N</th>
              </tr>
            </thead>
            <tbody>
              {result &&
                result.SubjectList.map((s, i) => {
                  let count = i + 1;
                  let currentSubjectDatas = result.dbModelLst.filter(
                    (x) => x.SubjectCode === s.Value
                  );
                  let countAP = 0;
                  let countA = 0;
                  let countBP = 0;
                  let countB = 0;
                  let countCP = 0;
                  let countC = 0;
                  let countDP = 0;
                  let countD = 0;
                  let countE = 0;
                  let countN = 0;

                  if (currentSubjectDatas.length > 0) {
                    currentSubjectDatas.forEach((m) => {
                      let totalObtainedMarks =
                        m.ObtainedMark + m.ObtainedMarkPractical;

                      let Check;

                      Check = gradeCalc(totalObtainedMarks);

                      if (Check === "A+") {
                        countAP = countAP + 1;
                      } else if (Check === "A") {
                        countA = countA + 1;
                      } else if (Check === "B+") {
                        countBP = countBP + 1;
                      } else if (Check === "B") {
                        countB = countB + 1;
                      } else if (Check === "C+") {
                        countCP = countCP + 1;
                      } else if (Check === "C") {
                        countC = countC + 1;
                      } else if (Check === "D+") {
                        countDP = countDP + 1;
                      } else if (Check === "D") {
                        countD = countD + 1;
                      } else if (Check === "E") {
                        countE = countE + 1;
                      } else {
                        countN = countN + 1;
                      }
                    });
                  }

                  return (
                    <tr key={s.$id}>
                      <td style={{ textAlign: "center" }}>
                        {count === 0 ? "" : count}
                      </td>
                      <td style={{ textAlign: "center" }}>{s.Key}</td>
                      <td style={{ textAlign: "center" }}>
                        {countAP === 0 ? "" : countAP}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {countA === 0 ? "" : countA}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {countBP === 0 ? "" : countBP}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {countB === 0 ? "" : countB}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {countCP === 0 ? "" : countCP}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {countC === 0 ? "" : countC}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {countDP === 0 ? "" : countDP}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {countD === 0 ? "" : countD}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {countE === 0 ? "" : countE}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {countN === 0 ? "" : countN}{" "}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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
        <Button onClick={printPdf} variant="contained" color="primary">
          PRINT
        </Button>
      </div>
    </div>
  );
};

export default ExamResultCount;
