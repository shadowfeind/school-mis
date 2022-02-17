import React, { Fragment } from "react";
import { memo } from "react";
import "./ExamAnnualResultTable.css";
import { gradeCalc, pointCalc } from "./Helpers";
// import { ledgerData } from "./ledgerData";

const ExamAnnualResultTable = memo(({ ledgerData }) => {
  return (
    <div className="ledgerResult">
      <table border="1">
        <thead>
          <tr>
            <th rowSpan="2" style={{ width: "5%" }}>
              Roll No.
            </th>
            <th rowSpan="2" style={{ width: "15%" }}>
              Students
            </th>
            {ledgerData &&
              ledgerData.ddlAcademicFacultySubjectLinkSubModel
                .sort((a, b) => a.IDAcademicSubject - b.IDAcademicSubject)
                .map((s) => (
                  <th colSpan="4" key={s.$id}>
                    {s.SubjectName}
                  </th>
                ))}

            <th rowSpan="2" style={{ width: "5%" }}>
              Total Obtained
            </th>

            <th rowSpan="2" style={{ width: "7%" }}>
              Grade
            </th>
            <th rowSpan="2" style={{ width: "7%" }}>
              GPA
            </th>

            <th rowSpan="2">Rank</th>
          </tr>
          <tr>
            {ledgerData &&
              ledgerData.ddlAcademicFacultySubjectLinkSubModel.map((s) => (
                <Fragment key={s.$id}>
                  <th>1st Term (15%)</th>
                  <th>2nd Term (20%)</th>
                  <th>3rd Term (15%)</th>
                  <th>Final Term (50%)</th>
                </Fragment>
              ))}
          </tr>
        </thead>
        <tbody>
          {ledgerData &&
            ledgerData.dbModelLstss
              .sort((a, b) => a.RollNo - b.RollNo)
              .map((s) => {
                let totalMarksAcc = [];
                let crrentStudentId = ledgerData.dbModelResultLst.filter(
                  (x) => x.Key === s.IDHREmployee
                );
                let currentStudentRank = [];
                if (
                  crrentStudentId.length > 0 &&
                  crrentStudentId.value !== "Fail"
                ) {
                  currentStudentRank = ledgerData.dbModelRankLst.filter(
                    (x) => x.Key === s.IDHREmployee
                  );
                }
                return (
                  <tr key={s.$id}>
                    <td>{s.RollNo}</td>
                    <td>{s.StudentName}</td>
                    {ledgerData.dbModelLstForCountSubject
                      .filter(
                        (x) =>
                          (x.IDHREmployee === s.IDHREmployee) &
                          (x.EventName == "FIRST TERM EXAMINATION")
                      )
                      .sort((a, b) => a.IDAcademicSubject - b.IDAcademicSubject)
                      .map((f) => {
                        let firstTerm = ledgerData.dbModelLst
                          .filter(
                            (x) =>
                              (x.IDHREmployee === s.IDHREmployee) &
                              (x.EventName == "FIRST TERM EXAMINATION") &
                              (x.IDAcademicSubject === f.IDAcademicSubject)
                          )
                          .sort(
                            (a, b) => a.IDAcademicSubject - b.IDAcademicSubject
                          );
                        totalMarksAcc.push({
                          marks: firstTerm
                            ? (firstTerm[0].ObtainedMark +
                                firstTerm[0].ObtainedMarkPractical) *
                              0.15
                            : "",
                        });
                        let secondTerm = ledgerData.dbModelLst
                          .filter(
                            (x) =>
                              (x.IDHREmployee === s.IDHREmployee) &
                              (x.EventName == "SECOND TERM EXAMINATION") &
                              (x.IDAcademicSubject === f.IDAcademicSubject)
                          )
                          .sort(
                            (a, b) => a.IDAcademicSubject - b.IDAcademicSubject
                          );
                        totalMarksAcc.push({
                          marks: secondTerm
                            ? (secondTerm[0].ObtainedMark +
                                secondTerm[0].ObtainedMarkPractical) *
                              0.2
                            : "",
                        });
                        let thirdTerm = ledgerData.dbModelLst
                          .filter(
                            (x) =>
                              (x.IDHREmployee === s.IDHREmployee) &
                              (x.EventName == "THIRD TERM EXAMINATION") &
                              (x.IDAcademicSubject === f.IDAcademicSubject)
                          )
                          .sort(
                            (a, b) => a.IDAcademicSubject - b.IDAcademicSubject
                          );
                        totalMarksAcc.push({
                          marks: thirdTerm
                            ? (thirdTerm[0].ObtainedMark +
                                thirdTerm[0].ObtainedMarkPractical) *
                              0.15
                            : "",
                        });
                        let finalTerm = ledgerData.dbModelLst
                          .filter(
                            (x) =>
                              (x.IDHREmployee === s.IDHREmployee) &
                              (x.EventName == "FINAL TERM EXAMINATION") &
                              (x.IDAcademicSubject === f.IDAcademicSubject)
                          )
                          .sort(
                            (a, b) => a.IDAcademicSubject - b.IDAcademicSubject
                          );
                        totalMarksAcc.push({
                          marks: finalTerm
                            ? (finalTerm[0].ObtainedMark +
                                finalTerm[0].ObtainedMarkPractical) *
                              0.5
                            : "",
                        });

                        return (
                          <Fragment>
                            <td>
                              (
                              {firstTerm
                                ? (firstTerm[0].ObtainedMark +
                                    firstTerm[0].ObtainedMarkPractical) *
                                  0.15
                                : ""}
                              )
                              {firstTerm &&
                                gradeCalc(
                                  ((firstTerm[0].ObtainedMark +
                                    firstTerm[0].ObtainedMarkPractical) /
                                    (firstTerm[0].FullMark +
                                      firstTerm[0].FullMarkPractical)) *
                                    100
                                )}
                            </td>
                            <td>
                              (
                              {secondTerm
                                ? (secondTerm[0].ObtainedMark +
                                    secondTerm[0].ObtainedMarkPractical) *
                                  0.2
                                : ""}
                              )
                              {secondTerm &&
                                gradeCalc(
                                  ((secondTerm[0].ObtainedMark +
                                    secondTerm[0].ObtainedMarkPractical) /
                                    (secondTerm[0].FullMark +
                                      secondTerm[0].FullMarkPractical)) *
                                    100
                                )}
                            </td>
                            <td>
                              (
                              {thirdTerm
                                ? (thirdTerm[0].ObtainedMark +
                                    thirdTerm[0].ObtainedMarkPractical) *
                                  0.15
                                : ""}
                              )
                              {thirdTerm &&
                                gradeCalc(
                                  ((thirdTerm[0].ObtainedMark +
                                    thirdTerm[0].ObtainedMarkPractical) /
                                    (thirdTerm[0].FullMark +
                                      thirdTerm[0].FullMarkPractical)) *
                                    100
                                )}
                            </td>
                            <td>
                              (
                              {finalTerm
                                ? (finalTerm[0].ObtainedMark +
                                    finalTerm[0].ObtainedMarkPractical) *
                                  0.5
                                : ""}
                              )
                              {finalTerm &&
                                gradeCalc(
                                  ((finalTerm[0].ObtainedMark +
                                    finalTerm[0].ObtainedMarkPractical) /
                                    (finalTerm[0].FullMark +
                                      finalTerm[0].FullMarkPractical)) *
                                    100
                                )}
                            </td>
                          </Fragment>
                        );
                      })}
                    <td>
                      {totalMarksAcc.reduce((acc, cur) => {
                        return acc + cur.marks;
                      }, 0)}
                    </td>
                    <td>
                      {gradeCalc(
                        totalMarksAcc.reduce((acc, cur) => {
                          return acc + cur.marks;
                        }, 0) /
                          (totalMarksAcc.length / 4)
                      )}
                    </td>
                    <td>
                      {pointCalc(
                        totalMarksAcc.reduce((acc, cur) => {
                          return acc + cur.marks;
                        }, 0) /
                          (totalMarksAcc.length / 4)
                      )}
                    </td>
                    <td>
                      {currentStudentRank.length > 0
                        ? currentStudentRank[0].Value
                        : ""}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
});

export default ExamAnnualResultTable;
