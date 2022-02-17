import React, { Fragment, memo, useEffect, useState } from "react";
import "./examLedger.css";

const ExamResultTableCollapse = memo(
  ({ ledgerHeader, student, mark, showDataTable, result, rank }) => {
    const [ledgerData, setLedgeData] = useState([]);
    let newLedger = [];

    useEffect(() => {
      if (student) {
        student
          .sort((a, b) => a.RollNo - b.RollNo)
          .map((d) => {
            let markModel = mark.filter(
              (m) => m.IDHREmployee === d.IDHREmployee
            );
            if (ledgerHeader) {
              ledgerHeader.map((l) => {
                let obtainedMark = markModel.find(
                  (o) => o.IdAcademicSubject === l.IDAcademicSubject
                );
                if (obtainedMark) {
                  newLedger.push(obtainedMark);
                  console.log({ ...obtainedMark });
                } else {
                  console.log("no data");
                  newLedger.push({ IDHREmployee: d.IDHREmployee });
                }
              });
            }
          });
      }
      setLedgeData([...newLedger]);
    }, []);

    return showDataTable ? (
      <div className="ledgerResult">
        <table border="1">
          <thead>
            <tr>
              <th rowSpan="2" style={{ width: "5%" }}>
                Roll No.
              </th>
              <th rowSpan="2" style={{ width: "15%" }}>
                Name Of the Students
              </th>
              {ledgerHeader &&
                ledgerHeader.map((s) => (
                  <th colSpan="2" key={s.$id}>
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
              {ledgerHeader &&
                ledgerHeader.map((s) => (
                  <Fragment key={s.$id}>
                    <th>TH</th>
                    <th>PR</th>
                  </Fragment>
                ))}
            </tr>
          </thead>
          <tbody>
            {student &&
              student.map((d) => {
                const showResult = result.filter(
                  (r) => r.Key === d.IDHREmployee
                );
                const showRank = rank.filter((r) => r.Key === d.IDHREmployee);
                console.log(showResult);
                console.log(showRank);
                return (
                  <tr key={d.$id}>
                    <td>{d.RollNo}</td>
                    <td>{d.StudentName}</td>
                    {ledgerData &&
                      ledgerData.map((n) => {
                        return (
                          n.IDHREmployee === d.IDHREmployee && (
                            <Fragment key={d.$id}>
                              <td>{n.ObtainedMarks}</td>
                              <td>{n.ObtainedMarksPractical}</td>
                            </Fragment>
                          )
                        );
                      })}
                    <td>{d.TotalObtainedMark}</td>
                    <td>{showResult.length > 0 && showResult[0].Value}</td>
                    <td>{showRank.length > 0 && showRank[0].Value}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    ) : (
      <div></div>
    );
  }
);

export default ExamResultTableCollapse;
