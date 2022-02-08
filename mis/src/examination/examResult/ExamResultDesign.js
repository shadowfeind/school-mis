import React from "react";
import { Grid } from "@material-ui/core";
import "./examResult.css";

const ExamResultDesign = ({
  student,
  subjects,
  levelTest,
  studentAttendance,
  dbModelLst,
  forDate,
  examTerm,
}) => {
  let trackSubject = [];

  const gpaToGrade = (x) => {
    if (x > 3.6) {
      return "A+";
    } else if (x > 3.2 && x <= 3.6) {
      return "A";
    } else if (x > 2.8 && x <= 3.2) {
      return "B+";
    } else if (x > 2.4 && x <= 2.8) {
      return "B";
    } else if (x > 2.0 && x <= 2.4) {
      return "C+";
    } else if (x > 1.6 && x <= 2.0) {
      return "C";
    } else if (x > 1.2 && x <= 1.6) {
      return "D+";
    } else if (x > 0.8 && x <= 1.2) {
      return "D";
    } else if (x > 0 && x <= 0.8) {
      return "E";
    } else {
      return "N";
    }
  };

  const gpaToRemarks = (x) => {
    if (x > 3.6) {
      return "OUTSTANDING";
    } else if (x > 3.2 && x <= 3.6) {
      return "EXCELLENT";
    } else if (x > 2.8 && x <= 3.2) {
      return "VERY GOOD";
    } else if (x > 2.4 && x <= 2.8) {
      return "GOOD";
    } else if (x > 2.0 && x <= 2.4) {
      return "SATISFACTORY";
    } else if (x > 1.6 && x <= 2.0) {
      return "ACCEPTABLE";
    } else if (x > 1.2 && x <= 1.6) {
      return "PARTIALLY ACCEPTABLE";
    } else if (x > 0.8 && x <= 1.2) {
      return "INSUFFICIENT";
    } else if (x > 0 && x <= 0.8) {
      return "VERY INSUFFICIENT";
    } else {
      return "NOT QUALIFIED";
    }
  };
  return (
    <div className="resultContainer">
      <img src="https://i.ibb.co/NjC9r8Z/Creation-Header.png" width="740px" />
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
              <span className="spanResult">A</span>
            </h5>
          </Grid>
          <Grid item xs={6}>
            <h5>
              Class&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">NINE</span>
            </h5>
            <h5>
              Roll No&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="spanResult">{student.RollNo}</span>
            </h5>
          </Grid>
        </Grid>
        <h2>
          {examTerm.Value} : {forDate.PublishDate.slice(0, 4)}
        </h2>
        <div className="uppderTableResult">
          <table style={{ margin: "15px 0" }}>
            <thead>
              <tr>
                <th>SB</th>
                <th>Subjects</th>
                <th>Credit Hours</th>
                <th colSpan="2">Obtained Grades</th>
                <th>Final Grade</th>
                <th>Grade Point</th>
                <th>Highest Grade</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>TH</th>
                <th>PR</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, i) => {
                let count = i + 1;
                let resultTH = (s.ObtainedMark * 100) / s.FullMark;
                let resultPR =
                  (s.ObtainedMarkPractical * 100) / s.FullMarkPractical;
                let resultTotal =
                  ((s.ObtainedMark + s.ObtainedMarkPractical) /
                    (s.FullMark + s.FullMarkPractical)) *
                  100;
                const gradeCalc = (marksCalc) => {
                  if (marksCalc >= 90) {
                    return "A+";
                  } else if (marksCalc >= 80 && marksCalc < 90) {
                    return "A";
                  } else if (marksCalc >= 70 && marksCalc < 80) {
                    return "B+";
                  } else if (marksCalc >= 60 && marksCalc < 70) {
                    return "B";
                  } else if (marksCalc >= 50 && marksCalc < 60) {
                    return "C+";
                  } else if (marksCalc >= 40 && marksCalc < 50) {
                    return "C";
                  } else if (marksCalc >= 30 && marksCalc < 40) {
                    return "D+";
                  } else if (marksCalc >= 20 && marksCalc < 30) {
                    return "D";
                  } else if (marksCalc >= 1 && marksCalc < 20) {
                    return "E";
                  } else {
                    return "N";
                  }
                };

                let gradePointTotal =
                  ((s.ObtainedMark + s.ObtainedMarkPractical) /
                    (s.FullMark + s.FullMarkPractical)) *
                  100;

                const pointCalc = (marked) => {
                  if (marked >= 90) {
                    return "4.00";
                  } else if (marked >= 80 && marked < 90) {
                    return "3.60";
                  } else if (marked >= 70 && marked < 80) {
                    return "3.20";
                  } else if (marked >= 60 && marked < 70) {
                    return "2.80";
                  } else if (marked >= 50 && marked < 60) {
                    return "2.40";
                  } else if (marked >= 40 && marked < 50) {
                    return "2.00";
                  } else if (marked >= 30 && marked < 40) {
                    return "1.60";
                  } else if (marked >= 20 && marked < 30) {
                    return "1.20";
                  } else if (marked >= 1 && marked < 20) {
                    return "0.80";
                  } else {
                    return "0.00";
                  }
                };
                let filteredSubjects = dbModelLst.filter(
                  (x) =>
                    (x.SubjectCode === s.SubjectCode) &
                    (x.Status === "Approved")
                );
                let highestThMarks = filteredSubjects.sort(
                  (a, b) => b.ObtainedMark - a.ObtainedMark
                );
                let highestPrMarks = filteredSubjects.sort(
                  (a, b) => b.ObtainedMarkPractical - a.ObtainedMarkPractical
                );

                let totalHighestMarks;
                if ((highestThMarks.length > 0) & (highestPrMarks.length > 0)) {
                  totalHighestMarks =
                    highestThMarks[0].ObtainedMark +
                    highestPrMarks[0].ObtainedMarkPractical;
                } else {
                  totalHighestMarks = 0;
                }

                console.log(totalHighestMarks);
                //to calculate GPA tracking grade poing
                let subTracker = {
                  name: s.SubjectCode,
                  totalMarks: Number(pointCalc(gradePointTotal)),
                };
                trackSubject.push(subTracker);

                return (
                  <tr key={s.$id}>
                    <td>{count}</td>
                    <td>{s.SubjectName}</td>
                    <td> 4.0</td>
                    <td> {gradeCalc(resultTH)}</td>
                    <td> {gradeCalc(resultPR)}</td>
                    <td> {gradeCalc(resultTotal)}</td>
                    <td> {pointCalc(gradePointTotal)}</td>
                    <td height={30}>{gradeCalc(totalHighestMarks)} </td>
                  </tr>
                );
              })}

              <tr>
                <td height={30}></td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
              </tr>
              <tr>
                <td height={30}></td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
              </tr>
              <tr>
                <td height={30}></td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
              </tr>
              <tr>
                <td height={30}></td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
                <td height={30}> </td>
              </tr>
              <tr>
                <td colSpan={6}>GRADE POINT AVERAGE (GPA)</td>
                <td>
                  {trackSubject.reduce((acc, cur) => {
                    return acc + cur.totalMarks;
                  }, 0) / trackSubject.length}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="lowerTableResult">
          <Grid container>
            <Grid item xs={4}>
              <table style={{ margin: "15px 0" }}>
                <thead>
                  <tr>
                    <td colSpan={2}>Achievement in work skills</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      AptitudeTest:{" "}
                      {levelTest.length > 0 && levelTest[0].AptitudeTest}
                    </td>
                    <td>
                      Handwriting:{" "}
                      {levelTest.length > 0 && levelTest[0].Handwriting}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Home/Class Work:{" "}
                      {levelTest.length > 0 && levelTest[0].HomeClassWork}
                    </td>
                    <td>
                      Drawing: {levelTest.length > 0 && levelTest[0].Drawing}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Fluency: {levelTest.length > 0 && levelTest[0].Fluency}
                    </td>
                    <td>
                      Rhymes: {levelTest.length > 0 && levelTest[0].Rhyme}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Creation: {levelTest.length > 0 && levelTest[0].Creation}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <Grid item xs={8}>
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
                    <td>Attendance:</td>
                    <td>
                      Working Days:{" "}
                      {studentAttendance.length > 0 &&
                        studentAttendance[0].WorkingDay}
                    </td>
                    <td>
                      Present Days:{" "}
                      {studentAttendance.length > 0 &&
                        studentAttendance[0].PresentDay}
                    </td>
                    <td>
                      Absent Days:{" "}
                      {studentAttendance.length > 0 &&
                        studentAttendance[0].AbsentDay}
                    </td>
                  </tr>
                </thead>
              </table>
            </Grid>
            <Grid xs={6}>
              <table style={{ marginLeft: "40px" }}>
                <thead>
                  <tr>
                    <td colSpan={2}>Result:</td>
                    <td>Remarks:</td>
                  </tr>
                  <tr>
                    <td>
                      Grade:{" "}
                      {gpaToGrade(
                        trackSubject.reduce((acc, cur) => {
                          return acc + cur.totalMarks;
                        }, 0) / trackSubject.length
                      )}
                    </td>
                    <td>
                      G.P.A:{" "}
                      {trackSubject.reduce((acc, cur) => {
                        return acc + cur.totalMarks;
                      }, 0) / trackSubject.length}
                    </td>
                    <td>
                      {gpaToRemarks(
                        trackSubject.reduce((acc, cur) => {
                          return acc + cur.totalMarks;
                        }, 0) / trackSubject.length
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
                <h4>{forDate.PublishDate.slice(0, 10)}</h4>
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

export default ExamResultDesign;
