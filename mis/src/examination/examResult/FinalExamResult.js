import React from "react";
import FinalExamResultDesign from "./FinalExamResultDesign";

const FinalExamResult = ({ result }) => {
  return (
    <>
      {result &&
        result.dbStudentModelLst.map((student) => {
          let subjectList = result.dbModelLstForCountSubject.filter(
            (x) =>
              (x.IDHREmployee === student.IDHREmployee) &
              (x.EventName == "FIRST TERM EXAMINATION")
          );
          let firstTerm = result.dbModelLst.filter(
            (x) =>
              (x.EventName == "FIRST TERM EXAMINATION") &
              (x.IDHREmployee === student.IDHREmployee)
          );
          let secondTerm = result.dbModelLst.filter(
            (x) =>
              (x.EventName == "SECOND TERM EXAMINATION") &
              (x.IDHREmployee === student.IDHREmployee)
          );
          let thirdTerm = result.dbModelLst.filter(
            (x) =>
              (x.EventName == "THIRD TERM EXAMINATION") &
              (x.IDHREmployee === student.IDHREmployee)
          );
          let finalTerm = result.dbModelLst.filter(
            (x) =>
              (x.EventName == "FINAL TERM EXAMINATION") &
              (x.IDHREmployee === student.IDHREmployee)
          );
          let attendance = result.StudentAttendanceDay.filter(
            (x) => x.IDHREmployee === student.IDHREmployee
          );
          return (
            <FinalExamResultDesign
              student={student}
              key={student.$id}
              firstTerm={firstTerm}
              secondTerm={secondTerm}
              thirdTerm={thirdTerm}
              finalTerm={finalTerm}
              subjectList={subjectList}
              attendance={attendance}
            />
          );
        })}
    </>
  );
};

export default FinalExamResult;
