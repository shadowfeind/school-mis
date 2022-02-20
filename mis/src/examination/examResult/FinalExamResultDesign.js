import React from "react";
import { Grid } from "@material-ui/core";
import "./examResult.css";
import { gpaToGrade, gpaToRemarks, gradeCalc, pointCalc } from "./Helpers";

const FinalExamResultDesign = ({
  student,
  firstTerm,
  secondTerm,
  thirdTerm,
  finalTerm,
  subjectList,
  attendance,
  currentStudentRank,
  studentClass,
  studentSection,
  studentYear,
  resultDate,
}) => {
  let avgGpa = [];
  let tdToRender = [];

  for (let i = subjectList.length; i <= 12; i++) {
    tdToRender.push(i);
  }

  return (
    <div className="resultContainer">
      <img src="https://i.ibb.co/sQM6QZ3/Creation-Header.png" width="740px" />
      <div className="subjectTable">
        <h1>PROGRESS REPORT</h1>
        <Grid container>
          <Grid item xs={6}>
            <h5>
              Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">{student.FullName}</span>
            </h5>
            <h5>
              Section&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">
                {studentSection && studentSection[0].Value}
              </span>
            </h5>
          </Grid>
          <Grid item xs={6}>
            <h5>
              Class&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">
                {studentClass && studentClass[0].Value}
              </span>
            </h5>
            <h5>
              Roll No&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">{student.RollNo}</span>
            </h5>
          </Grid>
        </Grid>
        <h2>ANNUAL RESULT : {studentYear && studentYear[0].Value}</h2>
        <div className="uppderTableResult">
          <table style={{ margin: "15px 0" }}>
            <thead>
              <tr>
                <th>SN</th>
                <th>Subjects</th>
                <th>Credit Hours</th>
                <th>1st Term (15%)</th>
                <th>2nd Term (20%)</th>
                <th>3rd Term (15%)</th>
                <th>Final Term (50%)</th>
                <th>Grade</th>
                <th>Grade Point</th>
              </tr>
            </thead>
            <tbody>
              {subjectList &&
                subjectList.map((s, i) => {
                  let count = i + 1;
                  let totalMarksAcc = [];
                  let firstTermMarks = firstTerm.filter(
                    (x) => x.IDAcademicSubject === s.IDAcademicSubject
                  );
                  totalMarksAcc.push({
                    marks: firstTermMarks
                      ? (firstTermMarks[0].ObtainedMark +
                          firstTermMarks[0].ObtainedMarkPractical) *
                        0.15
                      : "",
                  });
                  let secondTermMarks = secondTerm.filter(
                    (x) => x.IDAcademicSubject === s.IDAcademicSubject
                  );
                  totalMarksAcc.push({
                    marks: secondTermMarks
                      ? (secondTermMarks[0].ObtainedMark +
                          secondTermMarks[0].ObtainedMarkPractical) *
                        0.15
                      : "",
                  });
                  let thirdTermMarks = thirdTerm.filter(
                    (x) => x.IDAcademicSubject === s.IDAcademicSubject
                  );
                  totalMarksAcc.push({
                    marks: thirdTermMarks
                      ? (thirdTermMarks[0].ObtainedMark +
                          thirdTermMarks[0].ObtainedMarkPractical) *
                        0.15
                      : "",
                  });
                  let finalTermMarks = finalTerm.filter(
                    (x) => x.IDAcademicSubject === s.IDAcademicSubject
                  );
                  totalMarksAcc.push({
                    marks: finalTermMarks
                      ? (finalTermMarks[0].ObtainedMark +
                          finalTermMarks[0].ObtainedMarkPractical) *
                        0.15
                      : "",
                  });
                  avgGpa.push(
                    Number(
                      pointCalc(
                        totalMarksAcc.reduce((acc, cur) => {
                          return acc + cur.marks;
                        }, 0) /
                          (totalMarksAcc.length / 4)
                      )
                    )
                  );
                  return (
                    <tr key={s.$id}>
                      <td>{count}</td>
                      <td>{s.SubjectName}</td>
                      <td>4.0</td>
                      <td>
                        {firstTermMarks &&
                          gradeCalc(
                            ((firstTermMarks[0].ObtainedMark +
                              firstTermMarks[0].ObtainedMarkPractical) /
                              (firstTermMarks[0].FullMark +
                                firstTermMarks[0].FullMarkPractical)) *
                              100
                          )}
                      </td>
                      <td>
                        {" "}
                        {secondTermMarks &&
                          gradeCalc(
                            ((secondTermMarks[0].ObtainedMark +
                              secondTermMarks[0].ObtainedMarkPractical) /
                              (secondTermMarks[0].FullMark +
                                secondTermMarks[0].FullMarkPractical)) *
                              100
                          )}
                      </td>
                      <td>
                        {" "}
                        {thirdTermMarks &&
                          gradeCalc(
                            ((thirdTermMarks[0].ObtainedMark +
                              thirdTermMarks[0].ObtainedMarkPractical) /
                              (thirdTermMarks[0].FullMark +
                                thirdTermMarks[0].FullMarkPractical)) *
                              100
                          )}{" "}
                      </td>
                      <td>
                        {finalTermMarks &&
                          gradeCalc(
                            ((finalTermMarks[0].ObtainedMark +
                              finalTermMarks[0].ObtainedMarkPractical) /
                              (finalTermMarks[0].FullMark +
                                finalTermMarks[0].FullMarkPractical)) *
                              100
                          )}
                      </td>
                      <td height={30}>
                        {" "}
                        {gradeCalc(
                          totalMarksAcc.reduce((acc, cur) => {
                            return acc + cur.marks;
                          }, 0) /
                            (totalMarksAcc.length / 4)
                        )}{" "}
                      </td>
                      <td height={30}>
                        {" "}
                        {pointCalc(
                          totalMarksAcc.reduce((acc, cur) => {
                            return acc + cur.marks;
                          }, 0)
                        )}{" "}
                      </td>
                    </tr>
                  );
                })}
              {/* to render empty td */}
              {tdToRender &&
                tdToRender.map((x) => (
                  <tr key={x}>
                    <td height={30}></td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                    <td height={30}> </td>
                  </tr>
                ))}

              <tr>
                <td colSpan={8}>GRADE POINT AVERAGE (GPA)</td>
                <td>
                  {avgGpa &&
                    (
                      avgGpa.reduce((acc, cur) => {
                        return acc + cur;
                      }, 0) / avgGpa.length
                    ).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="lowerTableResult">
          <Grid container>
            <Grid item xs={3}>
              <table style={{ margin: "15px 0" }}>
                <thead>
                  <tr>
                    <td colSpan={2}>Attendance:</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Working Days:{" "}
                      {attendance.length > 0 && attendance[0].WorkingDay}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Present Days:{" "}
                      {attendance.length > 0 && attendance[0].PresentDay}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Absent Days:{" "}
                      {attendance.length > 0 && attendance[0].AbsentDay}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <Grid item xs={9}>
              <table style={{ margin: "15px 0 15px 15px" }}>
                <thead>
                  <tr>
                    <td colSpan={5}>Grading System</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A+</td>
                    <td>90 or Above (Outstanding) - 4.0</td>
                    <td></td>
                    <td>A</td>
                    <td>80-Below 90 (Excellent) - 3.6</td>
                  </tr>
                  <tr>
                    <td>B+</td>
                    <td>70-Below 80 (Very Good) - 3.2</td>
                    <td></td>
                    <td>B</td>
                    <td>60-Below 70 (Good) - 2.8</td>
                  </tr>
                  <tr>
                    <td>C+</td>
                    <td>50-Below 60 (Satisfactory) - 2.4</td>
                    <td></td>
                    <td>C</td>
                    <td>40-Below 50 (Acceptable) - 2.0</td>
                  </tr>
                  <tr>
                    <td>D+</td>
                    <td>30-Below 40 (Partially Acceptable) - 1.6</td>
                    <td></td>
                    <td>D</td>
                    <td>20-Below 30 (Insufficient) - 1.2</td>
                  </tr>
                  <tr>
                    <td>E+</td>
                    <td>1-Below 20 (Very Insufficient) - 0.8</td>
                    <td></td>
                    <td>N</td>
                    <td>0 (Not Qualified) - 0.0</td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <table style={{ marginRight: "40px" }}>
                <thead>
                  <tr>
                    <td>Result:</td>
                    <td>
                      Grade:{" "}
                      {gpaToGrade(
                        (
                          avgGpa.reduce((acc, cur) => {
                            return acc + cur;
                          }, 0) / avgGpa.length
                        ).toFixed(2)
                      )}
                    </td>
                    <td>
                      GPA:{" "}
                      {avgGpa &&
                        (
                          avgGpa.reduce((acc, cur) => {
                            return acc + cur;
                          }, 0) / avgGpa.length
                        ).toFixed(2)}
                    </td>
                    <td>
                      Rank:{" "}
                      {currentStudentRank.length > 0
                        ? currentStudentRank[0].Value
                        : ""}
                    </td>
                  </tr>
                </thead>
              </table>
            </Grid>
            <Grid item xs={6}>
              <table style={{ marginLeft: "40px" }}>
                <thead>
                  <tr>
                    <td>
                      Remarks:{" "}
                      {gpaToRemarks(
                        avgGpa.reduce((acc, cur) => {
                          return acc + cur;
                        }, 0) / avgGpa.length
                      )}
                    </td>
                  </tr>
                </thead>
              </table>
            </Grid>
          </Grid>
          <div className="signatureContainer">
            <Grid container>
              <Grid item xs={3}>
                <h4>{resultDate && resultDate.slice(0, 10)}</h4>
                <h6>Result Date</h6>
              </Grid>
              <Grid item xs={3}>
                <h4>................</h4>
                <h6>Class Teacher</h6>
              </Grid>
              <Grid item xs={3}>
                <h4>................</h4>
                <h6>School Stamp</h6>
              </Grid>
              <Grid item xs={3}>
                <h4>................</h4>
                <h6>Principal</h6>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalExamResultDesign;
