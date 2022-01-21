import React, { Fragment, useEffect, useState } from "react";
import "./ExamAnnualResultTable.css";
import { ledgerData } from "./ledgerData";

const ExamAnnualResultTable = () => {
  const [ledgerInnerData, setLedgeInnerData] = useState([]);

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
              Result
            </th>

            <th rowSpan="2">Rank</th>
          </tr>
          <tr>
            {ledgerData &&
              ledgerData.ddlAcademicFacultySubjectLinkSubModel.map((s) => (
                <Fragment key={s.$id}>
                  <th>1st Term</th>
                  <th>2nd Term</th>
                  <th>3rd Term</th>
                  <th>Final Term</th>
                </Fragment>
              ))}
          </tr>
        </thead>
        <tbody>
          {ledgerData.dbModelLstss
            .sort((a, b) => a.RollNo - b.RollNo)
            .map((s) => {
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
                      return (
                        <Fragment>
                          <td>
                            {firstTerm
                              ? (firstTerm[0].ObtainedMark +
                                  firstTerm[0].ObtainedMarkPractical) *
                                0.15
                              : ""}
                          </td>
                          <td>
                            {secondTerm
                              ? (secondTerm[0].ObtainedMark +
                                  secondTerm[0].ObtainedMarkPractical) *
                                0.15
                              : ""}
                          </td>
                          <td>
                            {thirdTerm
                              ? (thirdTerm[0].ObtainedMark +
                                  thirdTerm[0].ObtainedMarkPractical) *
                                0.15
                              : ""}
                          </td>
                          <td>
                            {finalTerm
                              ? (finalTerm[0].ObtainedMark +
                                  finalTerm[0].ObtainedMarkPractical) *
                                0.15
                              : ""}
                          </td>
                        </Fragment>
                      );
                    })}
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ExamAnnualResultTable;
