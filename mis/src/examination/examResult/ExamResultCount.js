import React from "react";
import { Grid } from "@material-ui/core";
import "./examResult.css";
import { gradeCalc } from "./Helpers";

const ExamResultCount = ({ result }) => {
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
    <div className="resultContainer">
      <img src="https://i.ibb.co/NjC9r8Z/Creation-Header.png" width="740px" />
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
                <th>A+</th>
                <th>A</th>
                <th>B+</th>
                <th>B</th>
                <th>C+</th>
                <th>C</th>
                <th>D+</th>
                <th>D</th>
                <th>E</th>
                <th>N</th>
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
                      <td height={30}>{count}</td>
                      <td height={30}>{s.Key}</td>
                      <td height={30}>{countAP} </td>
                      <td height={30}>{countA} </td>
                      <td height={30}>{countBP} </td>
                      <td height={30}>{countB} </td>
                      <td height={30}>{countCP} </td>
                      <td height={30}>{countC} </td>
                      <td height={30}>{countDP} </td>
                      <td height={30}>{countD} </td>
                      <td height={30}>{countE} </td>
                      <td height={30}>{countN} </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamResultCount;
