import { Grid } from "@material-ui/core";
import React from "react";
import "./examResult.css";

const ExamResultDesign = ({
  student,
  subjects,
  levelTest,
  studentAttendance,
}) => {
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
        <h2>FIRST TERM EXAMINATION : 2077</h2>
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
                return (
                  <tr key={s.$id}>
                    <td>{count}</td>
                    <td>{s.SubjectName}</td>
                    <td> 4.0</td>
                    <td> B+</td>
                    <td> A+</td>
                    <td> A</td>
                    <td> 3.60</td>
                    <td height={30}>A </td>
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
                <td>3.90</td>
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
            <Grid xs={6}>
              <table style={{ marginRight: "40px" }}>
                <thead>
                  <tr>
                    <td>Attendance:</td>
                    <td>Working Days: 52.00</td>
                    <td>Present Days: 45.00</td>
                    <td>Absent Days: 7.00</td>
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
                    <td>Grade: A+</td>
                    <td>G.P.A: 3.90</td>
                    <td>OUTSTANDING</td>
                  </tr>
                </thead>
              </table>
            </Grid>
          </Grid>
          <div className="signatureContainer">
            <Grid container>
              <Grid item xs={3}>
                <h4>16-Jan-2022</h4>
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